import Link from 'next/link';
import { getPosts, Post } from '@/lib/supabase';
import styles from './BlogPreviewSection.module.scss';
import ReactMarkdown from 'react-markdown';

type Lang = 'ua' | 'ru' | 'en';

const ui = {
  ua: {
    tag: 'БЛОГ MECHORBIT',
    headline: 'Корисні',
    headlineSpan: 'статті',
    description: 'Поради з обслуговування автомобілів, новини автосервісу\nта огляди технологій',
    readMore: 'Читати далі',
    allPosts: 'Всі статті →',
  },
  ru: {
    tag: 'БЛОГ MECHORBIT',
    headline: 'Полезные',
    headlineSpan: 'статьи',
    description: 'Советы по обслуживанию автомобилей, новости автосервиса\nи обзоры технологий',
    readMore: 'Читать далее',
    allPosts: 'Все статьи →',
  },
  en: {
    tag: 'BLOG MECHORBIT',
    headline: 'Useful',
    headlineSpan: 'articles',
    description: 'Car maintenance tips, auto service news\nand technology reviews',
    readMore: 'Read more',
    allPosts: 'All articles →',
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

function getExcerpt(content: string, maxLength = 260) {
  if (content.length <= maxLength) return content;
  return content.slice(0, maxLength).trimEnd() + '...';
}

export default async function BlogPreviewSection({ lang }: { lang: string }) {
  const l = (lang as Lang) || 'ua';
  const t = ui[l] || ui.ua;

  const allPosts = await getPosts();
  const posts = allPosts.slice(0, 3); // только последние 3

  if (posts.length === 0) return null;

  return (
    <section className={styles.blogPreview} id='blog'>
      <div className={styles.container}>
        <div className={styles.textContent}>
          <div className={styles.tagBlock}>
            <p>{t.tag}</p>
          </div>
          <h2 className={styles.titleScreen}>
            {t.headline} <span>{t.headlineSpan}</span>
          </h2>
          <div className={styles.borderLine}></div>
          <p className={styles.textDescription}>{t.description}</p>
        </div>

        <div className={styles.postsBlockMain}>
          {posts.map((post) => {
            const { title, content, slug } = getPostFields(post, l);
            return (
              <Link key={post.id} href={`/${l}/blog/${slug}`} className={styles.card}>
                <div className={styles.postImage}>
                  {post.image_url ? (
                    <img src={post.image_url} alt={title} className={styles.image} />
                  ) : (
                    <div className={styles.imagePlaceholder} />
                  )}
                </div>
                <div className={styles.postContent}>
                  <div className={styles.postCategories}></div>
                  <h2 className={styles.postTitle}>{title}</h2>
                  <div className={styles.postExcerpt}>
                    <ReactMarkdown>{getExcerpt(content)}</ReactMarkdown>
                  </div>
                  <div className={styles.postDateAndButton}>
                    <span className={styles.postDate}>{formatDate(post.created_at, l)}</span>
                    <div className={styles.linkBlock}>
                      <span className={styles.readMore}>{t.readMore} →</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className={styles.allPostsBlock}>
          <Link href={`/${l}/blog`} className={styles.allPostsLink}>
            {t.allPosts}
          </Link>
        </div>
      </div>
    </section>
  );
}
