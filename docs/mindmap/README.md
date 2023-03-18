# mind map

- 参考:

- head

  ```html
  <!-- markmap is based on d3, so must load those files first. -->
  <script src="//unpkg.com/d3@3/d3.min.js"></script>
  <script src="//unpkg.com/markmap@latest/lib/d3-flextree.js"></script>
  <script src="//unpkg.com/markmap@latest/lib/view.mindmap.js"></script>
  <link
    rel="stylesheet"
    href="//unpkg.com/markmap@latest/style/view.mindmap.css"
  />
  ```

- docsify

  ```html
  <script>
    window.$docsify = {
      mindmap: {
        // https://github.com/dundalek/markmap
        markmap: {
          preset: "colorful", // or default
          linkShape: "diagonal", // or bracket
        },
      },
    };
  </script>
  ```

- body

  ```html
  <!-- markmap -->
  <script src="//unpkg.com/docsify-mindmap/dist/docsify-mindmap.min.js"></script>
  ```

## markmap

- head

  ```html
  <script src="https://cdn.jsdelivr.net/npm/d3@6"></script>
  <script src="https://cdn.jsdelivr.net/npm/markmap-view"></script>
  <script src="https://cdn.jsdelivr.net/npm/markmap-lib@0.14.3/dist/browser/index.min.js"></script>
  ```

- body

  ```js
  let num = 0;
  markmapSvg = []; // 暂存需要绘制svg
  const transformer = new markmap.Transformer();
  window.$docsify = {
    markdown: {
      renderer: {
        code: function (code, lang) {
          if (lang == "markmap") {
            const { root: data } = transformer.transform(code);
            let currentNum = num;
            markmapSvg.push(function () {
              let elem = document.getElementById("markmap-svg-" + currentNum);
              const mm = new markmap.Markmap(elem, null);
              if (data) {
                mm.setData(data);
                const { minX, maxX, minY, maxY } = mm.state;
                const naturalWidth = maxY - minY;
                const naturalHeight = maxX - minX;
                elem.style.width = naturalWidth + "px";
                elem.style.height = naturalHeight + "px";
                mm.fit(); // always fit for the first render
              }
            });
            return `<svg class="markmap" id="markmap-svg-${num++}"></svg>`;
          }
          return this.origin.code.apply(this, arguments);
        },
      },
    },
    plugins: [
      function (hook, vm) {
        hook.beforeEach(function (html) {
          num = 0;
          markmapSvg = []; // 清空
        });
        hook.doneEach(function () {
          markmapSvg.forEach((fn) => fn()); // 开始渲染
        });
      },
    ],
  };
  ```

## References

1. [docsify-mindmap](https://github.com/up9cloud/docsify-mindmap)
