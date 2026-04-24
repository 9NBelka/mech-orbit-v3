import styles from './TermsOfUse.module.scss';

const translations = {
  ua: {
    title: 'Умови використання',
    titleHighlight: 'MechOrbit',
    description1:
      'Ласкаво просимо на веб-сайт MechOrbit. Використовуючи наш веб-сайт, ви погоджуєтесь дотримуватися цих Умов використання.',
    section1: '1. Загальні положення',
    section1_desc: 'Ці Умови використання регулюють доступ та використання веб-сайту MechOrbit.',
    section2: '2. Використання веб-сайту',
    section2_list: [
      "Ви зобов'язуєтесь використовувати веб-сайт лише в законних цілях;",
      'Забороняється використовувати веб-сайт для шахрайських або протиправних дій;',
      'Ви не маєте права намагатися отримати несанкціонований доступ до систем сайту.',
    ],
    section3: '3. Інтелектуальна власність',
    section3_desc:
      'Увесь контент, розміщений на веб-сайті, є власністю MechOrbit або використовується на законних підставах і захищений авторським правом.',
    section4: '4. Обмеження відповідальності',
    section4_desc:
      'MechOrbit не несе відповідальності за будь-які прямі або непрямі збитки, що виникають у результаті використання або неможливості використання веб-сайту.',
    section5: '5. Зміни умов',
    section5_desc: 'Ми залишаємо за собою право змінювати ці Умови використання в будь-який час.',
    section6: '6. Контактна інформація',
    section6_desc:
      "Якщо у вас є питання щодо цих Умов використання, будь ласка, зв'яжіться з нами:",
    contact: 'Email: forbludov@gmail.com',
  },
  ru: {
    title: 'Условия использования',
    titleHighlight: 'MechOrbit',
    description1:
      'Добро пожаловать на веб-сайт MechOrbit. Используя наш веб-сайт, вы соглашаетесь соблюдать данные Условия использования.',
    section1: '1. Общие положения',
    section1_desc:
      'Настоящие Условия использования регулируют доступ и использование веб-сайта MechOrbit.',
    section2: '2. Использование веб-сайта',
    section2_list: [
      'Вы обязуетесь использовать сайт только в законных целях;',
      'Запрещено использовать сайт для мошеннических или незаконных действий;',
      'Запрещены попытки несанкционированного доступа к системам сайта.',
    ],
    section3: '3. Интеллектуальная собственность',
    section3_desc:
      'Весь контент на веб-сайте является собственностью MechOrbit и защищён авторским правом.',
    section4: '4. Ограничение ответственности',
    section4_desc:
      'MechOrbit не несёт ответственности за любые прямые или косвенные убытки, возникшие в результате использования сайта.',
    section5: '5. Изменения условий',
    section5_desc:
      'Мы оставляем за собой право изменять данные Условия использования в любое время.',
    section6: '6. Контактная информация',
    section6_desc: 'Если у вас есть вопросы по данным Условиям использования, свяжитесь с нами:',
    contact: 'Email: forbludov@gmail.com',
  },
  en: {
    title: 'Terms of Use',
    titleHighlight: 'MechOrbit',
    description1:
      'Welcome to the MechOrbit website. By using our Website, you agree to comply with these Terms of Use.',
    section1: '1. General Provisions',
    section1_desc: 'These Terms of Use govern your access to and use of the MechOrbit Website.',
    section2: '2. Use of the Website',
    section2_list: [
      'You agree to use the Website only for lawful purposes;',
      'You must not use the Website for fraudulent or illegal activities;',
      'You must not attempt unauthorized access to the Website systems.',
    ],
    section3: '3. Intellectual Property',
    section3_desc:
      'All content on the Website is the property of MechOrbit and is protected by copyright laws.',
    section4: '4. Limitation of Liability',
    section4_desc:
      'MechOrbit shall not be liable for any direct or indirect damages arising from the use or inability to use the Website.',
    section5: '5. Changes to the Terms',
    section5_desc: 'We reserve the right to update these Terms of Use at any time.',
    section6: '6. Contact Information',
    section6_desc: 'If you have any questions about these Terms of Use, please contact us:',
    contact: 'Email: forbludov@gmail.com',
  },
};

type Lang = 'ua' | 'ru' | 'en';

export default async function TermsOfUsePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = translations[lang as Lang] || translations.en;

  return (
    <div className={styles.privacyPolicyMainBlock}>
      <div className={styles.privacyPolicyBlock}>
        <h1 className={styles.privacyPolicyTitle}>
          {t.title} <span>{t.titleHighlight}</span>
        </h1>
        <p className={styles.privacyPolicyDescriptions}>{t.description1}</p>
        <div className={styles.privacyPolicyMainList}>
          <h4 className={styles.privacyPolicyMainListTitle}>{t.section1}</h4>
          <p className={styles.privacyPolicyMainListDescriptions}>{t.section1_desc}</p>
          <h4 className={styles.privacyPolicyMainListTitle}>{t.section2}</h4>
          <ul className={styles.privacyPolicyList}>
            {t.section2_list.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          <h4 className={styles.privacyPolicyMainListTitle}>{t.section3}</h4>
          <p className={styles.privacyPolicyMainListDescriptions}>{t.section3_desc}</p>
          <h4 className={styles.privacyPolicyMainListTitle}>{t.section4}</h4>
          <p className={styles.privacyPolicyMainListDescriptions}>{t.section4_desc}</p>
          <h4 className={styles.privacyPolicyMainListTitle}>{t.section5}</h4>
          <p className={styles.privacyPolicyMainListDescriptions}>{t.section5_desc}</p>
          <h4 className={styles.privacyPolicyMainListTitle}>{t.section6}</h4>
          <p className={styles.privacyPolicyMainListDescriptions}>{t.section6_desc}</p>
          <p className={styles.privacyPolicyMainListDescriptions}>{t.contact}</p>
        </div>
      </div>
    </div>
  );
}
