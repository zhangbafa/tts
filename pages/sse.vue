<template>
  <div
       class="py-24 sm:py-32 md:py-40 relative">
      <div class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl gap-16 sm:gap-y-24 flex flex-col">
      <div class="text-center">
          <div class="mb-10"><span
                    class="inline-flex items-center text-sm px-2.5 py-1.5 bg-primary-50 dark:bg-primary-400 dark:bg-opacity-10 text-primary-500 dark:text-primary-400 ring-1 ring-inset ring-primary-500 dark:ring-primary-400 ring-opacity-25 dark:ring-opacity-25 relative rounded-full font-semibold"><a
                     rel="noopener noreferrer"
                     target="_blank"
                     class="focus:outline-none"
                     tabindex="-1"><span
                            class="absolute inset-0"
                            aria-hidden="true"></span></a> 今日已累计转换超 1000000 字 <span
                        class="i-heroicons-arrow-top-right-on-square-20-solid ml-1 w-4 h-4 pointer-events-none"></span></span>
          </div>
          <h1 class="text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-7xl">
            各种新功能即将上线 敬请期待
          </h1>
          <p class="mt-6 text-lg tracking-tight text-gray-600 dark:text-gray-300">
            可以对每个段落独立设置语音、说话风格、角色扮演、音效、背景音乐、音高、音量等
          </p>
          <div class="mt-10 flex flex-wrap gap-x-6 gap-y-3 justify-center">
              <NuxtLink
                 class="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-full text-base gap-x-2.5 px-3.5 py-2.5 shadow-sm text-white dark:text-gray-900 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-900 dark:bg-white dark:hover:bg-gray-100 dark:disabled:bg-white focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center"
                 to="/free"><span class="">开始免费使用</span><span
                        class="i-heroicons-arrow-right-20-solid flex-shrink-0 h-6 w-6"></span></NuxtLink></div>
      </div>
      <div 
           class="absolute inset-0 landing-grid z-[-1] [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]">
      </div>
  </div>
</div>
<button @click="sse">click</button>
<div>
  <div v-for="item in list">{{ item }}</div>
</div>
</template>
<script setup>
const list = ref([])
let eventSource = null
const sse=()=>{
  eventSource =  new EventSource('http://localhost:3000/api/sse')
    eventSource.onmessage = (event) => {
      list.value.push(event.data)
      window.scrollTo(0, document.body.scrollHeight);
    }
}

onUnmounted(()=>{
  eventSource.close()
})
</script>