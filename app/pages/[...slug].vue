<script setup lang="ts">
const route = useRoute();
const config = useRuntimeConfig();
const siteUrl = config.public.siteUrl as string;
const canonicalUrl = `${siteUrl}${route.path}`;

const { data: page } = await useAsyncData("page-" + route.path, () => {
  return queryCollection("pages").path(route.path).first();
});

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  });
}

const isHome = route.path === "/";

useSeoMeta({
  title: page.value.title,
  description: page.value.description,
  ogTitle: page.value.title,
  ogDescription: page.value.description,
  ogUrl: canonicalUrl,
});

useHead({
  titleTemplate: isHome ? "%s" : undefined,
  link: [{ rel: "canonical", href: canonicalUrl }],
  script: isHome
    ? [
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Nicholas Braun",
            url: siteUrl,
          }),
        },
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Nicholas Braun",
            url: siteUrl,
            jobTitle: "Software Engineer",
            sameAs: [
              "https://github.com/nicholasbraun",
              "https://www.linkedin.com/in/nicholas-braun-dev/",
            ],
          }),
        },
      ]
    : [],
});
</script>

<template>
  <div>
    <Breadcrumb v-if="!isHome" />
    <ContentRenderer v-if="page" :value="page" />
  </div>
</template>
