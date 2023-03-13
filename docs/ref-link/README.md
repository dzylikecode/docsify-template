# Reference Link

## implementation

```js
vm.router.onchange(callBack); //路由变化的时候会调用
```

---

基本思路

```js
vm.router.onchange((params) => {
  if (params.source == "navigate") {
    if (targetElem != null) {
      targetElem.classList.remove("target");
      targetElem == null;
    }
  }
  if (params.source == "history") {
    if (targetElem != null) {
      targetElem.classList.remove("target");
      targetElem == null;
    }
    targetElem.classList.add("target");
  }
});
```

1. 触发 navigate

   跳转到其他的地方时候, 把原来的给清除

2. 再次触发 history, 给浏览器返回用的

   返回的时候, 也应该有高亮

   同时上个历史的 target 清除

## Issue

`[^sdl install]` 会跳转异常

采用 [Replace spaces with dashes](https://stackoverflow.com/questions/1983648/replace-spaces-with-dashes-and-make-all-letters-lower-case)

## References
