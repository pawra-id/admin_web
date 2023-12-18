<script setup lang="ts">
import { ref, computed } from 'vue'
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'

const props = defineProps({
    modelValue: {
        required: true,
    },
    data: {
        type: Array,
        required: true,
        default() {
            return { id: 0, name: '', value: '' }
        }
    },
    initial: {
        type: Object,
        required: false,
        default: { id: 0, name: 'Select', value: '' }
    }
})

const select = ref(props.initial.name)

const emit = defineEmits(['update:modelValue'])

const value = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        select.value = value.name
        emit('update:modelValue', value.value)
    }
})
</script>

<template>
    <Listbox as="div" v-model="value">
        <div class="relative">
            <ListboxButton
                class="relative w-full cursor-default rounded-md bg-white/5 py-1.5 pl-3 pr-10 text-left text-white shadow-sm ring-1 ring-inset ring-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-600 sm:text-sm sm:leading-6">
                <span class="block truncate">{{ select }}</span>
                <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
            </ListboxButton>

            <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100"
                leave-to-class="opacity-0">
                <ListboxOptions
                    class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    <ListboxOption as="template" v-for="item in data" :key="item?.id" :value="item"
                        v-slot="{ active, selected }">
                        <li
                            :class="[active ? 'bg-emerald-600 text-white' : 'text-white', 'relative cursor-default select-none py-2 pl-8 pr-4']">
                            <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">{{
                                item.name }}</span>

                            <span v-if="selected"
                                :class="[active ? 'text-white' : 'text-emerald-600', 'absolute inset-y-0 left-0 flex items-center pl-1.5']">
                                <CheckIcon class="h-5 w-5" aria-hidden="true" />
                            </span>
                        </li>
                    </ListboxOption>
                </ListboxOptions>
            </transition>
        </div>
    </Listbox>
</template>