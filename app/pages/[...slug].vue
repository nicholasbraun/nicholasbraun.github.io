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

useSeoMeta({
  title: page.value.title,
  description: page.value.description,
  ogTitle: page.value.title,
  ogDescription: page.value.description,
  ogUrl: canonicalUrl,
});

useHead({
  link: [{ rel: "canonical", href: canonicalUrl }],
});
</script>

<template>
  <ContentRenderer v-if="page" :value="page" />
</template>
