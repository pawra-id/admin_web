<script setup>
import { ref, onMounted } from 'vue'

onMounted(() => {
    getAnalysis();
})
const route = useRoute();
const id = route.params.id;
const pawraPath = usePath();
const token = useGetUserData().value.access_token;
const analysis = ref({
    dog_id: 0,
    prediction: "",
    description: "",
    is_shared: false,
    id: 0,
    created_at: "",
    updated_at: "",
    dog: {},
    activities: {},
    actions: []
});

const getAnalysis = () => {
    useFetch(`${pawraPath.value}/admin/analysis/${id}`, {
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
        analysis.value = res.data.value
    })
}


</script>

<template>
    <form autocomplete="off">
        <div class="space-y-12">
            <div class="pb-12">
                <div class="flex items-center justify-between">
                    <div>
                        <h2 class="text-base font-semibold leading-7 text-white">Show Analysis</h2>
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
                        <label for="dog" class="block text-sm font-medium leading-6 text-white">
                            Dog
                        </label>
                        <div class="mt-2">
                            <div
                                class="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-emerald-500">

                                <input :value="analysis.dog.name" type="text" name="dog" id="dog" disabled
                                    class="cursor-not-allowed flex-1 border-0 bg-transparent py-1.5 pl-3 text-white focus:ring-0 sm:text-sm sm:leading-6"
                                     />
                            </div>
                        </div>
                    </div>
                    <div class="sm:col-span-4">
                        <label for="prediction" class="block text-sm font-medium leading-6 text-white">
                            Prediction
                        </label>
                        <div class="mt-2">
                            <div
                                class="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-emerald-500">

                                <input :value="analysis.prediction" type="text" name="prediction" id="prediction" disabled
                                    class="cursor-not-allowed flex-1 border-0 bg-transparent py-1.5 pl-3 text-white focus:ring-0 sm:text-sm sm:leading-6"
                                     />
                            </div>
                        </div>
                    </div>

                    <div class="col-span-full">
                        <label for="summary" class="block text-sm font-medium leading-6 text-white">
                            Description
                        </label>
                        <div class="mt-2">
                            <textarea id="content" name="content" rows="3" v-model="analysis.description" disabled
                                class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:text-sm sm:leading-6">
                                {{ analysis.description }}
                            </textarea>
                        </div>
                    </div>
                    
                </div>
            </div>

        </div>
    </form>
    <table class="mt-6 w-full whitespace-nowrap text-left">
      <colgroup>
        <col class="w-full sm:w-3/12" />
      </colgroup>
      <thead class="border-b border-white/10 text-sm leading-6 text-white">
        <tr>
          <th scope="col" class="py-2 pr-8 font-semibold text-emerald-500">Recommended Action</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-white/5">
        <tr v-for="action in analysis.actions" :key="action.id">
          <td class="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
            <div class="flex gap-x-3">
              <div class="font-mono truncate text-sm leading-6 text-gray-400">{{ action.action }}</div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <table class="mt-6 w-full whitespace-nowrap text-left">
      <colgroup>
        <col class="w-full sm:w-3/12" />
        <col class="sm:w-3/12" />
      </colgroup>
      <thead class="border-b border-white/10 text-sm leading-6 text-white">
        <tr>
          <th scope="col" class="py-2 pr-8 font-semibold text-emerald-500">Activities</th>
          <th scope="col" class="py-2 pr-8 font-semibold text-emerald-500">Date</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-white/5">
        <tr v-for="activity in analysis.activities" :key="activity.id">
          <td class="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
            <div class="flex gap-x-3">
              <div class="font-mono truncate text-sm leading-6 text-gray-400">{{ activity.description }}</div>
            </div>
          </td>
          <td class="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
            <div class="flex gap-x-3">
              <div class="font-mono truncate text-sm leading-6 text-gray-400">{{ activity.created_at.substring(0, 10) }}</div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
</template>
  