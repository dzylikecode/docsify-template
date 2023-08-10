/**
 * https://github.com/bumbu/svg-pan-zoom
 * https://github.com/anvaka/panzoom
 * https://github.com/timmywil/panzoom
 */
const langId = "mermaid";
import mermaid from "./mermaid.mjs";
import { markedRender, docsifyPlugins } from "../config.mjs";
import { render } from "./render.mjs";
import { plugin } from "./plugin.mjs";
import style from "./style.css" assert { type: "css" };

mermaid.initialize({
  startOnLoad: false,
  securityLevel: "loose",
  theme: getTheme(),
});
markedRender.code[langId] = render;
docsifyPlugins.push(plugin);

function getTheme() {
  if (window?.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  } else {
    return "default";
  }
}

document.adoptedStyleSheets = [...document.adoptedStyleSheets, style];
