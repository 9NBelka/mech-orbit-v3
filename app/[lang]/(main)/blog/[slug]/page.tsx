import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostBySlug, Post } from '@/lib/supabase';
import styles from './BlogPost.module.scss';
import type { Metadata } from 'next';

type Lang = 'ua' | 'ru' | 'en';

const ui = {
  ua: { back: '← Назад до блогу', noCategory: 'БЕЗ РУБРИКИ' },
  ru: { back: '← Назад к блогу', noCategory: 'БЕЗ РУБРИКИ' },
  en: { back: '← Back to blog', noCategory: 'NO CATEGORY' },
};

function getPostFields(post: Post, lang: Lang) {
  return {
    title: post[`${lang}_title`],
    content: post[`${lang}_content`],
    metaTitle: post[`${lang}_meta_title`],
    metaDescription: post[`${lang}_meta_description`],
    slug: post[`${lang}_slug`],
  };
}

function formatDate(dateStr: string, lang: Lang) {
  return new Date(dateStr).toLocaleDateString(
    lang === 'ua' ? 'uk-UA' : lang === 'ru' ? 'ru-RU' : 'en-US',
    { day: 'numeric', month: 'long', year: 'numeric' },
  );
}

// Моковые данные — заменить на getPostBySlug(slug) когда будет Supabase
const MOCK_POST: Post = {
  id: 1,
  status: 'published',
  image_url: null,
  created_at: new Date().toISOString(),
  ua_title: 'Тестовий пост',
  ua_content: 'Тестовий вміст статті для перевірки відображення блогу.',
  ua_meta_title: 'Тестовий пост',
  ua_meta_description: 'Опис',
  ua_slug: 'test-post-ua',
  ru_title: 'Тестовый пост',
  ru_content: 'Тестовое содержимое статьи.',
  ru_meta_title: 'Тестовый пост',
  ru_meta_description: 'Описание',
  ru_slug: 'test-post-ru',
  en_title: 'Test post',
  en_content: 'Test article content.',
  en_meta_title: 'Test post',
  en_meta_description: 'Description',
  en_slug: 'test-post-en',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const l = (lang as Lang) || 'ua';

  // Заменить на: const post = await getPostBySlug(slug);
  const post = MOCK_POST;
  if (!post) return {};

  const { metaTitle, metaDescription } = getPostFields(post, l);
  return {
    title: metaTitle,
    description: metaDescription,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const l = (lang as Lang) || 'ua';
  const t = ui[l] || ui.en;

  // Заменить на: const post = await getPostBySlug(slug);
  const post = MOCK_POST;
  if (!post) notFound();

  const { title, content } = getPostFields(post, l);

  return (
    <article className={styles.article}>
      <div className={styles.container}>
        <Link href={`/${l}/blog`} className={styles.back}>
          {t.back}
        </Link>

        <div className={styles.categoryTag}>{t.noCategory}</div>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.date}>{formatDate(post.created_at, l)}</p>

        {post.image_url && (
          <div className={styles.imageWrapper}>
            <img src={post.image_url} alt={title} className={styles.image} />
          </div>
        )}

        <div className={styles.content}>
          {content
            .split('\n')
            .map((paragraph, i) => (paragraph.trim() ? <p key={i}>{paragraph}</p> : null))}
        </div>
      </div>
    </article>
  );
}
