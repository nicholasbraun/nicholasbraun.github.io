import { defineEventHandler, setHeader } from "h3";
import { queryCollection } from "@nuxt/content/server";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const siteUrl = config.public.siteUrl.replace(/\/$/, "");

  const pages = await queryCollection(event, "pages").all();
  const posts = await queryCollection(event, "blogPosts")
    .order("date", "DESC")
    .all();

  const urls = [
    ...pages.map((page) => ({
      loc: `${siteUrl}${page.path}`,
      lastmod: new Date().toISOString().slice(0, 10),
    })),
    ...posts.map((post) => ({
      loc: `${siteUrl}${post.path}`,
      lastmod: post.date
        ? new Date(post.date).toISOString().slice(0, 10)
        : new Date().toISOString().slice(0, 10),
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n  </url>`).join("\n")}
</urlset>`;

  setHeader(event, "content-type", "application/xml; charset=utf-8");
  return xml;
});
