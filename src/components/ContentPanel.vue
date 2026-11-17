<script setup lang="ts">
defineProps<{
  title?: string,
  ariaId?: string,
}>()
</script>

<template>
  <div class="glass-card">
    <div class="glass-card-glow" />
    <b-collapse
    :aria-id="ariaId"
    class="panel glass-card-surface"
    animation="slide"
    >
      <template v-if="title?.length" #trigger="props">
        <div
        class="panel-heading"
        role="button"
        :aria-controls="ariaId"
        >
          <h3>{{ title }}</h3>
          <b-icon :icon="props.open ? 'chevron-up' : 'chevron-down'" />
        </div>
      </template>
      <div class="panel-block">
        <slot />
      </div>
    </b-collapse>
  </div>
</template>

<style lang="scss">
// Figma catalog card: 2px gradient border, blue glow, dark frosted surface
.glass-card {
  position: relative;
  width: 100%;
  max-width: 960px;
  padding: 2px;
  border-radius: 14px;
  background: var(--card-border);

  &:not(:last-child) {
    margin-bottom: 1.5rem;
  }

  &:hover > .glass-card-surface {
    box-shadow: 0 20px 48px -12px rgba(0, 0, 0, 0.6);
  }
}

.glass-card-glow {
  position: absolute;
  pointer-events: none;
  inset: -4px;
  border-radius: 18px;
  background: var(--glow);
  filter: blur(8px);
  z-index: 0;
}

.panel.glass-card-surface {
  position: relative;
  z-index: 2;
  margin: 0;
  overflow: hidden;
  border: none;
  border-radius: 13px;
  background-color: var(--card-surface);
  -webkit-backdrop-filter: blur(24px);
  backdrop-filter: blur(24px);
  box-shadow: 0 8px 32px -8px rgba(0, 0, 0, 0.45);
  transition: box-shadow 0.2s ease-out;

  .panel-heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 20px;
    border-radius: 0;
    background: transparent;
    cursor: pointer;

    h3 {
      margin: 0;
      font-family: var(--font-heading);
      font-size: 17px;
      font-weight: 700;
      line-height: 22px;
      color: var(--fg-strong);
    }

    .icon {
      color: var(--fg-faint);
    }
  }

  .panel-block {
    display: block;
    position: relative;
    padding: 0 20px 20px;
    border: none;
    background: transparent;
    color: var(--fg);

    &:first-child {
      padding-top: 20px;
    }
  }
}
</style>
