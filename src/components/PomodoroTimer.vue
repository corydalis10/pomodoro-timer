<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const props = defineProps({
  initialTime: {
    type: Number,
    required: true,
    default: 1500,
  },
  soundEnabled: {
    type: Boolean,
    default: true,
  },
})

const timeLeft = ref(props.initialTime)
const timerRunning = ref(false)
let timerInterval

const tickingBellSound = new Audio('/sound/timer-with-chime.mp3')

const startTimer = () => {
  if (timerRunning.value) return

  timerRunning.value = true
  timerInterval = setInterval(() => {
    timeLeft.value--

    if (timeLeft.value === 11 && props.soundEnabled) {
      tickingBellSound.play()
    }

    if (timeLeft.value <= 0) {
      clearInterval(timerInterval)
      timerRunning.value = false
    }
  }, 1000)
}

const stopTimer = () => {
  clearInterval(timerInterval)
  timerRunning.value = false
}

const resumeTimer = () => {
  if (timeLeft.value > 0) {
    startTimer()
  }
}

const minutes = computed(() => {
  return Math.floor(timeLeft.value / 60)
    .toString()
    .padStart(2, '0')
})

const seconds = computed(() => {
  return (timeLeft.value % 60).toString().padStart(2, '0')
})

onUnmounted(() => {
  clearInterval(timerInterval)
})
</script>

<template>
  <div class="counter">
    <div v-if="timeLeft > 0">{{ minutes }}:{{ seconds }}</div>
    <div v-else>¡You did it!</div>
    <button class="button" @click="startTimer" :disabled="timerRunning">
      Start
    </button>
    <button class="button" @click="timeLeft = props.initialTime">Reset</button>
    <button class="button" @click="timerRunning ? stopTimer() : resumeTimer()">
      {{ timerRunning ? 'Stop' : 'Resume' }}
    </button>
  </div>
</template>

<style scoped>
.counter {
  font-size: 2rem;
  text-align: center;
  color: rgb(66, 66, 66);
  background-color: rgb(252, 238, 238);
  border-radius: 0.5rem;
}

/* dark mode */
.dark-mode .counter {
  color: rgb(204, 190, 190);
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 0.5rem;
}

/* dark mode */
.dark-mode .button {
  background-color: rgb(126, 142, 97);
}
</style>
