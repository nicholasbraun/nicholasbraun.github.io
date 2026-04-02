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

    <aside v-if="allTags.length" class="tags" aria-label="Blog tags">
      <p>Tags:</p>
      <ul class="tags__list">
        <li class="tags__list-item">
          <NuxtLink :to="{ path: '/blog' }">All</NuxtLink>
        </li>
        <li v-for="tag in allTags" :key="tag" class="tags__list-item">
          <NuxtLink :to="{ path: '/blog', query: { tag } }">{{ tag }}</NuxtLink>
        </li>
      </ul>
      <p v-if="activeTag">Filtering by: {{ activeTag }}</p>
    </aside>

    <div class="posts">
      <h2>Posts</h2>
      <ul v-if="filteredPosts.length">
        <li v-for="item in filteredPosts" :key="item.path">
          <NuxtLink :to="item.path">
            <time v-if="item.date" :datetime="item.date">
              {{
                new Date(item.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              }} </time
            >:
            {{ item.title }}
          </NuxtLink>
        </li>
      </ul>
      <p v-else>No posts found for this tag.</p>
    </div>
  </article>
</template>

<style lang="css" scoped>
.tags__list {
  list-style: none;
  padding: 0;
}

.tags__list-item {
  display: inline-block;
  margin-right: 10px;
}

@media screen and (min-width: 900px) {
  .content {
    display: grid;
    grid-template-columns: 5fr 1fr;
    grid-template-rows: auto 1fr;
  }

  .intro {
    grid-column: 1;
    grid-row: 1;
  }

  .posts {
    grid-column: 1;
    grid-row: 2;
  }

  .tags {
    grid-column: 2;
    grid-row: 1 / -1;
  }
  .tags__list-item {
    display: block;
  }
}
</style>
