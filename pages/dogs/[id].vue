<script setup>
import { ref, onMounted } from 'vue'

onMounted(() => {
  getUsers();
})

const route = useRoute();
const pawraPath = usePath();
const token = useGetUserData().value.access_token;
const loading = ref(false);
const loadImage = ref(false);
const dog = ref();
const id = route.params.id
const listSelect = [
    { id: 1, name: 'Neutered', value: true },
    { id: 2, name: 'Not Neutered', value: false},
]
const listGender = [
    {id: 1, name: 'Male', value: 'male'},
    {id: 2, name: 'Female', value: 'female'},
]
const listUsers = ref([]);
const initialOwner = ref({ id: 0, name: 'Select', value: '' })

//request dog data from api with id
await useFetch(`${pawraPath.value}/admin/dogs/${id}`, {
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
    dog.value = res.data.value
    initialOwner.value = { id: res.data.value.owner.id, name: res.data.value.owner.username, value: res.data.value.owner.id }
})


const getUsers = async () => {
  await useFetch(`${pawraPath.value}/users/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    //params
    onResponseError: (res) => {
      console.log(res.response._data)
    }
  }).then(res => {
    //map the data
    listUsers.value = res.data.value.items.map((item) => {
      return {
        id: item.id,
        name: item.username,
        value: item.id
      }
    })
  })
}


const updateDog = async () => {
    loading.value = true;
    await useFetch(`${pawraPath.value}/admin/dogs/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(dog.value),
        onResponseError: (res) => {
            useAlertMessage().value = 'failed to update dog';
            useAlertType().value = 'error';
            useShowAlert().value = true;
            console.log(res.response._data)
        }
    }).then(res => {
        dog.value = res.data.value
        useAlertMessage().value = 'dog updated successfully';
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
    loadImage.value = true;

    await useFetch(`${pawraPath.value}/dogs/image`, {
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
            loadImage.value = true;
        }
    }).then(res => {
        dog.value.image = res.data.value
        updateDog();
    }).finally(() => {
        loadImage.value = false;
    })
}
</script>

