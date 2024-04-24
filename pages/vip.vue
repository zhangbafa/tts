<template>
  <div
    class="w-full"
  >
  <header class="flex items-center justify-between bg-white p-4
        sticky top-0  z-10 h-14 border-b  mb-10 
        ">
            <div class="text-xs text-gray-500">
              剩余字数：
             {{ contentLength - totalContentLength }} 
            </div>
            <audio :src="audio_src" autoplay></audio>
            <div class="justify-start flex gap-4">
            <UButton 
            :disabled="disabled"
            color="black"
            :loading="loading=='try'"
            icon="i-heroicons-book-open-solid"
            @click="handlePreview">预览文本</UButton>
            <UModal v-model="isOpen" 
            :ui="{
                width: 'w-full sm:max-w-fit',
                overlay: {
                    background: 'bg-black/50 dark:bg-gray-800/75',
                },
            }"
            >
                <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                预览文本
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isOpen = false" />
          </div>
        </template>
        <div style="width:60vw;overflow: hidden;padding: 4px">
            <div class="mb-6" v-for="(item,index) in blockList" :key="index">
                <UCard >
                <template #header>
                  <div class="flex justify-between">
                    <div class="flex justify-start items-center">
                      <UBadge color="green" variant="solid">{{ index+1 }}</UBadge> 
                      <div class="mx-4">{{ item.voice.localName }}</div>
                    </div>
                    <div>{{item.voice.localName?'✅️':'❌️'}} </div>
                  </div>
                </template>
                <div v-for="(contentItem,contentIndex) in item.content" class="py-3 px-2 leading-6 text-sm text-gray-700">
                  # {{ contentItem }}
                </div>
            </UCard>
            </div>
        </div>
      </UCard>
            </UModal>
            <UButton 
            icon="i-heroicons-play-circle-16-solid"
            @click="handleTextToSpeech"
            :disabled="disabled"
            :loading="loading=='start'"
            >开始转换</UButton>
            <UButton 
            :disabled="disabled"
            icon="i-heroicons-arrow-down-tray-16-solid"
            @click="handleDownload">下载</UButton>
            </div>
  </header>
    <div
      class="w-11/12 mx-auto"
      v-for="(item, index) in blockList"
      :key="index"
    >
      <div class="">
        <div
          class="flex justify-between items-center merge-add-block h-6 gap-2"
          v-show="index > 0"
        >
          <div class="text-xs text-left mt-3 mb-3 add-block w-6/12 relative">
            <span
              class="absolute block bg-gray-400 text-white cursor-pointer text-xs"
              style="top: -8px"
              @click="handleUPMerge(index)"
              >向上合并
              <UIcon name="i-material-symbols-merge" />
            </span>
            <UDivider size="xs" />
          </div>
          <div class="text-xs text-right mt-3 mb-3 add-block w-6/12 relative">
            <span
              class="absolute block bg-gray-400 text-white cursor-pointer"
              style="top: -8px; right: 0"
              @click="handlePositionAddBlock(index)"
              >此处添加Block</span
            >
            <UDivider size="xs" />
          </div>
        </div>
        <UCard :ui="hoverBlockIndex == index ? ui : {}">
          <!-- v-if="hoverBlockIndex == index" -->
          <template #header >
            <div class="flex justify-start items-center gap-4 relative">
              <VoicePro v-model="item.voice" />
              <StylePro v-model="item.style" :voice="item.voice.shortName" />
              <RolePro v-model="item.role" :voice="item.voice.shortName" />
              <SpeedPro v-model="item.rate" />
              <VolumePro v-model="item.volume" />
              <PitchPro v-model="item.pitch" />
              <BreakPro />
              <SilencePro v-model="item.silence"/>
              <div class="absolute top-0 right-0">
                <UButton
                  color="red"
                  :ui="{ rounded: 'rounded-full' }"
                  @click="handleDeleteBlock(index)"
                  icon="i-heroicons-x-mark-16-solid"
                  size="2xs"
                ></UButton>
              </div>
            </div>
          </template>
          <div class="flex relative">
            <div
              class="flex-none text-sm text-white text-center bg-green-500 rounded-tl-md absolute bottom-[-24px] right-[-24px]"
              v-if="item.voice && hoverBlockIndex !== index"
            >
              <div class="p-1">
                {{ item.voice.localName }}
              </div>
            </div>
            <div class="flex-auto">
              <div
                class="flex border pt-1 border-gray-200 dark:border-gray-800 mb-4 items-start rounded-lg"
                v-for="(content_item, content_index) in item.content"
                :key="content_index"
              >
                <!-- <div
                  contenteditable="true"
                  placeholder="输入文字"
                  class="input-panel editable-real flex-auto dark:caret-slate-100 dark:text-gray-400"
                  @input="handleChange($event, index, content_index)"
                  @focus.stop="handleFocus($event, index, content_index)"
                  @keydown.prevent.enter="handleAddStatement($event, index, content_index)"
                  @paste="handlePaste($event, index, content_index)"
                  style="white-space: pre-wrap"
                  :id="`block${index}${content_index}`"
                >
                  {{ contet_item }}
                </div> whitespace-pre-wrap-->
                <UTextarea 
                  placeholder="输入文字"
                  class="input-panel editable-real flex-auto dark:caret-slate-100 dark:text-gray-400"
                  @focus.stop="handleFocus($event, index, content_index)"
                  @keydown.prevent.enter="handleAddStatement($event, index, content_index)"
                  :padded="false"
                  variant="none"
                  :rows="1"
                  autoresize
                  style="white-space: pre-wrap"
                  v-model="item.content[content_index]"
                  :id="`block${index}${content_index}`"/>
                <div class="flex-none w-10 text-center flex justify-start items-center">
                  <UPopover :popper="{ placement: 'bottom-end' }">
                    <div
                      class="text-center dark:text-gray-500 bg-gray-100 dark:bg-gray-800 p-2 pt-2 pb-1 items-center hover:text-gray-900 hover:bg-gray-200 rounded-md mt-1 mb-1"
                    >
                      <UIcon name="i-heroicons-ellipsis-vertical-16-solid" />
                    </div>
                    <template #panel>
                      <div class="w-40 text-left">
                        <div class="p-1">
                          <div
                            class="flex items-center justify-start text-sm text-gray-700 cursor-pointer mx-1 hover:bg-gray-100 dark:hover:bg-gray-400 p-2 rounded-md"
                            @click="
                              handleUpStatement($event, index, content_index)
                            "
                          >
                            <UIcon name="i-heroicons-arrow-up-16-solid" />
                            <div class="mx-2">上移</div>
                          </div>
                        </div>
                        <UDivider />
                        <div class="p-1">
                          <div
                            class="flex items-center justify-start text-sm text-gray-700 cursor-pointer mx-1 hover:bg-gray-100 dark:hover:bg-gray-400 p-2 rounded-md"
                            @click="
                              handleDownStatement($event, index, content_index)
                            "
                          >
                            <UIcon name="i-heroicons-arrow-down-16-solid" />
                            <div class="mx-2">下移</div>
                          </div>
                        </div>
                        <UDivider />
                        <div class="p-1">
                          <div
                            class="flex items-center justify-start text-sm text-gray-700 cursor-pointer mx-1 hover:bg-gray-100 dark:hover:bg-gray-400 p-2 rounded-md"
                            @click="
                              handleTextToSpeechPart($event, index, content_index)
                            "
                          >
                            <UIcon name="i-heroicons-play-16-solid" />
                            <div class="mx-2">
                              {{ part?'转换中':'试听' }}
                              
                            </div>
                          </div>
                        </div>
                        <UDivider />
                        <div class="p-1 mb-1">
                          <div
                            class="flex items-center justify-start text-sm text-red-500 cursor-pointer mx-1 hover:bg-gray-100 dark:hover:bg-gray-400 p-2 rounded-md"
                            @click="
                              handleDeleteStatement(
                                $event,
                                index,
                                content_index
                              )
                            "
                          >
                            <UIcon name="i-heroicons-trash-20-solid" />
                            <div class="mx-2">删除</div>
                          </div>
                        </div>
                      </div>
                    </template>
                  </UPopover>
                </div>
              </div>
            </div>
          </div>
        </UCard>
      </div>
    </div>
    <div class="mx-auto mt-6 text-center mb-6">
      <UButton
        label="添加段落"
        @click="handleAddVoiceBlock"
        icon="i-heroicons-plus-16-solid"
        size="lg"
      />
      
    </div>
    
  </div>
