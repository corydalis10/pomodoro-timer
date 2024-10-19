<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const props = defineProps({
  initialTime: {
    type: Number,
    required: true,
    default: 1500,
  },
})

const timeLeft = ref(props.initialTime)
const timerRunning = ref(false)
let timerInterval

const startTimer = () => {
  if (timerRunning.value) return

  timerRunning.value = true
  timerInterval = setInterval(() => {
    timeLeft.value--
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
}

.button {
  background-color: #91d293;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 8px;
  border: none;
}
</style>
