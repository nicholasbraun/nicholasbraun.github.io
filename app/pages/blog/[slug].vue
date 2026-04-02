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
  <article v-if="page" class="blog-post">
    <NuxtLink to="/blog" class="back-link">cd ..</NuxtLink>

    <div class="post-meta">
      <time v-if="page.date" :datetime="page.date">
        {{
          new Date(page.date).toISOString().slice(0, 10)
        }}
      </time>
      <span v-if="page.tags?.length" class="post-tags">
        <span v-for="tag in page.tags" :key="tag">[{{ tag }}]</span>
      </span>
    </div>

    <ContentRenderer :value="page" />
  </article>
</template>

<style lang="css" scoped>
.blog-post {
  padding: 2rem 0 3rem;
}

.back-link {
  display: inline-block;
  font-size: 0.85rem;
  color: var(--text-muted);
  text-decoration: none;
  margin-bottom: 1.5rem;
  transition: color 0.15s ease;
}

.back-link:hover {
  color: var(--accent);
}

.post-meta {
  display: flex;
  gap: 1rem;
  align-items: baseline;
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-bottom: 1.5rem;
}

.post-tags {
  display: flex;
  gap: 0.35rem;
}
</style>
