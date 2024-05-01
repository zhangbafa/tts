<template>
    <UPopover>
        <UButton
            color="gray"
            label="插入停顿"
            trailing-icon="i-heroicons-chevron-down-20-solid"
        />

        <template #panel>
            <div class="p-4 w-72 text-center">
                <div class="grid grid-cols-2 gap-2 mb-6">
                    <UButton
                        :label="item.label"
                        @click="handleSelect(item)"
                        block
                        color="white"
                        class=""
                        v-for="item in breakoption"
                        :key="item"
                    ></UButton>
                </div>
                <UDivider :label="volume + 'ms'" class="mb-4" />

                <div class="flex justify-start items-center">
                    <UButton label="-" @click="handledecr" size="2xs"></UButton>
                    <URange
                        v-model="volume"
                        :min="0"
                        :max="5000"
                        :step="10"
                        class="mx-4 mr-4"
                    />
                    <UButton label="+" @click="handleincr" size="2xs"></UButton>
                </div>
                <UDivider class="mt-5" />
                <div class="mt-4 flex justify-between items-center">
                    <ULink
                        @click="handleResetDefault"
                        class="text-sm text-gray-800"
                        >恢复默认值</ULink
                    >
                    <UButton @click="handleComfirm" class="text-center"
                        >确认选择</UButton
                    >
                </div>
            </div>
        </template>
    </UPopover>
</template>

<script setup>
import { breakoption } from "@/utils/data";
import { useClipboard } from '@vueuse/core';
const toast = useToast();
const volume = ref(750);
const value = defineModel();
const { text, copy, copied, isSupported } = useClipboard({ value })
const handleincr = () => {
    volume.value++;
};
const handledecr = () => {
    volume.value--;
};

const handleResetDefault = () => {
    volume.value = 750;
};
const handleSelect = (val) => {
    volume.value = val.value;
};

const handleComfirm = () => {
    const textarea = document.querySelector("#textarea");
    const text = `<break time="${volume.value}ms">`;
    copy(text)
    toast.add({ title: "复制成功,可插入到对应位置", timeout: 500 });
};
function insertTextAtCursor(time, textarea) {
    // const activeElement = document.activeElement;
    // if (activeElement.tagName.toLowerCase() != 'textarea') {
    //   alert('df')
    //   return false
    // }
    const text = `<break time="${time}ms">`;
    const selectionStart = textarea.selectionStart;

    const selectionEnd = textarea.selectionEnd;
    const textBeforeCursor = textarea.value.substring(0, selectionStart);
    const textAfterCursor = textarea.value.substring(
        selectionEnd,
        textarea.value.length,
    );
    textarea.value = textBeforeCursor + text + textAfterCursor;
    value.value = textBeforeCursor + text + textAfterCursor;
    const cursorPosition = selectionStart + text.length;
    textarea.setSelectionRange(cursorPosition, cursorPosition);
}
</script>
