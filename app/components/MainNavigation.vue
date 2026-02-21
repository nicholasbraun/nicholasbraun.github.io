<script setup lang="ts">
const { data: nav } = await useAsyncData("navigation", () => {
  return queryCollectionNavigation("pages");
});
</script>

<template>
  <nav>
    <ul v-if="nav" class="main-nav">
      <li v-for="item in nav" :key="item.path" class="main-nav-item">
        <NuxtLink :to="item.path">{{ item.title }}</NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.main-nav {
  list-style: none;
  padding: 0;
  display: flex;
  margin: 0;
  gap: 10px;
}

.main-nav-item {
  margin: 0;
}
</style>
