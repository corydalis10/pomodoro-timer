<script setup>
import PomodoroTimer from './components/PomodoroTimer.vue'
import { ref, onMounted } from 'vue'
import '@/assets/toggle.css'

const isDarkMode = ref(localStorage.getItem('mode') === 'dark')
const toggleMode = () => {
  isDarkMode.value = !isDarkMode.value
  document.body.classList.toggle('dark-mode', isDarkMode.value)
  localStorage.setItem('mode', isDarkMode.value ? 'dark' : 'light')
}

// Sound notif (enabled by default)
const soundEnabled = ref(true)

const toggleSound = () => {
  soundEnabled.value = !soundEnabled.value
}

onMounted(() => {
  if (isDarkMode.value) {
    document.body.classList.add('dark-mode')
  }
})
</script>

<template>
  <div :class="{ 'dark-mode': isDarkMode }" class="body-container">
    <div class="toggle-container">
      <label class="switch">
        <input type="checkbox" v-model="soundEnabled" />
        <span class="slider"></span>
      </label>
      <span class="toggle-label">{{
        soundEnabled ? 'Sound On' : 'Sound Off'
      }}</span>
    </div>

    <h1>Welcome to Pomodoro Timer</h1>

    <button class="button" @click="toggleMode">
      {{ isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode' }}
    </button>

    <PomodoroTimer :sound-enabled="soundEnabled"></PomodoroTimer>
  </div>
</template>
