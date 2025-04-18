<script setup lang="ts">
import { useAppStore } from '@/stores'

import CiscoLogo from './CiscoLogo.vue'
import ContentPanel from './ContentPanel.vue'

const appStore = useAppStore()
</script>

<template>
  <ContentPanel ariaId="version-copyright" style="border-radius: 6px;">
    <div style="display: flex; flex-direction: column; align-items: center; ">
      <cisco-logo style="width: 4rem; height: 4rem;" />
      <small>
        UI Version {{ appStore.uiVersion }}
      </small>
      <small>
        API Version {{ appStore.apiVersion }}
      </small>
      <small>
        © 2025 Cisco and/or its affiliates. All rights reserved.
      </small>
    </div>
  </ContentPanel>
</template>
