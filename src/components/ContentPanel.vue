<script setup lang="ts">
defineProps<{
  title?: string,
  ariaId?: string,
}>()
</script>

<template>
  <b-collapse
  :aria-id="ariaId"
  class="panel"
  animation="slide"
  >
    <div
    v-if="title?.length"
    slot="trigger"
    class="panel-heading"
    role="button"
    :aria-controls="ariaId"
    >
      <strong>{{ title }}</strong>
    </div>
    <div
    class="panel-block"
    style="background-color: white; position: relative;"
    :style="!title?.length ? 'border-radius: 6px;' : ''"
    >
      <slot />
    </div>
  </b-collapse>
</template>
