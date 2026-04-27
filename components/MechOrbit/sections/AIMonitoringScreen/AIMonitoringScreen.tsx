import { IoMdCheckmark } from 'react-icons/io';
import styles from './AIMonitoringScreen.module.scss';
import clsx from 'clsx';
import ConsultationButton from './ConsultationButton/ConsultationButton';
import Calculator from './Calculator/Calculator';

interface AIMonitoringScreenProps {
  aimonitoringtext: {
    headline: string;
    headlineSpan: string;
    recommendationLabel: string;
    recommendationText: string;
    installTitle: string;
    warrantyLabel: string;
    warrantyText: string;
    consultationButton: string;
    list: string[];
    calculator: any;
  };
}

export default function AIMonitoringScreen({ aimonitoringtext }: AIMonitoringScreenProps) {
  return (
    <section className={styles.aIMonitoring} id='calculator'>
      <div className={styles.container}>
        <div className={styles.textContent}>
          <h3 className={styles.titleScreen}>
            {aimonitoringtext.headline}
            <span className={styles.gradientText}> {aimonitoringtext.headlineSpan}</span>
          </h3>
          <div className={styles.borderLine}></div>
        </div>

        <div className={styles.calculatorAndTextBlock}>
          <div className={styles.calculatorBlock}>
            <Calculator t={aimonitoringtext.calculator} />
          </div>

          <div className={styles.textBlock}>
            <div className={styles.blockTopScreen}>
              <div className={styles.conclusionBlock}>
                <div className={styles.borderLineVertical}></div>
                <h6 className={styles.conclusionText}>
                  {aimonitoringtext.recommendationLabel}
                  <span> {aimonitoringtext.recommendationText}</span>
                </h6>
              </div>
            </div>

            <h3 className={styles.textBlockTitle}>{aimonitoringtext.installTitle}</h3>

            <div className={styles.descriptionBlock}>
              {aimonitoringtext.list.map((item, index) => (
                <div key={index} className={styles.descriptionAndIconBlock}>
                  <IoMdCheckmark className={styles.checkmarkIcon} />
                  <p className={styles.description}>{item}</p>
                </div>
              ))}
            </div>

            <div className={clsx(styles.blockTopScreen, styles.blockBottomScreen)}>
              <div className={styles.conclusionBlock}>
                <div className={styles.borderLineVertical}></div>
                <h6 className={styles.conclusionText}>
                  {aimonitoringtext.warrantyLabel}
                  <span> {aimonitoringtext.warrantyText}</span>
                </h6>
              </div>
            </div>

            <div className={styles.buttonsBlock}>
              <ConsultationButton
                label={aimonitoringtext.consultationButton}
                targetSection='contacts'
              />
            </div>
          </div>
        </div>
      </div>
      <div className={clsx(styles.neonCircle, styles.bluePrint)}></div>
    </section>
  );
}
