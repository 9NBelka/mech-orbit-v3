import { MetadataRoute } from 'next';
import { getPosts } from '@/lib/supabase';

const BASE_URL = 'https://mechorbit.com';
const LANGS = ['ua', 'ru', 'en'] as const;
const HREFLANG = {
  uk: `${BASE_URL}/ua`,
  ru: `${BASE_URL}/ru`,
  en: `${BASE_URL}/en`,
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const mainPages = LANGS.map((lang) => ({
    url: `${BASE_URL}/${lang}`,
    lastModified: '2026-04-01',
    changeFrequency: 'weekly' as const,
    priority: 1.0,
    alternates: { languages: HREFLANG },
  }));

  const legalPages = ['privacy-policy', 'terms-of-use', 'public-offer'];
  const legal = LANGS.flatMap((lang) =>
    legalPages.map((page) => ({
      url: `${BASE_URL}/${lang}/${page}`,
      lastModified: '2026-03-03',
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    })),
  );

  const blogPages = LANGS.map((lang) => ({
    url: `${BASE_URL}/${lang}/blog`,
    lastModified: '2026-04-01',
    changeFrequency: 'weekly' as const,
    priority: 0.8,
    alternates: { languages: HREFLANG },
  }));

  // Динамические посты блога
  const posts = await getPosts();
  const blogPosts = posts.flatMap((post) =>
    LANGS.map((lang) => ({
      url: `${BASE_URL}/${lang}/blog/${post[`${lang}_slug`]}`,
      lastModified: post.created_at,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  );

  return [
    {
      url: `${BASE_URL}/`,
      lastModified: '2026-04-01',
      changeFrequency: 'weekly' as const,
      priority: 1.0,
      alternates: { languages: HREFLANG },
    },
    ...mainPages,
    ...blogPages,
    ...blogPosts,
    ...legal,
  ];
}
