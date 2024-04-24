<template>
    <div v-if="show">
        <USelectMenu
              v-model="model"
              :options="VoiceStyleList"
              placeholder="角色扮演"
              value-attribute="value"
              option-attribute="label"
              style="width: 105px"
              @change="handleChange"
            />
    </div>
</template>

<script setup>
import { voices,roleList } from '@/utils/data'
const props = defineProps({
  voice: String
})

const show = ref(false)
const style = ref('')
const VoiceStyleList = ref([])
watch(()=>props.voice,()=>{
    const [zhubo] = voices.filter(item=>item.ShortName==props.voice)
    
    if(zhubo?.RolePlayList){
        show.value = true
        // const temp = [...new Set([...zhubo.StyleList,'default'])]
        const temp = zhubo.RolePlayList
        const filterRoles = roleList.filter(style => temp.includes(style.value));
        VoiceStyleList.value = [...filterRoles,{label:'默认',value:'Default'}]
        // console.log(VoiceStyleList.value)
    }else{
        show.value = false
        VoiceStyleList.value = []
    }

})

const model = defineModel()
const handleChange=(val)=>{
    model.value = val
}
</script>