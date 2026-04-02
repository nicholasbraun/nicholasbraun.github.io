<template>
  <footer class="footer">
    <span class="footer__path">~{{ $route.path }}</span>
    <span class="footer__spacer"></span>
    <NuxtLink to="/impressum">[Impressum]</NuxtLink>
    <NuxtLink to="/datenschutz">[Datenschutz]</NuxtLink>
  </footer>
</template>

<style scoped>
.footer {
  margin-top: var(--s-8);
  padding: var(--s-1) var(--s-3);
  background: var(--code-bg);
  border: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  gap: var(--s-2);
  font-size: 0.75rem;
}

.footer__path {
  color: var(--accent);
}

.footer__spacer {
  flex: 1;
}

.footer a {
  color: var(--text-muted);
  text-decoration: none;
  transition: color 0.15s ease;
}

.footer a:hover {
  color: var(--link-color);
}
</style>
