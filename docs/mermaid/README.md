# mermaid

## mermaid

- head

  ```html
  <!-- mermaid -->
  <link
    rel="stylesheet"
    href="//cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.css"
  />
  <script src="//cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
  ```

- docsify

  ```html
  <script>
    var num = 0;
    mermaid.initialize({ startOnLoad: false });

    window.$docsify = {
      markdown: {
        renderer: {
          code: function (code, lang) {
            if (lang === "mermaid") {
              return (
                '<div class="mermaid">' +
                mermaid.render("mermaid-svg-" + num++, code) +
                "</div>"
              );
            }
            return this.origin.code.apply(this, arguments);
          },
        },
      },
    };
  </script>
  ```

## katex

想 mermaid 支持 katex

- head

  ```html
  <!-- mermaid-latex -->
  <script
    src="https://cdn.jsdelivr.net/npm/katex@0.10.0-rc.1/dist/katex.min.js"
    integrity="sha384-483A6DwYfKeDa0Q52fJmxFXkcPCFfnXMoXblOkJ4JcA8zATN6Tm78UNL72AKk+0O"
    crossorigin="anonymous"
  ></script>
  ```

- body

  修改`mermaid`的函数配置

  ```js
  window.$docsify = {
    markdown: {
      renderer: {
        code: function (code, lang) {
          if (lang === "mermaid") {
            let transLatex = code.replace(/\$(.*?)\$/g, (m, g1) =>
              katex.renderToString(g1).replace(/"/g, `'`)
            );
            return (
              '<div class="mermaid">' +
              mermaid.render("mermaid-svg-" + num++, transLatex) +
              "</div>"
            );
          }
          return this.origin.code.apply(this, arguments);
        },
      },
    },
  };
  ```

  - 缺点

    有些还是显示得不是很完整(有的时候, 比较奇怪, 需要多多刷新)

    ipad 上面无法正常显示公式: 使用 tab 来切换

    发现不能显示`\sqrt`符号, mermaid 的内部结构不支持

## References

1. [Leward/mermaid-docsify: A plugin to render mermaid diagrams in docsify](https://github.com/Leward/mermaid-docsify)
