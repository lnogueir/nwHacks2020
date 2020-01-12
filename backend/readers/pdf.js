let fs = require("fs"),
  PDFParser = require("pdf2json"),
  path = require("path");

async function pdfGetText(pdfFile) {
  //let ext = path.extname(pdfFile);
  //let fileName = path.basename(pdfFile, ext);

  let pdfParser = new PDFParser(this, 1);
  let text = pdfParser.loadPDF(pdfFile);

  pdfParser.on("pdfParser_dataError", errData =>
    console.error(errData.parserError)
  );
  pdfParser.on("pdfParser_dataReady", pdfData => {
      text = pdfParser.getRawTextContent();
      console.log("I waited for this: " + text);
      console.log("I waited for that");
      text.then(function(result) {
        return result;
      })
  });

  //return text;
}

pdfGetText('./econ.pdf').then(function(result) {
  console.log("At the final return " + result);
});