   <template>
   <q-dialog :model-value="showPasscode" persistent transition-show="scale" transition-hide="scale">
      <div class="passcode-card">
        <div class="passcode-icon-wrapper">
          <q-icon name="eva-keypad-outline" size="36px" />
        </div>
        <h3 class="passcode-title">Enter Passcode</h3>
        <p class="passcode-subtitle">Type your 4-digit PIN</p>

        <div class="passcode-dots">
          <span
            v-for="i in 4"
            :key="i"
            class="passcode-dot"
            :class="{ filled: pin.length >= i, error: pinError }"
          ></span>
        </div>

        <SphInput
          v-model="pin"
          type="password"
          maxlength="4"
          class="passcode-input"
          input-class="text-center"
          :error="pinError"
          error-message="Wrong passcode"
          @keyup.enter="verifyPin"
          color="white"
          autofocus
        />

        <div class="passcode-actions">
          <q-btn
            flat
            no-caps
            label="Cancel"
            class="passcode-cancel-btn"
            @click="cancelPasscode"
          />
          <q-btn
            unelevated
            no-caps
            label="Confirm"
            class="passcode-confirm-btn"
            @click="verifyPin"
          />
        </div>
      </div>
    </q-dialog>
    </template>

    <script setup lang="ts">
    import { ref, watch } from "vue"
    const props = defineProps({
      showPasscode: {
        type: Boolean,
        default: false
      },
      pinError: {
        type: Boolean,
        default: false
      }
    })
    const emit = defineEmits(['cancelPasscode', 'verifyPin'])
    const pin = ref('')
    
    // Clear the pin when the dialog becomes visible
    watch(() => props.showPasscode, (newVal) => {
      if (newVal) {
        pin.value = '';
      }
    })

    const verifyPin = () => {
      emit('verifyPin', pin.value)
    }
    const cancelPasscode = () => {
      emit('cancelPasscode')
    }
    </script>

    <style scoped>
    
    </style>