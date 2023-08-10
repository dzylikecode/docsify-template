import { marked } from "../marked.mjs";

const pageLink = window.gPageLink;
const blobLink = window.gBlobLink;
/**
 * @type {{docs:string, code:string, cache:string, exclude: string[], global: string[], ext:string}[]}
 */
const codeDocMaps = window.gCodeDocMaps;

let isLoaded = false;
const docsCache = {
  cur: null,
  global: [],
  as: {},
  deps: [],
};
const getModContentCached = createCacheFunc(getModContent);
const getVarContentCached = createCacheFunc(getVarContent);

export function getContent(elem) {
  return elem.dataset?.id
    ? getVarContentCached(elem.dataset.id)
    : getModContentCached(elem.dataset.path);
}

function clearCache() {
  docsCache.cur = null;
  docsCache.global = [];
  docsCache.as = {};
  docsCache.deps = [];
  getModContentCached.clear();
  getVarContentCached.clear();
}

export function plugin(hook, vm) {
  const dependencyRule = /- .*?require\s"(.+)"/g;
  hook.beforeEach(function (html) {
    const fileRoute = vm.route.file;
    const res = mapToVirtual(fileRoute);
    const blobFile = blobLink + vm.route.file;
    const editHtml = "[:memo: EDIT DOCUMENT](" + blobFile + ")";
    if (!res) return editHtml + "\n\n" + html;
    isLoaded = false;
    const allRepos = [res.repos, ...res.remoteRepos];
    clearCache();
    fetchCache(res);
    const viewCode = `[:rocket: VIEW CODE](${getCodePath(
      res.repos,
      res.virtualName
    )})\n\n`;
    return (
      editHtml +
      viewCode +
      html.replace(dependencyRule, (match, p1) => {
        const link = `<span class="pop-up" data-path="${p1}">${p1}</span>`;
        return match.replace(p1, link);
      })
    );

    async function fetchCache(src) {
      const cacheFilePath = getCachePath(src.repos, src.virtualName);
      const res = await fetch(cacheFilePath);
      const global = src.global;
      if (!res.ok) return;
      docsCache.cur = JSON.parse(await res.text());
      docsCache.cur.repos = src.repos;
      for (const virtualName of docsCache.cur.deps) {
        for (const repos of allRepos) {
          const fullPath = getCachePath(repos, virtualName);
          const res = await fetch(fullPath).catch((e) => console.log(e));
          if (!res?.ok) continue;
          const obj = JSON.parse(await res.text());
          obj.repos = repos;
          docsCache.deps.push(obj);
          break;
        }
      }
      for (const virtualName of global) {
        for (const repos of allRepos) {
          const fullPath = getCachePath(repos, virtualName);
          const res = await fetch(fullPath).catch((e) => console.log(e));
          if (!res?.ok) continue;
          const obj = JSON.parse(await res.text());
          obj.repos = repos;
          docsCache.global.push(obj);
          break;
        }
      }
      for (const [asName, virtualName] of Object.entries(docsCache.cur.as)) {
        for (const repos of allRepos) {
          const fullPath = getCachePath(repos, virtualName);
          const res = await fetch(fullPath).catch((e) => console.log(e));
          if (!res?.ok) continue;
          const obj = JSON.parse(await res.text());
          obj.repos = repos;
          docsCache.as[asName] = obj;
          break;
        }
      }

      isLoaded = true;
    }
  });
}

