<template>
    <div ref="alert" class="mt-1 w-full relative overflow-hidden text-center rounded-none p-2 text-white  dark:text-gray-300 bg-green-500 dark:bg-gray-900 ring-1 ring-gray-200 dark:ring-gray-800">
      <div class="flex items-center">
        <div class="w-0 flex-1">
          <p class="text-sm font-medium">
            登录后，文本最大长度为 3000 字符
          </p>
        </div>
        <div class="flex items-center gap-2 flex-shrink-0 mt-0">
          <button type="button" 
          @click="handleClose"
          class="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-md text-sm gap-x-1.5 text-white-500 hover:text-white-600 disabled:text-white-500 dark:text-white-400 dark:hover:text-white-500 dark:disabled:text-white-400 underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white-500 dark:focus-visible:ring-white-400 inline-flex items-center" aria-label="Close"><span class="i-heroicons-x-mark-20-solid flex-shrink-0 h-5 w-5" aria-hidden="true"></span>
          </button>
        </div>
      </div>
    </div>
  <div class="w-10/12 mt-3 mx-auto mb-5">
    <UCard>
      <template #header>
        <div class="flex justify-start items-center">
          <div>
            <VoicePro v-model="state.voice" class="mr-4"/>
          </div>
          <div class="flex justify-start rounded-lg bg-slate-100 dark:bg-gray-800 p-1 mr-2" v-show="show">
            <StylePro :voice="state.voice" v-model="state.style" class="mr-4"/>
            <RolePro :voice="state.voice" v-model="state.role" class=""/>
          </div>
          <div class="flex justify-start rounded-lg bg-slate-100 dark:bg-gray-800 p-1 mr-2" v-if="show">
              <SpeedPro v-model="state.rate" />
              <PitchPro v-model="state.pitch" class="mx-4 mr-4"/>
              <VolumePro v-model="state.volume"/>
          </div>
          <div class="flex justify-start rounded-lg bg-slate-100 dark:bg-gray-800 p-1 mr-4" v-if="show">
            <!-- 元素可以插入到文本中的任意位置 -->
              <BreakPro class="mx-1" v-model="state.content"/>
              <!-- 适用于输入文本的开头或结尾，或者两个相邻句子的分界处 -->
              <SilencePro class="mx-1" v-model="state.silence"/>
              <UTooltip text="调节段落（换行）的停顿时间。默认300ms,听感最自然">
                <UIcon name="i-heroicons-question-mark-circle-20-solid" class="text-gray-500"/>
              </UTooltip>
          </div>
        </div>
      </template>
      <UTextarea
        variant="none"
        id="textarea"
        ref="textareaRef"
        @focus="handleFocus"
        :placeholder="placeholder"
        class="text-gray-800 textarea-h"
        v-model="state.content"
      />
      <template #footer v-if="show">
        <div class="flex justify-between items-center">
          <div class="text-sm text-gray-600">
            <span><span :class="{'text-red-600':textLenght<=0}">{{textLenght}}</span>/{{ contentLength }}</span>
            <span class="mx-4 cursor-pointer" @click="handleClear">清空文本</span>
          </div>
          <div class="flex justify-start items-center">
            <div class="mr-4">
              <audio :src="audiosource" controls style="width: 300px;height: 30px;;" />
            </div>
            <!-- heroicons:musical-note -->
            <!-- i-heroicons-speaker-wave -->
            <!-- heroicons:microphone-16-solid -->
            <UButton 
            :disabled="disabled"
            :loading="loading=='try'"
            icon="i-heroicons-microphone-16-solid"
            @click="handleStartTTS($event,true)">试听</UButton>
            <UButton 
            icon="i-heroicons-play-circle-16-solid"
            @click="handleStartTTS($event,false)"
            :disabled="disabled"
            :loading="loading=='start'"
            class="mx-4 mr-4"
            >开始转换</UButton>
            <UButton 
            :disabled="disabled"
            icon="i-heroicons-arrow-down-tray-16-solid"
            @click="handleDownload">下载</UButton>
          </div>
        </div>
        
      </template>
    </UCard>
  </div>
</template>
<script setup lang="ts">
import { useSpeech } from '@/composables/speech'
const {contentLength,download,generate2speech} = useSpeech()
const show = ref(false)
const audiosource = ref('')
const state = reactive({
  voice: "",
  style: '',
  role: '',
  rate: 0,
  volume: 'medium',
  pitch: 0,
  silence: 300,
  content: '',
  quality: 3,
})


watch(()=>state.voice,()=>{
  show.value = true
})

// 计算文本长度 
const textLenght = computed(()=>{
  const result = state.content.replace(/<break[^>]*>/g, '');
  return contentLength - result.length
})
// 清空文本
const handleClear = ()=>{
  state.content=''
}
// 焦点置于 textarea 中
const textareaRef = ref()
const toast = useToast()
const loading = ref('')
const disabled = ref(false)
const handleStartTTS= async (event:Event,demo:boolean)=>{
 loading.value = demo ? 'try':'start'
 disabled.value= true
 const {code,url} = await generate2speech(state,demo)
 console.log(code,url)
 audiosource.value = url
 if(code==200){
  toast.add({title:'转换成功',color:'green'})
 }
 if(code==500){
  toast.add({title:'转换失败，请稍后再试',color:'red'})
 }
 disabled.value= false
 loading.value = ''

}

const handleDownload=()=>{
  download(3,audiosource.value)
  toast.add({title:'转换成功',color:'green'})
}
const handleFocus =()=>{
  show.value = true
}

const alert = ref()
const handleClose=()=>{
  const elementToRemove = alert.value;
  if (elementToRemove) {
    elementToRemove.parentNode.removeChild(elementToRemove);
  }
}


useSeoMeta({
  title:'免费文本转语音-ttsbox'
})
const placeholder=
`请输入您的文本

专业版即将上线，敬请期待 ！！！

温馨提示：
1)内置45+声音,包括抖音、B站、等各大自媒体常用的音色;
2)标签进行了基本的声音分类，可以通过选择标签快速选取自己想要的声音;
3)规范使用，。?等标点符号;
4)多音字,发音不准确的,单个字母，都可以用同音字代替，后续会上线多音字功能;
5)规范使用文字，无法识别的字符/表情符会导致转换失败;
6)规范使用段落，按下回车键产生新的段落;
7)服务器压力大的时候可能会导致输出缓慢可以过一会再试;
`

</script>

<style>
.textarea-h textarea{
  height: calc(100vh - 280px);
}

</style>
