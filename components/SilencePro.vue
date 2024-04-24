<template>
  <UPopover>
    <UButton color="gray"
             label="静音"
             trailing-icon="i-heroicons-chevron-down-20-solid" />
    <template #panel>
      <div class="p-4 text-left w-max"
           style="width: 750px">
        <div class="grid grid-cols-2 gap-2 mb-6">
          <div v-for="(item, index) in silenceList"
               :key="item.name"
               class="flex justify-between pr-10">
            <div>
              <div class="text-sm font-medium text-gray-700 dark:text-gray-200">
                {{ item.label }}
              </div>
              <div class="text-xs text-gray-500 dark:text-gray-400">
                {{ item.description }}
              </div>
            </div>
            <UInput placeholder="0"
                    style="width: 100px"
                    v-model="item.value">
              <template #trailing>
                <span class="text-gray-500 dark:text-gray-400 text-xs">ms</span>
              </template>
            </UInput>
          </div>


        </div>


        <!-- <UDivider class="mt-5" /> -->
        <div class="m2-4 flex justify-between items-center">
          <div class="text-sm text-green-500 font-bold">取值范围: 0-5000ms</div>
          <UButton @click="handleComfirm"
                   class="text-center">确认选择</UButton>
        </div>
      </div>
    </template>
  </UPopover>
</template>

<script setup>
const toast = useToast();
const silence = defineModel();


const handleResetDefault = () => {
  volume.value = 750;
};




const silenceList = ref([
  {
    label: 'Leading-exact',
    name: 'leadingsilence-exact',
    value: '',
    description: '段落开头的静默'

  },
  {
    label: 'Leading',
    name: 'leadingsilence',
    value: '',
    description: '段落开头的其他静默。'
  },
  {
    label: 'Sentenceboundary-exact',
    name: 'sentenceboundarysilence-exact',
    value: '',
    description: '相邻句子之间的静默'
  },
  {
    label: 'Sentence boundary',
    name: 'sentenceboundarysilence',
    value: '',
    description: '相邻句子之间的其他静默'
  },
  {
    label: 'Tailing-exact',
    name: 'tailingsilence-exact',
    value: '',
    description: '段落末尾的静默'
  },
  {
    label: 'Tailing',
    name: 'tailingsilence',
    value: '',
    description: '段落末尾的其他静默。'
  },
  {
    label: 'Comma-exact',
    name: 'commasilence-exact',
    value: '',
    description: '半角/全角格式的逗号处静默'
  }, {
    label: 'Semicolon-exact',
    name: 'semicolonsilence-exact',
    value: '',
    description: '半角/全角格式的分号处静默'
  },
  {
    label: 'Enumerationcomma-exact',
    name: 'enumerationcommasilence-exact',
    value: '',
    description: '全角格式的枚举逗号处静默'
  }
])


computed((str) => {
  return silence.value.forEach(item => {
    for (const key in item) {
      const foundItem = silenceList.value.find(listItem => listItem.name === key);
      if (foundItem) {
        foundItem.value = item[key];
      }
    }
  });
})
const handleComfirm = () => {
  let a = []
  silenceList.value.map((item) => {
    if (item.value > 0) {

      // a+=` ${item.name}="${item.value}" `
      a.push({ name: item.name, value: item.value })
    }
  })

  toast.add({ title: "设置成功", timeout: 500 });
  silence.value = a
};
function isNonNegativeInteger(num) {
  // 首先确保 num 是数字类型
  if (typeof num !== 'number') {
    return false;
  }

  // 排除负数和小数
  if (num < 0 || num % 1 !== 0) {
    return false;
  }

  return true;
}

</script>

