<script setup lang="ts">
import { Cog6ToothIcon } from '@heroicons/vue/24/outline';
import { ref, computed } from 'vue'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'

const pawraPath = usePath();
const token = useGetUserData().value.access_token;
const page = ref(1);
const size = ref(20);
const vets = ref();
const search = ref('');

await useFetch(`${pawraPath.value}/vets/`, {
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
    //if unauthorized redirect to login
    if (res.response.status === 401) {
      useLogout();
    }
  }
}).then(res => {
  vets.value = res.data.value
})

const getUsers = async () => {
  await useFetch(`${pawraPath.value}/vets/`, {
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
    vets.value = res.data.value
  })
}

const nextPage = async () => {
  page.value++;
  getUsers();
}

const previousPage = async () => {
  page.value--;
  getUsers();
}

const goTo = async (to: number) => {
  page.value = to;
  getUsers();
}

const deleteVet = async (id:number) => {
    await useFetch(`${pawraPath.value}/vets/${id}`, {
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
    //remove vet with id == id from vets
    vets.value.items = vets.value.items.filter((vet: any) => vet.id !== id);
    useAlertMessage().value = "vet deleted successfully";
    useAlertType().value = "success";
    useShowAlert().value = true;
  });
}
</script>

<template>
  <div class="bg-gray-900">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-base font-semibold leading-6 text-white">Vets</h1>
        <p class="mt-2 text-sm text-gray-300">A list of all the vets in your account including their name, title, email
          and role.</p>
      </div>
      <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <NuxtLink to="/vets/create"
          class="block rounded-md bg-emerald-500 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Add
          vet</NuxtLink>
      </div>
    </div>
    <form @submit.prevent="getUsers" class="sm:w-[50%] flex mt-4 gap-x-3">
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
        <col class="w-full sm:w-2/12" />
        <col class="lg:w-1/12" />
        <col class="lg:w-1/12" />
        <col class="lg:w-4/12" />
        <col class="lg:w-2/12" />
        <col class="lg:w-2/12" />
      </colgroup>
      <thead class="border-b border-white/10 text-sm leading-6 text-white">
        <tr>
          <th scope="col" class="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8">Name</th>
          <th scope="col" class="hidden py-2 pl-0 pr-8 font-semibold sm:table-cell">Email</th>
          <th scope="col" class="py-2 pl-0 pr-4 text-right font-semibold sm:pr-8 sm:text-left">Phone</th>
          <th scope="col" class="py-2 pl-0 pr-4 text-right font-semibold sm:pr-8 sm:text-left">Clinic</th>
          <th scope="col" class="py-2 pl-0 pr-4 text-right font-semibold sm:pr-8 sm:text-left">Work Hour</th>
          <th scope="col" class="hidden py-2 pl-0 pr-4 text-right font-semibold sm:table-cell sm:pr-6 lg:pr-8"></th>
        </tr>
      </thead>
      <tbody class="divide-y divide-white/5">
        <tr v-for="vet in vets.items" :key="vet.id">
          <td class="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
            <div class="flex items-center gap-x-4">
              <img
                :src="vet.image === '' ? 'https://ui-avatars.com/api/?background=10b981&color=000&name=' + vet.name : vet.image"
                alt="" class="h-8 w-8 rounded-full bg-gray-800 object-cover" />
              <div class="truncate text-sm font-medium leading-6 text-white">{{ vet.name }}</div>
            </div>
          </td>
          <td class="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
            <div class="flex gap-x-3">
              <div class="font-mono text-sm leading-6 text-gray-400">{{ vet.email }}</div>
            </div>
          </td>
          <td class="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
            <div class="flex gap-x-3">
              <div class="font-mono text-sm leading-6 text-gray-400">{{ vet.phone }}</div>
            </div>
          </td>
          <td class="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
            <div class="flex gap-x-3">
              <div class="font-mono truncate text-sm leading-6 text-gray-400">{{ vet.clinic_name}}</div>
            </div>
          </td>
          <td class="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
            <div class="flex gap-x-3">
              <div class="font-mono text-sm leading-6 text-gray-400">
                <span
                  class="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                  {{ vet.start_work_hour }} - {{ vet.end_work_hour }}
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
                        <NuxtLink :to="`/vets/${vet.id}`"
                          :class="[active ? 'bg-emerald-700 text-gray-900' : 'text-black', 'group flex items-center w-full px-4 py-2 text-sm']">
                          Edit
                        </NuxtLink>
                        </MenuItem>
                      </div>
                      <div class="py-1">
                        <MenuItem v-slot="{ active }">
                        <button @click.prevent="deleteVet(vet.id)" :class="[
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
      <pagination @next="nextPage()" @previous="previousPage()" @to="goTo" :page="vets.page" :size="vets.size"
        :total="vets.total" :pages="vets.pages" />
    </div>
  </div>
</template>
  
