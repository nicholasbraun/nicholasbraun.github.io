// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/content"],
  devtools: { enabled: true },
  compatibilityDate: "2024-04-03",
  ssr: true,
  runtimeConfig: {
    public: {
      siteUrl: "https://nicholasbraun.de",
    },
  },
  app: {
    head: {
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
        { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
        { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
        { rel: "manifest", href: "/site.webmanifest" },
        {
          rel: "alternate",
          type: "application/rss+xml",
          title: "RSS Feed",
          href: "/rss.xml",
        },
      ],
    },
  },
  nitro: {
    prerender: {
      autoSubfolderIndex: false,
      routes: ["/rss.xml"],
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
