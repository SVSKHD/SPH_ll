<template>
  <SphPage class="home-page">

    <!-- Greet Card -->
    <SphCard class="home-card greet-card">
      <q-card-section class="greet-row">
        <div class="greet-left">
          <h2 class="greet-title"><span class="greet-emoji">{{ greeting.icon }}</span> {{ greeting.text }}</h2>
          <p class="greet-subtitle">{{ greeting.sub }}</p>
          <div class="greet-quote-container" @mouseenter="pauseTyping" @mouseleave="resumeTyping">
            <p class="greet-quote">"{{ typedText }}<span class="typing-cursor" :class="{ 'is-typing': !isTypingPaused }">|</span>"</p>
          </div>
        </div>
        <div class="greet-right">
          <q-btn
            flat
            round
            class="greet-lock-btn"
            @click="lockApp"
          >
            <q-icon name="eva-lock-outline" size="24px" />
          </q-btn>
          <span class="greet-date">{{ todayDate }}</span>
        </div>
      </q-card-section>
    </SphCard>

    <!-- Score Card: Mia vs Mio -->
    <SphCard class="home-card score-card">
      <q-card-section class="score-compact">
        <!-- Compact VS Header -->
        <div class="score-vs-compact" @click="showStats = !showStats">
          <div class="score-player-compact">
            <span class="player-avatar-sm">👩</span>
            <span class="player-name-sm">Mia</span>
            <span class="player-score-sm">86</span>
          </div>
          <div class="vs-badge">VS</div>
          <div class="score-player-compact">
            <span class="player-score-sm">72</span>
            <span class="player-name-sm">Mio</span>
            <span class="player-avatar-sm">👨</span>
          </div>
          <div class="score-trailing">
            <span class="leading-badge">👑 Mia</span>
            <span class="days-to-win">5 days to catch up</span>
            <q-icon
              :name="showStats ? 'eva-chevron-up-outline' : 'eva-chevron-down-outline'"
              size="18px"
              class="stats-toggle"
            />
          </div>
        </div>

        <!-- Expandable Stats -->
        <transition name="slide-stats">
          <div v-if="showStats" class="score-stats-compact">
            <div class="stat-row-compact" v-for="stat in stats" :key="stat.label">
              <span class="stat-val" :class="{ winner: stat.mia > stat.mio }">{{ stat.mia }}</span>
              <span class="stat-cat">{{ stat.icon }} {{ stat.label }}</span>
              <span class="stat-val" :class="{ winner: stat.mio > stat.mia }">{{ stat.mio }}</span>
            </div>
          </div>
        </transition>
      </q-card-section>
    </SphCard>

  </SphPage>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import SphPage from '../components/common/SphPage.vue';
import SphCard from '../components/common/SphCard.vue';

const router = useRouter();
const route = useRoute();

const userName = computed(() => (route.query.user as string) || 'Love');

const greeting = computed(() => {
  const hour = new Date().getHours();
  const name = userName.value;
  if (hour < 12) {
    return { icon: '☀️', text: `Good Morning, ${name}!`, sub: 'Rise and shine, beautiful ✨' };
  } else if (hour < 17) {
    return { icon: '🌤️', text: `Good Afternoon, ${name}!`, sub: 'Hope your day is going great 💕' };
  } else {
    return { icon: '🌙', text: `Good Evening, ${name}!`, sub: 'Time to relax and unwind 💫' };
  }
});

const todayDate = computed(() => {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric'
  });
});

// Score card data
const showStats = ref(false);
const stats = [
  { icon: '🎯', label: 'Challenges', mia: 12, mio: 9 },
  { icon: '💌', label: 'Love Notes', mia: 48, mio: 52 },
  { icon: '📸', label: 'Photos', mia: 26, mio: 11 },
];

// Typing effect love quotes
const loveQuotes = [
  'Love is composed of a single soul inhabiting two bodies.',
  'The best thing to hold onto in life is each other.',
  'Where there is love there is life.',
  'To love and be loved is to feel the sun from both sides.',
  'In all the world, there is no heart for me like yours.',
  'Love recognizes no barriers.',
  'You are my today and all of my tomorrows.',
  'Every love story is beautiful, but ours is my favorite.',
];

const typedText = ref('');
let quoteIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingTimer: ReturnType<typeof setTimeout> | null = null;
const isTypingPaused = ref(false);

const typeEffect = () => {
  if (isTypingPaused.value) return;
  
  const currentQuote = loveQuotes[quoteIndex];

  if (!isDeleting) {
    typedText.value = currentQuote.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentQuote.length) {
      isDeleting = true;
      typingTimer = setTimeout(typeEffect, 3000); // pause before erasing
      return;
    }
    typingTimer = setTimeout(typeEffect, 120); // slower typing
  } else {
    typedText.value = currentQuote.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      quoteIndex = (quoteIndex + 1) % loveQuotes.length;
      typingTimer = setTimeout(typeEffect, 1000); // pause before next quote
      return;
    }
    typingTimer = setTimeout(typeEffect, 60); // slower deleting
  }
};

const pauseTyping = () => {
  isTypingPaused.value = true;
  if (typingTimer) clearTimeout(typingTimer);
};

const resumeTyping = () => {
  isTypingPaused.value = false;
  typeEffect();
};

onMounted(() => {
  typeEffect();
});

onUnmounted(() => {
  if (typingTimer) clearTimeout(typingTimer);
});

const lockApp = () => {
  router.push('/');
};
</script>

<style scoped>
.greet-quote-container {
  display: inline-block;
  padding: 4px 8px;
  margin: 4px -8px 0;
  border-radius: 8px;
  transition: background 0.3s ease, transform 0.3s ease;
  cursor: default;
}

.greet-quote-container:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(4px);
}

.greet-quote {
  margin: 0;
  font-style: italic;
  font-size: 0.85rem;
  opacity: 0.8;
  min-height: 1.2em;
  line-height: 1.4;
  transition: opacity 0.3s ease;
}

.typing-cursor {
  color: var(--sph-accent);
  opacity: 1;
  font-style: normal;
  font-weight: 500;
  transition: opacity 0.2s ease;
}

.typing-cursor:not(.is-typing) {
  animation: blink 0.7s infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
</style>
