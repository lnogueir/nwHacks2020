const fs = require("fs");
const path = require("path");

const pdfReader = require("./pdf.js");
const docReader = require("./doc.js");
const imgReader = require("./image.js");
const audioReader = require("./audio.js");

const categories = require('./categories.js');

module.exports = {

reader: async function reader(files) {
  let textStream = '';
  for (const file of files) {
    ext = path.extname(file);
    switch (ext) {
      case ".pdf":
        await pdfReader.pdfGetText(file).then(function(result) {
          //console.log("The result: " + result);
          textStream += result;
        });
        break;
      case ".doc":
      case ".docx":
        await docReader.docGetText(file).then(function(result) {
          //console.log("The result: " + result);
          textStream += result;
        });
        break;
      case ".png":
      case ".img":
      case ".gif":
        await imgReader.imgGetText(file).then(function(result) {
          console.log("The result: " + result);
        });
        break;
      case ".flac":
        await audioReader.audioGetText(file).then(function(result) {
          console.log("The result: " + result);
        });
        break;
      default:
        console.error("File type " + ext + " not supported.");
        break;
    }
  }
  console.log(textStream);
  return textStream;
},

getCategories: async function getCategories(files) {
    text = await reader(files);
    console.log("This is category");
    console.log(text);
    categories.getCategories(text).then(function(result) {
        for (var i in result) {
            var row = result[i];
            console.log('Topic ' + (parseInt(i) + 1));
            
            // For each term.
            for (var j in row) {
                var term = row[j];
                console.log(term.term + ' (' + term.probability + '%)');
            }
            
            console.log('');
        }
    });
    return row;
}
}