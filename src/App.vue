<script setup>
import PomodoroTimer from './components/PomodoroTimer.vue'
import SpotifyPlayer from './components/SpotifyPlayer.vue'

import { ref, onMounted } from 'vue'

const isDarkMode = ref(localStorage.getItem('mode') === 'dark')

const toggleMode = () => {
  isDarkMode.value = !isDarkMode.value
  document.body.classList.toggle('dark-mode', isDarkMode.value)
  localStorage.setItem('mode', isDarkMode.value ? 'dark' : 'light')
}

onMounted(() => {
  if (isDarkMode.value) {
    document.body.classList.add('dark-mode')
  }
})
</script>

<template>
  <div :class="{ 'dark-mode': isDarkMode }" class="body-container">
    <h1>Welcome to Cuchi Pomodoro</h1>
    <button class="button" @click="toggleMode">
      {{ isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode' }}
    </button>

    <!-- Pomodoro Timer -->
    <PomodoroTimer />

    <!-- Spotify Player -->
    <SpotifyPlayer />
  </div>
</template>

<style scoped>
/* light mode */
@import './assets/main.css';

/* dark mode */
@import './assets/dark-mode.css';
</style>
