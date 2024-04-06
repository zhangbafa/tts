import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import {nanoid} from 'nanoid'
import path from 'path';
import { fileURLToPath } from 'url';

export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event)
  const body = await readBody(event)
  const fileExt = body.ttsAudioFormat.includes('Mp3') ? 'mp3':'wav'
  var audioFileName = `${nanoid()}.${fileExt}`;
  const key = process.env.SPEECH_KEY as string
  const region = process.env.SPEECH_REGION as string
  const result = await textToSpeech(key,region,body.ssml,audioFileName,body.ttsAudioFormat)
  return result
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

          audioConfig = sdk.AudioConfig.fromAudioFileOutput('./public/'+filename);
        }
        const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);
        synthesizer.speakSsmlAsync(
            ssml,
            result => {
                if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
                    console.log("SynthesizingAudioCompleted result");
                    resolve({code:200,url:filename,message:'success'});
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