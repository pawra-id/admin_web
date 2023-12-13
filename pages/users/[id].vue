<script setup>
import { PhotoIcon, UserCircleIcon } from '@heroicons/vue/24/solid'
import { ref } from 'vue'
import Login from '../login.vue';

const route = useRoute();
const pawraPath = usePath();
const token = useGetUserData().value.access_token;
const loading = ref(false);
const user = ref();

//get id from params
const id = route.params.id

//request user data from api with id
await useFetch(`${pawraPath.value}/users/${id}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
    },
    onResponseError: (res) => {
        console.log(res.response._data)
    }
}).then(res => {
    user.value = res.data.value
})

const updateUser = async () => {
    loading.value = true;
    await useFetch(`${pawraPath.value}/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(user.value),
        onResponseError: (res) => {
            useAlertMessage().value = 'failed to update user';
            useAlertType().value = 'error';
            useShowAlert().value = true;
            console.log(res.response._data)
        }
    }).then(res => {
        user.value = res.data.value
        useAlertMessage().value = 'User updated successfully';
        useAlertType().value = 'success';
        useShowAlert().value = true;
    }).finally(() => {
        loading.value = false;
    })
}

const getFile = () => {
    document.getElementById('file').click();
}

const uploadFile = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    await useFetch(`${pawraPath.value}/users/image`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        body: formData,
        onResponseError: (res) => {
            useAlertMessage().value = 'failed to upload image';
            useAlertType().value = 'error';
            useShowAlert().value = true;
            console.log(res.response._data)
        }
    }).then(res => {
        user.value.image = res.data.value
        updateUser();
    })
}
</script>

<template>
    <form autocomplete="off" @submit.prevent="updateUser">
        <div class="space-y-12">
            <div class="pb-12">
                <div class="flex items-center justify-between">
                    <div>
                        <h2 class="text-base font-semibold leading-7 text-white">Edit User</h2>
                        <p class="mt-1 text-sm leading-6 text-gray-400">This information will be displayed publicly so be
                            careful
                            what you share.</p>
                    </div>
                    <div>
                        <!-- Back button -->
                        <NuxtLink to="/users"
                            class="ml-auto rounded-md bg-emerald-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-800">
                            Back
                        </NuxtLink>
                    </div>
                </div>

                <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div class="sm:col-span-4">
                        <label for="username" class="block text-sm font-medium leading-6 text-white">Username</label>
                        <div class="mt-2">
                            <div
                                class="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-emerald-500">

                                <input v-model="user.username" type="text" name="username" id="username"
                                    class="flex-1 border-0 bg-transparent py-1.5 pl-3 text-white focus:ring-0 sm:text-sm sm:leading-6"
                                    placeholder="janesmith" />
                            </div>
                        </div>
                    </div>
                    <div class="sm:col-span-4">
                        <label for="email" class="block text-sm font-medium leading-6 text-white">Email</label>
                        <div class="mt-2">
                            <div
                                class="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-emerald-500">

                                <input v-model="user.email" type="email" name="email" id="email"
                                    class="flex-1 border-0 bg-transparent py-1.5 pl-3 text-white focus:ring-0 sm:text-sm sm:leading-6"
                                    placeholder="john@gmail.com" />
                            </div>
                        </div>
                    </div>
                    <div class="sm:col-span-4">
                        <label for="role" class="block text-sm font-medium leading-6 text-white">Role</label>
                        <div class="mt-2">
                            <div
                                class="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-emerald-500">

                                <input v-model="user.role" type="text" name="role" id="role"
                                    class="flex-1 border-0 bg-transparent py-1.5 pl-3 text-white focus:ring-0 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                    </div>

                    <div class="col-span-full">
                        <label for="summary" class="block text-sm font-medium leading-6 text-white">Summary</label>
                        <div class="mt-2">
                            <textarea id="summary" name="summary" rows="3" v-model="user.summary"
                                class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:text-sm sm:leading-6">
                                {{ user.summary }}
                            </textarea>
                        </div>
                        <p class="mt-3 text-sm leading-6 text-gray-400">Write a few sentences about yourself.</p>
                    </div>
                    <div class="col-span-full">
                        <label for="address" class="block text-sm font-medium leading-6 text-white">Address</label>
                        <div class="mt-2">
                            <textarea id="address" name="address" rows="3" v-model="user.address"
                                class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:text-sm sm:leading-6">
                                {{ user.address }}
                            </textarea>
                        </div>
                        <p class="mt-3 text-sm leading-6 text-gray-400">Write a few sentences about yourself.</p>
                    </div>

                    <div class="col-span-full">
                        <label for="photo" class="block text-sm font-medium leading-6 text-white">Image Profile</label>
                        <div class="mt-2 flex items-center gap-x-3">
                            <img :src="user.image === '' ? 'https://ui-avatars.com/api/?background=10b981&color=000&name=' + user.username : user.image"
                                alt="" class="h-12 w-12 rounded-full bg-gray-800" />
                            <input type="file" name="photo" id="file" class="hidden" @change="uploadFile" />
                            <button type="button" @click.prevent="getFile"
                                class="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20">Change</button>
                        </div>
                    </div>


                </div>
                <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div class="sm:col-span-3">
                        <label for="latitude" class="block text-sm font-medium leading-6 text-white">Latitude</label>
                        <div class="mt-2">
                            <input v-model="user.latitude" type="text" name="latitude" id="latitude"
                                autocomplete="given-name"
                                class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div class="sm:col-span-3">
                        <label for="longitude" class="block text-sm font-medium leading-6 text-white">Longitude</label>
                        <div class="mt-2">
                            <input v-model="user.longitude" type="text" name="longitude" id="longitude"
                                autocomplete="family-name"
                                class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                </div>
            </div>

        </div>

        <div class="mt-6 flex items-center justify-end gap-x-6">
            <button type="button" class="text-sm font-semibold leading-6 text-white">Cancel</button>
            <button type="submit"
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
  