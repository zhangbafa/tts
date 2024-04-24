<template>
    <main
        class="relative flex min-h-screen flex-col items-center justify-center p-2"
    >
        <!--$-->
        <div
            v-for="item in list"
            @click="handleCount"
            class="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full"
        >
            {{ item }}
        </div>
        <!--/$-->
    </main>
</template>

<style>
.parent {
    display: flex;
    justify-content: center;
    align-items: center;
}

.child0 {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
}
</style>

<script setup>
definePageMeta({
    layout: "",
});
const list = ref([0]);
const handleCount = () => {
    const len = list.value.length;
    list.value.push(len);
};
</script>
