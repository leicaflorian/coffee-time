<script setup lang="ts">
import TimeDialog from '@/components/TimeDialog.vue'
import { ref, watch } from 'vue'

const timeUp = ref(false)
const imgOpacity = ref(1)
const timeUp_image = ref(null)
const timeUpColor = ref(null)

function onTimeUp () {
  timeUp.value = true
}

function onTimeUpdate (percentageDiff) {
  console.log(percentageDiff)

  imgOpacity.value = (percentageDiff / 100)
}

function getColor(){
  var canvas = document.createElement('canvas')
  const image = document.querySelector('#timeUp_image')
  canvas.width = image.width
  canvas.height = image.height
  var context = canvas.getContext('2d')
  context.drawImage(image, 0, 0)

  var imageData = context.getImageData(0, 0, canvas.width, canvas.height)

  const x = 0
  const y = 0
  // Now you can access pixel data from imageData.data.
  // It's a one-dimensional array of RGBA values.
  // Here's an example of how to get a pixel's color at (x,y)
  var index = (y * imageData.width + x) * 4
  var red = imageData.data[index]
  var green = imageData.data[index + 1]
  var blue = imageData.data[index + 2]
  var alpha = imageData.data[index + 3]

  console.log(red, green, blue, alpha)
}

watch(() => timeUp_image.value, () => {
  if (timeUp_image.value) {
    timeUp_image.value.onload = function () {


      // setInterval(() => {
       // getColor()
      // }, 100)
    }
  }

})

</script>

<template>
  <main class="min-h-screen bg-primary flex items-center justify-center"
        :class="{flash: timeUp}"
        :style="'background-color:' + timeUpColor ?? ''">

    <img src="/coffee_anim.gif" alt="coffee animation" class="max-h-[80vh] object-contain w-1/2"
         :style="'opacity: ' + imgOpacity " v-if="!timeUp">

    <img src="/caveman_anim.gif" alt="working animation" class="max-h-[80vh] object-contain w-1/2"
         style="mix-blend-mode: multiply"
         v-else ref="timeUp_image" id="timeUp_image">

    <div class="text-white  w-1/2">
      <h1 class="text-6xl font-semibold mb-6" v-if="!timeUp">Ah, che bellu ccafè</h1>
      <h1 class="text-6xl font-semibold mb-6" v-else>Tempo scaduto!</h1>

      <h2 class="text-4xl" v-if="!timeUp">
        Torniamo tra
        <TimeDialog @time-up="onTimeUp" @time-update="onTimeUpdate">xx:xx</TimeDialog>
        min
      </h2>

      <h2 class="text-4xl" v-else>
        Dove eravamo rimasti?
      </h2>
    </div>
  </main>
</template>

<style scoped>

main.flash {
animation: bg-animation 8s infinite both;
}

</style>
