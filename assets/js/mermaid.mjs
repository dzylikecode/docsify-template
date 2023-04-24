/**
 * mermaid
 */
import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs";

import { docsifyPlugins, markedRender } from "./config.mjs";

const langId = "mermaid";
// 有一个副作用, 每次切换页面(不是刷新), 本来mermaid-svg-3可能会变成mermaid-svg-5
// 要是在beforeEach里面, 初始化就不会出现这样的问题
let num = 0;

function plugin(hook, vm) {
  hook.beforeEach(function (html) {
    num = 0;
    return html;
  });
  hook.doneEach(function () {
    const allMermaid = document.querySelectorAll("pre.mermaid");
    allMermaid.forEach(async (elem) => {
      const code = elem.innerText;
      const { svg } = await mermaid.render("mermaid-svg-" + num++, code);
      elem.innerHTML = svg;
    });
  });
}

function render(code) {
  return `<pre class="mermaid">${code}</pre>`;
}

function getTheme() {
  if (window?.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  } else {
    return "default";
  }
}

mermaid.initialize({ startOnLoad: false, theme: getTheme() });
markedRender.code[langId] = render;
docsifyPlugins.push(plugin);
