(function () {
  const textExtension = {
    name: "wiki-ref-link",
    level: "inline",
    start(src) {
      let index = src.match(/\[/)?.index;
      return index;
    },
    tokenizer(src, tokens) {
      const refRule = /^\[\^((\\.|[^\\\]])+)\]/;
      const noteRule = /^\[-((\\.|[^\\\]])+)\]/;
      let match;
      if ((match = refRule.exec(src))) {
        return {
          type: "wiki-ref-link",
          raw: match[0],
          text: match[1].trim(),
          linkType: "reference",
        };
      } else if ((match = noteRule.exec(src))) {
        return {
          type: "wiki-ref-link",
          raw: match[0],
          text: match[1].trim(),
          linkType: "note",
        };
      }
    },
    renderer(token) {
      if (token.linkType == "reference") {
        return `<sup id="cite_ref-${token.text}" class="reference"><a class="Docsify" href="#cite_note-${token.text}">[?]</a></sup>`;
      } else if (token.linkType == "note") {
        return `<span id="cite_note-${token.text}" class="mw-cite-backlink"><a class="Docsify" href="#cite_ref-${token.text}" aria-label="Jump up" title="Jump up">^</a></span>`;
      }
    },
  };

  markedPlugins.push(textExtension);
  return;
})();

(function () {
  function main(hook, vm) {
    hook.doneEach(function () {
      const linkMap = setLinkMap();
      setSupIndex(linkMap);
    });
  }
  function setLinkMap() {
    let linkMap = {};
    const links = document.querySelectorAll(".mw-cite-backlink");
    links.forEach((link) => {
      const key = getKey(link);
      if (key == undefined) return;
      const index = getParentIndex(link);
      if (index == undefined) return;
      linkMap[key] = index;
    });
    return linkMap;
    // get the index of parent element(order list)
    function getParentIndex(link) {
      const $parent = link.parentNode;
      if ($parent.tagName != "LI") return;
      let li = $parent;
      let i = 1;

      while (li.previousElementSibling) {
        li = li.previousElementSibling;
        i += 1;
      }
      return i;
    }

    function getKey(link) {
      const id = link.id;
      const key = id.replace(/^cite_note/, "");
      return key;
    }
  }
  function setSupIndex(linkMap) {
    if (linkMap == undefined) return;
    const links = document.querySelectorAll(".reference");
    links.forEach((link) => {
      const key = getKey(link);
      if (key == undefined) return;
      const index = linkMap[key];
      if (index == undefined) return;
      setChildIndex(link, index);
    });

    function setChildIndex(link, index) {
      const $child = link.children[0];
      $child.innerHTML = `[${index}]`;
    }

    function getKey(link) {
      const id = link.id;
      const key = id.replace(/^cite_ref/, "");
      return key;
    }
  }
  function install() {
    docsifyPlugins.push(main);
  }

  install();
})();