<template>
    <form autocomplete="off" @submit.prevent="updateDog">
        <div class="space-y-12">
            <div class="pb-12">
                <div class="flex items-center justify-between">
                    <div>
                        <h2 class="text-base font-semibold leading-7 text-white">Edit dog</h2>
                        <p class="mt-1 text-sm leading-6 text-gray-400">This information will be displayed publicly so be
                            careful
                            what you share.</p>
                    </div>
                    <div>
                        <!-- Back button -->
                        <NuxtLink to="/dogs"
                            class="ml-auto rounded-md bg-emerald-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-800">
                            Back
                        </NuxtLink>
                    </div>
                </div>

                <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div class="sm:col-span-4">
                        <label for="username" class="block text-sm font-medium leading-6 text-white">
                            Name <span class="text-red-500">*</span>
                        </label>
                        <div class="mt-2">
                            <div
                                class="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-emerald-500">

                                <input v-model="dog.name" type="text" name="name" id="name"
                                    class="flex-1 border-0 bg-transparent py-1.5 pl-3 text-white focus:ring-0 sm:text-sm sm:leading-6"
                                    placeholder="janesmith" />
                            </div>
                        </div>
                    </div>
                    <div class="sm:col-span-4">
                        <label for="owner" class="block text-sm font-medium leading-6 text-white">
                            Owner <span class="text-red-500">*</span>
                        </label>
                        <div class="mt-2">
                            <Select :data="listUsers" v-model="dog.owner.id" :initial="initialOwner"/>
                        </div>
                    </div>
                    <div class="sm:col-span-4">
                        <label for="gender" class="block text-sm font-medium leading-6 text-white">
                            Gender <span class="text-red-500">*</span>
                        </label>
                        <div class="mt-2">
                            <Select :data="listGender" v-model="dog.gender" :initial="listGender.find(g => g.value == dog.gender)"/>
                        </div>
                    </div>                  
                    <div class="sm:col-span-4">
                        <label for="age" class="block text-sm font-medium leading-6 text-white">
                            Age (Years) <span class="text-red-500">*</span>
                        </label>
                        <div class="mt-2">
                            <div
                                class="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-emerald-500">

                                <input v-model="dog.age" type="number" name="age" id="age" maxlength="12"
                                    class="flex-1 border-0 bg-transparent py-1.5 pl-3 text-white focus:ring-0 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                    </div>
                    <div class="sm:col-span-4">
                        <label for="breed" class="block text-sm font-medium leading-6 text-white">
                            Breed <span class="text-red-500">*</span>
                        </label>
                        <div class="mt-2">
                            <div
                                class="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-emerald-500">

                                <input v-model="dog.breed" type="text" name="breed" id="breed"
                                    maxlength="12"
                                    class="flex-1 border-0 bg-transparent py-1.5 pl-3 text-white focus:ring-0 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                    </div>
                    <div class="sm:col-span-4">
                        <label for="microchip" class="block text-sm font-medium leading-6 text-white">Microchip ID</label>
                        <div class="mt-2">
                            <div
                                class="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-emerald-500">

                                <input v-model="dog.microchip_id" type="text" name="microchip" id="microchip"
                                    class="flex-1 border-0 bg-transparent py-1.5 pl-3 text-white focus:ring-0 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                    </div>
                    <div class="sm:col-span-4">
                        <label for="color" class="block text-sm font-medium leading-6 text-white">Color</label>
                        <div class="mt-2">
                            <div
                                class="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-emerald-500">

                                <input v-model="dog.color" type="text" name="color" id="color"
                                    maxlength="12"
                                    class="flex-1 border-0 bg-transparent py-1.5 pl-3 text-white focus:ring-0 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                    </div>
                    <div class="sm:col-span-4">
                        <label for="neutered" class="block text-sm font-medium leading-6 text-white">Neutered</label>
                        <div class="mt-2">
                            <Select :data="listSelect" v-model="dog.neutered" :initial="listSelect.find(i => i.value == dog.neutered)"/>
                        </div>
                    </div>
                    <div class="sm:col-span-4">
                        <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div class="sm:col-span-3">
                                <label for="weight" class="block text-sm font-medium leading-6 text-white">
                                    Weight (kg)    
                                </label>
                                <div class="mt-2">
                                    <input type="text" name="weight" id="weight" autocomplete="given-name"
                                        placeholder="08:00" maxlength="5" v-model="dog.weight"
                                        class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6" />
                                </div>
                            </div>

                            <div class="sm:col-span-3">
                                <label for="height" class="block text-sm font-medium leading-6 text-white">
                                    Height (cm)
                                </label>
                                <div class="mt-2">
                                    <input type="text" placeholder="17:00" maxlength="5" v-model="dog.height" name="height" id="height" autocomplete="family-name"
                                        class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-span-full">
                        <label for="description" class="block text-sm font-medium leading-6 text-white">Description</label>
                        <div class="mt-2">
                            <textarea id="description" name="description" rows="3" v-model="dog.description"
                                class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:text-sm sm:leading-6">
                                {{ dog.description }}
                            </textarea>
                        </div>
                        <p class="mt-3 text-sm leading-6 text-gray-400">Write a few sentences about the adress</p>
                    </div>


                    <div class="col-span-full">
                        <label for="photo" class="block text-sm font-medium leading-6 text-white">
                            Dogs Image
                            <span v-if="loadImage" class="text-emerald-500">Loading..</span>
                        </label>
                        <div class="mt-2 flex items-center gap-x-3">
                            <img :src="dog.image === '' ? 'https://ui-avatars.com/api/?background=10b981&color=000&name=' + dog.name : dog.image"
                                alt="" class="h-12 w-12 rounded-full bg-gray-800 object-cover" />
                            <input type="file" name="photo" id="file" class="hidden" @change="uploadFile" />
                            <button type="button" @click.prevent="getFile"
                                class="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20">Change</button>
                        </div>
                    </div>


                </div>
            </div>

        </div>

        <div class="mt-6 flex items-center justify-end gap-x-6">
            <NuxtLink to="/dogs" class="text-sm font-semibold leading-6 text-white">Cancel</NuxtLink>
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
  