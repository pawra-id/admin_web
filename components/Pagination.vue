<script setup lang="ts">
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/vue/20/solid'

defineProps({
  page: {
    type: Number,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  pages: {
    type: Number,
    required: true
  }
})

</script>

<template>
  <nav class="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
    <div class="-mt-px flex w-0 flex-1">
      <button @click.prevent="$emit('previous')" :disabled="page === 1"
        class="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-emerald-500 hover:border-emerald-300 hover:text-emerald-700">
        <ArrowLongLeftIcon class="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
        Previous
      </button>
    </div>
    <div class="hidden md:-mt-px md:flex">
      <!-- Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" -->
      <button @click.prevent="$emit('to', i)" v-for="i in pages"
        :class="i === page ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
        class="inline-flex items-center border-t-2  px-4 pt-4 text-sm font-medium ">
        {{ i }}
      </button>     
    </div>
    <div class="-mt-px flex w-0 flex-1 justify-end">
      <button @click.prevent="$emit('next')" :disabled="page === pages"
        class="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-emerald-500 hover:border-emerald-300 hover:text-emerald-700">
        Next
      <ArrowLongRightIcon class="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
    </button>
  </div>
</nav></template>
