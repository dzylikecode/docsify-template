import style from "./style.css" assert { type: "css" };
import styleLight from "./style-light.css" assert { type: "css" };
import { extension } from "./extension.mjs";
import { plugin } from "./plugin.mjs";
import { markedExtensions, docsifyPlugins } from "../config.mjs";

markedExtensions.push(extension);
docsifyPlugins.push(plugin);

const cssStyle = [...document.adoptedStyleSheets];

if (window?.matchMedia("(prefers-color-scheme: light)").matches)
  cssStyle.push(styleLight);
else cssStyle.push(style);

document.adoptedStyleSheets = cssStyle;
