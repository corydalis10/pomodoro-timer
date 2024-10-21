<script setup>
import PomodoroTimer from './components/PomodoroTimer.vue'
// importing onMounted from vue
import { ref, onMounted } from 'vue'

// reactive state for light/dark mode
const isLightMode = ref(localStorage.getItem('mode') === 'light')

// function to toggle light/dark mode
const toggleMode = () => {
  isLightMode.value = !isLightMode.value
  document.body.classList.toggle('light-mode', isLightMode.value)
  localStorage.setItem('mode', isLightMode.value ? 'dark' : 'light')
}

// on mount
onMounted(() => {
  if (isLightMode.value) {
    document.body.classList.add('light-mode');
  }
});

</script>

<template>
  <!--adding a div to wrap the content and apply the dark-mode class conditionally-->
<div :class="{ 'light-mode': isLightMode }" class="body-container">
  <!--title-->
  <h1>Welcome to Cuchi Pomodoro</h1>
  <!--toggle button-->
  <button @click="toggleMode" class="toggle-mode">
    {{ isLightMode ? 'Dark Mode' : 'Light Mode' }}
  </button>
  <!--pomodoro timer component-->
  <PomodoroTimer></PomodoroTimer>
</div>
</template>

<style scoped>
/* dark mode */
@import './assets/main.css';

/* light mode */
@import './assets/light-mode.css';

</style>
