<script setup>
const llm = [
{
    '本地部署': [
      {
        name: "Ollama",
        url: "https://ollama.com/",
        image: "ollama.png",
      },
      {
        name: "Anythingllm",
        url: "https://useanything.com/",
        image: "useanything.webp",
      },
      {
        name: "Lmstudio",
        url: "https://lmstudio.ai/",
        image: "android-chrome-512x512.png",
      },
      {
        name: "Jan",
        url: "https://jan.ai/",
        image: "Jan.png",
      },
      {
        name: "Gpt4All",
        url: "https://gpt4all.io/",
        image: "nomic_logo.webp",
      }
    ],
  },
  {
    "WebUI":[
      {
        name:'OpenWebUI',
        url:'https://app.nextchat.dev/',
        image:'NextChat.png'
      },
      {
        name:'lobehub',
        url:'https://chat-preview.lobehub.com/',
        image:'LobeHub.webp'
      },
      {
        name:'OpenWebUI',
        url:'https://openwebui.com/',
        image:'OpenWebUI.png'
      }
    ]
  },
  {
    "LLM（全球）": [
      {
        name: "ChatGPT",
        url: "https://chat.openai.com",
        image: "chatgpt.jpg",
      },
      {
        name: "Gemini",
        url: "https://gemini.google.com/",
        image: "gemini.jpg",
      },
      {
        name: "Claude",
        url: "https://claude.ai/",
        image: "claude.jpg",
      },
      {
        name: "Mistral",
        url: "https://chat.mistral.ai/",
        image: "mistral.jpg",
      },
      {
        name: "Llama",
        url: "https://huggingface.co/spaces/huggingface-projects/llama-2-13b-chat",
        image: "llama-hugging-face-space.jpg",
      },
      {
        name: "Grok xAI",
        url: "https://grok.x.ai/",
        image: "grok-ai.jpg",
      },
    ],
  },
  /*
  {
    "LLM（中国）": [
      {
        name: "智谱清言",
        url: "https://chatglm.cn/main/detail?fr=zjh",
        image: "zhi-pu-qing-yan.jpg",
      },
      {
        name: "豆包",
        url: "https://www.doubao.com/",
        image: "dou-bao.jpg",
      },
      {
        name: "星火",
        url: "https://xinghuo.xfyun.cn/",
        image: "xing-huo.jpg",
      },
      {
        name: "Kimi",
        url: "https://kimi.moonshot.cn/",
        image: "kimi.jpg",
      },
      {
        name: "Coze",
        url: "https://www.coze.cn/",
        image: "coze.jpg",
      },
      {
        name: "百川",
        url: "https://www.baichuan-ai.com/",
        image: "bai-chuan.jpg",
      },
      {
        name: "文心一言",
        url: "https://yiyan.baidu.com/",
        image: "wen-xin-yi-yan.jpg",
      },
      {
        name: "通义千问",
        url: "https://tongyi.aliyun.com/",
        image: "tong-yi-qian-wen.jpg",
      },
      {
        name: "混元",
        url: "https://hunyuan.tencent.com/bot",
        image: "hun-yuan.jpg",
      },
      {
        name: "商量",
        url: "https://chat.sensetime.com/",
        image: "shang-liang.jpg",
      },
      {
        name: "跃问",
        url: "https://stepchat.cn/",
        image: "yue-wen.jpg",
      },
      {
        name: "万知",
        url: "https://wanzhi.com/",
        image: "wan-zhi.jpg",
      },
      {
        name: "Dify",
        url: "https://dify.ai/",
        image: "dify.jpg",
      },
    ],
  },
  */
  {
    语音: [
      {
        name: "微软语音",
        url: "https://azure.microsoft.com/zh-cn/products/ai-services/text-to-speech/",
        image: "wei-ruan-yu-yin.jpg",
      },
      {
        name: "OpenAI Voice Engine",
        url: "https://openai.com/blog/navigating-the-challenges-and-opportunities-of-synthetic-voices",
        image: "openai-voice-engine.jpg",
      },
      {
        name: "讯飞智作",
        url: "https://peiyin.xunfei.cn/",
        image: "xun-fei-zhi-zuo.jpg",
      },
      {
        name: "剪映 AI 克隆音色",
        url: "https://mp.weixin.qq.com/s/nHIPaq4evPbvSQS1ctYZrA",
        image: "jian-ying-ai-ke-lun-yin-se.jpg",
      },
      {
        name: "字节火山语音",
        url: "https://www.volcengine.com/product/tts",
        image: "zi-jie-huo-shan-yin.jpg",
      },
      
      {
        name: "大饼 AI 变声",
        url: "https://dubbing.tech/",
        image: "da-bing-ai-bian-sheng.jpg",
      },
    ],
  },
  {
    搜索: [
      {
        name: "Perplexity",
        url: "https://www.perplexity.ai/",
        image: "perplexity.jpg",
      },
      {
        name: "秘塔 AI 搜索",
        url: "https://metaso.cn/",
        image: "mi-ta-ai-sou-suo.jpg",
      },
      {
        name: "Globe Explorer",
        url: "https://explorer.globe.engineer/",
        image: "globe-explorer.jpg",
      },
      {
        name: "天工 AI",
        url: "https://search.tiangong.cn/",
        image: "tian-gong-ai.jpg",
      },
      {
        name: "Devv AI",
        url: "https://devv.ai/",
        image: "devv-ai.jpg",
      },
    ],
  },
  {
    图像: [
      {
        name: "DALL-E (Copilot Designer)",
        url: "https://copilot.microsoft.com/images/create",
        image: "dall-e-copilot-designer.jpg",
      },
      {
        name: "Midjourney",
        url: "https://www.midjourney.com/",
        image: "midjourney.jpg",
      },
      {
        name: "DreamStudio",
        url: "https://dreamstudio.ai/",
        image: "dreamstudio.jpg",
      },
      {
        name: "Clipdrop",
        url: "https://clipdrop.co/",
        image: "clipdrop.jpg",
      },
      {
        name: "Krea.ai",
        url: "https://www.krea.ai/apps/image/realtime",
        image: "krea-ai.jpg",
      },
      {
        name: "Freepic Pikaso",
        url: "https://freepik.com/pikaso",
        image: "freepic-pikaso.jpg",
      },
      {
        name: "ImgPilot",
        url: "https://www.imgpilot.com/",
        image: "imgpilot.jpg",
      },
      {
        name: "Latent Consistency (Fal.ai)",
        url: "https://fal.ai/dynamic",
        image: "latent-consistency-fal-ai.jpg",
      },
      {
        name: "Blockadelabs",
        url: "https://www.blockadelabs.com/",
        image: "blockadelabs.jpg",
      },
      {
        name: "Deep Dream Generator",
        url: "https://deepdreamgenerator.com/",
        image: "deep-dream-generator.jpg",
      },
      {
        name: "Magnific",
        url: "https://magnific.ai/",
        image: "magnific.jpg",
      },
      {
        name: "Civitai",
        url: "https://civitai.com/",
        image: "civitai.jpg",
      },
      {
        name: "OpenArt",
        url: "https://openart.ai/",
        image: "openart.jpg",
      },
      {
        name: "LibLibAI",
        url: "https://www.liblib.ai/",
        image: "liblibai.jpg",
      },
      {
        name: "Vega AI",
        url: "https://www.vegaai.net/",
        image: "vega-ai.jpg",
      },
      {
        name: "Wujie AI",
        url: "https://www.wujieai.com/",
        image: "wu-jie-ai.jpg",
      },
      {
        name: "Dreamina",
        url: "https://www.capcut.cn/ai-tool/platform",
        image: "dreamina.jpg",
      },
      {
        name: "Firefly",
        url: "https://www.adobe.com/products/firefly.html",
        image: "firefly.jpg",
      },
      {
        name: "Gemini",
        url: "https://gemini.google.com/",
        image: "gemini.jpg",
      },
      {
        name: "Diffus",
        url: "https://www.diffus.me/",
        image: "diffus.jpg",
      },
      {
        name: "Code Former",
        url: "https://huggingface.co/spaces/sczhou/CodeFormer",
        image: "code-former.svg",
      },
    ],
  },
  {
    视频: [
      {
        name: "Sora",
        url: "https://openai.com/sora",
        image: "sora.jpg",
      },
      {
        name: "Runway",
        url: "https://app.runwayml.com/",
        image: "runway.jpg",
      },
      {
        name: "Morph Studio",
        url: "https://morphstudio.com/",
        image: "morph.jpg",
      },
      {
        name: "Pika",
        url: "https://pika.art/",
        image: "pika.jpg",
      },
      {
        name: "Pixverse",
        url: "https://pixverse.ai/",
        image: "pixverse.jpg",
      },
      {
        name: "Moonvalley",
        url: "https://moonvalley.ai/",
        image: "moonvalley.jpg",
      },
      {
        name: "Mootion",
        url: "https://mootion.com/",
        image: "mootion.jpg",
      },
      {
        name: "Domo AI",
        url: "https://domoai.app/",
        image: "domo-ai.jpg",
      },
      {
        name: "Stable Video Diffusion (Fal.ai)",
        url: "https://www.fal.ai/models/svd",
        image: "stable-video-diffusion-fal-ai.jpg",
      },
      {
        name: "Stable Video Diffusion (replicate)",
        url: "https://replicate.com/stability-ai/stable-video-diffusion",
        image: "stable-video-diffusion-replicate.jpg",
      },
      {
        name: "AnimateDiff (replicate)",
        url: "https://replicate.com/lucataco/animate-diff",
        image: "animatediff-replicate.jpg",
      },
      {
        name: "Kaiber",
        url: "https://kaiber.ai/",
        image: "kaiber.jpg",
      },
      {
        name: "剪映 Dreamina",
        url: "https://www.capcut.cn/ai-tool/",
        image: "jian-ying-dreamina.jpg",
      },
      {
        name: "度加",
        url: "https://aigc.baidu.com/",
        image: "du-jia.jpg",
      },
      {
        name: "Viggle",
        url: "https://viggle.ai/",
        image: "viggle.ico",
      },
    ],
  },
  {
    音乐: [
      {
        name: "udio",
        url: "https://udio.com/",
        image: "udio.jpg",
      },
      {
        name: "SUNO",
        url: "https://app.suno.ai/",
        image: "suno.jpg",
      },
      {
        name: "Stable Audio",
        url: "https://www.stableaudio.com/",
        image: "stable-audio.jpg",
      },
      {
        name: "Mubert",
        url: "https://mubert.com/",
        image: "mubert.jpg",
      },
      {
        name: "口袋乐队 app",
        url: "https://apps.apple.com/cn/app/%E5%8F%A3%E8%A2%8B%E4%B9%90%E9%98%9F-%E9%9F%B3%E4%B9%90%E5%88%B6%E4%BD%9C-%E5%94%B1%E6%AD%8C%E7%BC%96%E6%9B%B2-%E4%B9%90%E5%99%A8%E4%BC%B4%E5%A5%8F/id1603380354",
        image: "kou-dai-yue-dui-app.jpg",
      },
      {
        name: "和弦派 app",
        url: "https://www.lazycomposer.com/introduce",
        image: "he-xian-pai-app.jpg",
      },
      {
        name: "X Studio",
        url: "https://xstudio.music.163.com/",
        image: "x-studio.jpg",
      },
      {
        name: "ACE Studio",
        url: "https://ace-studio.timedomain.cn/",
        image: "ace-studio.jpg",
      },
      {
        name: "网易天音",
        url: "https://tianyin.163.com/",
        image: "wang-yi-tian-yin.jpg",
      },
      {
        name: "AIVA",
        url: "https://aiva.ai/",
        image: "aiva.jpg",
      },
    ],
  },
 
  {
    数字人: [
      {
        name: "HeyGen",
        url: "https://www.heygen.com/",
        image: "heygen.jpg",
      },
      {
        name: "RaskAI",
        url: "https://www.rask.ai/",
        image: "raskai.jpg",
      },
      {
        name: "D-iD",
        url: "https://studio.d-id.com/",
        image: "d-id.jpg",
      },
      {
        name: "讯飞智作",
        url: "https://peiyin.xunfei.cn/virtual-broadcasting",
        image: "xun-fei-zhi-zuo.jpg",
      },
      {
        name: "商汤如影",
        url: "http://senseavatar.sensetime.com/",
        image: "shang-tang-ru-ying.jpg",
      },
      {
        name: "Synthesia",
        url: "https://www.synthesia.io/",
        image: "synthesia.jpg",
      },
      {
        name: "Kalidoface",
        url: "https://kalidoface.com/",
        image: "kalidoface.jpg",
      },
    ],
  },

  {
    "3D": [
      {
        name: "Tripo3D",
        url: "https://www.tripo3d.ai/",
        image: "tripo3d.jpg",
      },
      {
        name: "Meshy AI",
        url: "https://www.meshy.ai/",
        image: "meshy-ai.jpg",
      },
      {
        name: "Artefacts AI",
        url: "https://artefacts.ai/",
        image: "artefacts-ai.jpg",
      },
      {
        name: "CSM AI",
        url: "https://www.csm.ai/",
        image: "csm-ai.jpg",
      },
      {
        name: "3DFY AI",
        url: "https://3dfy.ai/",
        image: "3dfy-ai.jpg",
      },
      {
        name: "Luma AI",
        url: "https://captures.lumalabs.ai/imagine",
        image: "luma-ai.jpg",
      },
    ],
  },
];

definePageMeta({layout:''})
</script>

<template>
  <div>
    <div class="text-center text-4xl font-bold m-12">AI精选合集</div>
    <div v-for="(obj, index) in llm" :key="index" class="w-11/12 md:w-8/12 mx-auto mb-10">
      <div v-for="(value, key) in obj" :key="key" >
        <h2  class="mt-4 mb-6 font-bold">{{ key }}</h2>
        <div class="grid grid-cols-2 mg:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="(item, i) in value" :key="i" class="text-center">
          <UCard>
            <a :href="item.url" target="_blank" class="block">
              <img :src="'/downloads/' + item.image" :alt="item.name" style="width: 50px;min-height:50px;border-radius: 100%;margin:0 auto"/>
              <p class="mt-6 text-gray-500 dark:text-gray-500">{{ item.name }}</p>
            </a>
          </UCard>
         
        </div>
        </div>
        
      </div>
    </div>
  </div>
</template>