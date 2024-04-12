<script setup lang="ts">
const supabase = useSupabaseClient()
const email = ref('12690978063@qq.com')
//f9fe4ace0ae55f4c39bb059d8e90d76e63fe635f
const signInWithOtp = async () => {
    supabase.auth.signUp
  const { error } = await supabase.auth.signInWithOtp({
    email: email.value,
    options: {
      emailRedirectTo: 'http://localhost:3000/confirm',
    //   shouldCreateUser:false
    }
  })
  if (error) console.log(error)
}

const signInWithOAuth = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: 'http://localhost:3000/confirm',
    },
  })
  if (error) console.log(error)
}
</script>
<template>
  <div class=" flex justify-center items-center flex-wrap" style="height:100vh">
   
   <div style="width: 300px;height: 40px;">
    <input
      v-model="email"
      type="email"
     
    />
   </div>
    <div>
        <button @click="signInWithOtp">
      Sign In with E-Mail
    </button>
    </div>
    <br/>
    <button @click="signInWithOAuth" style="margin-left: 50px">github</button>

  </div>
</template>
