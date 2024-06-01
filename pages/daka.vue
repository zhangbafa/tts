<template>
    <!-- <div class="text-center text-3xl mt-5">{{ count }}</div> -->
    <div class="md:w-1/2 sm:w-11/12 mx-auto mt-5 flex items-center justify-center">
        <UButton icon="i-heroicons-paper-airplane-solid" label="打卡" color="black" class="rounded-full absolute bottom-4" @click="handlerDaKa"/>
        <div class="flex flex-wrap justify-start">
            <div v-for="item in list.data" 
            class="bg-green-400 w-6 h-6 mx-2 mt-2 rounded-sm text-sm text-clip 
            ">
            </div>
        </div>
    </div>
</template>

<script setup>
import { useLocalStorage,useStorage } from '@vueuse/core';
import confetti from 'canvas-confetti'
import dayjs from 'dayjs';
definePageMeta({
    layout:''
})
const toast = useToast()


const list = ref([])
const fetchData = async () => {
  const data = await $fetch(`/api/daka`)
  list.value = data
}
fetchData()
const handlerDaKa = async ()=>{
    const data = await $fetch('/api/daka', {
      method: 'post',
      body: {}
    })
    fetchData()
    if(!data.error){
        confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
        });
        // toast.add({title: '打卡成功',color:'green'})
    }else{
       toast.add({title: data.error,color:'red'})
    }

}
</script>