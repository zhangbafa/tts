<template>
  <UPopover>
    <UButton color="white" :label="'音量：'+volume" trailing-icon="i-heroicons-chevron-down-20-solid" />

    <template #panel>
      <div class="p-4 w-72 text-center">
          <span class="text-gray-800"> {{ volume }}</span>
          <div class="flex justify-start items-center">
              <UButton label="-" @click="handledecr" size="2xs"></UButton>
              <URange v-model="volume" :min="-100" :max="50" :step="1" class="mx-4 mr-4" @change="handleChange"/>
              <UButton label="+" @click="handleincr" size="2xs"></UButton>
          </div>
          <div 
          class="mt-4 hover:bg-slate-100 rounded leading-tight p-2 text-sm cursor-pointer text-gray-700"
          @click="handleResetDefault"
          >恢复默认值</div>

      </div>
    </template>
  </UPopover>
</template>

<script setup>
const volume = ref(0)
const value = defineModel()
const handleincr=()=>{
volume.value++
}
const handledecr=()=>{
volume.value--
}
const handleResetDefault=()=>{
  volume.value = 0
  value.value = '0%'
}

const handleChange=(val)=>{
value.value = `${val}%`
}
</script>
