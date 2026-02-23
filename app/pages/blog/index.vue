<script setup lang="ts">
const { data: page } = await useAsyncData("page-blog", () => {
  return queryCollection("pages").path("/blog").first();
});

const allPosts = await queryCollection("blogPosts").order("date", "DESC").all();

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
  <ContentRenderer v-if="page" :value="page" />

  <nav>
    <ul v-if="allPosts">
      <li v-for="item in allPosts" :key="item.path">
        <NuxtLink :to="item.path"
          >{{ item.title }} - {{ new Date(item.date).toDateString() }}</NuxtLink
        >
      </li>
    </ul>
  </nav>
</template>
