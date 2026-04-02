<script setup lang="ts">
const { data: nav } = await useAsyncData("navigation", () => {
  return queryCollectionNavigation("pages");
});
</script>

<template>
  <nav>
    <span class="prompt">&gt;</span>
    <ul v-if="nav" class="main-nav">
      <li v-for="item in nav" :key="item.path" class="main-nav-item">
        <NuxtLink :to="item.path">[{{ item.title }}]</NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  align-items: center;
  gap: var(--s-3);
  padding: var(--s-3) 0;
  margin-bottom: var(--s-6);
  border-bottom: 1px dashed var(--border-color);
}

.prompt {
  color: var(--accent);
  font-weight: 700;
}

.main-nav {
  list-style: none;
  padding: 0;
  display: flex;
  margin: 0;
  gap: var(--s-2);
}

.main-nav-item {
  margin: 0;
}

.main-nav-item a {
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.15s ease;
}

.main-nav-item a:hover {
  color: var(--link-color);
}

.main-nav-item a.router-link-active {
  color: var(--text-color);
}
</style>
