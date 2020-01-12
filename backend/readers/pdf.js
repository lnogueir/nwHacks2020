let fs = require('fs');
let PDFParser = require("pdf2json");
let path = require("path");

function getText(pdfFile) {

    let pdfParser = new PDFParser(this,1);

    let ext = path.extname(pdfFile);
    let fileName = path.basename(pdfFile,ext);

    pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
    pdfParser.on("pdfParser_dataReady", pdfData => {
        fs.writeFile(fileName + '.txt', pdfParser.getRawTextContent(), function (err) {
            if (err) throw err;
            console.log('File written with ' + pdfParser.getRawTextContent());
        });
    });

    pdfParser.loadPDF(pdfFile);
}

export default getText;