import sheetLight from "./pop-up-light.css" assert { type: "css" };
import sheet from "./pop-up.css" assert { type: "css" };
import { extension } from "./extension.mjs";
import { getContent, plugin } from "./plugin.mjs";
import { docsifyPlugins, markedExtensions } from "../config.mjs";

const $container = document.createElement("div");
$container.classList.add("pop-up-container");
$container.onwheel = (e) => e.stopPropagation();

// see https://javascript.info/event-delegation#tooltip-behavior
document.onmouseover = function (event) {
  const elem = event.target;

  if (!elem.classList.contains("pop-up")) return;

  const {
    left: elemLeft,
    top: elemTop,
    height: elemHeight,
  } = elem.getBoundingClientRect();
  const description = getContent(elem);
  $container.innerHTML = description;
  // 需要先显示才能计算出 Client Rect
  document.body.append($container);
  const { height: containerHeight } = $container.getBoundingClientRect();
  $container.style.left = `${elemLeft}px`;
  // 显示在上面
  let top = elemTop - containerHeight;
  if (top < 0) {
    // 显示在下面
    top = elemTop + elemHeight;
  }
  $container.style.top = `${top}px`;
};

document.onmouseout = function (e) {
  // 如果进入的不是 container, 则隐藏
  if (!$container.contains(e.relatedTarget)) {
    $container.remove();
  }
};

markedExtensions.push(extension);
docsifyPlugins.push(plugin);

const cssStyle = [...document.adoptedStyleSheets, sheet];
if (window?.matchMedia("(prefers-color-scheme: light)").matches)
  cssStyle.push(sheetLight);
document.adoptedStyleSheets = cssStyle;
