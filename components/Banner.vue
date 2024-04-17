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
            <h1 class="text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-7xl">最接近真人的文字转语音</h1>
            <p class="mt-6 text-lg tracking-tight text-gray-600 dark:text-gray-300">
                提供语音合成服务，支持多种语言，包括英语、法语、德语、西班牙语、阿拉伯语、中文、日语、韩语、越南语等，以及多种语音风格</p>
            <div class="mt-10 flex flex-wrap gap-x-6 gap-y-3 justify-center">
                <NuxtLink
                   class="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-full text-base gap-x-2.5 px-3.5 py-2.5 shadow-sm text-white dark:text-gray-900 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-900 dark:bg-white dark:hover:bg-gray-100 dark:disabled:bg-white focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center"
                   to="/free"><span class="">开始使用</span><span
                          class="i-heroicons-arrow-right-20-solid flex-shrink-0 h-6 w-6"></span></NuxtLink>
                          <NuxtLink type="button"
                          to="/pro"
                        class="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-full text-base gap-x-2.5 px-3.5 py-2.5 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 text-gray-700 dark:text-gray-200 bg-gray-50 hover:bg-gray-100 disabled:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700/50 dark:disabled:bg-gray-800 focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center"><span
                          class="">Pro 版</span></NuxtLink></div>
        </div>
        <div 
             class="absolute inset-0 landing-grid z-[-1] [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]">
        </div>
    </div>
</div></template>