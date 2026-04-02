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
      htmlAttrs: { lang: "en" },
      meta: [
        {
          name: "description",
          content:
            "Nicholas Braun — backend engineer specializing in distributed systems, Go and Node.js.",
        },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "Nicholas Braun" },
        { property: "og:locale", content: "en_US" },
        { name: "twitter:card", content: "summary" },
        { name: "author", content: "Nicholas Braun" },
      ],
      link: [
        { rel: "preconnect", href: "https://plausible.io" },
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        { rel: "manifest", href: "/site.webmanifest" },
        {
          rel: "alternate",
          type: "application/rss+xml",
          title: "RSS Feed",
          href: "/rss.xml",
        },
      ],
      script: [
        {
          async: true,
          src: "https://plausible.io/js/pa-AOIR4PhGlK7-HIkuq6ISs.js",
        },
        {
          innerHTML:
            "window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()",
        },
      ],
    },
  },
  nitro: {
    prerender: {
      autoSubfolderIndex: false,
      routes: ["/rss.xml", "/sitemap.xml"],
    },
  },
  content: {
    build: {
      markdown: {
        highlight: {
          theme: {
            default: "catppuccin-latte",
            dark: "catppuccin-mocha",
          },
          langs: ["go"],
        },
      },
    },
  },
});
