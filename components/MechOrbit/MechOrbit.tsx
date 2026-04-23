import MechOrbitClient from './MechOrbitClient';
import { getT } from '@/lib/i18n';
import Hero from './sections/Hero/Hero';
import AboutUsScreen from './sections/AboutUs/AboutUs';
import AboutUsScreenBookvin from './sections/AboutUsScreenBookvin/AboutUsScreenBookvin';
import AboutUsScreenVinApp from './sections/AboutUsScreenVinApp/AboutUsScreenVinApp';
import WhyUsScreen from './sections/WhyUsScreen/WhyUsScreen';
import WhatDoWeHaveScreen from './sections/WhatDoWeHaveScreen/WhatDoWeHaveScreen';
import AIMonitoringScreen from './sections/AIMonitoringScreen/AIMonitoringScreen';
import ForWhoScreen from './sections/ForWhoScreen/ForWhoScreen';
import FAQScreen from './sections/FAQScreen/FAQScreen';
import TariffsScreen from './sections/TariffsScreen/TariffsScreen';
import ContactsScreen from './sections/ContactsScreen/ContactsScreen';
import Footer from './sections/Footer/Footer';

export default function MechOrbit({ lang }: { lang: string }) {
  const t = getT(lang);

  const navLinks = [
    { title: t.nav.product, linkToPage: 'product' },
    { title: t.nav.solutions, linkToPage: 'solution' },
    { title: t.nav.calculator, linkToPage: 'calculator' },
    { title: t.nav.integrations, linkToPage: 'integrations' },
    { title: t.nav.pricing, linkToPage: 'price' },
    { title: t.nav.contacts, linkToPage: 'contacts' },
  ];

  return (
    <div>
      <MechOrbitClient
        lang={lang}
        onFooterAndHeaderTextLinksMain={navLinks}
        loginButtonText={t.header.loginButton}
      />
      <main>
        <Hero 
          badge={t.hero.badge}
          headline={t.hero.headline}
          headlineTwo={t.hero.headlineTwo}
          descriptionTitle={t.hero.descriptionTitle}
          subDescription={t.hero.subDescription}
          button={t.hero.button}
          list={t.hero.list}/>
         <AboutUsScreen
          tag={t.aboutUs.tag}
          title={t.aboutUs.title}
          description={t.aboutUs.description}
          connectButton={t.aboutUs.connectButton}
          learnMoreButton={t.aboutUs.learnMoreButton}
          cards={t.aboutUs.cards}
        />
        <AboutUsScreenBookvin
          title={t.aboutUsBookvin.title}
          description={t.aboutUsBookvin.description}
          learnMoreButton={t.aboutUsBookvin.learnMoreButton}
          cards={t.aboutUsBookvin.cards}
        />
         <AboutUsScreenVinApp
          title={t.aboutUsVinapp.title}
          description={t.aboutUsVinapp.description}
          learnMoreButton={t.aboutUsVinapp.learnMoreButton}
          cards={t.aboutUsVinapp.cards}
        />
        <WhyUsScreen
          headline={t.whyUs.headline}
          headlineSpan={t.whyUs.headlineSpan}
          subTitle={t.whyUs.subTitle}
          description={t.whyUs.description}
          conclusionSpan={t.whyUs.conclusionSpan}
          conclusionText={t.whyUs.conclusionText}
          items={t.whyUs.items}
        />
         <WhatDoWeHaveScreen
          headlineSpan={t.whatDoWeHave.headlineSpan}
          headline={t.whatDoWeHave.headline}
          description={t.whatDoWeHave.description}
          cards={t.whatDoWeHave.cards}
          textAndList={t.whatDoWeHave.textAndList}
        />
        <AIMonitoringScreen aimonitoringtext={t.aiMonitoring} />
        <ForWhoScreen
          tag={t.forWho.tag}
          headlineSpan={t.forWho.headlineSpan}
          headline={t.forWho.headline}
          description={t.forWho.description}
          cards={t.forWho.cards}
          integrations={t.forWho.integrations}
        />
        <TariffsScreen t={t.tariffs} />
        <FAQScreen tag={t.faq.tag} headline={t.faq.headline} headlineSpan={t.faq.headlineSpan} description={t.faq.description} faqs={t.faq.faqs} />
        <ContactsScreen t={t.contacts} />
      </main>
      <Footer onFooterAndHeaderTextLinksMain={navLinks} t={t.footer} />
    </div>
  );
}