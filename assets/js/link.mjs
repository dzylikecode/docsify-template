/**
 * <a class="Repos" target="_blank" href="../example/animation/static-anim/js/main.js">code</a> -> 指向github repos
 * <a class="Pages" target="_blank" href="../example/animation/static-anim/js/main.js">code</a> -> 指向github pages
 */

import { docsifyPlugins } from "./config.mjs";

const blobLink = window.gBlobLink; // github 需要最后的/, 而live server 不需要, 无妨
const pageLink = window.gPageLink;

let blobFile;
let blobFileDir;
let pageFile;
let pageFileDir;
function plugin(hook, vm) {
  hook.beforeEach(function (html) {
    blobFile = blobLink + vm.route.file;
    const DirRoute = vm.route.file.slice(0, vm.route.file.lastIndexOf("/") + 1);
    blobFileDir = blobLink + DirRoute;
    pageFile = pageLink + vm.route.file;
    pageFileDir = pageLink + DirRoute;
    return html;
  });
  hook.doneEach(function () {
    modifyReposLink();
    modifyPagesLink();
  });
}

function modifyReposLink() {
  const links = document.querySelectorAll(".Repos");
  links.forEach((link) => {
    link = proxyLink(link);
    const url = link.src;
    if (isRelative(url)) {
      link.src = blobFileDir + url;
    } else {
      link.src = blobLink + url.slice(1);
    }
  });
}
function modifyPagesLink() {
  const links = document.querySelectorAll(".Pages");
  links.forEach((link) => {
    link = proxyLink(link);
    const url = link.src;
    if (isRelative(url)) {
      link.src = pageFileDir + url;
    } else {
      link.src = pageLink + url.slice(1);
    }
    if (link.link.tagName === "SOURCE") {
      HTMLMediaElement.prototype.load.call(link.link.parentElement);
    }
  });
}

function proxyLink(link) {
  const attr = link.attributes.href ? "href" : "src";
  return {
    link,
    get src() {
      return link.attributes[attr].value;
    },
    set src(value) {
      link[attr] = value;
    },
  };
}

function isRelative(url) {
  const absPath = url[0] == "/" || url.includes(":");
  return !absPath;
}

docsifyPlugins.push(plugin);
