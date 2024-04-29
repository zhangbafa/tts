<template>
  <div class="w-10/12 mt-3 mx-auto mb-5">
    <UCard>
      <template #header>
        <div class="flex justify-start items-center">
          <div>
            <VoicePro v-model="state.voice" class="mr-4"/>
          </div>
          <div class="flex justify-start rounded-lg bg-slate-100 dark:bg-gray-800 p-1 mr-2" v-show="show">
            <StylePro :voice="state.voice.shortName" v-model="state.style" class="mr-4"/>
            <RolePro :voice="state.voice.shortName" v-model="state.role" class=""/>
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
              <UTooltip text="在文本前后或两个相邻句子之间插入暂停">
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
        class="text-gray-800 textarea-h caret-green-600 dark:caret-white"
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
  voice: { shortName: "", localName: "" },
  style: '',
  role: '',
  rate: 0,
  volume: 'medium',
  pitch: 0,
  silence: [],
  content: '',
  quality: 3,
})

watch(()=>state.silence,()=>{
 console.log(state.silence)
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
`请输入您的文本 「 登录后，文本长度提升为 3000 字符 」


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
