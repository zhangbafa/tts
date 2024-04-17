import { ref, onMounted, onUnmounted } from 'vue'
import { string, z } from 'zod'
// 按照惯例，组合式函数名以“use”开头
export function useSpeech() {

  // 试听文本的长度
  const demoLen = 10
  // 最大文本长度
  // 登录后 3000
  // 未登录 500
  let contentLength = 500
  const user = useSupabaseUser()
  if(user.value){
    contentLength = 3000
  }
  const speechSchema = z.object({
    code: z.number(),
    url: z.object({
      type: z.string(),
      data: z.array(z.number())
    }),
    message: z.string(),
  });
  type resultSpeech = z.infer<typeof speechSchema>;
  // 定义下载处理函数
  const download = (ext:number,url:string):void => {
    let file_ext = 'mp3';
    if (ext === 14) file_ext = 'wav';
    const link = document.createElement('a');
    link.href = url;
    link.download = `${new Date().getTime()}.${file_ext}`;
    document.body.append(link);
    link.click();
    link.remove();
  };
  type result = {
    code?:number,
    url?:boolean
    t?: boolean
  }
  // 转换成语音
  async function generate2speech(state:any,demo:boolean){
    const toast = useToast()
    if(state.voice==''){
      toast.add({title:'语音为空',description:'选择一个主播才能试听或转换',color:'red'})
      return false
    }
    if(state.content.trim().length<=0){
      toast.add({title:'内容不能为空',color:'red'})
      return false
    }
    const textLen = state.content.replace(/<break[^>]*>/g, '');
    if(textLen.length>contentLength){
      toast.add({title:'字数超限',description:`最多${contentLength}字符`,color:'red'})
      return false
    }

    // 说话风格
    const style = state.style ? ` style="${state.style}"` : "";
    // 角色扮演
    const role = state.role ? ` role="${state.role}"` : "";
    // 段落静音
    const silence = state.silence ? ` value="${state.silence}"` : "";
    // 语速
    const rate =  ` rate="${state.rate}%"` 
    // 音调
    const pitch =  ` pitch="${(state.pitch)}%"` 
    // 音量
    const volume = ` volume="${(state.volume)}"`
    // 截取试听的文本
    const content = demo ? state.content.slice(0,demoLen):state.content

    // 构建 ssml
    const ssml = `<speak xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="http://www.w3.org/2001/mstts" xmlns:emo="http://www.w3.org/2009/10/emotionml" version="1.0" xml:lang="en-US">
      <voice name="${state.voice}">
        <mstts:silence type="Tailing-exact"${silence}/>
        <mstts:express-as${style}${role}>
          <prosody${rate}${pitch}${volume}>
            ${content}
          </prosody>
        </mstts:express-as>
      </voice>
    </speak>`;
    console.log(ssml)
    // responseType:'arrayBuffer',
    const data:resultSpeech = await $fetch('/api/tts', {
      method: 'post',
      body: {ssml:ssml,ttsAudioFormat:state.quality}
    })
    
    const buffer = new Uint8Array(data.url.data);
    const blob = new Blob([buffer]);
    const url = window.URL.createObjectURL(blob);

    // 记录转换的字数（包含试听）
    $fetch('/api/posts',{
      method:'GET',
      query:{num: textLen.length}
    })

    return {code:data.code,url:url}

  }

  return { contentLength,download,generate2speech }
}
