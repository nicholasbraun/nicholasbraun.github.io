import { defineEventHandler, setHeader } from "h3";
import { queryCollection } from "@nuxt/content/server";

const escapeXml = (value: string) => {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
};

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const siteUrl = config.public.siteUrl.replace(/\/$/, "");

  const posts = await queryCollection(event, "blogPosts").order("date", "DESC").all();

  const items = posts
    .map((post) => {
      const url = `${siteUrl}${post.path}`;
      const pubDate = new Date(post.date).toUTCString();
      const description = post.description ?? "";

      return `\n  <item>\n    <title>${escapeXml(post.title)}</title>\n    <link>${url}</link>\n    <guid>${url}</guid>\n    <pubDate>${pubDate}</pubDate>\n    <description>${escapeXml(description)}</description>\n  </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n<channel>\n  <title>Nicholas Braun Blog</title>\n  <link>${siteUrl}/blog</link>\n  <description>Blog posts by Nicholas Braun</description>\n  <language>en-us</language>${items}\n</channel>\n</rss>`;

  setHeader(event, "content-type", "application/rss+xml; charset=utf-8");
  return xml;
});
