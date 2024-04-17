<template>
    <header class="bg-background/75 backdrop-blur border-b border-gray-200 dark:border-gray-800 -mb-px sticky top-0 z-50">
        <div class="mx-auto px-2 sm:px-6 lg:px-8 w-11/12 flex items-center justify-between gap-3 h-16">
            <div class="lg:flex-1 flex items-center gap-1.5">
                <NuxtLink
                to="/"
                class="flex-shrink-0 font-bold text-xl text-gray-900 dark:text-white flex items-end gap-1.5"
>

               
               
                    <div class="flex justify-start items-center">
                        <div>
                            <img src="/logo.png"
                                 style="width: 35px; margin-right: 15px" />
                        </div>
                        <div>TTSbox</div>
                    </div>
               
            </NuxtLink>
            </div>
            <ul class="items-center gap-x-8 hidden lg:flex;display:none">
                <li class="relative"
                    data-v-inspector="node_modules/@nuxt/ui-pro/components/header/HeaderLinks.vue:3:5">
                    <a class="text-sm/6 font-semibold flex items-center gap-1 hover:text-primary"
                       href="/docs">Docs</a>
                </li>
                <li class="relative">
                    <a class="text-sm/6 font-semibold flex items-center gap-1 hover:text-primary"
                       href="/pricing">Pricing
                    </a>
                </li>
                <li class="relative">
                    <a class="text-sm/6 font-semibold flex items-center gap-1 hover:text-primary"
                       href="/blog">Blog
                    </a>
                    
                </li>
            </ul>
            <div class="flex items-center justify-end lg:flex-1 gap-1.5">
                <template v-if="user">
                    <NuxtLink
                   class="cursor-pointer focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-full text-sm gap-x-2 px-3 py-2 shadow-sm text-white dark:text-gray-900 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-900 dark:bg-white dark:hover:bg-gray-100 dark:disabled:bg-white focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 items-center hidden lg:flex"
                   @click="signOut">
                   <span class="">退出</span>
                </NuxtLink>
                </template>
                <template v-else>
                    <NuxtLink class="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-full text-sm gap-x-2 px-3 py-2 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 text-gray-700 dark:text-gray-200 bg-gray-50 hover:bg-gray-100 disabled:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700/50 dark:disabled:bg-gray-800 focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center"
                to="/login">
                    <span class="">登录</span>
                </NuxtLink>
                   
                   <NuxtLink
                   class="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-full text-sm gap-x-2 px-3 py-2 shadow-sm text-white dark:text-gray-900 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-900 dark:bg-white dark:hover:bg-gray-100 dark:disabled:bg-white focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 items-center hidden lg:flex"
                   to="/signup">
                   <span class="">注册</span>
                   <span class="i-heroicons-arrow-right-20-solid flex-shrink-0 h-5 w-5">
                    </span>
                </NuxtLink>
                   
            </template>
                          <button type="button"
                        class="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-full text-sm gap-x-2 p-2 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center lg:hidden">
                    <span class="i-heroicons-bars-3-20-solid flex-shrink-0 h-5 w-5"></span>
                </button>
            </div>
        </div>
    </header>
</template>

<script setup>
const user = useSupabaseUser()
const client = useSupabaseClient()
const toast = useToast()
const signOut= async ()=>{
    const { error } = await client.auth.signOut()
    if (!error){
        navigateTo('/')
    }
}

</script>