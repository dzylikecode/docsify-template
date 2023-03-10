(function () {
  let originMarkdown = window.$docsify?.markdown;
  let newMarked = marked; // version above 2.1.0
  window.$docsify.markdown = newMarkdown;
  return;
  function newMarkdown(originMarked, originRenderer) {
    const merge =
      Object.assign ||
      function (to) {
        for (let i = 1; i < arguments.length; i++) {
          const from = Object(arguments[i]);
          for (const key in from) {
            if (hasOwn.call(from, key)) {
              to[key] = from[key];
            }
          }
        }
        return to;
      };

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
    newMarked.use({ extensions: markedPlugins });

    return newMarked.parse;

    function isFn(obj) {
      return typeof obj === "function";
    }
  }
})();
