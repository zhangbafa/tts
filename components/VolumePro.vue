<template>
  <USelectMenu
              v-model="volume"
              :options="items"
              placeholder="请选择音量"
              value-attribute="value"
              option-attribute="option"
              @change="handleChange"
            />
</template>

<script setup>
const volume = ref('default')
const value = defineModel()


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
    {'option':'音量:默认',value: 'default' },
    {'option':'音量:静音',value: 'silent' },
    {'option':'音量:超轻',value: 'x-soft' },
    {'option':'音量:轻',value: 'soft' },
    {'option':'音量:中等',value: 'medium' },
    {'option':'音量:大声',value: 'loud' },
    {'option':'音量:超大声',value: 'x-loud' }
]


const handleChange=(val)=>{
value.value = val
}
</script>
