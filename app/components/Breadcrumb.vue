<script setup lang="ts">
const route = useRoute();

const segments = computed(() => {
  const parts = route.path.split("/").filter(Boolean);
  return parts.map((part, i) => ({
    label: part,
    path: "/" + parts.slice(0, i + 1).join("/"),
    isLast: i === parts.length - 1,
  }));
});
</script>

<template>
  <div v-if="segments.length" class="breadcrumb">
    <NuxtLink to="/" aria-label="Home">~</NuxtLink>/<template
      v-for="(seg, i) in segments"
      :key="seg.path"
    ><NuxtLink v-if="!seg.isLast" :to="seg.path">{{ seg.label }}</NuxtLink><span v-else>{{ seg.label }}</span><template v-if="i < segments.length - 1">/</template></template>
  </div>
</template>

<style scoped>
.breadcrumb {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-bottom: var(--s-5);
}

.breadcrumb a {
  color: var(--link-color);
  transition: color 0.15s ease;
}

.breadcrumb a:hover {
  color: var(--accent);
}
</style>
