import Link from 'next/link';
import { getPosts, Post } from '@/lib/supabase';
import styles from './Blog.module.scss';

type Lang = 'ua' | 'ru' | 'en';

const ui = {
  ua: {
    tag: 'БЛОГ MECHORBIT',
    headline: 'Корисні',
    headlineSpan: 'статті',
    description: 'Поради з обслуговування автомобілів, новини автосервісу\nта огляди технологій',
    readMore: 'Читати далі',
    noCategory: 'БЕЗ РУБРИКИ',
  },
  ru: {
    tag: 'БЛОГ MECHORBIT',
    headline: 'Полезные',
    headlineSpan: 'статьи',
    description: 'Советы по обслуживанию автомобилей, новости автосервиса\nи обзоры технологий',
    readMore: 'Читать далее',
    noCategory: 'БЕЗ РУБРИКИ',
  },
  en: {
    tag: 'BLOG MECHORBIT',
    headline: 'Useful',
    headlineSpan: 'articles',
    description: 'Car maintenance tips, auto service news\nand technology reviews',
    readMore: 'Read more',
    noCategory: 'NO CATEGORY',
  },
};

function getPostFields(post: Post, lang: Lang) {
  return {
    title: post[`${lang}_title`],
    content: post[`${lang}_content`],
    slug: post[`${lang}_slug`],
  };
}

function formatDate(dateStr: string, lang: Lang) {
  return new Date(dateStr).toLocaleDateString(
    lang === 'ua' ? 'uk-UA' : lang === 'ru' ? 'ru-RU' : 'en-US',
    { day: 'numeric', month: 'long', year: 'numeric' },
  );
}

function getExcerpt(content: string, maxLength = 120) {
  if (content.length <= maxLength) return content;
  return content.slice(0, maxLength).trimEnd() + ' [...]';
}

// Моковые данные пока нет Supabase
const MOCK_POSTS: Post[] = [
  {
    id: 1,
    status: 'published',
    image_url: null,
    created_at: new Date().toISOString(),
    ua_title: 'Тестовий пост',
    ua_content: 'Тестовий вміст статті для перевірки відображення блогу.',
    ua_meta_title: '',
    ua_meta_description: '',
    ua_slug: 'test-post-ua',
    ru_title: 'Тестовый пост',
    ru_content: 'Тестовое содержимое статьи для проверки отображения блога.',
    ru_meta_title: '',
    ru_meta_description: '',
    ru_slug: 'test-post-ru',
    en_title: 'Test post',
    en_content: 'Test article content for checking blog display.',
    en_meta_title: '',
    en_meta_description: '',
    en_slug: 'test-post-en',
  },
];

export default async function BlogPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const l = (lang as Lang) || 'ua';
  const t = ui[l] || ui.ua;

  // Когда будет Supabase — заменить MOCK_POSTS на: const posts = await getPosts();
  const posts = MOCK_POSTS;

  return (
    <div className={styles.blogPage}>
      <div className={styles.header}>
        <div className={styles.tag}>{t.tag}</div>
        <h1 className={styles.headline}>
          {t.headline} <span>{t.headlineSpan}</span>
        </h1>
        <p className={styles.description}>{t.description}</p>
      </div>

      <div className={styles.grid}>
        {posts.map((post) => {
          const { title, content, slug } = getPostFields(post, l);
          return (
            <Link key={post.id} href={`/${l}/blog/${slug}`} className={styles.card}>
              <div className={styles.imageWrapper}>
                {post.image_url ? (
                  <img src={post.image_url} alt={title} className={styles.image} />
                ) : (
                  <div className={styles.imagePlaceholder} />
                )}
              </div>
              <div className={styles.cardBody}>
                <div className={styles.categoryTag}>{t.noCategory}</div>
                <h2 className={styles.cardTitle}>{title}</h2>
                <p className={styles.cardExcerpt}>{getExcerpt(content)}</p>
                <div className={styles.cardFooter}>
                  <span className={styles.date}>{formatDate(post.created_at, l)}</span>
                  <span className={styles.readMore}>{t.readMore} →</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
