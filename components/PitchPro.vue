<template>
  <UPopover>
    <!-- trailing-icon="i-heroicons-chevron-down-20-solid" -->
    <UButton color="white" :label="`音高(${pitch==0?'默认值':pitch})`" trailing-icon="i-heroicons-chevron-down-20-solid" style="min-width: 100px;"/>
    <template #panel>
      <div class="p-4 w-72 text-center">
          <div class="flex justify-start items-center mt-4">
              <UButton label="-" @click="handledecr" size="2xs"></UButton>
              <URange v-model="pitch" :min="-50" :max="50" :step="1" class="mx-4 mr-4" @change="handleChange"/>
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
const pitch = ref(0)
const value = defineModel()
const handleincr=()=>{
pitch.value++
}
const handledecr=()=>{
pitch.value--
}
const handleResetDefault=()=>{
  pitch.value = 0
  value.value = '0%'
}
const handleChange=(val)=>{
value.value = `${val}%`
}
</script>
