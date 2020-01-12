let fs = require("fs");
let mammoth = require("mammoth");
let path = require("path");

module.exports = {
  docGetText: async function docGetText(docxFile) {
    let ext = path.extname(docxFile);
    const result = await mammoth.extractRawText({ path: docxFile });
    return result.value;
  }
};

/*docGetText('./Internships.docx').then(function(result) {
  console.log("The result: " + result);
});*/
