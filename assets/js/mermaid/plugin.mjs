import { mermaidRender } from "./mermaid.mjs";
import { zoom } from "./zoom.mjs";
// 有一个副作用, 每次切换页面(不是刷新), 本来mermaid-svg-3可能会变成mermaid-svg-5
// 要是在beforeEach里面, 初始化就不会出现这样的问题
let num = 0;

export function plugin(hook, vm) {
  hook.beforeEach(function (html) {
    num = 0;
    return html;
  });
  hook.doneEach(function () {
    const allMermaid = document.querySelectorAll("pre.mermaid");
    allMermaid.forEach(async (elem) => {
      const mermaidObserver = new MutationObserver((mutations, observer) => {
        const mutation = mutations.find(
          (mutation) => mutation.addedNodes.length > 0
        );
        if (!mutation) return;
        const target = mutation.target;
        const svg = target.querySelector("svg");
        if (!svg) return;
        zoom(target, svg);
        observer.disconnect();
      });
      mermaidObserver.observe(elem, {
        childList: true,
      });
      const code = elem.innerText;
      elem.innerHTML = await mermaidRender("mermaid-svg-" + num++, code);
      elem.dataset.content = code;
    });
  });
}
