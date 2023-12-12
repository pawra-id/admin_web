// https://nuxt.com/docs/api/configuration/nuxt-config
import {resolve} from "path"

export default defineNuxtConfig({
  devtools: { enabled: true },
  alias: {
    assets: "/<rootDir>/assets",
  },
  css:  [
    "~/assets/css/main.scss",
  ],
  modules: [
    "@vueuse/nuxt",
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  ssr: false,

  //compiler options
  
})
