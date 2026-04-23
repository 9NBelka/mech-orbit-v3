'use client';

import { useState } from 'react';
import styles from './FAQScreen.module.scss';
import clsx from 'clsx';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';

interface FaqList {
  pointOne: string;
  pointTwo: string;
  pointThree: string;
  pointFour: string;
}

interface Faq {
  question: string;
  answer: string;
  list?: FaqList;
}

interface FAQScreenProps {
  tag: string;
  headline: string;
  headlineSpan: string;
  description: string;
  faqs: Faq[];
}

export default function FAQScreen({ tag, headline, headlineSpan, description, faqs }: FAQScreenProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className={styles.faqScreen} id='faq'>
      <div className={styles.container}>
        <div className={styles.textContent}>
          <div className={styles.tagBlock}>
            <p>{tag}</p>
          </div>
          <h3 className={styles.titleScreen}>
            {headline} <span>{headlineSpan}</span>
          </h3>
          <div className={styles.borderLine}></div>
          <p className={styles.textDescription}>{description}</p>
        </div>

        <div className={styles.accordion}>
          {faqs.map((faq, index) => (
            <div className={styles.accordionItem} key={index}>
              <button
                className={clsx(styles.accordionButton, activeIndex === index && styles.accordionButtonActive)}
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}>
                <span>{faq.question}</span>
                {activeIndex === index
                  ? <BsChevronUp className={styles.accordionIcon} />
                  : <BsChevronDown className={styles.accordionIcon} />
                }
              </button>
              <div className={clsx(styles.accordionContent, activeIndex === index && styles.active)}>
                <p className={styles.answerText}>{faq.answer}</p>
                {faq.list && (
                  <ul className={styles.faqList}>
                    <li>{faq.list.pointOne}</li>
                    <li>{faq.list.pointTwo}</li>
                    <li>{faq.list.pointThree}</li>
                    <li>{faq.list.pointFour}</li>
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={clsx(styles.neonCircle, styles.bluePrint)}></div>
      <div className={clsx(styles.neonCircle, styles.bluePrintTwo)}></div>
    </section>
  );
}