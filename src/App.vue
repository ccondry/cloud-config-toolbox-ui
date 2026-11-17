<script setup lang="ts">
import { computed, onMounted } from 'vue'

import AmbientBg from '@/components/AmbientBg.vue'
import Navbar from '@/components/NavBar.vue'
import WelcomePanel from '@/components/WelcomePanel.vue'
import UploadAgentAnswers from '@/components/UploadAgentAnswers.vue'
import AppFooter from '@/components/AppFooter.vue'
import { useUserStore } from '@/stores'
import { useAppStore } from '@/stores'
import { isProduction } from '@/config'

const userStore = useUserStore()
const appStore = useAppStore()

const isLoading = computed(() => {
  return appStore.loading.apiVersion || userStore.loading.details
})
const isWorking = computed(() => false)

onMounted(() => {
  // try to find and validate user's JWT from localStorage,
  // or start the SSO login process to get one
  userStore.checkJwt()
  // get the Authentication REST API version
  appStore.getApiVersion()
})
</script>

<template>
  <div class="app-shell">
    <!-- page background glow -->
    <AmbientBg />
    <div class="app-page">
      <Navbar />
      <!-- main -->
      <div
      id="main-container"
      class="container is-fluid is-marginless app-content"
      >
        <section class="main">
          <b-loading :active="isProduction && (isLoading || isWorking)" />
          <WelcomePanel />
          <UploadAgentAnswers v-if="userStore.isLoggedIn" />
        </section>
      </div>
      <AppFooter />
    </div>
  </div>
</template>
