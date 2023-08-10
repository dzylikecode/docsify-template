import { markedExtensions, markedRender, docsifyPlugins } from "./config.mjs";

import "./katex.mjs";
import "./mermaid/index.mjs";
import "./popup/index.mjs";
import "./markmap.mjs";
import "./anchor.mjs";
import "./references/index.mjs";
import "./link.mjs";
import "./marked-highligh-text.mjs";
import style from "./style.css" assert { type: "css" };
import { marked } from "./marked.mjs";

window.$docsify.markdown = {
  renderer: {
    code: function (code, lang) {
      const trans = markedRender.code?.[lang];
      return trans === undefined
        ? this.origin.code.apply(this, arguments)
        : trans(code);
    },
  },
};
window.$docsify.plugins = docsifyPlugins.concat(window.$docsify.plugins || []);

const originMarkdown = window.$docsify?.markdown || {};
window.$docsify.markdown = newMarkdown;

function newMarkdown(originMarked, originRenderer) {
  const merge = Object.assign;
  const opts = mergeOptions();

  marked.setOptions(opts);
  marked.use({ extensions: markedExtensions });

  return marked.parse;

  // source code: https://github.com/docsifyjs/docsify/blob/898e6eea7a7d5bf34a428d672d6a1b8c7896d183/src/core/render/compiler.js#L73-L87
  function mergeOptions() {
    if (isFn(originMarkdown)) {
      return originMarkdown.apply(this, originMarked, originRenderer).defaults;
    } else {
      return merge(originMarkdown, {
        renderer: merge(originRenderer, originMarkdown.renderer),
      });
    }
  }
}
function isFn(obj) {
  return typeof obj === "function";
}

const cssStyle = [...document.adoptedStyleSheets, style];
document.adoptedStyleSheets = cssStyle;
