<script setup lang="ts">
// Split so the address never appears as one string — not in the prerendered
// HTML, and not as a contiguous literal in the JS bundle either.
const user = "hallo";
const domain = "nicholasbraun";
const tld = "de";

const href = ref<string>();

// Built on first hover/focus rather than at render, so a scraper that renders
// the page but never interacts with it still finds no mailto: anywhere.
function reveal() {
  href.value ??= `mailto:${user}@${domain}.${tld}`;
}

function open(event: MouseEvent) {
  reveal();
  trackEvent("Email Click");
  // The browser resolved the default action before `href` existed, so the
  // navigation has to be done by hand.
  event.preventDefault();
  window.location.href = href.value as string;
}
</script>

<template>
  <!-- Kept on one line, and left unformatted on purpose: whitespace between
       these parts would land in the middle of the rendered address. -->
  <!-- prettier-ignore -->
  <a class="email" role="link" tabindex="0" :href="href" @mouseenter="reveal" @focus="reveal" @click="open">{{ user }}@<span>notmydomain.</span><span>{{ domain }}.</span><span>alsonotmydomain.</span>{{ tld }}</a>
</template>

<style scoped>
.email {
  /* Stays inline: flex items are block-level boxes, which would make a copied
     address paste with line breaks between the parts. */
  cursor: pointer;
}

/* Only the second span is real; the decoys stay in the markup for scrapers but
   are pulled from the render tree, so screen readers read the address right. */
.email > :not(span:nth-child(2)) {
  display: none;
}
</style>
