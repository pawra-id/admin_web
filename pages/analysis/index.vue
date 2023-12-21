<script setup lang="ts">
import { Cog6ToothIcon } from '@heroicons/vue/24/outline';
import { ref, onMounted } from 'vue'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'

const pawraPath = usePath();
const token = useGetUserData().value.access_token;
const page = ref(1);
const size = ref(20);
const analysis = ref({
  items: [],
  page: page.value,
  size: size.value,
  total: 0,
  pages: 0
});
const search = ref('');

onMounted(() => {
  getAnalysis();
})

const getAnalysis = async () => {
  await useFetch(`${pawraPath.value}/admin/analysis/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    query: {
      search: search.value,
      size: size.value,
      page: page.value
    },
    //params
    onResponseError: (res) => {
      console.log(res.response._data)
    }
  }).then(res => {
    analysis.value = res.data.value
  })
}

const nextPage = async () => {
  page.value++;
  getAnalysis();
}

const previousPage = async () => {
  page.value--;
  getAnalysis();
}

const goTo = async (to: number) => {
  page.value = to;
  getAnalysis();
}

const deleteVet = async (id: number) => {
  await useFetch(`${pawraPath.value}/admin/analysis/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
    onResponseError: (res) => {
      console.log(res.response._data);
    },
  }).then((res) => {
    //remove analys with id == id from analysis
    analysis.value.items = analysis.value.items.filter((analys: any) => analys.id !== id);
    useAlertMessage().value = "analysis deleted successfully";
    useAlertType().value = "success";
    useShowAlert().value = true;
  });
}

const unshare = async (id: number) => {
  await useFetch(`${pawraPath.value}/admin/analysis/${id}/unshare`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
    onResponseError: (res) => {
      console.log(res.response._data);
    },
  }).then((res) => {
    useAlertMessage().value = "analysis unshared successfully";
    useAlertType().value = "success";
    useShowAlert().value = true;
  }).finally(() => {
    getAnalysis();
  })
}
const share = async (id: number) => {
  await useFetch(`${pawraPath.value}/admin/analysis/${id}/share`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
    onResponseError: (res) => {
      console.log(res.response._data);
    },
  }).then((res) => {
    useAlertMessage().value = "analysis unshared successfully";
    useAlertType().value = "success";
    useShowAlert().value = true;
  }).finally(() => {
    getAnalysis();
  });
  
}
</script>

