<script setup lang="ts">
const items = [{
  label: '什么是 TTS',
  icon: 'i-heroicons-information-circle',
  content: 'TTS是一款在线文本转语音工具，可以将文本转换为音频，并且可以播放或下载音频文件。'
}, {
  label: '如何将文本转换为语音？',
  icon: 'i-heroicons-arrow-down-tray',
  content:'首先输入文字，然后选择语言和语音类型，最后进行转换。'
}, {
  label: '文本转语音可以免费使用吗？',
  icon: 'i-heroicons-eye-dropper',
  content:'是的，我们将为用户提供永久免费版本，并保留未来对相关政策进行调整的权利。'
}, {
  label: '合成语音可以用于商业用途吗？',
  icon: 'i-heroicons-rectangle-group',
  content:'是的，您拥有音频文件 100% 的版权所有权，并且可以将其用于任何目的，包括商业用途，只要符合当地法律即可。'
}, {
  label: '我可以在 YouTube 和 TikTok 等平台上使用 TTS 生成的音频吗？是否需要注明来源？',
  icon: 'i-heroicons-square-3-stack-3d',
  content:'您可以在 YouTube、TikTok、Podcasts 等平台上使用 TTS 生成的音频。关于来源归属，不是强制性的，您无需注明来源。但是，如果您愿意注明来源，我们将不胜感激。'
}]
</script>

<template>
    <div class="mx-auto w-4/6 mb-14">
        <div class="text-3xl text-gray-080 text-center font-bold mt-20 mb-20">常见问题</div>
        <UAccordion
        color="white"
        variant="ghost"
        multiple
        size="xl"
        :items="items"
        >
        <template #item="{ item }">
          <p class="text-xl text-green-600 dark:text-green-600 text-left px-10">
            {{ item.content }}
          </p>
        </template>
        </UAccordion>
  </div>
</template>

