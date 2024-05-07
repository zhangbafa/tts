import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import { PassThrough } from 'stream'
export default defineEventHandler(async (event) => {
    // const body = await readBody(event)
    const body={
        ssml:'<speak xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="http://www.w3.org/2001/mstts" xmlns:emo="http://www.w3.org/2009/10/emotionml" version="1.0" xml:lang="zh-CN"><voice name="wuu-CN-XiaotongNeural"><mstts:express-as><prosody rate="0.00%" volume="default" pitch="0.00%">登录可获得更多的免费字符数</prosody></mstts:express-as></voice></speak>'
        
    }
    const key = process.env.SPEECH_KEY as string
    const region = process.env.SPEECH_REGION as string
    const speechConfig = sdk
    // const result = await textToSpeech(key,region,body.ssml,'','')
    return JSON.stringify(sdk)
})


const textToSpeech = async (key:string, region:string, ssml:string, filename:string,ttsAudioFormat:any)=> {
    
    return new Promise((resolve, reject) => {
        const speechConfig = sdk.SpeechConfig.fromSubscription(key, region);
        speechConfig.speechSynthesisOutputFormat = 3

        let audioConfig = null;
        if (filename) {
          audioConfig = sdk.AudioConfig.fromAudioFileOutput(filePath);
        }
        const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);
        synthesizer.speakSsmlAsync(
            ssml,
            result => {
                console.log(result.reason)
                console.log(ssml)
                if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
                    console.log("SynthesizingAudioCompleted result");
                    const { audioData } = result;
                    
                    const bufferStream = new PassThrough();
                    bufferStream.end(Buffer.from(audioData));
                    resolve({code:200,url:Buffer.from(audioData),message:'success'});

                  } else {
                    console.error("Speech synthesis canceled, " + result.errorDetails +
                        "\nDid you set the speech resource key and region values?");
                    resolve({code:200,url:filename,message:result.errorDetails});
                  } 
                  synthesizer.close();
            },
            error => {
                synthesizer.close();
                reject({code:500,url:'',message:'error'});
            }); 
    });
}