<script setup>
import PomodoroTimer from './components/PomodoroTimer.vue'
// importing onMounted from vue
import { ref, onMounted } from 'vue'

// reactive state for light/dark mode
const isDarkMode = ref(localStorage.getItem('mode') === 'dark')

// function to toggle light/dark mode
const toggleMode = () => {
  isDarkMode.value = !isDarkMode.value
  document.body.classList.toggle('dark-mode', isDarkMode.value)
  localStorage.setItem('mode', isDarkMode.value ? 'dark' : 'light')
}

// on mount
onMounted(() => {
  if (isDarkMode.value) {
    document.body.classList.add('dark-mode')
  }
})
</script>

<template>
  <!--adding a div to wrap the content and apply the dark-mode class conditionally-->
  <div :class="{ 'dark-mode': isDarkMode }" class="body-container">
    <!--title-->
    <h1>Welcome to Cuchi Pomodoro</h1>
    <!--toggle button-->
    <button class="button" @click="toggleMode">
      {{ isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode' }}
    </button>
    <!--pomodoro timer component-->
    <PomodoroTimer></PomodoroTimer>
  </div>
</template>

<style scoped>
/* light mode */
@import './assets/main.css';

/* dark mode */
@import './assets/dark-mode.css';
</style>
