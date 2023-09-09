import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs";
const popupVarRule = /([a-zA-Z0-9_]*)@([^\s,\(\)<>]+)/g;

export async function mermaidRender(id, code) {
  const { svg } = await mermaid.render(id, code);
  const transSvg = svg.replace(popupVarRule, (match, p1, p2) => {
    return `<span class="pop-up" data-id="${p2}">${p1 ? p1 : p2}</span>`;
  });
  return transSvg;
}

export default mermaid;
