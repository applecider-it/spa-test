<script setup>
const route = useRoute()
const page = route.params.page
</script>

<template>
  <div>
    <h1>Posts {{ page }}</h1>
  </div>
</template>