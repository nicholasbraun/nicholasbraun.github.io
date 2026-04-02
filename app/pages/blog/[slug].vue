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
      <div v-if="page.tags?.length" class="post-tags">
        <span class="post-tags__label">tags:</span>
        <NuxtLink
          v-for="tag in page.tags"
          :key="tag"
          :to="{ path: '/blog', query: { tag } }"
          class="post-tag"
          >[{{ tag }}]</NuxtLink
        >
      </div>
      <time v-if="page.date" :datetime="page.date">
        {{ new Date(page.date).toISOString().slice(0, 10) }}
      </time>
    </div>

    <ContentRenderer :value="page" />
  </article>
</template>

<style lang="css" scoped>
.blog-post {
  padding-bottom: 4rem;
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
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-bottom: 0.15rem;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.35rem;
  margin-bottom: 0.75rem;
}

.post-tags__label {
  color: var(--text-muted);
}

.post-tag {
  white-space: nowrap;
  color: var(--text-muted);
  transition: color 0.15s ease;
}

.post-tag:hover {
  color: var(--accent);
}
</style>
