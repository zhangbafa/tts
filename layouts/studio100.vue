<script setup lang="ts">
useHead({
    // bodyAttrs: {
    //     class: "dark:bg-gray-950",
    // },
});
const route = useRoute()

const links = [
  [ {
    label: '首页',
    icon: 'i-heroicons-home',
    to: '/getting-started/installation'
  }, {
    label: '历史数据',
    icon: 'i-heroicons-chart-bar',
    to: `${route.path.startsWith('/dev') ? '/dev' : ''}/components/vertical-navigation`
  }, {
    label: 'Command Palette',
    icon: 'i-heroicons-command-line',
    to: '/components/command-palette'
  }], [{
    label: 'Examples',
    icon: 'i-heroicons-light-bulb'
  }, {
    label: 'Help',
    icon: 'i-heroicons-question-mark-circle'
  }]
]
// 监听滚动事件


onMounted(()=>{
    var scrollableDiv = document.getElementById('scrollableDiv');
    scrollableDiv?.addEventListener('scroll', function() {
    // 判断是否已经滚动到页面底部
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        // 如果已经滚动到底部，则执行滚动到底部的操作
        scrollToBottom();
    }
});
})

// 滚动到页面底部的函数
function scrollToBottom() {
    // 使用滚动函数将页面滚动到底部
    window.scrollTo({
        top: document.body.offsetHeight,
        behavior: 'smooth' // 可以使滚动平滑进行，也可以替换为 'auto' 以立即滚动
    });
}

</script>

<template>
    <div class="fixed inset-0 flex overflow-hidden">
        <div
            style="width:200px;background-color: #f9f9f9;"
             class="flex-col items-stretch relative w-full border-b p-2 lg:border-b-0 lg:border-r border-gray-00 dark:border-gray-800 lg:w-[--width] flex-shrink-0 hidden lg:flex">
             <div
                class="p-2 text-center flex justify-start items-center text-xls text-gray-700 mb-6"
            >
                <img src="/logo.png" style="width: 15%; margin-right: 8px" />
                TTSbox
            </div>
             <UVerticalNavigation :links="links" :ui="{padding: 'px-2.5 py-3',}"/>
             <div class="absolute bottom-0 left-0 right-0">
                <div class="p-6 text-sm">
                    尝试 Pro<br />
                    <p class="text-xs">
                        升级以获得图片上传、更智能的AI等更多 Pro Search 功能。
                    </p>
                    <div
                        class="mt-4 bg-stone-200/50 flex items-center justify-start w-8/12 p-2 text-sm"
                    >
                        <UIcon
                            name="i-heroicons-arrow-up-right-20-solid"
                            class="text-xl"
                        />
                        了解更多
                    </div>
                </div>
            </div>

        </div>
        <div class="flex flex-1 w-full min-w-0 bg-white">
            <div class="overflow-y-auto min-h-screen w-full">
                <slot />
            </div>
        </div>
    </div>
</template>

<style scoped>
.gradient {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: radial-gradient(50% 50% at 50% 50%,
            rgb(var(--color-primary-500) / 0.25) 0,
            #fff 100%);
}

.dark {
    .gradient {
        background: radial-gradient(50% 50% at 50% 50%,
                rgb(var(--color-primary-400) / 0.1) 0,
                rgb(var(--color-gray-950)) 100%);
    }
}

.overlay {
    background-size: 100px 100px;
    background-image: linear-gradient(to right,
            rgb(var(--color-gray-200)) 0.5px,
            transparent 0.5px),
        linear-gradient(to bottom,
            rgb(var(--color-gray-200)) 0.5px,
            transparent 0.5px);
}

.dark {
    .overlay {
        background-image: linear-gradient(to right,
                rgb(var(--color-gray-900)) 0.5px,
                transparent 0.5px),
            linear-gradient(to bottom,
                rgb(var(--color-gray-900)) 0.5px,
                transparent 0.5px);
    }
}
</style>
