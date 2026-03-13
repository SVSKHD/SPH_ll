<template>
  <div class="lockscreen">
    <!-- Glass overlay -->
    <div class="lockscreen-glass"></div>

    <div class="lockscreen-content">
      <!-- Lock icon -->
      <div class="lock-icon-wrapper">
        <q-icon name="eva-lock-outline" size="48px" />
      </div>

      <!-- Love Quote -->
      <p class="lock-quote">"{{ loveQuote.text }}"</p>
      <p class="lock-quote-author">— {{ loveQuote.author }}</p>

      <h2 class="lock-title">Enter Birthday</h2>
      <p class="lock-subtitle">Verify your identity to continue</p>

      <!-- Birthday Input -->
      <div class="lock-input-group">
        <SphInput
          v-model="birthday"
          mask="####-##-##"
          :error="hasError"
          error-message="Birthday not recognized"
          @keyup.enter="verifyBirthday"
          color="white"
          input-style="color: var(--sph-light)"
          class="lock-input"
        >
          <template v-slot:prepend>
            <q-icon name="eva-calendar-outline" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="birthday" mask="YYYY-MM-DD" class="sph-calendar">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat no-caps />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </SphInput>

        <q-btn
          class="lock-submit-btn"
          unelevated
          no-caps
          label="Unlock"
          @click="verifyBirthday"
        >
          <q-icon :name="VALID_DATES.includes(birthday) ? 'eva-unlock-outline' : 'eva-lock-outline'" size="20px" class="q-ml-sm" />
        </q-btn>
      </div>

      <!-- Divider -->
      <div class="lock-divider">
        <span>or</span>
      </div>

      <!-- Gmail Login -->
      <q-btn
        class="lock-gmail-btn"
        unelevated
        no-caps
        @click="loginWithGmail"
        icon="eva-google"
      >
        <span class="q-ml-md">Continue with Gmail</span>
      </q-btn>
    </div>

    <!-- Passcode Dialog -->
    <passwordDialog :showPasscode="showPasscode" :pinError="pinError" @cancelPasscode="cancelPasscode" @verifyPin="verifyPin" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import passwordDialog from '../components/passwordDialog.vue';
const router = useRouter();

const loveQuotes = [
  { text: 'Love is composed of a single soul inhabiting two bodies.', author: 'Aristotle' },
  { text: 'The best thing to hold onto in life is each other.', author: 'Audrey Hepburn' },
  { text: 'You know you\'re in love when you can\'t fall asleep because reality is finally better than your dreams.', author: 'Dr. Seuss' },
  { text: 'I have decided to stick with love. Hate is too great a burden to bear.', author: 'Martin Luther King Jr.' },
  { text: 'Where there is love there is life.', author: 'Mahatma Gandhi' },
  { text: 'To love and be loved is to feel the sun from both sides.', author: 'David Viscott' },
  { text: 'Love is not about how many days, months, or years you have been together. It\'s all about how much you love each other every single day.', author: 'Unknown' },
  { text: 'In all the world, there is no heart for me like yours.', author: 'Maya Angelou' },
  { text: 'I love you not because of who you are, but because of who I am when I am with you.', author: 'Roy Croft' },
  { text: 'Love recognizes no barriers.', author: 'Maya Angelou' },
];

const loveQuote = loveQuotes[Math.floor(Math.random() * loveQuotes.length)];
const birthday = ref('');
const hasError = ref(false);
const showPasscode = ref(false);
const pin = ref('');
const pinError = ref(false);

const VALID_DATES = ['1995-07-26', '1999-10-17'];
const VALID_PIN = '2617';

const userMap: Record<string, string> = {
  '1995-07-26': 'Mio',
  '1999-10-17': 'Mia',
};

let currentUser = '';

const verifyBirthday = () => {
  if (VALID_DATES.includes(birthday.value)) {
    hasError.value = false;
    currentUser = userMap[birthday.value] || '';
    showPasscode.value = true;
    pin.value = '';
    pinError.value = false;
  } else {
    hasError.value = true;
  }
};

const verifyPin = (emittedPin?: string) => {
  // Use either the emitted pin or fallback if it is called locally somehow
  const currentPin = emittedPin && typeof emittedPin === 'string' ? emittedPin : pin.value;
  console.log(currentPin, VALID_PIN);
  if (currentPin === VALID_PIN) {
    pinError.value = false;
    showPasscode.value = false;
    router.push({ path: '/home', query: { user: currentUser } });
  } else {
    pinError.value = true;
  }
};

const cancelPasscode = () => {
  showPasscode.value = false;
  pin.value = '';
  pinError.value = false;
};

const loginWithGmail = () => {
  // TODO: implement Gmail / Google sign-in
  console.log('Gmail login');
};
</script>

<style scoped>
/* Glassmorphism theme for the calendar matching the app */
:deep(.sph-calendar) {
  background: var(--sph-light);
  backdrop-filter: blur(20px) saturate(150%);
  -webkit-backdrop-filter: blur(20px) saturate(150%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff !important;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

:deep(.sph-calendar .q-date__header) {
  background: var(--sph-light) !important;
  color: white !important;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
}

:deep(.sph-calendar .q-date__header-link.q-date__header-link--active) {
  color: var(--sph-light) !important;
  opacity: 1 !important;
}

:deep(.sph-calendar .q-btn) {
  color: #fff !important;
}

:deep(.sph-calendar .bg-primary) {
  background-color: var(--sph-light) !important;
}

:deep(.sph-calendar .text-primary) {
  color: var(--sph-light) !important;
}

/* Make sure days that are NOT selected but hovered get the accent color lightly */
:deep(.sph-calendar .q-date__calendar-item button:hover:not(.bg-primary)) {
  background: var(--sph-light) !important;
}

.row.items-center.justify-end {
  padding: 8px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}
</style>
