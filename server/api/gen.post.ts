import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import {nanoid} from 'nanoid'
import path from 'path';
import fs from 'fs'
import { fileURLToPath } from 'url';
import PassThrough from 'stream'
import { Buffer } from 'buffer';

export default defineEventHandler(async (event) => {
 
  const cookies = parseCookies(event)
  const body = await readBody(event)
  const fileExt = body.ttsAudioFormat.includes('Mp3') ? 'mp3':'wav'
  var audioFileName = `${nanoid()}.${fileExt}`;
  const key = process.env.SPEECH_KEY as string
  const region = process.env.SPEECH_REGION as string
  const result = await textToSpeech(key,region,body.ssml,audioFileName,body.ttsAudioFormat)
  console.log(result)
  return {id:result}
})

function sleep(ms:number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const textToSpeech = async (key:string, region:string, ssml:string, filename:string,ttsAudioFormat:any)=> {
    
    return new Promise((resolve, reject) => {
        const speechConfig = sdk.SpeechConfig.fromSubscription(key, region);
        speechConfig.speechSynthesisOutputFormat = sdk.SpeechSynthesisOutputFormat[ttsAudioFormat]
        

        let audioConfig = null;
        if (filename) {
          // const __filename = fileURLToPath(import.meta.url);
          // const __dirname = path.dirname(__filename);
          // const audioFileNamePath = path.join(__dirname,'public',filename)
          ///Users/zhang1/zhang/text-to-speech/.nuxt/dev/public/vBS3WGGau20rL7gMhMWll.mp3
          const __filename = fileURLToPath(import.meta.url);
          const __dirname = path.dirname(__filename);
          let uploadDir = path.join(__dirname, "../public/tts");
          if (process.env.NODE_ENV === 'development') {
              uploadDir = path.join(__dirname, "../../public/tts");
          }
          if (!fs.existsSync(uploadDir)){
              fs.mkdirSync(uploadDir);
          }
          const filePath = path.join(uploadDir, filename);
          // return filePath;∆

          audioConfig = sdk.AudioConfig.fromAudioFileOutput(filePath);
        }
        const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);
        synthesizer.speakSsmlAsync(
            ssml,
            result => {
                if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
                    console.log("SynthesizingAudioCompleted result");
                    const { audioData } = result;
                    // console.log(audioData)
                    // resolve(audioData)
                    
                    // const bufferStream = new PassThrough();
                    // bufferStream.end(Buffer.from(audioData));
                    // resolve(bufferStream);

                    const blob = new Blob([result.audioData], { type: "audio/mpeg" });
                    const url = window.URL.createObjectURL(blob);
                    console.log('url')
                    console.log(url)

                    // resolve({code:200,url:filename,message:'success',blob:bufferStream});
                  } else {
                    console.error("Speech synthesis canceled, " + result.errorDetails +
                        "\nDid you set the speech resource key and region values?");
                    // resolve(filename);
                    resolve({code:200,url:filename,message:'canceled'});
                  } 
                  synthesizer.close();
            },
            error => {
                synthesizer.close();
                reject({code:500,url:'',message:'error'});
            }); 
    });
}