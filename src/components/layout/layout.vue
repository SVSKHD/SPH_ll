<template>
  <SphLayout view="hHh lpR fFf">

    <SphHeader/>

    <SphPageContainer>
        <div class="q-pa-xl rounded-xl">
      <router-view />
        </div>
    </SphPageContainer>

    <SphFooter />

  </SphLayout>
</template>

<script setup lang="ts">
</script>