<script setup lang="ts">
type Client = {
  name: string;
  slug: string;
  url: string;
  /** Rendered height of the mark in px. Every viewBox is cropped to its ink, so this is exact. */
  height: number;
};

// Ordered by public prominence, so the most recognisable marks lead the wall.
const clients: Client[] = [
  { name: "FIFA", slug: "fifa", url: "https://www.fifa.com", height: 25 },
  {
    name: "Bertelsmann Stiftung",
    slug: "bertelsmann-stiftung",
    url: "https://www.bertelsmann-stiftung.de",
    height: 20,
  },
  {
    name: "Baden-Württemberg",
    slug: "baden-wuerttemberg",
    url: "https://www.baden-wuerttemberg.de",
    height: 28,
  },
  { name: "Juwelo", slug: "juwelo", url: "https://www.juwelo.de", height: 30 },
  {
    name: "Klimaschutzstiftung Baden-Württemberg",
    slug: "klimaschutzstiftung-bw",
    url: "https://www.klimaschutzstiftung-bw.de",
    height: 62,
  },
  {
    name: "Klimafonds Baden-Württemberg",
    slug: "klimafonds-bw",
    url: "https://www.klimafonds-bw.de",
    height: 34,
  },
  {
    name: "jooli.com",
    slug: "jooli",
    url: "https://www.jooli.com",
    height: 34,
  },
  { name: "QRaGo", slug: "qrago", url: "https://www.qrago.de", height: 22 },
  { name: "RYSM", slug: "rysm", url: "https://rysm.com", height: 25 },
  { name: "4ARGE", slug: "4arge", url: "https://4arge.com", height: 46 },
];
</script>

<template>
  <div class="clients">
    <ul class="clients__grid">
      <li v-for="client in clients" :key="client.slug" class="clients__cell">
        <a
          :href="client.url"
          class="clients__link"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="client.name"
        >
          <span
            class="clients__mark"
            :style="{
              '--mark': `url(/logos/clients/${client.slug}.svg)`,
              '--mark-h': `${client.height}px`,
            }"
          />
        </a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.clients {
  margin: 0 0 var(--s-4);
}

.clients__grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  /* Centred so a part-filled last row still reads as deliberate as the list grows. */
  justify-content: center;
  gap: var(--s-2);
}

.clients__cell {
  box-sizing: border-box;
  margin: 0;
  flex: 0 1 calc((100% - var(--s-2)) / 2);
}

@media (min-width: 640px) {
  .clients__cell {
    flex-basis: calc((100% - 2 * var(--s-2)) / 3);
  }
}

.clients__link {
  box-sizing: border-box;
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  /* Tall enough for the tallest mark (62px) plus padding, so every row matches. */
  min-height: 90px;
  padding: var(--s-3) var(--s-4);
  border: 1px solid var(--border-color);
  color: var(--text-muted);
  transition:
    color 0.15s ease,
    border-color 0.15s ease,
    background 0.15s ease;
}

.clients__link:hover {
  color: var(--text-color);
  border-color: var(--accent);
  background: var(--hover-bg);
}

.clients__mark {
  display: block;
  width: 100%;
  height: var(--mark-h);
  background-color: currentColor;
  -webkit-mask: var(--mark) center / contain no-repeat;
  mask: var(--mark) center / contain no-repeat;
}

.clients__more {
  margin: var(--s-3) 0 0;
  color: var(--text-muted);
  font-size: 0.85rem;
}

@media (prefers-reduced-motion: reduce) {
  .clients__link {
    transition: none;
  }
}
</style>
