import { mermaidRender } from "./mermaid.mjs";
import Panzoom from "./panzoom.mjs";
import { Menu } from "./menu.mjs";

const summarySvg = `
<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="octicon m-2">
    <path fill-rule="evenodd" d="M3.72 3.72a.75.75 0 011.06 1.06L2.56 7h10.88l-2.22-2.22a.75.75 0 011.06-1.06l3.5 3.5a.75.75 0 010 1.06l-3.5 3.5a.75.75 0 11-1.06-1.06l2.22-2.22H2.56l2.22 2.22a.75.75 0 11-1.06 1.06l-3.5-3.5a.75.75 0 010-1.06l3.5-3.5z"></path>
</svg>
`;

const detialsTemplate = `
<button class="btn mermaid-detials-close">
  <svg
    class="close"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="feather feather-x-circle"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M15 9l-6 6M9 9l6 6" />
  </svg>
</button>
<div class="pre-mermaid mermaid"></div>
`;

const startScale = window.screen.width > 570 ? 1.5 : 1;

const overlay = document.createElement("div");
overlay.classList.add("mermaid-overlay");
document.body.appendChild(overlay);
overlay.addEventListener("click", () => {
  overlay.classList.remove("is-active");
  detials.classList.remove("visible");
});

const detials = document.createElement("div");
detials.classList.add("mermaid-detials");
detials.innerHTML = detialsTemplate;
document.body.appendChild(detials);
const $close = detials.querySelector(".mermaid-detials-close");
$close.addEventListener("click", () => {
  overlay.classList.remove("is-active");
  detials.classList.remove("visible");
});
const $pre = detials.querySelector(".pre-mermaid");

export function BtnSummary(elem) {
  const $summary = document.createElement("button");
  $summary.classList.add("btn", "mermaid-summary");
  $summary.innerHTML = summarySvg.trim();
  let mermaidSvg = null;
  $summary.addEventListener("click", async () => {
    overlay.classList.add("is-active");
    detials.classList.add("visible");
    if (!mermaidSvg)
      mermaidSvg = await mermaidRender(
        "mermaid-svg-details",
        elem.dataset.content
      );
    $pre.innerHTML = mermaidSvg;
    const svg = $pre.querySelector("svg");
    const panzoom = Panzoom(svg, {
      startScale: startScale,
      maxScale: Infinity,
      minScale: 0,
    });
    const menu = Menu(panzoom);
    $pre.appendChild(menu);
    $pre.addEventListener("wheel", panzoom.zoomWithWheel);
  });

  return $summary;
}
