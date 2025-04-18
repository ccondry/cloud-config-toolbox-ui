<script setup lang="ts">
import { useUserStore } from '@/stores'
const userStore = useUserStore()

function clickAdmin () {
  window.location.href = '/management'
}
</script>

<template>
  <nav
  style="display: flex; justify-content: space-between; background-color: rgba(0, 0, 0, 0); padding: 0.5rem;"
  >
    <div style="display: flex;">
      <div class="buttons">
        <b-button
        type="is-info"
        rounded
        tag="a"
        href="/"
        aria-label="Toolbox Home"
        >
          Toolbox Home
        </b-button>
      </div>
    </div>

    <div style="display: flex;">
      <div class="buttons">
        <b-button
        v-if="userStore.isAdmin"
        type="is-info"
        rounded
        aria-label="Admin"
        @click="clickAdmin"
        >
          Admin
        </b-button>

        <b-button
        type="is-info"
        rounded
        aria-label="Log Out"
        @click="userStore.logout()"
        >
          Log Out
        </b-button>
      </div>
    </div>
  </nav>
</template>
