<script setup lang="ts">
import { Cog6ToothIcon } from '@heroicons/vue/24/outline';
import { ref, computed } from 'vue'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'

const pawraPath = usePath();
const token = useGetUserData().value.access_token;
const page = ref(1);
const size = ref(20);
const users = ref();

await useFetch(`${pawraPath.value}/users/`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + token
  },
  query: {
    size: size.value,
    page: page.value
  },
  //params
  onResponseError: (res) => {
    console.log(res.response._data)
  }
}).then(res => {
  users.value = res.data.value
})

const nextPage = async () => {
  page.value++;
  await useFetch(`${pawraPath.value}/users/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    query: {
      size: size.value,
      page: page.value
    },
    //params
    onResponseError: (res) => {
      console.log(res.response._data)
    }
  }).then(res => {
    users.value = res.data.value
  })
}

const previousPage = async () => {
  page.value--;
  await useFetch(`${pawraPath.value}/users/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    query: {
      size: size.value,
      page: page.value
    },
    //params
    onResponseError: (res) => {
      console.log(res.response._data)
    }
  }).then(res => {
    users.value = res.data.value
  })
}

const goTo = async (to: number) => {
  page.value = to;
  await useFetch(`${pawraPath.value}/users/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    query: {
      size: size.value,
      page: page.value
    },
    //params
    onResponseError: (res) => {
      console.log(res.response._data)
    }
  }).then(res => {
    users.value = res.data.value
  })
}

</script>

<template>
  <div class="bg-gray-900">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-base font-semibold leading-6 text-white">Users</h1>
        <p class="mt-2 text-sm text-gray-300">A list of all the users in your account including their name, title, email
          and role.</p>
      </div>
      <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <button type="button"
          class="block rounded-md bg-emerald-500 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Add
          user</button>
      </div>
    </div>
    <table class="mt-6 w-full whitespace-nowrap text-left">
      <colgroup>
        <col class="w-full sm:w-3/12" />
        <col class="lg:w-3/12" />
        <col class="lg:w-1/12" />
        <col class="lg:w-2/12" />
        <col class="lg:w-2/12" />
        <col class="lg:w-2/12" />
      </colgroup>
      <thead class="border-b border-white/10 text-sm leading-6 text-white">
        <tr>
          <th scope="col" class="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8">User</th>
          <th scope="col" class="hidden py-2 pl-0 pr-8 font-semibold sm:table-cell">Email</th>
          <th scope="col" class="py-2 pl-0 pr-4 text-right font-semibold sm:pr-8 sm:text-left">Role</th>
          <th scope="col" class="hidden py-2 pl-0 pr-8 font-semibold md:table-cell lg:pr-20">Summary</th>
          <th scope="col" class="hidden py-2 pl-0 pr-8 font-semibold md:table-cell lg:pr-20">Address</th>
          <th scope="col" class="hidden py-2 pl-0 pr-4 text-right font-semibold sm:table-cell sm:pr-6 lg:pr-8"></th>
        </tr>
      </thead>
      <tbody class="divide-y divide-white/5">
        <tr v-for="user in users.items" :key="user.id">
          <td class="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
            <div class="flex items-center gap-x-4">
              <img :src="user.image === '' ? 'https://ui-avatars.com/api/?background=10b981&color=000&name=' + user.username : user.image"
                alt="" class="h-8 w-8 rounded-full bg-gray-800" />
              <div class="truncate text-sm font-medium leading-6 text-white">{{ user.username }}</div>
            </div>
          </td>
          <td class="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
            <div class="flex gap-x-3">
              <div class="font-mono text-sm leading-6 text-gray-400">{{ user.email }}</div>
            </div>
          </td>
          <td class="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
            <div class="flex gap-x-3">
              <div class="font-mono text-sm leading-6 text-gray-400">
                <span
                  class="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                  {{ user.role }}
                </span>
              </div>
            </div>
          </td>
          <td class="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
            <div class="flex gap-x-3">
              <div class="font-mono text-sm leading-6 text-gray-400">{{ user.summary?.substring(0, 10) }}</div>
            </div>
          </td>
          <td class="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
            <div class="flex gap-x-3">
              <div class="font-mono text-sm leading-6 text-gray-400">{{ user.address?.substring(0, 15) }}</div>
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
                        <NuxtLink :to="`/users/${user.id}`"
                          :class="[active ? 'bg-emerald-700 text-gray-900' : 'text-black', 'group flex items-center w-full px-4 py-2 text-sm']">
                          Edit
                        </NuxtLink>
                        </MenuItem>
                        <MenuItem v-slot="{ active }">
                        <button @click.prevent="useLogout()"
                          :class="[active ? 'bg-emerald-700 text-gray-900' : 'text-black', 'group flex items-center w-full px-4 py-2 text-sm']">
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
      <pagination 
        @next="nextPage()"
        @previous="previousPage()"      
        @to="goTo"  
        :page="users.page" 
        :size="users.size" 
        :total="users.total" 
        :pages="users.pages"/>
    </div>
  </div>
</template>
  
