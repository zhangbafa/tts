<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";
import Faq from './components/Faq.vue'
import { useDebounce } from '@vueuse/core';

import {
  pitch,
  silence,
  language,
  fileterVoices,
  quality,
  filteredRoles,
  filteredStyles,
  rate,
  volume,
  pause
} from "@/utils/data";
import { ResultReason } from "microsoft-cognitiveservices-speech-sdk";
const route = useRoute();



const schema = z.object({
  lang: z.string().email("Invalid email"),
  voice: z.string().min(8, "Must be at least 8 characters"),
  quality: z.string(),
  role: z.string(),
  style: z.string(),
});

type Schema = z.output<typeof schema>;
type User = z.infer<typeof schema>;

const state = reactive({
  lang: language[2].ShortName,
  voice: "zh-CN-XiaoxiaoNeural",
  quality: "Audio16Khz32KBitRateMonoMp3",
  role: undefined,
  style: undefined,
  rate: "1",
  volume: 1,
  pitch: 0,
  silence: 1000,
  content: '五星出东方,利中国',
});

const setStyleAndRole = (data: any) => {
  const style = data[0].StyleList ?? [];
  const role = data[0].RolePlayList ?? [];
  styles.value = filteredStyles(style);
  roles.value = filteredRoles(role);
};
// 初始化 语言 语音 模仿 感情
const voices: any = ref([]);
voices.value = fileterVoices(language[2].ShortName);
const roles: any = ref([]);
const styles = ref([]);
setStyleAndRole(voices.value);

// 切换语言
const handlerchange = (lang: string) => {
  voices.value = fileterVoices(lang);
  roles.value = [];
  styles.value = [];
  state.style = undefined;
  state.role = undefined;
  state.voice = voices.value[0].ShortName;
};

// 切换语音
watch(
  () => state.voice,
  (newValue, oldValue) => {
    const voice = voices.value.filter(
      (item: any) => item.ShortName == newValue
    );
    state.style = undefined;
    state.role = undefined;
    setStyleAndRole(voice);
  }
);

const content = ref();
const textareaRef = ref();
const handleInsertPause = async (time: string) => {
  let el = textareaRef.value.textarea;
  let cursurPosition = -1;
  if (el.selectionStart >= 0) {
    cursurPosition = el.selectionStart;
  } else {
    let range = document.createRange();
    cursurPosition = range.text.length;
  }
  const breakstr = `<break time="${time}"/>`;
  state.content =
    state.content.slice(0, cursurPosition) +
    breakstr +
    state.content.slice(cursurPosition);
};
const audioSrc = ref()
const trialLoading = ref(false)
const genLoading = ref(false)
const handleGenerate = async (trial:string)=>{
  const toast = useToast()
  const result = state.content.replace(/<break[^>]*>/g, '');
  if(result.length>3000){
    toast.add({title:'字数超限',description:'最多3000字符',color:'red'})
    return false

  }
  trial=='trial' ? trialLoading.value = true:genLoading.value = true
  const style = state.style ? `style="${state.style}"` : "";
  const role = state.role ? `role="${state.role}"` : "";
  const silence = state.silence ? `value="${state.silence}"` : "";
  const rate = state.rate ? `rate="${state.rate}"` : "";
  const pitch = state.pitch ? `pitch="${(state.pitch*100)+'%'}"` : "";
  const volume = state.volume ? `volume="${(state.volume*100)+'%'}"` : "";
  const content = trial=='trial' ? state.content.slice(0,10):state.content
  const ssml = `
  <speak xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="http://www.w3.org/2001/mstts" xmlns:emo="http://www.w3.org/2009/10/emotionml" version="1.0" xml:lang="en-US">
    <voice name="${state.voice}">
      <mstts:silence type="Sentenceboundary" ${silence}/>
      <mstts:express-as ${style} ${role}>
        <prosody ${rate} ${pitch} ${volume}>
          ${content}
        </prosody>
      </mstts:express-as>
    </voice>
  </speak>
`;

  const resultSchema = z.object({
    code: z.number(),
    url: z.string(),
    message: z.string(),
  });

  type result = z.infer<typeof resultSchema>;

  const data:result = await $fetch('/api/tts', {
    method: 'post',
    // responseType:'arrayBuffer',
    body: {ssml:ssml,ttsAudioFormat:state.quality}
  })
  // console.log(data)
  const buffer = new Uint8Array(data.url.data);
  const blob = new Blob([buffer]);
  const url = window.URL.createObjectURL(blob);


  


  audioSrc.value = url
  trial=='trial' ? trialLoading.value = false:genLoading.value = false
  if(data.code===200){
    toast.add({ title: '转换成功' })
    // audioSrc.value = data.url
  }else{
    toast.add({ title: '转换成功' })
  }
}
const handlerDownload = ()=>{
  // const anchor = document.createElement('a');
  // const filename = 'files/'+audioSrc.value
  // anchor.href = filename
  // anchor.download = filename || 'download';
  
  // // 触发锚点的点击事件以开始下载
  // document.body.appendChild(anchor);
  // anchor.click();
  // // 下载后移除元素
  // document.body.removeChild(anchor);

  let file_ext = 'mp3'
  if(state.quality==='Raw16Khz16BitMonoPcm') file_ext = 'wav'
  var link = document.createElement('a');
  link.href =audioSrc.value
  // quality: "Audio16Khz32KBitRateMonoMp3",
  link.download = `${new Date().getTime()}.${file_ext}`
  document.body.append(link);
  link.click();
  link.remove();
}



