<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  layout: '',
})

const pawraPath = usePath()
const loading = ref(false)
const error = ref('')

const formData = ref({
  username: '',
  password: ''
})

const login = async () => {
  loading.value = true
  const response = await useFetch(`${pawraPath.value}/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    },
    body: new URLSearchParams(formData.value),
    onResponseError: (res) => {
      error.value = res.response._data.detail
    }
  })
    .then(res => {
      useSetUserData(res.data.value)
      navigateTo('/')
    })
    .finally(() => {
      loading.value = false
      formData.value.username = ''
      formData.value.password = ''
    })
    
}

</script>
<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-900">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-16 w-auto" src="@/assets/images/pawra1x1.png" alt="Your Company" />
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">Sign in to your account</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <div v-if="error !== ''" class="bg-red-500 text-white px-4 py-2 rounded-lg mb-3">
        {{ error }}
      </div>
      <form class="space-y-6" method="POST" @submit.prevent="login">
        <div>
          <label for="username" class="block text-sm font-medium leading-6 text-white">Username</label>
          <div class="mt-2">
            <input id="username" v-model="formData.username" name="username" type="text" required
              class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-white">Password</label>
            <div class="text-sm">
              <a href="#" class="font-semibold text-emerald-400 hover:text-emerald-300">Forgot password?</a>
            </div>
          </div>
          <div class="mt-2">
            <input id="password" name="password" v-model="formData.password" type="password"
              autocomplete="current-password" required=""
              class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <button type="submit"
            :disabled="loading"
            class="flex w-full justify-center rounded-md bg-emerald-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500">
            <div v-if="loading">
              <svg xmlns="http://www.w3.org/2000/svg" width="1.7em" height="1.7em" viewBox="0 0 24 24">
                <path fill="currentColor"
                  d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25"></path>
                <path fill="currentColor"
                  d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z">
                  <animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate"
                    values="0 12 12;360 12 12"></animateTransform>
                </path>
              </svg>
            </div>
            <span v-else>Sign in</span>
          </button>
        </div>
      </form>
    </div>
  </div>>
</template>
  