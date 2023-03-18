# katex

### marked-katex

- [Markdown 配置](https://docsify.js.org/#/zh-cn/markdown)

  同时阅读`docsify`源码

- [NFE - new feature (should be an extension)"](https://github.com/markedjs/marked/labels/NFE%20-%20new%20feature%20%28should%20be%20an%20extension%29)

  - [Add support for mark - highlighting words](https://github.com/markedjs/marked/issues/2563)

- [marked 官方文档](https://marked.js.org/using_pro)

- [Custom markdown blocks with marked](https://qubyte.codes/blog/custom-markdown-blocks-with-marked)

  ```js
  marked.use({
    walkTokens(token) {
      const { type, raw } = token;

      // Modify paragraph blocks beginning and ending with $$.
      if (
        type === "paragraph" &&
        raw.startsWith("$$\n") &&
        raw.endsWith("\n$$")
      ) {
        token.type = "code";
        token.lang = "mathematics";
        token.text = token.raw.slice(3, -3); // Remove the $$ boundaries.
        token.tokens.length = 0; // Remove child tokens.
      }
    },
    renderer: {
      code(code, language) {
        // Use custom mathematics renderer.
        if (language === "mathematics") {
          return renderMathematics(code);
        }

        // Use default code renderer.
        return false;
      },
    },
  });
  ```

- docsify 的 marked 的研究

  ```js
  window.$docsify = {
    markdown: function (marked, oldRenderer) {
      let renderer = {
        // block
        code: function (code, infostring, escaped) {
          return oldRenderer.code.apply(this, arguments);
        },
        blockquote: function (quote) {
          return oldRenderer.blockquote.apply(this, arguments);
        },
        html: function (html) {
          return oldRenderer.html.apply(this, arguments);
        },
        heading: function (text, level, raw, slugger) {
          return oldRenderer.heading.apply(this, arguments);
        },
        hr: function () {
          return oldRenderer.hr.apply(this, arguments);
        },
        list: function (body, ordered, start) {
          return oldRenderer.list.apply(this, arguments);
        },
        listitem: function (text, task, checked) {
          return oldRenderer.listitem.apply(this, arguments);
        },
        checkbox: function (checked) {
          return oldRenderer.checkbox.apply(this, arguments);
        },
        paragraph: function (text) {
          return oldRenderer.paragraph.apply(this, arguments);
        },
        table: function (header, body) {
          return oldRenderer.table.apply(this, arguments);
        },
        tablerow: function (content) {
          return oldRenderer.tablerow.apply(this, arguments);
        },
        tablecell: function (content, flags) {
          return oldRenderer.tablecell.apply(this, arguments);
        },
        // inline
        strong: function (text) {
          return oldRenderer.strong.apply(this, arguments);
        },
        em: function (text) {
          return oldRenderer.em.apply(this, arguments);
        },
        codespan: function (code) {
          return oldRenderer.codespan.apply(this, arguments);
        },
        br: function () {
          return oldRenderer.br.apply(this, arguments);
        },
        del: function (text) {
          return oldRenderer.del.apply(this, arguments);
        },
        link: function (href, title, text) {
          return oldRenderer.link.apply(this, arguments);
        },
        image: function (href, title, text) {
          return oldRenderer.image.apply(this, arguments);
        },
        text: function (text) {
          return oldRenderer.text.apply(this, arguments);
        },
      };
      marked.use({ renderer: renderer });
      return marked;
    },
  };
  ```

#### solution

> 已完成, PR 到 docsify-katex

- head

  ```html
  <!-- begin for docsify katex -->
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/katex@0.16.2/dist/katex.min.css"
  />
  <script
    defer
    src="https://cdn.jsdelivr.net/npm/katex@0.16.2/dist/katex.min.js"
  ></script>
  <!-- the version of marked must between 2.1.0 and 4(not included) -->
  <script src="https://cdn.jsdelivr.net/npm/marked@3"></script>
  <!-- end for docsify katex -->
  ```

- body

  ```html
  <script>
    // import katex from "katex";
    // import marked from "marked";
    (function () {
      let originMarkdown = window.$docsify.markdown;
      let newMarked = marked; // version above 2.1.0
      function newMarkdown(originMarked, originRenderer) {
        // in docsify.js: `window.marked = marked;`
        // this will overwrite the marked
        // here `let newMarked = marked;` will not right
        function isFn(obj) {
          return typeof obj === "function";
        }
        const mathExtension = {
          name: "math",
          level: "inline",
          start(src) {
            let index = src.match(/\$/)?.index;
            return index;
          },
          tokenizer(src, tokens) {
            const blockRule = /^\$\$((\\.|[^\$\\])+)\$\$/;
            const inlineRule = /^\$((\\.|[^\$\\])+)\$/;
            let match;
            if ((match = blockRule.exec(src))) {
              return {
                type: "math",
                raw: match[0],
                text: match[1].trim(),
                mathLevel: "block",
              };
            } else if ((match = inlineRule.exec(src))) {
              return {
                type: "math",
                raw: match[0],
                text: match[1].trim(),
                mathLevel: "inline",
              };
            }
          },
          renderer(token) {
            if (token.mathLevel === "block") {
              return katex.renderToString(token.text, {
                throwOnError: false,
                displayMode: true,
              });
            } else if (token.mathLevel === "inline") {
              return katex.renderToString(token.text, {
                throwOnError: false,
                displayMode: false,
              });
            }
          },
        };
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
        newMarked.use({ extensions: [mathExtension] });

        return newMarked.parse;
      }
      window.$docsify.markdown = newMarkdown;
    })();
  </script>
  ```

- 代码说明

  - marked extension

    - name : 相当于 type
    - level: block 和 inline 的解析水平是不一样的
    - start: 提示(hint)可能开始的位置, 帮助`tokenizer`分析

      !> `?.` 有可能匹配不到, 所以要避免`undefined.index`报错

      比如代码是表示的是在遇到`$`的符号时可能开始分析

      ```txt
      There is a `$`, so $ e = mc^2 $
      ```

      tokenizer 接受到的是

      ```txt
      `$`, so $ e = mc^2 $
      ```

      因为反引号也会分割出 tokens

      下一步可能接受的是

      ```txt
      $ e = mc^2 $
      ```

    - tokenizer: 分析 tokens, 返回一个对象

      根据上面的分析, 正则表达式应该从开头开始匹配, 这样

      ```txt
      `$`, so $ e = mc^2 $
      ```

      第一个`$`才会被跳过

      - `raw`: 被替换的文本
      - `type`: 调用相应的 `render`

    - render: 渲染的时候调用

    文本是像 html 树一样分析, 一层一层往下: [示例](https://marked.js.org/using_pro#lexer)

    > 可以调试进一步理解这些函数, 变量的含义

  - docsify

    docsify 的内建的 marked 版本很低, 不支持插件, 需要 2.1.0 之后的版本合适, 而且版本 4 之后与之前的不兼容, 版本 4 不支持`marked(str)`的用法, 导致 docsify 报错(返回 marked.parse 可以解决版本 4 以上的问题)

    脚本需要插入到`docsify`的初始化和导入的`docsify.js`之间, 因为这是在进一步包装初始化

    !> docsify 里面有`window.marked = marked`, 会把它的旧版本的 marked 赋给全局, 这样会影响导入新的版本的 marked, 需要注意`newMarked = marked`的时机, 要的是新版本的 marked, 而不是内建版本的 marked

    中间一部分的代码是直接抄袭了 docsify 的源码