const textLenght = computed(()=>{
  const result = state.content.replace(/<break[^>]*>/g, '');
  return 3000 - result.length
})

</script>

<template>
  <div class="h-16 text-2xl bg-white flex justify-start  items-center border-b">
    <div class="mx-auto w-full md:w-10/12 text-left " style="text-transform: uppercase;">
      text-to-speech
    </div>
  </div>
  <div class="flex flex-col lg:flex-row md:p-4 md:w-5/6 mx-auto">
    <div class="w-full md:w-8/12">
      <div class="m-2 md:m-0">
        <UTextarea
        color="gray"
        variant="outline"
        id="textarea"
        ref="textareaRef"
        :rows="28"
        placeholder="你可将此文本替换为所需的任何文本。你可在此文本框中编写或在此处粘贴你自己的文本。试用不同的语言和声音。改变语速和音调。"
        v-model="state.content"
      />
      <div class="text-sm mt-3 text-gray-400 font-medium">
        本次最多可输入 3000， 剩余 {{ textLenght }} 可输入。 <span class="cursor-pointer text-black" @click="state.content=''">清空文本</span>
      </div>
      </div>
    </div>
    <div class="w-full px-4 pt-4 md:pt-0 md:w-4/12">
      <UForm
        :state="state"
        class="space-y-4"
      >
        <div class="flex items-center text-gray-600">
          <div class="basis-2/12">语言：</div>
          <div class="basis-10/12">
            <USelectMenu
              v-model="state.lang"
              :options="language"
              placeholder="请选择语言"
              value-attribute="ShortName"
              option-attribute="LocalName"
              @change="handlerchange"
            />
          </div>
        </div>
        <div class="flex items-center text-gray-600">
          <div class="basis-2/12">语音：</div>
          <div class="basis-10/12">
            <USelectMenu
              v-model="state.voice"
              :options="voices"
              placeholder="请选择语音"
              value-attribute="ShortName"
              option-attribute="LocalName"
            />
          </div>
        </div>
        <div class="flex items-center text-gray-600">
          <div class="basis-2/12">质量：</div>
          <div class="basis-10/12">
            <USelectMenu
              v-model="state.quality"
              :options="quality"
              placeholder="请选择语言"
              value-attribute="value"
              option-attribute="option"
            />
          </div>
        </div>
        <div class="flex items-center text-gray-600">
          <div class="basis-2/12">模仿：</div>
          <div class="basis-10/12">
            <USelectMenu
              v-model="state.role"
              :options="roles"
              placeholder="请选择语言"
              value-attribute="role"
              option-attribute="description"
            />
          </div>
        </div>
        <div class="flex items-center text-gray-600">
          <div class="basis-2/12">感情：</div>
          <div class="basis-10/12">
            <USelectMenu
              v-model="state.style"
              :options="styles"
              placeholder="请选择语言"
              value-attribute="style"
              option-attribute="description"
            />
          </div>
        </div>
        <div class="flex items-center text-gray-600">
          <div class="basis-2/12">音量：</div>
          <div class="basis-10/12">
            <USelectMenu
              v-model="state.volume"
              :options="volume"
              placeholder="请选择音量"
              value-attribute="value"
              option-attribute="option"
            />
          </div>
        </div>
        <div class="flex items-center text-gray-600">
          <div class="basis-2/12">语速：</div>
          <div class="basis-10/12">
            <USelectMenu
              v-model="state.rate"
              :options="rate"
              placeholder="请选择语速"
              value-attribute="value"
              option-attribute="option"
            />
          </div>
        </div>
        <div class="flex items-center text-gray-600">
          <div class="basis-2/12">音调：</div>
          <div class="basis-10/12">
            <USelectMenu
              v-model="state.pitch"
              :options="pitch"
              placeholder="音高调节（可以做变声效果）"
              value-attribute="value"
              option-attribute="option"
            />
          </div>
        </div>
        <div class="flex items-center text-gray-600">
          <div class="basis-2/12">静音：</div>
          <div class="basis-10/12">
            <USelectMenu
              v-model="state.silence"
              :options="silence"
              placeholder="调节段落的停顿时间"
              value-attribute="value"
              option-attribute="option"
            />
          </div>
        </div>
        <div class="flex items-center text-gray-600">
          <div class="basis-2/12">停顿：</div>
          <div class="basis-10/12">
            <USelectMenu
              :options="pause"
              placeholder="请选择"
              value-attribute="value"
              option-attribute="option"
              @change="handleInsertPause"
            />
          </div>
        </div>
        <div class="bg-gray-100">
          <audio :src="audioSrc" controls style="width: 100%;height:45px" />
        </div>
        <div class="flex justify-between">
          <UButton type="submit" color="black" :loading="trialLoading" @click="handleGenerate('trial')">试听</UButton>
          <UButton type="submit" :loading="genLoading" @click="handleGenerate('start')">开始转换</UButton>
          <UButton type="submit" @click="handlerDownload">下载文件</UButton>
        </div>
      </UForm>
    </div>
  </div>
  
  <!-- Feedback -->
  <Feedback/>
  <!-- Introduction -->
  <Introduction/>
  <!-- Faq -->
  <Faq/>
  <UNotifications />
</template>
