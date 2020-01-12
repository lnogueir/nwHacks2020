const speech = require('@google-cloud/speech');
const fs = require('fs');
const path = require('path');

async function getText(audiofile) { // Depends on GCloud, so made async for client.recognize(req)

    const client = new speech.SpeechClient();
    let fileContent = fs.readFileSync(audiofile).toString('base64');

    let ext = path.extname(audiofile);
    let fileName = path.basename(audiofile,ext);
  
    // JSON configuration
    // todo: properly configure variables so this accepts more kinds of files
    // todo: file conversion (?)
    const audio = {
        content: fileContent,
    };
    const config = {
      encoding: 'FLAC',
      languageCode: 'en-US',
      audioChannelCount: 2,
    };
    const request = {
      audio: audio,
      config: config,
    };
  
    // Detects speech in the audio file
    const [response] = await client.recognize(request);
    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n');

    fs.writeFile(fileName + '.txt', transcription, function (err) {
            if (err) throw err;
            console.log('File written with ' + transcription);
    });
}

export default getText;