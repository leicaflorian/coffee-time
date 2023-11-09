<script lang="ts" setup>
import phrases from '../phrases.json'
import { onMounted, ref } from 'vue'

let timer
const phrase = ref('')

function seetRandomPhrase () {
  phrase.value = phrases[Math.floor(Math.random() * phrases.length)]
}

onMounted(() => {
  timer = setTimeout(() => {
    seetRandomPhrase()
  }, 30000) // 30 seconds

  seetRandomPhrase()
})

</script>

<template>

  <h3 class="text-2xl"><q class="">{{ phrase }}</q></h3>
</template>

<style scoped>
q {
  position: relative;
}

q:before, q:after {
  font-size: 4rem;
  position: absolute;
}

q:before {
  left: -1.4rem;
  top: -.4rem;
}

q:after {
  right: -1.4rem;
  bottom: -.4rem;
}
</style>
