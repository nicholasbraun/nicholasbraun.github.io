<script setup lang="ts">
const route = useRoute();

const { data: page } = await useAsyncData("page-" + route.path, async () => {
  const result = await queryCollection("pages").path(route.path).first();

  if (result) {
    return result;
  }
  return await queryCollection("blogPosts").path(route.path).first();
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
});
</script>

<template>
  <MainNavigation />

  <ContentRenderer v-if="page" :value="page" />
</template>
