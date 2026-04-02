<template>
  <main class="app">
    <NuxtRouteAnnouncer />

    <MainNavigation />
    <NuxtPage />
  </main>
</template>

<style>
:root {
  color-scheme: light dark;
  --font-body: ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas,
    "DejaVu Sans Mono", monospace;

  /* Spacing scale */
  --s-1: 0.25rem;
  --s-2: 0.5rem;
  --s-3: 0.75rem;
  --s-4: 1rem;
  --s-5: 1.5rem;
  --s-6: 2rem;
  --s-7: 3rem;
  --s-8: 4rem;

  /* Catppuccin Latte */
  --bg-color: #eff1f5;
  --text-color: #4c4f69;
  --text-muted: #8c8fa1;
  --link-color: #1e66f5;
  --link-hover-color: #7287fd;
  --accent: #8839ef;
  --border-color: #ccd0da;
  --code-bg: #e6e9ef;
  --pre-bg: #eff1f5;
  --hover-bg: rgba(108, 111, 133, 0.07);
}

@media (prefers-color-scheme: dark) {
  :root {
    /* Catppuccin Mocha */
    --bg-color: #1e1e2e;
    --text-color: #cdd6f4;
    --text-muted: #6c7086;
    --link-color: #89b4fa;
    --link-hover-color: #b4befe;
    --accent: #cba6f7;
    --border-color: #313244;
    --code-bg: #181825;
    --pre-bg: #1e1e2e;
    --hover-bg: rgba(205, 214, 244, 0.05);
  }
}

html {
  scroll-behavior: smooth;
  font-family: var(--font-body);
  scrollbar-gutter: stable;
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
  font-size: 15px;
  line-height: 1.7;
}

::selection {
  background: var(--accent);
  color: var(--bg-color);
}

a {
  color: var(--link-color);
  text-decoration: none;
  transition: color 0.15s ease;
}

a:hover {
  color: var(--link-hover-color);
}

/* Typography */
* {
  font-family: inherit;
}

h1 {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.3;
  margin: 0 0 var(--s-1);
}

h2 {
  font-size: 1.15rem;
  font-weight: 700;
  line-height: 1.3;
  margin: var(--s-6) 0 var(--s-3);
  color: var(--accent);
}

h3 {
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.4;
  margin: var(--s-5) 0 var(--s-2);
}

h4 {
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.4;
  margin: var(--s-4) 0 var(--s-2);
}

p {
  margin: 0 0 var(--s-4);
}

ul,
ol {
  margin: 0 0 var(--s-4);
  padding-left: 1.5em;
}

li {
  margin-bottom: var(--s-1);
}

li > ul,
li > ol {
  margin-top: var(--s-1);
  margin-bottom: 0;
}

blockquote {
  margin: var(--s-4) 0;
  padding: 0 0 0 var(--s-4);
  border-left: 2px solid var(--accent);
  color: var(--text-muted);
}

blockquote p:last-child {
  margin-bottom: 0;
}

:not(pre) > code {
  font-size: 0.95em;
  padding: 0.1em 0.3em;
  background: var(--code-bg);
}

pre {
  font-size: 0.85rem;
  line-height: 1.6;
  margin: var(--s-4) 0;
  padding: var(--s-4);
  overflow-x: auto;
  border: 1px solid var(--border-color);
}

hr {
  border: none;
  margin: var(--s-6) 0;
  color: var(--border-color);
  text-align: center;
}

hr::before {
  content: "* * *";
  color: var(--text-muted);
  letter-spacing: 0.5em;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: var(--s-4) 0;
  font-size: 0.9rem;
}

th,
td {
  padding: var(--s-2) var(--s-3);
  border-bottom: 1px solid var(--border-color);
  text-align: left;
}

th {
  font-weight: 600;
  color: var(--accent);
}

img {
  max-width: 100%;
  height: auto;
  margin: var(--s-4) 0;
}

strong {
  font-weight: 700;
  color: var(--text-color);
}

/* Shiki dark mode bridge */
@media (prefers-color-scheme: dark) {
  .shiki,
  .shiki span {
    color: var(--shiki-dark) !important;
    background-color: var(--shiki-dark-bg) !important;
    font-style: var(--shiki-dark-font-style) !important;
    font-weight: var(--shiki-dark-font-weight) !important;
    text-decoration: var(--shiki-dark-text-decoration) !important;
  }
}

/* Layout */
.app {
  max-width: 680px;
  margin: 0 auto;
  padding: var(--s-5) var(--s-4) var(--s-7);
}

@media (min-width: 640px) {
  .app {
    padding: var(--s-6) var(--s-5) var(--s-8);
  }
}

.email > :not(span:nth-child(2)) {
  display: none;
}
</style>
