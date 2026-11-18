<script setup lang="ts">
import { useUserStore } from '@/stores'
import CiscoMark from './CiscoMark.vue'
import AppLauncher from './AppLauncher.vue'
import AccountMenu from './AccountMenu.vue'

const userStore = useUserStore()
</script>

<template>
  <header class="app-header">
    <div class="app-header-start">
      <a href="/" class="app-header-logo">
        <CiscoMark />
        <span class="app-header-title">dCloud Collaboration Toolbox</span>
      </a>
      <nav class="header-nav" aria-label="Primary">
        <a href="/" class="header-nav-item">
          Home
        </a>
        <a class="header-nav-item is-active" role="link" tabindex="0" aria-current="page">
          <span class="header-nav-glow" aria-hidden="true" />
          <span class="header-nav-orbit" aria-hidden="true" />
          <span class="header-nav-label">Demo Configurations</span>
        </a>
        <a v-if="userStore.isAdmin" href="/management/" class="header-nav-item">
          Admin
        </a>
      </nav>
    </div>

    <div class="app-header-end">
      <AppLauncher />
      <AccountMenu v-if="userStore.isLoggedIn" />
      <a v-else class="app-header-login" @click="userStore.login()">Log in</a>
    </div>
  </header>
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
  padding: 0 16px;
  background-color: rgba(255, 255, 255, 0.07);
  border-bottom: 1px solid var(--hairline);
  color: var(--fg-strong);

  // blur on a pseudo-element, so the header doesn't become the backdrop root
  // of the header menus and stop their own backdrop-filter blurring the page
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    -webkit-backdrop-filter: blur(24px);
    backdrop-filter: blur(24px);
    pointer-events: none;
  }
}

.app-header-start,
.app-header-end {
  display: flex;
  align-items: center;
}

.app-header-start {
  gap: 24px;
}

.app-header-end {
  gap: 4px;
}

.app-header-logo {
  display: flex;
  align-items: center;
  gap: 16px;
  color: var(--fg-strong);

  &:hover {
    color: var(--fg-strong);
  }

  &:focus,
  &:focus-visible {
    background-color: transparent;
  }

  .cisco-mark {
    display: block;
    width: 38px;
    height: 24px;
  }
}

.app-header-title {
  font-size: 19px;
  font-weight: 400;
  white-space: nowrap;
}

.app-header-login {
  font-weight: 600;
}

.header-nav {
  display: flex;
  align-items: center;
  gap: 2px;
}

.header-nav-item {
  position: relative;
  display: inline-flex;
  padding: 7px 14px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  color: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition: color 0.15s;

  &:hover {
    color: rgba(255, 255, 255, 0.85);
  }

  // active page: 1px spinning conic frame around a dark surface, with a glow
  &.is-active {
    padding: 1px;
    font-weight: 600;
    color: var(--fg-strong);
  }
}

.header-nav-glow {
  position: absolute;
  inset: -8px;
  border-radius: 20px;
  background: rgba(110, 175, 253, 0.22);
  filter: blur(12px);
  pointer-events: none;
}

@property --header-nav-spin {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0deg;
}

.header-nav-orbit {
  position: absolute;
  inset: 0;
  border-radius: 12px;
  background: conic-gradient(
    from var(--header-nav-spin),
    transparent 0deg,
    rgba(110, 175, 253, 0) 5deg,
    rgba(110, 175, 253, 0.7) 40deg,
    rgba(160, 210, 255, 1) 80deg,
    #fff 100deg,
    rgba(160, 210, 255, 1) 120deg,
    rgba(110, 175, 253, 0.7) 160deg,
    transparent 200deg,
    transparent 360deg
  );
  pointer-events: none;
  animation: header-nav-spin 2.5s linear infinite;
}

@keyframes header-nav-spin {
  to {
    --header-nav-spin: 360deg;
  }
}

.header-nav-label {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  padding: 6px 14px;
  border-radius: 11px;
  background: rgba(11, 16, 28, 0.95);
}

@media (max-width: 768px) {
  .app-header-start {
    gap: 12px;
  }

  .app-header-title {
    display: none;
  }
}
</style>
