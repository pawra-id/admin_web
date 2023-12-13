<script setup>
import { ref } from 'vue'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import {
    ArrowRightCircleIcon,
    Bars3Icon,
    BriefcaseIcon,
    ChartPieIcon,
    HeartIcon,
    HomeIcon,
    NewspaperIcon,
    Square3Stack3DIcon,
    UsersIcon,
    XMarkIcon,

} from '@heroicons/vue/24/outline'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'

const navigations = [
    { name: 'Dashboard', href: '/', icon: HomeIcon, current: true },
    { name: 'Users', href: '/users', icon: UsersIcon, current: false },
    { name: 'Dogs', href: '/dogs', icon: HeartIcon, current: false },
    { name: 'Vets', href: '/vets', icon: BriefcaseIcon, current: false },
    { name: 'Blogs', href: '/blogs', icon: NewspaperIcon, current: false },
    { name: 'Activity', href: '/activities', icon: Square3Stack3DIcon, current: false },
    { name: 'Analysis', href: '/analysis', icon: ChartPieIcon, current: false },
]
const route = useRoute()
const sidebarOpen = ref(false)
const toggle = () => sidebarOpen.value = !sidebarOpen.value
const isRouteActive = (href) => route.path === href

const routeName = computed(() => {
    if (route.name === 'index') return 'Dashboard'
    //capitalize first letter
    const name = route.name.charAt(0).toUpperCase() + route.name.slice(1)
    return name
})
</script>

<template>
    <!-- Mobile menu, show/hide based on menu state. -->
    <TransitionRoot as="template" :show="sidebarOpen">
        <Dialog as="div" class="relative z-50 lg:hidden" @close="toggle">
            <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0"
                enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100"
                leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-900/80" />
            </TransitionChild>

            <div class="fixed inset-0 flex">
                <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
                    enter-from="-translate-x-full" enter-to="translate-x-0"
                    leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0"
                    leave-to="-translate-x-full">
                    <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
                        <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0"
                            enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100"
                            leave-to="opacity-0">
                            <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                                <button type="button" class="-m-2.5 p-2.5" @click="toggle">
                                    <span class="sr-only">Close sidebar</span>
                                    <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                                </button>
                            </div>
                        </TransitionChild>
                        <!-- Sidebar component, swap this element with another sidebar if you like -->
                        <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-2 ring-1 ring-white/10">
                            <div class="flex h-16 shrink-0 items-center">
                                <img class="h-12 w-auto" src="@/assets/images/pawra1x1.png" alt="Your Company" />
                            </div>
                            <nav class="flex flex-1 flex-col">
                                <ul role="list" class="flex flex-1 flex-col gap-y-7">
                                    <li>
                                        <ul role="list" class="-mx-2 space-y-1">
                                            <li v-for="item in navigations" :key="item.name">
                                                <NuxtLink :to="item.href"
                                                    :class="[isRouteActive(item.href) ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']">
                                                    <component :is="item.icon" class="h-6 w-6 shrink-0"
                                                        aria-hidden="true" />
                                                    {{ item.name }}
                                                </NuxtLink>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </DialogPanel>
                </TransitionChild>
            </div>
        </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <!-- Sidebar component, swap this element with another sidebar if you like -->
        <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-800 px-6">
            <div class="flex h-16 shrink-0 items-center">
                <img class="h-12 w-auto" src="@/assets/images/pawra1x1.png" alt="Your Company" />
            </div>
            <nav class="flex flex-1 flex-col">
                <ul role="list" class="flex flex-1 flex-col gap-y-7">
                    <li>
                        <ul role="list" class="-mx-2 space-y-1">
                            <li v-for="item in navigations" :key="item.name">
                                <NuxtLink :to="item.href"
                                    :class="[isRouteActive(item.href) ? 'bg-gray-900 text-emerald-500' : 'text-gray-400 hover:text-white hover:bg-gray-900', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']">
                                    <component :is="item.icon" class="h-6 w-6 shrink-0" aria-hidden="true" />
                                    {{ item.name }}
                                </NuxtLink>
                            </li>
                        </ul>
                    </li>

                    <li class="-mx-6 mt-auto">
                        <a class="flex items-center justify-between h-14 text-sm font-semibold leading-6 text-white">
                            <div class="flex items-center gap-x-3 ml-3">
                                <img class="h-8 w-8 rounded-full bg-gray-800"
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    alt="" />
                                <span class="sr-only">Your profile</span>
                                <span aria-hidden="true">Tom Cook</span>
                            </div>
                            <button @click.prevent="useLogout()" class="bg-red-700 h-full px-4 hover:bg-red-900 rounded-md">
                                <ArrowRightCircleIcon class="h-7 w-7 text-white font-bold" aria-hidden="true" />
                            </button>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>

    <!-- Top bar on mobile view -->
    <div class="sticky top-0 z-40 flex items-center gap-x-6 bg-gray-900 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
        <button type="button" class="-m-2.5 p-2.5 text-gray-400 lg:hidden" @click="sidebarOpen = !sidebarOpen">
            <span class="sr-only">Open sidebar</span>
            <Bars3Icon class="h-6 w-6" aria-hidden="true" />
        </button>
        <div class="flex-1 text-sm font-semibold leading-6 text-white">{{ routeName }}</div>

        <Menu as="div" class="relative inline-block text-left">
            <div>
                <MenuButton>
                    <a href="#">
                        <span class="sr-only">Your profile</span>
                        <img class="h-8 w-8 rounded-full bg-gray-800"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt="" />
                    </a>
                </MenuButton>
            </div>

            <transition enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95">
                <MenuItems
                    class="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div class="py-1">
                        <MenuItem v-slot="{ active }">
                        <button @click.prevent="useLogout()"
                            :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'group flex items-center w-full px-4 py-2 text-sm']">
                            <ArrowRightCircleIcon class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                aria-hidden="true" />
                            Logout
                        </button>
                        </MenuItem>
                    </div>
                </MenuItems>
            </transition>
        </Menu>
    </div>
</template>