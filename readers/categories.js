let lda = require("lda");

// Identify categories using LDA (ML) algo
module.exports = {
  getCategories: function getCategories(text) {
    /*let documents;
        switch (format) {
            case "bullet-points":
                documents = text.split("\n");
                break;
            case "paragraphs":
                documents = text.split("\n\n");
                break;
            case "sentences":
                documents = text.match( /[^\.!\?]+[\.!\?]+/g );
                break;
            default:
            console.error("A format must be specified!");
    }*/

    let documents = text.split("\n");

    // Run LDA to get terms for 2 topics (5 terms each).
    var res = lda(documents, 5, 5);
    return res;
  }
};
