// import katex from "katex";
// import marked from "marked";
(function () {
  let originMarkdown = window.$docsify?.markdown;
  let newMarked = marked; // version above 2.1.0
  window.$docsify.markdown = newMarkdown;
  return;
  function newMarkdown(originMarked, originRenderer) {
    // in docsify.js: `window.marked = marked;`
    // this will overwrite the marked
    // here `let newMarked = marked;` will not right
    const textExtension = {
      name: "hightlight-text",
      level: "inline",
      start(src) {
        let index = src.match(/=/)?.index;
        return index;
      },
      tokenizer(src, tokens) {
        const blockRule = /^==((\\.|[^\$\\])+)==/;
        let match;
        if ((match = blockRule.exec(src))) {
          return {
            type: "hightlight-text",
            raw: match[0],
            text: match[1].trim(),
          };
        }
      },
      renderer(token) {
        return `<mark>${token.text}</mark>`;
      },
    };
    const merge = Object.assign;

    let opts = originMarkdown || {};

    if (isFn(opts)) {
      opts = opts.apply(
        this, // make it right: return this.origin.code(src);
        originMarked,
        originRenderer
      ).defaults;
    } else {
      opts = merge(opts, {
        renderer: merge(originRenderer, opts.renderer),
      });
    }
    newMarked.setOptions(opts);
    newMarked.use({ extensions: [mathExtension] });

    return newMarked.parse;

    function isFn(obj) {
      return typeof obj === "function";
    }
  }
})();
