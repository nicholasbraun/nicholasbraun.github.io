<script setup lang="ts">
const route = useRoute();
const slug = route.params.slug as string;
const path = "/blog/" + slug;

const { data: page } = await useAsyncData("blog-post-" + path, () => {
  return queryCollection("blogPosts").path(path).first();
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

  <article v-if="page" class="blog-post">
    <time v-if="page.date" :datetime="page.date">
      {{
        new Date(page.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      }}
    </time>

    <ContentRenderer :value="page" />
  </article>
</template>

<style lang="css" scoped>
.blog-post {
  padding: 32px 0;
}
</style>
