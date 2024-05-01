<script setup lang="ts">
const supabase = useSupabaseClient()
definePageMeta({
  layout: 'auth'
})

useSeoMeta({
  title: '登录'
})

const fields = [{
  name: 'email',
  type: 'text',
  label: 'Email',
  placeholder: 'Enter your email'
}, {
  name: 'password',
  label: 'Password',
  type: 'password',
  placeholder: 'Enter your password'
}]

const state = reactive({
  email: '',
  password: ''
})

const validate = (state: any) => {
  const errors = []
  if (!state.email) errors.push({ path: 'email', message: '请输入邮箱' })
  if (!state.password) errors.push({ path: 'password', message: '请输入密码' })
  return errors
}

const providers = [{
  label: 'Continue with GitHub',
  icon: 'i-simple-icons-github',
  color: 'white' as const,
  click: () => {
    console.log('Redirect to GitHub')
  }
}]
const toast = useToast()
const loading = ref(false)
const githubloading = ref(false)

async function onSubmit () {
  loading.value = true
  let { data, error } = await supabase.auth.signInWithPassword({
    email: state.email,
    password: state.password
  })
  loading.value = false
  if(error){
    toast.add({title:'登录失败',description:'邮箱或密码错误',color:'red'})
  }else{
    navigateTo('/free')
  }
  console.log(data,error)

}

const signInWithOAuth = async () => {
  githubloading.value = true
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: 'https://tts.ttbaojia.com/confirm',
    },
  })
  if (error) console.log(error)
}
</script>

<!-- eslint-disable vue/multiline-html-element-content-newline -->
<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
  <UCard class="max-w-sm w-full bg-white/75 dark:bg-white/5 backdrop-blur">
    <div class="text-center mb-6">
      <div class="mb-2 pointer-events-none">
        <span class="i-heroicons-lock-closed w-8 h-8 flex-shrink-0 text-gray-900 dark:text-white"></span>
      </div>
      <p class="text-2xl text-gray-900 dark:text-white font-bold">Welcome back
      </p>
      <p class="text-gray-500 dark:text-gray-400 mt-1"> 没有账号? 
        <NuxtLink to="/signup" class="text-primary font-medium">
          注册
        </NuxtLink>. 
      </p>
    </div>
    <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormGroup label="邮箱" name="email">
      <UInput v-model="state.email" placeholder="请输入邮箱"/>
    </UFormGroup>

    <UFormGroup label="密码" name="password">
      <UInput v-model="state.password" type="password" placeholder="请输入密码"/>
    </UFormGroup>

    <UButton type="submit" label="登录" block :loading="loading" :ui="{ rounded: 'rounded-full' }">
      
      <template #trailing>
        <UIcon name="i-heroicons-arrow-right-20-solid" class="w-5 h-5" />
      </template>
    </UButton>
    <div class="mt-6 mb-6">
    <UDivider label="OR"/>
  </div>
  <UButton
    icon="i-simple-icons-github"
    color="white"
    :loading="githubloading"
    variant="solid"
    label="使用 GitHub 登录"
    :ui="{ rounded: 'rounded-full' }"
    block
    @click="signInWithOAuth"
  />
  <div class="text-xs text-gray-400 text-center">
    <!-- By signing in, you agree to our Terms of Service. -->
  </div>
  </UForm>
  </UCard>
</template>
