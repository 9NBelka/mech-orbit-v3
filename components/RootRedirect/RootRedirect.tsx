'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootRedirect({ defaultLang }: { defaultLang: string }) {
  const router = useRouter();

  useEffect(() => {
    // Читаем сохранённый язык из localStorage
    const saved = localStorage.getItem('preferredLang');
    const validLangs = ['ua', 'ru', 'en'];
    const lang = saved && validLangs.includes(saved) ? saved : defaultLang;
    router.replace(`/${lang}`);
  }, [defaultLang, router]);

  // Пока идёт редирект — пустой экран
  return null;
}
