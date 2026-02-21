<template>
  <main class="app">
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </main>
</template>

<style>
:root {
  color-scheme: light dark;
  --bg-color: #f8f7f4;
  --text-color: #111111;
  --link-color: #0f4c81;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg-color: #111418;
    --text-color: #eceff4;
    --link-color: #8ecbff;
  }
}

html,
body,
#__nuxt {
  min-height: 100%;
}

body {
  margin: 0;
  background: var(--bg-color);
  color: var(--text-color);
  font-size: 20px;
  line-height: 1.4;
}

a {
  color: var(--link-color);
}

.app {
  max-width: 900px;
  padding: 16px;
}
</style>
