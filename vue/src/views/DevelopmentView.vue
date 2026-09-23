<script setup lang="ts">
import AppLayout from '@/components/layouts/AppLayout.vue';

import AuthTestArea from '@/components/development/AuthTestArea.vue';
import SendTestArea from '@/components/development/SendTestArea.vue';
import UIArea from '@/components/development/UIArea.vue';

const sectionClass = 'border-2 p-5';
</script>

<template>
  <AppLayout>
    開発者向けページ

    <div class="space-y-5 mt-10">
      <div :class="sectionClass">
        <AuthTestArea />
      </div>
      <div :class="sectionClass">
        <SendTestArea />
      </div>
      <div :class="sectionClass">
        <UIArea />
      </div>
    </div>
  </AppLayout>
</template>
