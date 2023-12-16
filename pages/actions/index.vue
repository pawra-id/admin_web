<script setup lang="ts">
import { Cog6ToothIcon } from "@heroicons/vue/24/outline";
import { ref, onMounted } from "vue";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";

onMounted(() => {
  getActions();
});

const pawraPath = usePath();
const token = useGetUserData().value.access_token;
const page = ref(1);
const size = ref(20);
const actions = ref();
const search = ref("");

const getActions = async () => {
  await useFetch(`${pawraPath.value}/actions/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
    query: {
      search: search.value,
      size: size.value,
      page: page.value,
    },
    //params
    onResponseError: (res) => {
      console.log(res.response._data);
      if (res.response.status === 401) {
        useLogout();
      }
    },
  }).then((res) => {
    actions.value = res.data.value;
  });
};

const nextPage = async () => {
  page.value++;
  getActions();
};

const previousPage = async () => {
  page.value--;
  getActions();
};

const goTo = async (to: number) => {
  page.value = to;
  getActions();
};

const deleteAction = async (id: number) => {
  await useFetch(`${pawraPath.value}/actions/${id}`, {
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
    //remove action with id == id from actions
    actions.value.items = actions.value.filter((action: any) => action.id !== id);
    useAlertMessage().value = "Blog deleted successfully";
    useAlertType().value = "success";
    useShowAlert().value = true;
  });
}
</script>

<template>
  <div class="bg-gray-900">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-base font-semibold leading-6 text-white">Actions</h1>
        <p class="mt-2 text-sm text-gray-300">
          A list of all the users in your account including their name, title,
          email and role.
        </p>
      </div>
      <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <NuxtLink to="/actions/create"
          class="block rounded-md bg-emerald-500 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
          Add Action</NuxtLink>
      </div>
    </div>
    <form @submit.prevent="getActions" class="sm:w-[50%] flex mt-4 gap-x-3">
      <div
        class="flex flex-1 rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-emerald-500">
        <input v-model="search" type="text" name="search" id="search" autocomplete="off"
          class="flex-1 border-0 bg-transparent py-1.5 pl-3 text-white focus:ring-0 sm:text-sm sm:leading-6"
          placeholder="janesmith" />
      </div>
      <button type="submit"
        class="block rounded-md bg-emerald-500 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
        Search
      </button>
    </form>
    <table class="mt-6 w-full whitespace-nowrap text-left" v-if="actions">
      <colgroup>
        <col class="w-full sm:w-3/12" />
        <col class="lg:w-4/12" />
        <col class="lg:w-1/12" />
      </colgroup>
      <thead class="border-b border-white/10 text-sm leading-6 text-white">
        <tr>
          <th scope="col" class="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8">
            Action
          </th>
          <th scope="col" class="hidden py-2 pl-0 pr-8 font-semibold sm:table-cell">
            Description
          </th>
          <th scope="col" class="hidden py-2 pl-0 pr-4 text-right font-semibold sm:table-cell sm:pr-6 lg:pr-8"></th>
        </tr>
      </thead>
      <tbody class="divide-y divide-white/5">
        <tr v-for="action in actions" :key="action.id">
          <td class="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
            <div class="flex gap-x-3">
              <div class="truncate font-mono text-sm leading-6 text-gray-400 w-64">
                {{ action.action }}
              </div>
            </div>
          </td>
          <td class="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
            <div class="flex gap-x-3 min-w-0">
              <div class="font-mono truncate text-sm leading-6 text-gray-400 w-80">
                {{ action.description }}
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
                        <NuxtLink :to="`/actions/${action.id}`" :class="[
                          active
                            ? 'bg-emerald-700 text-gray-900'
                            : 'text-black',
                          'group flex items-center w-full px-4 py-2 text-sm',
                        ]">
                          Edit
                        </NuxtLink>
                        </MenuItem>
                      </div>
                      <div class="py-1">
                        <MenuItem v-slot="{ active }">
                        <button @click.prevent="deleteAction(action.id)" :class="[
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
      <pagination v-if="actions && actions?.items?.length > 0" @next="nextPage()" @previous="previousPage()" @to="goTo"
        :page="actions.page" :size="actions.size" :total="actions.total" :pages="actions.pages" />
    </div>
  </div>
</template>
