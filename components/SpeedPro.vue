<template>
    <UPopover>
        <UButton
            color="gray"
            :label="`语速(${speed == 0 ? '默认值' : speed})`"
            style="min-width: 90px"
        />
        
        <template #panel>
            <div class="p-4 w-72 text-center">
                <div class="flex justify-start items-centert mt-3">
                    <UButton label="-" @click="handledecr" size="2xs"></UButton>
                    <URange
                        v-model="speed"
                        :min="-100"
                        :max="300"
                        :step="1"
                        class="mx-4 mr-4 mt-1"
                        @change="handleChange"
                    />
                    <UButton label="+" @click="handleincr" size="2xs"></UButton>
                </div>
                <div
                    class="mt-4 hover:bg-slate-100 rounded leading-tight p-2 text-sm cursor-pointer text-gray-700"
                    @click="handleResetDefault"
                >
                    恢复默认值
                </div>
            </div>
        </template>
    </UPopover>
</template>

<script setup>
const speed = defineModel(0);
const handleincr = () => {
    speed.value++;
};
const handledecr = () => {
    speed.value--;
};
const handleResetDefault = () => {
    speed.value = 0;
};
const handleChange = (val) => {
    // value.value = `${val>0?'+':''}${val}.00`;
    console.log(typeof val)
    speed.value = parseInt(val)
};
</script>
