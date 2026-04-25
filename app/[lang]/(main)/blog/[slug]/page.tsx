import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostBySlug, Post } from '@/lib/supabase';
import styles from './BlogPost.module.scss';
import type { Metadata } from 'next';
import { TiArrowLeftThick } from 'react-icons/ti';
import ReactMarkdown from 'react-markdown';

type Lang = 'ua' | 'ru' | 'en';

const ui = {
  ua: { back: 'Назад до блогу', noCategory: 'БЕЗ РУБРИКИ' },
  ru: { back: 'Назад к блогу', noCategory: 'БЕЗ РУБРИКИ' },
  en: { back: 'Back to blog', noCategory: 'NO CATEGORY' },
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

export async function generateMetadata({ params }: any) {
  const { lang, slug } = await params;
  const l = (lang as Lang) || 'ua';

  const post = await getPostBySlug(slug);

  // console.log('SLUG:', slug);
  // console.log('POST:', post);

  if (!post) return {};

  const { metaTitle, metaDescription } = getPostFields(post, l);

  return {
    title: metaTitle,
    description: metaDescription,
  };
}

export default async function BlogPostPage({ params }: any) {
  const { lang, slug } = await params;
  const l = (lang as Lang) || 'ua';
  const t = ui[l] || ui.en;

  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const { title, content } = getPostFields(post, l);

  return (
    <article className={styles.article}>
      <div className={styles.container}>
        <Link href={`/${l}/blog`} className={styles.back}>
          <TiArrowLeftThick className={styles.backIcon} />
          {t.back}
        </Link>

        <div className={styles.articleBlockCenter}>
          <div className={styles.articleBlock}>
            {/* <div className={styles.postCategories}>
              <span className={styles.category}>{t.noCategory}</span>
            </div> */}
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.postDate}>{formatDate(post.created_at, l)}</p>

            {post.image_url && (
              <div className={styles.imageWrapper}>
                <img src={post.image_url} alt={title} className={styles.image} />
              </div>
            )}

            {/* <div className={styles.content}>
              {content.split('\n').map((p, i) => (p.trim() ? <p key={i}>{p}</p> : null))}
            </div> */}
            <div className={styles.content}>
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
