const vision = require("@google-cloud/vision");
const path = require("path");
const fs = require("fs");

module.exports = {
  imgGetText: async function imgGetText(imageFile) {
    // Depends on GCloud, so await client.textDetection(...)
    // Creates a client
    const client = new vision.ImageAnnotatorClient();

    let ext = path.extname(imageFile);
    let fileName = path.basename(imageFile, ext);

    // Performs text detection on the local file
    const [result] = await client.textDetection(imageFile);
    const detections = result.textAnnotations
      .map(result => result.description)
      .join("\n");

    return detections;
  }
};
