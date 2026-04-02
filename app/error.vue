<script setup lang="ts">
const props = defineProps<{
  error: {
    statusCode: number;
    statusMessage?: string;
  };
}>();

useSeoMeta({
  title: `${props.error.statusCode} - Not Found`,
});
</script>

<template>
  <div class="app">
    <NuxtRouteAnnouncer />

    <a href="#main-content" class="skip-link">Skip to content</a>
    <MainNavigation />
    <main id="main-content" class="error-page">
      <pre class="error-output">$ cat {{ $route.path }}
bash: {{ $route.path }}: No such file or directory

exit code: {{ error.statusCode }}</pre>
      <NuxtLink to="/" class="error-link">cd ~</NuxtLink>
    </main>
    <footer class="footer">
      <span class="footer__path">{{ $route.path }}</span>
      <span class="footer__spacer"></span>
      <NuxtLink to="/impressum">[Impressum]</NuxtLink>
      <NuxtLink to="/datenschutz">[Datenschutz]</NuxtLink>
    </footer>
  </div>
</template>

<style scoped>
.error-page {
  padding: var(--s-6) 0;
}

.error-output {
  border: none;
  color: var(--text-muted);
  margin-bottom: var(--s-5);
  padding: 0;
}

.error-link {
  color: var(--accent);
  font-size: 0.9rem;
}
</style>
