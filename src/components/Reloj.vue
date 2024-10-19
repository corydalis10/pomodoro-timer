<script setup>
import { ref, onMounted } from 'vue'

const horaActual = ref('')

const actualizarHora = () => {
  const ahora = new Date()
  horaActual.value = ahora.toLocaleTimeString()
}

onMounted(() => {
  actualizarHora()
  setInterval(actualizarHora, 1000)
})
</script>

<template>
  <div class="reloj">
    {{ horaActual }}
  </div>
</template>

<style scoped>
.reloj {
  font-size: 2rem;
  text-align: center;
}
</style>
