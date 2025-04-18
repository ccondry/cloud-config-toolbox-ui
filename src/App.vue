<script setup lang="ts">
import { computed, watch, onMounted, ref } from 'vue'

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
const isLoggedIn = computed(() => userStore.isLoggedIn)
watch(isLoggedIn, (val, oldVal) => {
  if (val && !oldVal) {
    // user just logged in
  } else if (!val && oldVal) {
    // user just logged out. make them log in again.
    userStore.login()
  }
})

onMounted(() => {
  // try to find and validate user's JWT from localStorage,
  // or start the SSO login process to get one
  userStore.checkJwt()
  // get the Authentication REST API version
  appStore.getApiVersion()
})
</script>

<template>
  <div>
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
        <AppFooter />
      </section>
    </div>
  </div>
</template>
