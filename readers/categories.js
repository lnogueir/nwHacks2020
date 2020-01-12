let lda = require("lda");

// Identify categories using LDA (ML) algo
module.exports = {
  getCategories: async function getCategories(text) {
    let documents = text.split("\n");
    var res = await lda(documents, 5, 5);
    return res;
  }
};
