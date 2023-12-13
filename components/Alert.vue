<script setup lang="ts">
import { CheckCircleIcon, XMarkIcon } from '@heroicons/vue/20/solid'
import { useAlertMessage } from '~/composables/useState';

const message = ref('');
const status = ref('')

watchEffect(() => {
    message.value = useAlertMessage().value;
});

watchEffect(() => {
    status.value = useAlertType().value;
});

const show = useShowAlert()

const closeAlert = () => {
    //hide alert
    show.value = false;
}

//set timeout to hide alert after 5 seconds
setTimeout(() => {
    show.value = false;
}, 5000);
</script>

<template>
    <div :class="status === 'error' ? 'bg-red-50' : 'bg-green-50'"  v-if="show"
        class="rounded-md p-4 fixed right-8 w-[30%]" id="alertBox">
        <div class="flex">
            <div class="flex-shrink-0">
                <CheckCircleIcon class="h-5 w-5 " :class="status === 'error' ? 'text-red-400' : 'text-green-400'" aria-hidden="true" />
            </div>
            <div class="ml-3">
                <p class="text-sm font-medium" :class="status === 'error' ? 'text-red-800' : 'text-green-800'">{{ message }}</p>
            </div>
            <div class="ml-auto pl-3">
                <div class="-mx-1.5 -my-1.5">
                    <button type="button" v-if="status !== 'error'" @click.prevent="closeAlert"
                        class="inline-flex rounded-md bg-green-50 p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50">
                        <span class="sr-only">Dismiss</span>
                        <XMarkIcon class="h-5 w-5" aria-hidden="true" />
                    </button>
                    <button type="button" v-else @click.prevent="closeAlert"
                        class="inline-flex rounded-md bg-red-50 p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50">
                        <span class="sr-only">Dismiss</span>
                        <XMarkIcon class="h-5 w-5" aria-hidden="true" />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
