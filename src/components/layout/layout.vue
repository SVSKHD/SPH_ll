<template>
  <SphLayout view="hHh lpR fFf">

    <SphHeader/>

    <SphPageContainer>
      <div class="layout-card-wrapper q-pa-md">
       
            <div class="q-pa-lg">
              <router-view />
            </div>

      </div>
    </SphPageContainer>

    <SphFooter />

  </SphLayout>
</template>

<script setup lang="ts">
</script>