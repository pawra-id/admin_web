<script setup>
import { ref, onMounted } from 'vue'


const route = useRoute();

const pawraPath = usePath();
const token = useGetUserData().value.access_token;
const loading = ref(false);
const id = ref(route.params.id);
const act = ref();

await useFetch(`${pawraPath.value}/actions/${id.value}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        onResponseError: (res) => {
            console.log(res.response._data)
            if (res.response.status === 401) {
                useLogout();
            }
        }
    }).then(res => {
        act.value = res.data.value
    })


const updateAction = async () => {
    loading.value = true;
    await useFetch(`${pawraPath.value}/actions/${id.value}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(act.value),
        onResponseError: (res) => {
            useAlertMessage().value = 'failed to create action';
            useAlertType().value = 'error';
            useShowAlert().value = true;
            console.log(res.response._data)
            loading.value = false;
        }
    }).then(res => {
        action.value = res.data.value
        useAlertMessage().value = 'Action created successfully';
        useAlertType().value = 'success';
        useShowAlert().value = true;
        loading.value = false;
    }).finally(() => {
        loading.value = false;
    })
}

</script>

<template>
    <form autocomplete="off" @submit.prevent="updateAction">
        <div class="space-y-12">
            <div class="pb-12">
                <div class="flex items-center justify-between">
                    <div>
                        <h2 class="text-base font-semibold leading-7 text-white">Edit Action</h2>
                        <p class="mt-1 text-sm leading-6 text-gray-400">This information will be displayed publicly so be
                            careful
                            what you share.</p>
                    </div>
                    <div>
                        <!-- Back button -->
                        <NuxtLink to="/actions"
                            class="ml-auto rounded-md bg-emerald-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-800">
                            Back
                        </NuxtLink>
                    </div>
                </div>

                <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div class="sm:col-span-4">
                        <label for="action" class="block text-sm font-medium leading-6 text-white">
                            Action <span class="text-red-500">*</span>
                        </label>
                        <div class="mt-2">
                            <div
                                class="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-emerald-500">

                                <input v-model="act.action" type="text" name="action" id="action" required
                                    class="flex-1 border-0 bg-transparent py-1.5 pl-3 text-white focus:ring-0 sm:text-sm sm:leading-6"
                                    placeholder="janesmith" />
                            </div>
                        </div>
                    </div>

                    <div class="col-span-full">
                        <label for="description" class="block text-sm font-medium leading-6 text-white">Description</label>
                        <div class="mt-2">
                            <textarea id="description" name="action" rows="3" v-model="act.description"
                                class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:text-sm sm:leading-6">
                                {{ act.description }}
                            </textarea>
                        </div>
                        <p class="mt-3 text-sm leading-6 text-gray-400">Write a few sentences about yourself.</p>
                    </div>


                </div>

            </div>

        </div>

        <div class="mt-6 flex items-center justify-end gap-x-6">
            <NuxtLink to="/actions" class="text-sm font-semibold leading-6 text-white">Cancel</NuxtLink>
            <button type="submit" :disabled="loading"
                class="rounded-md bg-emerald-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500">
                <div v-if="loading">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.7em" height="1.7em" viewBox="0 0 24 24">
                        <path fill="currentColor"
                            d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25">
                        </path>
                        <path fill="currentColor"
                            d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z">
                            <animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate"
                                values="0 12 12;360 12 12"></animateTransform>
                        </path>
                    </svg>
                </div>
                <span v-else>Save</span>
            </button>
        </div>
    </form>
</template>
  