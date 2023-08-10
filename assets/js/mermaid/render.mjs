// pre 里面才不会被转义
export function render(code) {
  return `<pre class="mermaid">${code}</pre>`;
}
