<template>
    <div v-if="show">
        <USelectMenu
              v-model="style"
              :options="VoiceStyleList"
              placeholder="说话风格"
              value-attribute="value"
              option-attribute="label"
              style="width: 105px"
              @change="handleChange"
            />
    </div>
</template>

<script setup>
import { voices,styleList } from '@/utils/data'
const props = defineProps({
  voice: String
})

const show = ref(false)
const style = ref('')
const VoiceStyleList = ref([])
watch(()=>props.voice,()=>{
    const [zhubo] = voices.filter(item=>item.ShortName==props.voice)
    
    if(zhubo.StyleList){
        show.value = true
        // const temp = [...new Set([...zhubo.StyleList,'default'])]
        const temp = zhubo.StyleList
        const filteredStyles = styleList.filter(style => temp.includes(style.value));
        VoiceStyleList.value = [...filteredStyles,{label:'默认',value:'default'}]
    }else{
        show.value = false
        VoiceStyleList.value = []
    }

})
const model = defineModel()
const handleChange=(val)=>{
    model.value=val
}
</script>