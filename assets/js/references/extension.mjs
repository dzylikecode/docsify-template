export const extension = {
  name: "wiki-ref-link",
  level: "inline",
  start(src) {
    let index = src.match(/\[/)?.index;
    return index;
  },
  tokenizer(src, tokens) {
    const refRule = /^\[\^((\\.|[^\\\]])+)\]/;
    const noteRule = /^\[-((\\.|[^\\\]])+)\]/;
    let match;
    if ((match = refRule.exec(src))) {
      return {
        type: "wiki-ref-link",
        raw: match[0],
        text: match[1].trim().replace(/\s+/g, "-"),
        linkType: "reference",
      };
    } else if ((match = noteRule.exec(src))) {
      return {
        type: "wiki-ref-link",
        raw: match[0],
        text: match[1].trim().replace(/\s+/g, "-"),
        linkType: "note",
      };
    }
  },
  renderer(token) {
    if (token.linkType == "reference") {
      return `<sup id="cite_ref-${token.text}" class="reference"><a class="Docsify" href="#cite_note-${token.text}">[?]</a></sup>`;
    } else if (token.linkType == "note") {
      return `<span id="cite_note-${token.text}" class="mw-cite-backlink"><a class="Docsify" href="#cite_ref-${token.text}" aria-label="Jump up" title="Jump up">^</a></span>`;
    }
  },
};
