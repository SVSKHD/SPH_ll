<template>
  <q-tab
    class="spl-tab glass-tab text-grey-7"
    :name="name"
    :icon="icon"
    :label="label"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
defineProps<{
  name: string | number;
  icon?: string;
  label?: string;
}>();
</script>

<style scoped>
.spl-tab {
  transition: all 0.3s ease;
  border-radius: 12px;
  margin: 0 4px;
}

/* Active state: Heavy Glass effect */
.spl-tab.q-tab--active {
  background: rgba(255, 255, 255, 0.25); /* Heavy transparent */
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

/* Hover effect */
.spl-tab:hover:not(.q-tab--active) {
  background: rgba(255, 255, 255, 0.1);
  color: #333;
}

/* Icon size consistency */
:deep(.q-tab__icon) {
  width: 24px;
  height: 24px;
}
</style>
