<template>
  <q-input
    v-bind="$attrs"
    dense
    class="sph-input"
  >
    <template v-for="(_, name) in $slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData || {}" />
    </template>
  </q-input>
</template>

<script setup lang="ts">
// Custom wrapper for q-input
// Dense by default, uses --sph-accent theming, prevents Quasar color overrides
defineOptions({ inheritAttrs: false });
</script>
