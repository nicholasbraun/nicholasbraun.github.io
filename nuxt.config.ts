// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/content"],
  devtools: { enabled: true },
  compatibilityDate: "2024-04-03",
  ssr: true,
  nitro: {
    prerender: {
      autoSubfolderIndex: false,
    },
  },
  content: {
    build: {
      markdown: {
        highlight: {
          theme: "catppuccin-latte",
          langs: ["go"],
        },
      },
    },
  },
});
