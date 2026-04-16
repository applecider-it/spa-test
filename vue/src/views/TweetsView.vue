<script setup lang="ts">
import AppLayout from '@/components/layouts/AppLayout.vue';
import TweetList from '@/components/tweet/TweetList.vue';
</script>

<template>
  <AppLayout>
    Tweets

    <div class="mt-10">
      <div>
        <TweetList />
      </div>
    </div>
  </AppLayout>
</template>
