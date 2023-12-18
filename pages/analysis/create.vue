<script setup>
import { ref, onMounted } from 'vue'

onMounted(() => {
  getDogs();
})
const pawraPath = usePath();
const token = useGetUserData().value.access_token;
const loading = ref(false);
const analysis = ref({
    days: 0,
});
const dog_id = ref(null);
const listDogs = ref([])


const getDogs = async () => {
  await useFetch(`${pawraPath.value}/admin/dogs/`, {
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
    listDogs.value = res.data.value.items.map((item) => {
      return {
        id: item.id,
        name: item.name,
        value: item.id
      }
    })
  })
}


const createAnalysis = async () => {
    loading.value = true;
    await useFetch(`${pawraPath.value}/admin/analysis/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({dog_id: dog_id.value}),
        query: {
            days: analysis.value.days,
        },
        onResponseError: (res) => {
            useAlertMessage().value = 'failed to create analysis';
            useAlertType().value = 'error';
            useShowAlert().value = true;
            loading.value = false;
            console.log(res.response._data)
        }
    }).then(res => {
        useAlertMessage().value = 'analysis created successfully';
        useAlertType().value = 'success';
        useShowAlert().value = true;
    }).finally(() => {
        loading.value = false;
        analysis.value = {
            days: 0,
        }
    })
}
</script>

<template>
    <form autocomplete="off">
        <div class="space-y-12">
            <div class="pb-12">
                <div class="flex items-center justify-between">
                    <div>
                        <h2 class="text-base font-semibold leading-7 text-white">Create Analysis</h2>
                        <p class="mt-1 text-sm leading-6 text-gray-400">This information will be displayed publicly so be
                            careful
                            what you share.</p>
                    </div>
                    <div>
                        <!-- Back button -->
                        <NuxtLink to="/analysis"
                            class="ml-auto rounded-md bg-emerald-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-800">
                            Back
                        </NuxtLink>
                    </div>
                </div>

                <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div class="sm:col-span-4">
                        <label for="owner" class="block text-sm font-medium leading-6 text-white">
                            Dog <span class="text-red-500">*</span>
                        </label>
                        <div class="mt-2">
                            <Select :data="listDogs" v-model="dog_id"/>
                        </div>
                    </div>
      
                    <div class="col-span-full">
                        <label for="days" class="block text-sm font-medium leading-6 text-white">Number of Days</label>
                        <div class="mt-2">
                            <div
                                class="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-emerald-500">

                                <input v-model="analysis.days" type="number" name="experience" id="experience" max="12"
                                    class="flex-1 border-0 bg-transparent py-1.5 pl-3 text-white focus:ring-0 sm:text-sm sm:leading-6"
                                    placeholder="7" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <div class="mt-6 flex items-center justify-end gap-x-6">
            <NuxtLink to="/analysis" class="text-sm font-semibold leading-6 text-white">Cancel</NuxtLink>
            <button type="submit" @click.prevent="createAnalysis" :disabled="loading"
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
  