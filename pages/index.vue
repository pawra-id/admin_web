<template>
    <div>
        <h3 class="text-base font-semibold leading-6 text-white">Dashboard</h3>

        <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div v-for="item in stats" :key="item.id"
                class="relative overflow-hidden rounded-lg bg-gray-700 px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6">
                <dt>
                    <div class="absolute rounded-md bg-gray-900 p-3">
                        <component :is="item.icon" class="h-6 w-6 text-emerald-500" aria-hidden="true" />
                    </div>
                    <p class="ml-16 truncate text-sm font-medium text-emerald-600">{{ item.name }}</p>
                </dt>
                <dd class="ml-16 flex items-baseline pb-6 sm:pb-7">
                    <p class="text-2xl font-semibold text-emerald-500">{{ item.stat }}</p>

                    <div class="absolute inset-x-0 bottom-0 bg-gray-700 px-4 py-4 sm:px-6">
                        <div class="text-sm">
                            <NuxtLink :to="item.to" class="font-medium text-emerald-600 hover:text-emerald-500">View all<span
                                    class="sr-only"> {{ item.name }} stats</span>
                            </NuxtLink>
                        </div>
                    </div>
                </dd>
            </div>
        </dl>
    </div>
</template>
  
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { BriefcaseIcon, ChartPieIcon, CursorArrowRaysIcon, EnvelopeOpenIcon, HeartIcon, LightBulbIcon, NewspaperIcon, Square3Stack3DIcon, UsersIcon } from '@heroicons/vue/24/outline'

const pawraPath = usePath()
const token = useGetUserData().value.access_token;
const stats = ref([
    { id: 1, name: 'Total Users', stat: 0, icon: UsersIcon, to:'/users' },
    { id: 2, name: 'Dog Registered', stat: 0, icon: HeartIcon, to:'/dogs' },
    { id: 3, name: 'Vets Available', stat: 0, icon: BriefcaseIcon, to:'/vets' },
    { id: 4, name: 'Blogs Written', stat: 0, icon: NewspaperIcon, to:'/blogs' },
    { id: 5, name: 'Total Activity', stat: 0, icon: Square3Stack3DIcon, to:'/activities' },
    { id: 6, name: 'Total Analysis', stat: 0, icon: ChartPieIcon, to:'/analysis' },
    { id: 7, name: 'Actions Provided', stat: 0, icon: LightBulbIcon, to:'/actions' },
])

onMounted(async () => {
    await useFetch(`${pawraPath.value}/dashboard`, {
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
    })
        .then(res => {
            //map data to stats
            stats.value[0].stat = res.data.value.total_users
            stats.value[1].stat = res.data.value.total_dogs
            stats.value[2].stat = res.data.value.total_vets
            stats.value[3].stat = res.data.value.total_blogs
            stats.value[4].stat = res.data.value.total_activities
            stats.value[5].stat = res.data.value.total_analysis
            stats.value[6].stat = res.data.value.total_actions
        })
});

</script>