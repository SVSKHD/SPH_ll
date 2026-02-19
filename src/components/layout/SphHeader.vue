<template>
  <q-header class="ios-glass q-ma-xs rounded-xl bg-transparent text-grey-10">
    <!-- SVG filter: distorts the highlight/noise layers to simulate refraction -->
    <svg class="glass-svg" width="0" height="0" aria-hidden="true">
      <filter id="glassDistort">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.012"
          numOctaves="2"
          seed="8"
          result="noise"
        />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="18" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>

    <!-- base frosted layer (this is the real backdrop blur) -->
    <div class="glass-backdrop" />

    <!-- “refraction” illusion layers (distorted highlights + grain) -->
    <div class="glass-refract" />
    <div class="glass-grain" />

    <!-- Floating Hearts Backend -->
    <div class="hearts-container">
      <div 
        v-for="n in 15" 
        :key="n" 
        class="floating-heart"
        :style="getRandomStyle()"
      >
        ❤️
      </div>
    </div>

    <SphToolbar class="toolbar q-px-md">
      <SphToolbarTitle shrink class="row items-center q-mr-md">
        <SphAvatar class="q-mr-sm lub-dub bg-transparent" style="font-size: 50px;">
          🫀
        </SphAvatar>
      </SphToolbarTitle>

      <q-space />

      <!-- Centered Tabs -->
      <SphTabs
        v-model="tab"
        shrink
        dense
        no-caps
        indicator-color="transparent"
        
        class="text-grey-7 glass-tabs"
      >
        <SphTab name="home" icon="eva-home-outline" />
        <SphTab name="search" icon="eva-search-outline" />
        <SphTab name="notifications" icon="eva-bell-outline" />
        <SphTab name="profile" icon="eva-person-outline" />
      </SphTabs>
      
      <q-space />
      
      <!-- Placeholder right side (optional) -->
      <div style="width: 80px;" /> 

    </SphToolbar>
  </q-header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SphTab from '../SphTab.vue';
import SphToolbar from '../common/SphToolbar.vue';
import SphToolbarTitle from '../common/SphToolbarTitle.vue';
import SphAvatar from '../common/SphAvatar.vue';
import SphTabs from '../common/SphTabs.vue';

const tab = ref('home');

// Generate random styles for floating hearts
const getRandomStyle = () => {
  // Avoid center area (30% - 70%) to not overlap tabs
  // Avoid left area (0% - 14%) to not overlap avatar heart
  const isLeft = Math.random() > 0.5;
  const left = isLeft 
    ? 14 + Math.random() * 16 // 14-30%
    : 70 + Math.random() * 30; // 70-100%

  const delay = Math.random() * 5; // 0s to 5s delay
  const duration = 3 + Math.random() * 4; // 3s to 7s duration
  const scale = 0.5 + Math.random() * 0.5; // 0.5 to 1.0 size
  
  return {
    left: `${left}%`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
    transform: `scale(${scale})`,
    opacity: Math.random() * 0.5 + 0.1 // Random opacity
  }
}
</script>
