
<template>
    <div v-if="show">
        <div class="w-11/12 md:w-4/6 border-spacing-36 text-center mt-12 mb-12 bottom-1 mx-auto  pb-8">
        <span class="text-gray-800 text-3xl font-bold mt-10">对你有用吗</span>
        <div class="w-90 flex items-center justify-center mx-auto">
        <div class="m-6 hover:scale-125 transition cursor-pointer" dasabled="false" @click="handlerFeedback"><img src="/frowning_face_3d.png" style="width:40px" alt=""></div>
        <div class="m-6 hover:scale-125 transition cursor-pointer" @click="handlerFeedback"><img src="/slightly_smiling_face_3d.png" style="width:40px" alt=""></div>
        <div class="m-6 hover:scale-125 transition cursor-pointer" @click="handlerFeedback"><img src="/hugging_face_3d.png" style="width:40px" alt=""></div>
        </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const toast = useToast()
const show = ref(true)
const handlerFeedback=()=>{
  toast.add({ title: '感谢反馈！' })
  setTimeout(()=>{
    show.value = false
  },2000)
}
</script>