</template>
<script setup lang="ts">
const {
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

  download, 
  textToSpeech, 
} = useStudio()

definePageMeta({
  layout: "studio",
});


const audio_src=ref('')
const part=ref(false)
const handleTextToSpeechPart=async (event:Event,index:number,content_index:number)=>{
  part.value=true
  const {code,url}=await textToSpeech(blockList.value,index,content_index)
  audio_src.value = url
  part.value=false
}
const handleTextToSpeech = async () => {
  const voice = blockList.value.filter((item) => item.voice.shortName == "");
  if (voice.length) {
    toast.add({ title: "请为段落选择主播" });
    return false;
  }
  const {code,url}=await textToSpeech(blockList.value)
  audio_src.value = url
  return false
};




const hoverBlockIndex = ref(null);
const ui = { ring: "ring-2 ring-green-500 dark:ring-gray-800" };
const handleFocus = (e: Event, index: any, content_index: number) => {
  hoverBlockIndex.value = index;
};

const loading = ref('')
const disabled = ref(false)
const isOpen  = ref(false)
const handleDownload = ()=>{}
const handlePreview = ()=>{
    isOpen.value = true
}
</script>
<style>
.input-panel {
  caret-color: rgb(44, 41, 41);
  /* border: 1px solid #ccc; */
  padding: 5px;
  color: #000;
  overflow: hidden;
  white-space: normal;
  word-break: break-word;
  outline: #000;
  font-size: 14px;
  padding: 10px;
  line-height: 1.5;
}

.editable-real[placeholder]:empty:before {
  background-color: transparent;
  color: #c3c7d2;
  content: attr(placeholder);
  cursor: text;
  overflow: hidden;
  position: absolute;
  text-overflow: ellipsis;
  white-space: nowrap;
  /* width: 100%; */
}
break {
  color: rgb(227, 10, 10);
  user-select: none;
  display: inline-block;
  border-radius: 4px;
  color: #fff;
}
[time="10s"]::before {
  content: attr(time);
  border-radius: 4px;
  background: rgb(47, 255, 0);
  margin: 0 4px;
  padding: 0 4px;
}

.add-block {
  display: none;
}
.merge-add-block:hover .add-block {
  display: block;
}
</style>
