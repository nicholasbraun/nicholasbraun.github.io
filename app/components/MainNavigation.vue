<script setup lang="ts">
const { data: nav } = await useAsyncData("navigation", () => {
  return queryCollectionNavigation("pages");
});
</script>

<template>
  <nav>
    <span class="prompt">&gt;<span class="cursor">_</span></span>
    <ul v-if="nav" class="main-nav">
      <li v-for="item in nav" :key="item.path" class="main-nav-item">
        <NuxtLink :to="item.path">[{{ item.title }}]</NuxtLink>
      </li>
    </ul>
    <!-- Kept out of the generated list: the CV is a static file in public/,
         not a content page. target="_blank" also keeps NuxtLink from routing
         it through the catch-all page, which would 404. -->
    <NuxtLink
      class="cv-link"
      to="/nicholas-braun-cv.pdf"
      target="_blank"
      aria-label="CV (PDF, opens in a new tab)"
      >[cv]</NuxtLink
    >
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--s-3);
  padding: var(--s-3) 0;
  margin-bottom: var(--s-6);
  border-bottom: 1px dashed var(--border-color);
  position: sticky;
  top: 0;
  background: var(--bg-color);
  z-index: 10;
}

.prompt {
  color: var(--accent);
  font-weight: 700;
}

.cursor {
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  50% { opacity: 0; }
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

.main-nav-item a,
.cv-link {
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.15s ease;
}

.main-nav-item a:hover,
.cv-link:hover {
  color: var(--link-color);
}

.main-nav-item a.router-link-active {
  color: var(--text-color);
}

/* Sits opposite the page links, and wraps onto its own right-aligned line on
   screens too narrow to hold both — the page links already fill the row at
   320px. The download itself is counted by Plausible's fileDownloads option,
   so no click handler is needed here. */
.cv-link {
  margin-left: auto;
}
</style>
