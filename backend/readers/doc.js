let fs = require("fs");
let mammoth = require("mammoth");
let path = require("path");

module.exports = {
  docGetText: function docGetText(docxFile) {
    let ext = path.extname(docxFile);
    let fileName = path.basename(docxFile, ext);

    mammoth.extractRawText({ path: docxFile }).then(function(result) {
      var text = result.value; // The raw text
      fs.writeFile(fileName + ".txt", text, function(err) {
        if (err) throw err;
        console.log("File written with " + text);
      });
    });
  }
};
