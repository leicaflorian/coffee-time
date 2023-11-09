<script lang="ts" setup>

import { onMounted, ref, watch } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'

const open = ref(false)
const newEndTime = ref('')
const endTime = ref('23:28')
const startDate = ref(null)
const timer = ref(null)
const remainingTime = ref('00:00')

const emits = defineEmits(['time-up', 'time-update'])

function showDialog () {
  open.value = true
  newEndTime.value = endTime.value
}

function onClose () {
  open.value = false
}

function onStop () {
  if (timer.value) {
    clearTimeout(timer.value)
  }

  open.value = false
}

function onApply () {
  open.value = false
  startDate.value = new Date()
  endTime.value = newEndTime.value

  timerTick()
}

function timerTick (event) {
  if (timer.value) {
    clearTimeout(timer.value)
  }

  const endDate = new Date(new Date().toDateString() + ' ' + endTime.value)
  // endDate.setSeconds(0)

  timer.value = setTimeout(() => {
    const diff = endDate - new Date()
    const percentageDiff =  (100  * diff / (endDate - startDate.value )).toFixed(1)

    emits('time-update', percentageDiff)

    if (diff <= 0) {
      clearTimeout(timer.value)

      emits('time-up')

      return
    }

    const diffTime = new Date(diff)
    const minutes = diffTime.getMinutes().toString().padStart(2, '0')
    const seconds = diffTime.getSeconds().toString().padStart(2, '0')

    remainingTime.value = `${minutes}:${seconds}`

    timerTick()
  }, 250)
}

onMounted(() => {
  const now = new Date()

  now.setMinutes(now.getMinutes() + 15)

  endTime.value = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
})
</script>

<template>
  <a href="#" @click="showDialog" class="text-yellow-200 font-semibold underline cursor-pointer">{{ remainingTime }}</a>

  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="open = false">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                       leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300"
                           enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                           enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                           leave-from="opacity-100 translate-y-0 sm:scale-100"
                           leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel
                class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-lg">
              <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div
                      class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationTriangleIcon class="h-6 w-6 text-red-600" aria-hidden="true"/>
                  </div>
                  <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                    <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">
                      Tempo per bersi un caffè
                    </DialogTitle>

                    <div class="mt-2">
                      <div class="sm:col-span-4">
                        <label for="username" class="block text-sm font-medium leading-6 text-gray-900">
                          Indicare a che ora finirà la pausa
                        </label>
                        <div class="mt-2">
                          <div
                              class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <input type="time"
                                   class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 focus:ring-0 focus:outline-0 sm:text-sm sm:leading-6"
                                   v-model="newEndTime"/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button type="button"
                        class="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                        @click="onApply">
                  Avvia
                </button>
                <button type="button"
                        class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-red-300 hover:bg-red-500 hover:text-white sm:mt-0 sm:w-auto"
                        @click="onStop" ref="cancelButtonRef">
                  Ferma
                </button>

                <button type="button"
                        class="mt-3 me-auto inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        @click="onClose" ref="cancelButtonRef">
                  Chiudi
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>

</template>

<style scoped lang="scss">

</style>
