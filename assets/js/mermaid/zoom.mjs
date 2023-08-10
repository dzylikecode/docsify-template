import Panzoom from "./panzoom.mjs";
import { Menu } from "./menu.mjs";
import { BtnSummary } from "./summary.mjs";

export function zoom(elem, svg) {
  const summary = BtnSummary(elem);
  elem.appendChild(summary);

  // const panzoom = Panzoom(svg, { noBind: true, cursor: "arrow" });
  // const menu = Menu(panzoom);
  // elem.appendChild(menu);
}
