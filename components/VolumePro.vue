<template>
  <USelectMenu
              v-model="value"
              :options="items"
              placeholder="请选择音量"
              value-attribute="value"
              option-attribute="option"
              @change="handleChange"
              :ui="{container: 'z-100 group',}"
            />
</template>

<script setup>
const volume = ref('default')
const value = defineModel('default')


// 音量
// 0-1.5倍
// silent 静音
// x-soft 超轻
// soft 轻
// medium 中等
// loud 大声
// x-loud 超大声
//  默认
const items = [
    {'option':'🔈默认',value: 'default' },
    {'option':'🔈静音',value: 'silent' },
    {'option':'🔈超轻',value: 'x-soft' },
    {'option':'🔈轻',value: 'soft' },
    {'option':'🔈中等',value: 'medium' },
    {'option':'🔈大声',value: 'loud' },
    {'option':'🔈超大声',value: 'x-loud' }
]


const handleChange=(val)=>{
value.value = val
}
</script>
