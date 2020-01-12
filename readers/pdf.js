let fs = require("fs");
const pdf = require("pdf-parse");
let path = require("path");

module.exports = {
  pdfGetText: async function pdfGetText(pdfFile) {
    let dataBuffer = fs.readFileSync(pdfFile);
    const result = await pdf(dataBuffer);
    return result.text;
  }
};