<template>
  <div class="bg-gray-900">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-base font-semibold leading-6 text-white">Analysis</h1>
        <p class="mt-2 text-sm text-gray-300">A list of all the analysis in your account including their name, title,
          email
          and role.</p>
      </div>
      <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <NuxtLink to="/analysis/create"
          class="block rounded-md bg-emerald-500 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
          Add
          analysis</NuxtLink>
      </div>
    </div>
    <form @submit.prevent="getAnalysis" class="sm:w-[50%] flex mt-4 gap-x-3">
      <div
        class="flex flex-1 rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-emerald-500">

        <input v-model="search" type="text" name="search" id="search" autocomplete="off"
          class="flex-1 border-0 bg-transparent py-1.5 pl-3 text-white focus:ring-0 sm:text-sm sm:leading-6"
          placeholder="janesmith" />
      </div>
      <button type="submit"
        class="block rounded-md bg-emerald-500 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Search</button>

    </form>
    <table class="mt-6 w-full whitespace-nowrap text-left">
      <colgroup>
        <col class="w-full sm:w-3/12" />
        <col class="lg:w-2/12" />
        <col class="lg:w-3/12" />
        <col class="lg:w-2/12" />
      </colgroup>
      <thead class="border-b border-white/10 text-sm leading-6 text-white">
        <tr>
          <th scope="col" class="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8">Dog</th>
          <th scope="col" class="py-2 pl-0 pr-4 text-right font-semibold sm:pr-8 sm:text-left">Prediction</th>
          <th scope="col" class="py-2 pl-0 pr-4 text-right font-semibold sm:pr-8 sm:text-left">Description</th>
          <th scope="col" class="hidden py-2 pl-0 pr-8 font-semibold sm:table-cell">Is Shared</th>
          <th scope="col" class="hidden py-2 pl-0 pr-4 text-right font-semibold sm:table-cell sm:pr-6 lg:pr-8"></th>
        </tr>
      </thead>
      <tbody class="divide-y divide-white/5">
        <tr v-for="analys in analysis.items" :key="analys.id">
          <td class="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
            <div class="flex items-center gap-x-4">
              <img
                :src="analys.dog.image === '' ? 'https://ui-avatars.com/api/?background=10b981&color=000&name=' + analys.dog.name : analys.dog.image"
                alt="" class="h-8 w-8 rounded-full bg-gray-800 object-cover" />
              <div class="truncate text-sm font-medium leading-6 text-white">{{ analys.dog.name }}</div>
            </div>
          </td>
          <td class="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
            <div class="flex gap-x-3">
              <div class="font-mono truncate text-sm leading-6 text-gray-400">{{ analys.prediction.substring(0, 5) }}
              </div>
            </div>
          </td>
          <td class="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
            <div class="flex gap-x-3">
              <div class="font-mono truncate w-64 text-sm leading-6 text-gray-400">{{ analys.description }}</div>
            </div>
          </td>
          <td class="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
            <div class="flex gap-x-3">
              <div class="font-mono text-sm leading-6 text-gray-400 flex gap-x-1 flex-wrap">
                <span
                  class="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                  {{ analys.is_shared }}
                </span>
              </div>
            </div>
          </td>
          <td class="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
            <div class="flex gap-x-3">
              <div class="font-mono text-sm leading-6 text-gray-400">
                <Menu as="div" class="relative inline-block text-left">
                  <div>
                    <MenuButton>
                      <Cog6ToothIcon
                        class="h-6 w-6 active:text-emerald-500 hover:scale-125 hover:text-emerald-500 text-gray-400"
                        aria-hidden="true" />
                    </MenuButton>
                  </div>

                  <transition enter-active-class="transition ease-out duration-100"
                    enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
                    leave-to-class="transform opacity-0 scale-95">
                    <MenuItems
                      class="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-emerald-500 rounded-md bg-emerald-500 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div class="py-1">
                        <MenuItem v-slot="{ active }">
                        <button @click.prevent="share(analys.id)" v-if="analys.is_shared == false"
                          :class="[active ? 'bg-emerald-700 text-gray-900' : 'text-black', 'group flex items-center w-full px-4 py-2 text-sm']">
                          Share
                        </button>
                        <button @click.prevent="unshare(analys.id)" v-else
                          :class="[active ? 'bg-emerald-700 text-gray-900' : 'text-black', 'group flex items-center w-full px-4 py-2 text-sm']">
                          Unshare
                        </button>
                        </MenuItem>
                      </div>
                      <div class="py-1">
                        <MenuItem v-slot="{ active }">
                        <NuxtLink :to="`/analysis/${analys.id}`" 
                        :class="[active ? 'bg-emerald-700 text-gray-900' : 'text-black', 'group flex items-center w-full px-4 py-2 text-sm']">
                          Detail
                        </NuxtLink>
                        </MenuItem>
                      </div>
                      <div class="py-1">
                        <MenuItem v-slot="{ active }">
                        <button @click.prevent="deleteVet(analys.id)" :class="[
                          active
                            ? 'bg-red-700 text-white'
                            : 'text-black',
                          'group flex items-center w-full px-4 py-2 text-sm',
                        ]">
                          Delete
                        </button>
                        </MenuItem>
                      </div>
                    </MenuItems>
                  </transition>
                </Menu>

              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="mt-6">
      <pagination @next="nextPage()" @previous="previousPage()" @to="goTo" :page="analysis.page" :size="analysis.size"
        :total="analysis.total" :pages="analysis.pages" />
    </div>
  </div>
</template>
  
