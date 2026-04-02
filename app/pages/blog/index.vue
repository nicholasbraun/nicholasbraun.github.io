<script setup lang="ts">
const route = useRoute();

const { data: page } = await useAsyncData("page-blog", () => {
  return queryCollection("pages").path("/blog").first();
});

const allPosts = await queryCollection("blogPosts").order("date", "DESC").all();

const activeTag = computed(() => {
  const tag = route.query.tag;
  return typeof tag === "string" && tag.length > 0 ? tag : null;
});

const allTags = computed(() => {
  const tags = new Set<string>();

  for (const post of allPosts) {
    for (const tag of post.tags ?? []) {
      tags.add(tag);
    }
  }

  return [...tags].sort((a, b) => a.localeCompare(b));
});

const filteredPosts = computed(() => {
  if (!activeTag.value) {
    return allPosts;
  }

  return allPosts.filter((post) =>
    (post.tags ?? []).includes(activeTag.value as string),
  );
});

function formatDate(date: string) {
  const d = new Date(date);
  const mon = d.toLocaleString("en-US", { month: "short" });
  const day = String(d.getDate()).padStart(2, " ");
  const year = d.getFullYear();
  return `${mon} ${day}  ${year}`;
}

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
  <article class="content content--blog">
    <ContentRenderer v-if="page" :value="page" class="intro" />

    <nav v-if="allTags.length" class="tags" aria-label="Blog tags">
      <span class="tags__label">tags:</span>
      <ul class="tags__list">
        <li class="tags__list-item">
          <NuxtLink
            :to="{ path: '/blog' }"
            :class="{ active: !activeTag }"
          >[*]</NuxtLink>
        </li>
        <li v-for="tag in allTags" :key="tag" class="tags__list-item">
          <NuxtLink
            :to="{ path: '/blog', query: { tag } }"
            :class="{ active: activeTag === tag }"
          >[{{ tag }}]</NuxtLink>
        </li>
      </ul>
    </nav>

    <div class="posts">
      <p class="posts__header">total {{ filteredPosts.length }}</p>
      <ul v-if="filteredPosts.length" class="post-list">
        <li v-for="item in filteredPosts" :key="item.path" class="post-item">
          <NuxtLink :to="item.path" class="post-link">
            <span class="post-perm">-rw-r--r--</span>
            <time v-if="item.date" :datetime="item.date" class="post-date">{{ formatDate(item.date) }}</time>
            <span class="post-title">{{ item.title }}</span>
          </NuxtLink>
        </li>
      </ul>
      <p v-else class="posts__empty">No posts found for this tag.</p>
    </div>
  </article>
</template>

<style lang="css" scoped>
.intro {
  margin-bottom: var(--s-5);
}

/* Tags */
.tags {
  display: flex;
  align-items: baseline;
  gap: var(--s-2);
  margin-bottom: var(--s-5);
  flex-wrap: wrap;
}

.tags__label {
  color: var(--text-muted);
  font-size: 0.85rem;
}

.tags__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: var(--s-1);
}

.tags__list-item a {
  font-size: 0.85rem;
  color: var(--text-muted);
  text-decoration: none;
  transition: color 0.15s ease;
}

.tags__list-item a:hover {
  color: var(--link-color);
}

.tags__list-item a.active {
  color: var(--accent);
}

/* Posts */
.posts__header {
  color: var(--text-muted);
  font-size: 0.85rem;
  margin: 0 0 var(--s-1);
}

.post-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.post-link {
  display: flex;
  gap: 0;
  padding: var(--s-1) 0;
  text-decoration: none;
  color: var(--text-color);
  align-items: baseline;
  transition: color 0.15s ease;
  font-size: 0.85rem;
}

.post-link:hover {
  color: var(--link-color);
}

.post-perm {
  color: var(--text-muted);
  margin-right: 1ch;
}

.post-date {
  flex-shrink: 0;
  color: var(--text-muted);
  white-space: pre;
  margin-right: 1ch;
}

.post-title {
  color: var(--link-color);
}

.post-link:hover .post-title {
  color: var(--link-hover-color);
}

.posts__empty {
  color: var(--text-muted);
  font-size: 0.85rem;
}
</style>
