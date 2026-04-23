import styles from './TextAndListBlock.module.scss';
import { IoMdCheckmark } from 'react-icons/io';

interface TextAndListBlockProps {
  title: string;
  description: string;
  list: string[];
  conclusionText: string;
  conclusionSpan: string;
  bottomText: string;
}

export default function TextAndListBlock({
  title,
  description,
  list,
  conclusionText,
  conclusionSpan,
  bottomText,
}: TextAndListBlockProps) {
  return (
    <div className={styles.textAndListMainBlock}>
      <div className={styles.textAndListBlock}>
        <div className={styles.textBlock}>
          <h3 className={styles.textBlockTitle}>{title}</h3>
          <p className={styles.textBlockDescription}>{description}</p>
        </div>

        <div className={styles.descriptionBlock}>
          {list.map((item, index) => (
            <div key={index} className={styles.descriptionAndIconBlock}>
              <IoMdCheckmark className={styles.checkmarkIcon} />
              <p className={styles.description}>{item}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.blockBottomScreen}>
        <div className={styles.conclusionBlock}>
          <div className={styles.borderLineVertical}></div>
          <h6 className={styles.conclusionText}>
            {conclusionText} <span>{conclusionSpan}</span>
          </h6>
        </div>
      </div>

      <div className={styles.blockWithTextBottomScreen}>
        <p>{bottomText}</p>
      </div>
    </div>
  );
}