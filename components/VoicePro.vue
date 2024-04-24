<template>
    <div>
        <UButton
            :label="model.localName"
            icon="i-heroicons-users-20-solid"
            color="gray"
            variant="solid"
            @click="isOpen = true"
        />
        <UModal
            v-model="isOpen"
            :ui="{
                width: 'w-full sm:max-w-fit',
                height: 'h-5/6 sm:max-h-full',
                overlay: {
                    background: 'bg-black/50 dark:bg-gray-800/75',
                },
            }"
        >
            <UCard
                :ui="{
                    ring: '',
                    divide: 'divide-y divide-gray-100 dark:divide-gray-800',
                    body: { padding: 'px-0 py-0 sm:p-0' },
                }"
            >
                <template #header>
                    <div class="flex items-center justify-between">
                        <h3
                            class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
                        >
                            选择声音 ({{ voiceList.length }})
                        </h3>
                        <UButton
                            color="gray"
                            variant="ghost"
                            icon="i-heroicons-x-mark-20-solid"
                            class="-my-1"
                            @click="isOpen = false"
                        />
                    </div>
                </template>

                <div class="flex justify-start relative" style="width: 96vw">
                    <div class="w-auto h-full p-3">
                        <UFormGroup label="语言" name="name" class="mb-3">
                            <USelectMenu
                                searchable
                                clear-search-on-close
                                class="w-full lg:w-44"
                                :options="language"
                                placeholder="请选择语言"
                                value-attribute="ShortName"
                                option-attribute="LocalName"
                                v-model="lang"
                                @change="handleChange"
                            >
                                <template #option-empty="{ query }">
                                    没有数据
                                </template>
                            </USelectMenu>
                        </UFormGroup>
                        <UFormGroup label="性别" name="name" class="mb-3">
                            <USelectMenu
                                class="w-full lg:w-44"
                                :options="options"
                                placeholder="选择性别"
                                value-attribute="value"
                                option-attribute="label"
                                v-model="gender"
                                @change="handlerChangeSex"
                            />
                        </UFormGroup>

                        <div class="mt-3 text-right9">
                            <UButton @click="handleReset" color="black" block>
                                重置
                            </UButton>
                        </div>

                        <UDivider label="更多选择" class="mt-10" />
                        <div
                            class="flex justify-start flex-row flex-wrap mt-4 gap-4"
                        >
                            <UButton
                                @click="handleFilterMultilingual"
                                color="gray"
                                variant="solid"
                                class="flex-1 text-center"
                                >多语言</UButton
                            >
                            <!-- <UButton
                                @click="handleFilterOpenAI"
                                color="gray"
                                class="flex-1 text-center"
                                variant="solid"
                                label="OpenAI"
                            /> -->
                        </div>
                    </div>
                    <div
                        class="p-4 px-6 bg-gray-100 dark:bg-black"
                        style="width: 100%; height: 80vh; overflow-y: auto"
                    >
                        <div
                            class="grid grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4"
                        >
                            <UCard
                                v-for="item in voiceList"
                                :key="item.ShortName"
                                :ui="{ shadow: 'shadow hover:shadow-2xl' }"
                                class="relative text-center cursor-pointer ucard"
                            >
                                <UAvatar
                                    src="/slightly_smiling_face_3d.png"
                                    alt="Avatar"
                                    size="3xl"
                                />
                                <div
                                    class="m2-6 text-sm font-bold text-gray-700 dark:text-gray-400"
                                >
                                    {{ item.LocalName || item }} ({{
                                        item.Gender == "Female" ? "女" : "男"
                                    }})
                                </div>
                                <div
                                    class="text-left text-xs text-gray-500 pt-4"
                                >
                                    {{ item.Description }}
                                </div>
                                <UButton
                                    color="black"
                                    class="text-center absolute bottom-1 left-1 right-1 ubutton"
                                    @click="selectVoice(item)"
                                    >选择TA</UButton
                                >
                            </UCard>
                        </div>
                    </div>
                </div>
            </UCard>
        </UModal>
    </div>
</template>

<script setup>
import {
    voices,
    language,
    roles_obj,
    openai_tts,
    filterVoicesByLocaleRoleAndGender,
} from "@/utils/data";
const isOpen = ref(false);
const lang = ref("");
const voiceList = ref(voices);
const selectName = ref("选择声音");
const gender = ref("");

const model = defineModel();

const handleReset = () => {
    gender.value = "";
    lang.value = "";
    voiceList.value = voices;
};
const handleChange = (val) => {
    voiceList.value = filterVoicesByLocaleRoleAndGender(val, gender.value);
};

const handlerChangeSex = (val) => {
    voiceList.value = filterVoicesByLocaleRoleAndGender(
        lang.value,
        gender.value,
    );
};

const handleSelectRole = (val) => {
    voiceList.value = filterVoicesByLocaleRoleAndGender(
        lang.value,
        gender.value,
        v,
    );
};
const selectVoice = (val) => {
    selectName.value = val.LocalName;
    isOpen.value = false;
    // model.value = val.ShortName
    model.value = {
        shortName: val.ShortName,
        localName: val.LocalName,
    };
};

const options = [
    {
        value: "",
        label: "全部",
    },
    {
        value: "Male",
        label: "男",
    },
    {
        value: "Female",
        label: "女",
    },
];

// 推荐多语言 SecondaryLocaleList
const handleFilterMultilingual = () => {
    voiceList.value = voices.filter((item) => item.SecondaryLocaleList);
};
const handleFilterOpenAI = () => {
    voiceList.value = voices.filter((item) => item.Provider == "openai");
};
</script>

<style scoped>
.ubutton {
    display: none;
}
.ucard:hover .ubutton {
    display: block;
}
</style>
