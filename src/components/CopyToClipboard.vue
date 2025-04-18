<script setup lang="ts">
import { useAppStore } from '@/stores'

const appStore = useAppStore()

const props = defineProps<{
  value: string,
  name: string,
}>()

function clickCopy () {
  appStore.copyToClipboard({
    string: props.value,
    type: props.name
  })
}
</script>

<template>
  <a
  style="padding-left: 0.2rem;"
  @click="clickCopy"
  >
    <b-icon icon="layers" />
  </a>
</template>
