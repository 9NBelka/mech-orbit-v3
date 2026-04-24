import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

export default async function RootPage() {
  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language') || '';

  // Определяем язык из заголовка браузера
  const lang = acceptLanguage.toLowerCase();

  if (lang.includes('ru')) {
    redirect('/ru');
  } else if (lang.includes('uk') || lang.includes('ua')) {
    redirect('/ua');
  } else if (lang.includes('en')) {
    redirect('/en');
  } else {
    redirect('/ua'); // дефолт
  }
}
