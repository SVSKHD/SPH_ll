<template>
  <q-footer class="spl-footer ios-glass bg-transparent text-grey-10">
    <!-- SVG filter: distorts the highlight/noise layers to simulate refraction -->
    <svg class="glass-svg" width="0" height="0" aria-hidden="true">
      <filter id="glassDistortFooter">
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

    <!-- base frosted layer -->
    <div class="glass-backdrop" />

    <!-- “refraction” illusion layers -->
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

    <SphToolbar class="toolbar">
      <SphToolbarTitle class="text-center text-white">

        <div 
          class="love-container"
          @mouseenter="hovered = true"
          @mouseleave="hovered = false"
          @click="pulse"
        >
          <span class="made-text">Made with</span>

          <span 
            class="heart"
            :class="{ active: hovered || pulsing }"
          >
            ❤️
          </span>

          <span class="by-text">by SPH</span>
        </div>

      </SphToolbarTitle>
    </SphToolbar>
  </q-footer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import SphToolbar from '../common/SphToolbar.vue';
import SphToolbarTitle from '../common/SphToolbarTitle.vue';

const hovered = ref(false)
const pulsing = ref(false)

const pulse = () => {
  pulsing.value = true
  setTimeout(() => {
    pulsing.value = false
  }, 600)
}

// Generate random styles for floating hearts
const getRandomStyle = () => {
  const left = Math.random() * 100; // 0% to 100%
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
