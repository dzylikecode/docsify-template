# docsify template

tailor docsify

参考一些插件配置 [^config] [^docsify plugin], 而定制的

## Configurations

index.html:

- modify the title
- modify the description
- modify the keyword
- modify the repos name

## 想法

将`index.html`放到根目录下, 方便索引到非`docs`的文件夹下, 如果要访问 GitHub 对应的目录练习, 可以点击`edit`当作跳板, 然后就近搜寻

docs 下放置主体的文档

根据 template-docsify 生成新的 template, 进行抽象, 比如可以生产数学的, 有 conda 的配置

> 抽象是来源于重复, `无`是对`有`的抽象

## utils

- [Docsify Preview](https://dzylikecode.github.io/VSCodeExt-docsify-Preview/#/)

## shortcuts

- `shift + center_mouse_scroll`

  水平滚动滚动条

## watchlist

- virtualize markdown as mind map

  - [使用 Markmap 将 docsify 中的 markdown 通过思维导图的形式展示出来](https://zhuanlan.zhihu.com/p/352795634)
  - [上述对应的仓库](https://gitee.com/xsro/college-notes/)
  - [docsify 如何写插件](https://docsify.js.org/#/plugins)
  - [edit 插件](https://github.com/njleonzhang/docsify-edit-on-github)
  - [参考插件](https://github.com/njleonzhang/docsify-edit-on-github/blob/master/index.js)
  - [markmap](https://github.com/gera2ld/markmap/tree/master/packages/markmap-autoloader#markmap-autoloader)

- 一个 server

  更进一步的, 我想的是只有一个 server 仓库, 其他都是文档仓库

- 运行 js

  - [将 MARKDOWN 代码块转换成可运行实例](https://smohan.net/blog/xbbqk9)
  - [markrun-docsify](https://github.com/markrun/markrun-docsify)

    总之我运行不了

  - [markrun](https://github.com/markrun/markrun)

    - [preview](https://markrun.github.io/markrun/)

      我也想实现这样的效果

  - [phaser 效果](https://phaser.io/examples/v3/view/actions/grid-align)

## References

1. [-config] [docsify 的配置 + 全插件列表](https://www.itrma.com/75.html)
2. [-docsify plugin] [Awesome docsify](https://docsify.js.org/#/awesome)
3. [Docsify-js-tutorial](https://github.com/MichaelCurrin/docsify-js-tutorial)
