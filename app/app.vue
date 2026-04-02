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
  margin: 0 0 0.25rem;
}

h2 {
  font-size: 1.15rem;
  font-weight: 700;
  line-height: 1.3;
  margin: 2rem 0 0.75rem;
  color: var(--accent);
}

h3 {
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.4;
  margin: 1.5rem 0 0.5rem;
}

h4 {
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.4;
  margin: 1.25rem 0 0.5rem;
}

p {
  margin: 0 0 1rem;
}

ul,
ol {
  margin: 0 0 1rem;
  padding-left: 1.5em;
}

li {
  margin-bottom: 0.25rem;
}

li > ul,
li > ol {
  margin-top: 0.25rem;
  margin-bottom: 0;
}

blockquote {
  margin: 1.25rem 0;
  padding: 0 0 0 1.25rem;
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
  margin: 1.25rem 0;
  padding: 1rem;
  overflow-x: auto;
  border: 1px solid var(--border-color);
}

hr {
  border: none;
  margin: 2rem 0;
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
  margin: 1.25rem 0;
  font-size: 0.9rem;
}

th,
td {
  padding: 0.4rem 0.75rem;
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
  margin: 1.25rem 0;
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
  padding: 24px 20px 48px;
}

@media (min-width: 640px) {
  .app {
    padding: 32px 24px 64px;
  }
}

.email > :not(span:nth-child(2)) {
  display: none;
}
</style>
