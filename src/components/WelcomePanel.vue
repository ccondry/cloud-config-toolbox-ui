<script setup lang="ts">
import { useUserStore } from '@/stores'
import ContentPanel from './ContentPanel.vue'

const userStore = useUserStore()
</script>

<template>
  <ContentPanel
  v-if="userStore.jwtUser"
  :title="`Welcome ${userStore.jwtUser.firstName}!`"
  ariaId="welcome"
  >
    <p>
      Welcome to the dCloud
      <strong>Demo Configurations</strong>
      Toolbox!
    </p>
  </ContentPanel>
</template>
