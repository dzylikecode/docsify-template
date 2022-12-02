import { repoFileLink } from "./config.js";

function main(hook, vm) {
  hook.beforeEach(function (html) {
    const fileUrl = repoFileLink + vm.route.file;
    const editHtml = "[:memo: EDIT DOCUMENT](" + fileUrl + ")\n";
    return editHtml + html;
  });
}
