export const extension = {
  name: "code-doc",
  level: "inline",
  start(src) {
    let index = src.match(/[@#]/)?.index;
    return index;
  },
  tokenizer(src, tokens) {
    const popupVarRule = /^@([^\s,\(\)]+)/;
    const popupModRule = /^#([^\s,\(\)]+)/;
    let match;
    if ((match = popupVarRule.exec(src))) {
      return {
        type: "code-doc",
        raw: match[0],
        text: match[1].replace(/\\/g, ""),
        level: "var",
      };
    } else if ((match = popupModRule.exec(src))) {
      return {
        type: "code-doc",
        raw: match[0],
        text: match[1].replace(/\\/g, ""),
        level: "mod",
      };
    }
  },
  renderer(token) {
    if (token.level == "var") {
      return `<span class="pop-up" data-id="${token.text}">${token.text}</span>`;
    } else {
      return `<span class="pop-up" data-path="${token.text}">${token.text}</span>`;
    }
  },
};