function getVarContent(id) {
  {
    const firstSplit = id.indexOf("-");
    if (firstSplit != -1) {
      const aliasName = id.slice(0, firstSplit);
      const m = docsCache.as?.[aliasName];
      if (m) {
        const realId = m.ret + id.slice(firstSplit);
        const v = m.extern.find((val) => val.id == realId);
        if (v) {
          const name = v.id;
          const virtualName = m.id;
          const anchor = realId;
          const content = v.info;
          return prettyContent(name, virtualName, anchor, content, m);
        } else return "Not found";
      }
    }
  }

  {
    const v = docsCache.cur.local.find((val) => val.id == id);
    if (v) {
      const name = v.id;
      const virtualName = docsCache.cur.id;
      const anchor = name;
      const content = v.info;
      return prettyContent(name, virtualName, anchor, content, docsCache.cur);
    }
  }

  {
    const v = docsCache.cur.extern.find((val) => val.id == id);
    if (v) {
      const name = v.id;
      const virtualName = docsCache.cur.id;
      const anchor = name;
      const content = v.info;
      return prettyContent(name, virtualName, anchor, content, docsCache.cur);
    }
  }

  {
    for (const m of docsCache.deps) {
      const v = m.extern.find((val) => val.id == id);
      if (v) {
        const name = v.id;
        const virtualName = m.id;
        const anchor = name;
        const content = v.info;
        return prettyContent(name, virtualName, anchor, content, m);
      }
    }
  }

  {
    for (const m of docsCache.global) {
      const v = m.extern.find((val) => val.id == id);
      if (v) {
        const name = v.id;
        const virtualName = m.id;
        const anchor = name;
        const content = v.info;
        return prettyContent(name, virtualName, anchor, content, m);
      }
    }
  }

  return "Not Found";

  function prettyContent(name, virtualName, anchor, content, m) {
    return marked.parse(
      `${name}: ${getLocation(virtualName, anchor, m)}<br>${content}`
    );
  }

  function getLocation(virtualName, anchor, m) {
    const docsHref = `${getDocsPath(
      m.repos,
      virtualName
    )}#${anchor.toLowerCase()}`;
    return `<a class="docs" href="${docsHref}">${anchor}</a> <a class="code" href="${getCodePath(
      m.repos,
      virtualName
    )}" target="_blank">code</a>`;
  }
}

function getModContent(mName) {
  {
    const m = docsCache.deps.find((m) => m.id == mName);
    if (m) {
      const name = m.id;
      const virtualName = m.id;
      const content = m.info;
      return prettyContent(name, virtualName, content, m);
    }
  }

  {
    const m = docsCache.global.find((m) => m.id == mName);
    if (m) {
      const name = m.id;
      const virtualName = m.id;
      const content = m.info;
      return prettyContent(name, virtualName, content, m);
    }
  }

  {
    const as = docsCache.as;
    if (!isEmpty(as)) {
      const m = as.keys().find((m) => m.id == mName);
      if (m) {
        const name = m.id;
        const virtualName = m.id;
        const content = m.info;
        return prettyContent(name, virtualName, content, m);
      }
    }

    function isEmpty(obj) {
      return Object.keys(obj).length === 0;
    }
  }

  return "Not Found";

  function prettyContent(name, virtualName, content, m) {
    return marked.parse(
      `${name}: ${getLocation(virtualName, m)}<br>${content}`
    );
  }

  function getLocation(virtualName, m) {
    const docsHref = `${getDocsPath(m.repos, virtualName)}`;
    return `<a class="docs" href="${docsHref}">${virtualName}</a> <a class="code" href="${getCodePath(
      m.repos,
      virtualName
    )}" target="_blank">code</a>`;
  }
}

function createCacheFunc(func) {
  let cache = {};
  const cacheFunc = function (key) {
    if (!isLoaded) return "Loading...<br> Try again";
    if (cache[key]) return cache[key];
    const res = func(key);
    cache[key] = res;
    return res;
  };
  cacheFunc.clear = function () {
    cache = {};
  };
  return cacheFunc;
}

/**
 *
 * @param {string} fileRoute
 * @returns
 */
function mapToVirtual(fileRoute) {
  const match = codeDocMaps.find((m) => fileRoute.startsWith(m.docs));
  if (!match) return;
  const virtualName = fileRoute.slice(match.docs.length, -".md".length);
  if (isExcludedFile(virtualName)) return;
  const cache = `${pageLink}${match.cache}`;
  // const code = `${blobLink}${match.code}`;
  const docs = `${pageLink}#/${match.docs}`;

  return {
    virtualName,
    repos: { docs, cache, code: match.code, ext: match.ext },
    global: match.global,
    remoteRepos: match.remoteRepos ?? [],
  };

  /**
   *
   * @param {string} virtualName
   * @returns
   */
  function isExcludedFile(virtualName) {
    return match.exclude.some((e) => virtualName.startsWith(e));
  }
}

function getCodePath(repos, virtualName) {
  return `${repos.code}${virtualName}${repos.ext}`;
}

function getDocsPath(repos, virtualName) {
  return `${repos.docs}${virtualName}`;
}

function getCachePath(repos, virtualName) {
  return `${repos.cache}${virtualName}.json`;
}
