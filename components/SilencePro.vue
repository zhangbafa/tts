<template>
  <USelectMenu
              v-model="volume"
              :options="silence"
              placeholder="静音"
              value-attribute="value"
              option-attribute="option"
              @change="handleChange"
            />
</template>

<script setup>
import {silence} from '@/utils/data'
const volume = ref(300)
const value = defineModel()

const handleChange=(val)=>{
value.value = `${val}`
}
</script>
