import { defineContentConfig, defineCollection, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    pages: defineCollection({
      type: "page",
      source: "*.md",
    }),
    blogPosts: defineCollection({
      type: "page",
      source: "blog/*.md",
      schema: z.object({
        date: z.string(),
      }),
    }),
    projectPosts: defineCollection({
      type: "page",
      source: "projects/*.md",
    }),
  },
});
