<template>
    <div class="w-10/12 mt-5 mx-auto"
        
         v-for="(item,index) in blockList"
         :key="index"
         >
         <!-- <button @click="handleGetContents">getcount</button> -->
        <div class="border-2 rounded pt-4">
          <div class="flex items-center justify-start">
            <!-- <VoicesPro v-model="count" class="mx-2"/>
            <RatePro /> -->
          </div>
          <div v-for="(content_item,content_index) in item.content"
             :key="content_index"
             contenteditable="true"
             placeholder="输入文字"
             class="mb-4 rounded-sm input-panel editable-real mx-4 mr-4"
             @input="handleChange($event,index,content_index)"
             @focus="handleFocus"
             @keydown.prevent.enter="handleAddBlock($event,index,content_index)"
             style="width: 98%; white-space: pre-wrap;"
             :id="`block${index}${content_index}`"
            >
            {{ content_item }} - {{ content_index + 1 }}
        </div>
        </div>
    </div>
    <div class="mx-auto mt-6 text-center">
            <UButton label="Add Block" color="black" @click="handleAddVoiceBlock" />
        </div>
  </template>
  <script setup lang="ts">

  const isOpen = ref(false)
    const listRef = ref()
    const count = ref(0)
    var temp = {
        voice:'',
        style:'',
        role:'',
        rate:'',
        pitch:'',
        volume:'',
        content:[1,2,3]
    }
    const blockList = ref([{voice:'',
        style:'',
        role:'',
        rate:'',
        pitch:'',
        volume:'',
        content:['']
    }])
    const handleChange=(e:Event,index:number,content_index:number)=>{
      const text = (e.target as HTMLElement)?.innerText || ''
      blockList.value[index].content[content_index] = text
    }
  const handleAddBlock = (e: KeyboardEvent,index:number,content_index:number) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.code === 'Enter') {
    //   const length = listRef.value.children.length
     if(blockList.value[index].content.length>=10){
        alert('不能继续添加了')
        return false
     }
      blockList.value[index].content.push('')
    //   state.refList[index].push(el)
        // blockList.value.push({value:length})
        nextTick(() => {
            const element = `#block${index}${content_index+1}`
            const sele = document.querySelector(element) as HTMLElement
            sele?.focus()
        })
    }
  }
  
  // 添加一个新 Block
  const  handleAddVoiceBlock = ()=>{
    console.log(blockList.value)
    blockList.value.push({
        voice:'',
        style:'',
        role:'',
        rate:'',
        pitch:'',
        volume:'',
        content:['']
    })
  }

  const handleGetContents = ()=>{
    console.log(blockList)
  }
  const handleFocus=()=>{
    // console.log('focus')
  }
  </script>
  
  <style>
  .input-panel {
    caret-color: rgb(44, 41, 41);
    border: 1px solid #ccc;
    padding: 5px;
    color: #000;
    overflow: hidden;
    white-space: noomal;
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
    width: 100%;
  }
  </style>