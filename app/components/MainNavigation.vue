<script setup lang="ts">
const { data: nav } = await useAsyncData("navigation", () => {
  return queryCollectionNavigation("pages");
});
</script>

<template>
  <nav>
    <ul v-if="nav" style="list-style: none; padding: 0; display: flex">
      <li v-for="item in nav" :key="item.path" style="margin-right: 10px">
        <NuxtLink :to="item.path">{{ item.title }}</NuxtLink>
      </li>
    </ul>
  </nav>
</template>
