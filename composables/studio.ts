import { ref, onMounted, onUnmounted } from 'vue'
import { string, z } from 'zod'
// 按照惯例，组合式函数名以“use”开头
export function useStudio() {
  const toast = useToast();
  const blockList = ref([
    {
      voice: { shortName: "", localName: "" },
      style: "",
      role: "",
      rate: 0,
      pitch: 0,
      volume: "default",
      silence: [],
      content: ["登录可获得更多的免费字符数"],
    },
  ]);
  const totalContentLength = computed(() => {
    const regex = /<break time='(\d+)ms'\/>/; // 匹配<break>标签中的时间值
    return blockList.value.reduce((acc, block) => {
      return acc + block.content.reduce((total, str) => {
        // 使用正则表达式匹配<break>标签，并过滤掉
        const filteredStr = str.replace(/<break[^>]*>/g, '');
        return total + filteredStr.length;
      }, 0);
    }, 0);
  });
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

  /**
   * 
   */
  type resultSpeech = z.infer<typeof speechSchema>;
  // 定义下载处理函数
  const download = (ext:number,url:string,filename:string=''):void => {
    let file_ext = 'mp3';
    if (ext === 14) file_ext = 'wav';
    const link = document.createElement('a');
    link.href = url;
    if(filename){
      link.download = `${filename}.${file_ext}`;
    }else{
      link.download = `${new Date().getTime()}.${file_ext}`;
    }
    document.body.append(link);
    link.click();
    link.remove();
  };
  type result = {
    code?:number,
    url?:boolean
    t?: boolean
  }

  // 格式化语句
  const formatContent = (content: any,content_index:number=-1) => {
    let temp = "";
    if(content_index>=0){
      temp=`${content[content_index]}`;
    }else{
      content.map((item: string) => {
        temp += `${item}`;
      });
    }
    
    return `${temp}`;
  };

  // 格式化 SSML
  const formatSSML = (item:any,content_index:number)=>{
      // 说话风格
      const style = item.style ? ` style="${item.style}"` : "";
      // 角色扮演
      const role = item.role ? ` role="${item.role}"` : "";
      // 段落静音
      // const silence = item.silence
      let silence = ''
      if(item.silence.length>0){
        item.silence.map((item:any)=>{
          silence+=` ${item.name}="${item.value}ms" `
        })
      }
      const rate = ` rate="${item.rate>0?'+':item.rate}.00%"`;
      // 音调(高)
      const pitch = ` pitch="${item.pitch>0?'+':''}${item.pitch}.00%"`;
      // 音量
      const volume = ` volume="${item.volume}"`;
      // 截取试听的文本
      const content = formatContent(item.content,content_index);
      //todo 试听逻辑
      const voice = `<voice name="${item.voice.shortName}"${silence}><mstts:express-as${style}${role}><prosody${rate}${volume}${pitch}>${content}</prosody></mstts:express-as></voice>`;
      return voice
  }

  // 生成 SSML
  const generateSSML = (ssml:any,index:number=-1,content_index:number=-1)=>{
    let tempStr = ''
    let tempArr = []
    if(index>=0){
      tempArr = [ssml[index]]
    }else{
      tempArr=ssml
    }
    // tailingsilence-exact="3600ms"

    tempArr.map((item:any)=>{
      tempStr+=formatSSML(item,content_index)
    })
    const result = `<speak xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="http://www.w3.org/2001/mstts" xmlns:emo="http://www.w3.org/2009/10/emotionml" version="1.0" xml:lang="zh-CN">${tempStr}</speak>`
  console.log(result)
  return result
  }


  // 转换成语音
  async function textToSpeech(state:any,index:number=-1,contnet_index:number=-1){
    const toast = useToast()
    // if(state.voice==''){
    //   toast.add({title:'语音为空',description:'选择一个主播才能试听或转换',color:'red'})
    //   return false
    // }
    // if(state.content.trim().length<=0){
    //   toast.add({title:'内容不能为空',color:'red'})
    //   return false
    // }
    // const textLen = state.content.replace(/<break[^>]*>/g, '');
    // if(textLen.length>contentLength){
    //   toast.add({title:'字数超限',description:`最多${contentLength}字符`,color:'red'})
    //   return false
    // }


    const ssml = generateSSML(state,index,contnet_index)
    // console.log(ssml)
   
    // responseType:'arrayBuffer',
    const data:resultSpeech = await $fetch('/api/tts', {
      method: 'post',
      body: {ssml:ssml,ttsAudioFormat:state.quality||3}
    })
    console.log(data.url.data)
    
    const buffer = new Uint8Array(data.url.data);
    const blob = new Blob([buffer]);
    const url = window.URL.createObjectURL(blob);

    // 记录转换的字数（包含试听）
    // $fetch('/api/posts',{
    //   method:'GET',
    //   query:{num: textLen.length}
    // })

    return {code:data.code,url:url}

  }


  // 同步语句
  const handleSyncChange = (e: Event, index: number, content_index: number) => {
    const text = (e.target as HTMLElement)?.innerText || "";
    blockList.value[index].content[content_index] = text;
  };

  // 添加语句
  const handleAddStatement = (
    e: KeyboardEvent,
    index: number,
    content_index: number
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.code === "Enter") {
      if (blockList.value[index].content.length >= 10) {
        toast.add({
          title: "系统提示",
          description: "目前只允许最多 10 个语句",
          color: "red",
        });
        return false;
      }
      blockList.value[index].content.push("");
      nextTick(() => {
        const element = `#block${index}${
          blockList.value[index].content.length - 1
        }`;
        const sele = document.querySelector(element) as HTMLElement;
        sele?.focus();
      });
    }
  };

  // 上移一个语句
  const handleUpStatement = (
    event: Event,
    index: number,
    content_index: number
  ) => {
    if (content_index == 0) {
      alert("你是第一个，不能上移");
      return false;
    }
    let a = blockList.value[index].content[content_index]; //index=1
    let b = blockList.value[index].content[content_index - 1]; //index=0
    let temp = a;
    blockList.value[index].content[content_index] = b;
    blockList.value[index].content[content_index - 1] = temp;
  };

  // 下移一个语句
  const handleDownStatement = (
    event: Event,
    index: number,
    content_index: number
  ) => {
    if (content_index == blockList.value[index].content.length - 1) {
      alert("你是最后一个，不能下移");
      return false;
    }

    let a = blockList.value[index].content[content_index]; //index=0
    let b = blockList.value[index].content[content_index + 1]; //index=1
    let temp = a;
    blockList.value[index].content[content_index] = b;
    blockList.value[index].content[content_index + 1] = temp;
  };

  // 删除一个语句
  const handleDeleteStatement = (
    event: Event,
    index: number,
    content_index: number
  ) => {
    if (blockList.value[index].content.length > 1) {
      blockList.value[index].content.splice(content_index, 1);
    }
  };

  // 添加一个新 Block
  const handleAddVoiceBlock = () => {
    blockList.value.push({
      voice: { localName: "", shortName: "" },
      style: "",
      role: "",
      rate: 0,
      pitch: 0,
      volume: "medium",
      silence: [],
      content: [""],
    });
    const index = blockList.value.length - 1;
    const content_index = 0;
    nextTick(() => {
      const element = `#block${index}${content_index}`;
      const sele = document.querySelector(element) as HTMLElement;
      sele?.focus();
      var scrollableDiv= document.getElementById('scrollableDiv') as HTMLElement;
      scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
    });
  };
  // 当前位置添加block
  const handlePositionAddBlock = (index: number) => {
    blockList.value.splice(index, 0, {
      voice: { shortName: "", localName: "" },
      style: "",
      role: "",
      rate: 0,
      pitch: 0,
      volume: "medium",
      silence: [],
      content: [""],
    });
  };
  // 向上合并
  const handleUPMerge = (index: number) => {
    const index_content = blockList.value[index].content;
    console.log(index_content);
    blockList.value[index - 1].content =
    blockList.value[index - 1].content.concat(index_content);
    blockList.value.splice(index, 1);
  };

  //删除段落block
  const handleDeleteBlock = (index: number) => {
    console.log(blockList.value.length)
    if (blockList.value.length > 1) {
      blockList.value.splice(index, 1);
    } else {
      console.log("不能删除");
    }
  };

  // 处理粘贴内容-只保留纯文本
  function handlePaste(e: any, index: number, content_index: number) {
    e.preventDefault();
    const clipboardData = e.clipboardData || window.Clipboard;
    const pastedData = clipboardData.getData("text/plain");

    const textNode = document.createTextNode(pastedData);
    const range = document?.getSelection()?.getRangeAt(0);
    range?.deleteContents();
    range?.insertNode(textNode);
    const text = (e.target as HTMLElement)?.innerText || "";
    blockList.value[index].content[content_index] = text;
  }
  

  return {
      contentLength,
      totalContentLength,
      blockList,
      
      handleAddStatement,
      handleDeleteStatement,
      handleUpStatement,
      handleDownStatement,

      handleAddVoiceBlock,
      handlePositionAddBlock,
      handleUPMerge,
      handleDeleteBlock,

      handleSyncChange,

      download, 
      textToSpeech, 

    }
}
