<script setup lang="ts">
import { useUserStore } from '@/stores'
import CiscoMark from './CiscoMark.vue'
const userStore = useUserStore()

function clickAdmin () {
  window.location.href = '/management'
}
</script>

<template>
  <nav class="app-header">
    <div class="app-header-start">
      <a href="/" class="app-header-logo" aria-label="Toolbox Home">
        <CiscoMark />
      </a>
      <span class="app-header-title">dCloud Demo Configurations</span>
    </div>

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
  </nav>
</template>

<style lang="scss">
.app-header {
  position: sticky;
  top: 0;
  z-index: 30;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  min-height: 56px;
  padding: 0.5rem 16px;
  background-color: rgba(11, 17, 24, 0.75);
  -webkit-backdrop-filter: blur(24px);
  backdrop-filter: blur(24px);
  border-bottom: 1px solid var(--hairline);

  .buttons {
    margin-bottom: 0;

    .button {
      margin-bottom: 0;
    }
  }
}

.app-header-start {
  display: flex;
  align-items: center;
  gap: 16px;
}

.app-header-logo {
  display: flex;
  color: var(--fg-strong);

  &:hover {
    color: var(--fg-strong);
  }

  .cisco-mark {
    display: block;
    width: 38px;
    height: 24px;
  }
}

.app-header-title {
  font-family: var(--font-heading);
  font-weight: 700;
  color: var(--fg-strong);
}
</style>
