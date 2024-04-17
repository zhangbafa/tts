<template>
    <div>
      <UButton :label="selectName"     
      icon="i-heroicons-users-20-solid"
      color="black" variant="solid" @click="isOpen = true" />
      <UModal v-model="isOpen"  :ui="{width:'w-full sm:max-w-fit',height:'h-5/6 sm:max-h-full'}">
        <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800',body:{padding: 'px-0 py-0 sm:p-0',} }">
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                选择声音 ({{ voiceList.length }})
              </h3>
              <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isOpen = false" />
            </div>
          </template>
  
          <div class="flex justify-start" style="width: 88vw">
              <div class="w-auto max-w-52 h-full  border-r border-slate-100 p-2" >
              <UFormGroup label="语言" name="name" class="mb-3">
              <USelectMenu
                searchable
                clear-search-on-close
                class="w-full lg:w-48"
                :options="language"
                placeholder="请选择语言"
                value-attribute="ShortName"
                option-attribute="LocalName"
                v-model="lang"
                @change="handleChange"
              >
              <template #option-empty="{ query }">
                  没有数据
              </template>
              </USelectMenu>
          </UFormGroup>
                <UFormGroup label="性别" name="name" class="mb-3">
                  <USelectMenu
                  class="w-full lg:w-48"
                  :options="options"
                  placeholder="选择性别"
                  value-attribute="value"
                  option-attribute="label"
                  v-model="gender"
                  @change="handlerChangeSex"
                  />
                </UFormGroup>
  
                <!-- <UDivider label="选择角色" />
                <div class="flex justify-start flex-row flex-wrap mt-2">
                  <div class="border bg-slate-50 m-1 rounded-xl text-xs p-1 px-2 pr-2 cursor-pointer" v-for="item in roles_obj" :key="item.role" @click="handleSelectRole(item)">
                      {{ item.description }}
                  </div>
                </div> -->
  
                <UButton @click="handleFilterMultilingual" block color="white">多语言</UButton>
                <div class="mt-3 text-right">
                  <ULink @click="handleReset" 
                  active-class="text-primary" 
                  inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                      重置
                  </Ulink>
              </div>
              </div>
              <div class="p-4 px-6 bg-gray-100" style="width:100%;height: 75vh;overflow-y: auto;">
                  <div class="grid grid-cols-4 md:grid-cols-4 sm:grid-cols-2 gap-4">
                      <UCard v-for="item in voiceList" :key="item.ShortName" :ui="{shadow:'shadow hover:shadow-2xl'}" class="relative text-center cursor-pointer ucard">
                          <UAvatar
                              src="http://img.ttbaojia.com/emoji/slightly_smiling_face_3d.png"
                              alt="Avatar" 
                              size="3xl"
                          />
                         <div class="m2-6 text-sm font-bold text-gray-700">
                          {{ item.LocalName }} ({{ item.Gender=='Female'?'女':'男' }})
                         </div>
                          <div class="text-left text-xs text-gray-500 pt-4">
                            {{ item.Description }}
                          </div>
                          <UButton color="black" class="text-center absolute bottom-1 left-1 right-1 ubutton" @click="selectVoice(item)">选择TA</UButton>
                      </UCard>
                  </div>
              </div>
          </div>
        </UCard>
      </UModal>
    </div>
  </template>
  
  <script setup>
  import {
    voices,
    language,
    roles_obj,
    filterVoicesByLocaleRoleAndGender
  } from "@/utils/data";
  const isOpen = ref(false)
  const lang = ref('')
  const voiceList = ref(voices)
  const selectName = ref('选择声音')
  const gender =ref('')
  
  const model = defineModel()

  const handleReset = ()=>{
      gender.value = ''
      lang.value = ''
      voiceList.value = voices
  }
  const handleChange = (val)=> {
      voiceList.value = filterVoicesByLocaleRoleAndGender(val,gender.value)
  }
  
  const handlerChangeSex=(val)=>{
      voiceList.value = filterVoicesByLocaleRoleAndGender(lang.value,gender.value)
  }
  
  const handleSelectRole = (val)=>{
   voiceList.value = filterVoicesByLocaleRoleAndGender(lang.value,gender.value,v)
  }
  const selectVoice = (val)=>{
      selectName.value = val.LocalName
      isOpen.value = false
      model.value = val.ShortName
  }
  
  const options = [{
    value: '',
    label: '全部'
  },{
    value: 'Male',
    label: '男'
  }, {
    value: 'Female',
    label: '女'
  }]

  // 推荐多语言 SecondaryLocaleList
  const handleFilterMultilingual = ()=>{
    voiceList.value = voices.filter(item=>item.SecondaryLocaleList)
  }
  </script>
  
  
  <style scoped>
  .ubutton{
      display: none;
  }
  .ucard:hover .ubutton{
      display: block;
  }
  </style>