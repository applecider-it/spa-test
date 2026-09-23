<script setup lang="ts">
import AppLayout from '@/components/layouts/AppLayout.vue';
import TweetDetail from '@/components/tweet/TweetDetail.vue';
</script>

<template>
  <AppLayout>
    Tweets

    <div class="mt-10">
      <div>
        <TweetDetail />
      </div>
    </div>
  </AppLayout>
</template>
