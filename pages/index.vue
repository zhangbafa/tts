<script setup lang="ts">
definePageMeta({
    // middleware: ['auth']
})
const client = useSupabaseClient()
const user = useSupabaseUser()

const userinfo = await client.auth.getUser()
console.log(userinfo)
const session = useSupabaseSession()
const cookieName = useRuntimeConfig().public.supabase.cookieName
console.log(cookieName)
const signOut = async () => {
  const { error } = await client.auth.signOut()
  if (error) console.log(error)
}

const { data } = await useFetch('/api/posts', {
  headers: useRequestHeaders(['cookie'])
})

</script>
<template>
  <div class="" style="height:100vh">
    Index-{{ data }}
    <button @click="signOut">退出</button>
    <div>
        <pre>
            {{restaurant}}
        </pre>
        <hr/>
        <pre>
            {{ session }}
        </pre>
    </div>
    
  </div>
</template>
