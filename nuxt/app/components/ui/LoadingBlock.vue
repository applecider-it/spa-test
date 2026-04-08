<script setup lang="ts">
interface Props {
  height?: string;
}

// props を受け取る
const props = defineProps<Props>();
const height = props.height ?? '5rem';
</script>

<template>
  <div
    class="border-4 border-gray-200 bg-gray-100 rounded-2xl m-1"
    :style="{ height }"
  ></div>
</template>
