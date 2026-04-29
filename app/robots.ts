import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/login',
          '/register',
          '/ua/login',
          '/ua/register',
          '/en/login',
          '/en/register',
          '/ru/login',
          '/ru/register',
          '/admin/',
          '/api/',
          '/private/',
          '/tmp/',
          '/config/',
          '/backup/',
          '/logs/',
          '/*?*',
          '/*?utm_*',
          '/*?fbclid=*',
          '/*?gclid=*',
          '/cart/',
          '/checkout/',
          '/dashboard/',
          '/payment/',
          '/search/',
          '/filter/',
          '/temp/',
          '/demo/',
          '/test/',
        ],
        crawlDelay: 0.5,
      },
      {
        userAgent: 'Googlebot',
        allow: ['/', '/ru/', '/ua/', '/en/', '/blog/', '/ua/blog/', '/ru/blog/', '/en/blog/'],
        disallow: ['/*?sort=', '/*?page=', '/*?filter=', '/*?order='],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: ['/images/'],
      },
    ],
    sitemap: ['https://mechorbit.com/sitemap.xml'],
  };
}
