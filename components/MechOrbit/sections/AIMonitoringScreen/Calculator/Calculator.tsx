'use client';

import { useState } from 'react';
import styles from './Calculator.module.scss';
import {
  BsArrowRightShort,
  BsCameraVideo,
  BsCreditCard2Back,
  BsGearFill,
  BsReceiptCutoff,
  BsShopWindow,
} from 'react-icons/bs';
import clsx from 'clsx';
import InvoiceModal from '../InvoiceModal/InvoiceModal';

const CAMERA_KEYS = ['5mp', '8mp', '12mp'];
const INSTALL_KEY = 'install';

interface CalculatorProps {
  t: {
    title: string;
    qtyLabel: string;
    consultationButton: string;
    invoiceButton: string;
    payButton: string;
    bottomNote: string;
    rows: { name: string; key: string }[];
    options: { key: string; label: string; price: number }[];
    invoiceModal: any;
  };
}

export default function Calculator({ t }: CalculatorProps) {
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);

  const PRODUCT_ROWS = [
    {
      icon: <BsShopWindow className={styles.calcIcon} />,
      name: t.rows[0].name,
      key: 'rooms',
      defaultQty: 0,
      defaultEnabledOptions: ['12mp'],
    },
    {
      icon: <BsGearFill className={styles.calcIcon} />,
      name: t.rows[1].name,
      key: 'posts',
      defaultQty: 1,
      defaultEnabledOptions: ['5mp'],
    },
    {
      icon: <BsCameraVideo className={styles.calcIcon} />,
      name: t.rows[2].name,
      key: 'entry',
      defaultQty: 0,
      defaultEnabledOptions: ['5mp'],
    },
    {
      icon: <BsCameraVideo className={styles.calcIcon} />,
      name: t.rows[3].name,
      key: 'parking',
      defaultQty: 0,
      defaultEnabledOptions: ['12mp'],
    },
    {
      icon: <BsCameraVideo className={styles.calcIcon} />,
      name: t.rows[4].name,
      key: 'other',
      defaultQty: 0,
      defaultEnabledOptions: [],
    },
  ];

  const [calculatorRows, setCalculatorRows] = useState(
    PRODUCT_ROWS.map((product) => ({
      key: product.key,
      name: product.name,
      icon: product.icon,
      quantity: product.defaultQty ?? 0,
      enabledOptions: Object.fromEntries(
        t.options.map((option) => [option.key, product.defaultEnabledOptions.includes(option.key)]),
      ),
    })),
  );

  const toggleOption = (rowKey: string, optionKey: string) => {
    setCalculatorRows((currentRows) =>
      currentRows.map((productRow) => {
        if (productRow.key !== rowKey) return productRow;
        const willBeEnabled = !productRow.enabledOptions[optionKey];
        let updatedQuantity = productRow.quantity;
        if (willBeEnabled && (!updatedQuantity || updatedQuantity === 0)) updatedQuantity = 1;
        const newEnabledOptions = { ...productRow.enabledOptions };
        if (CAMERA_KEYS.includes(optionKey)) {
          CAMERA_KEYS.forEach((key) => {
            newEnabledOptions[key] = false;
          });
          newEnabledOptions[optionKey] = willBeEnabled;
        }
        if (optionKey === INSTALL_KEY) newEnabledOptions[INSTALL_KEY] = willBeEnabled;
        return { ...productRow, quantity: updatedQuantity, enabledOptions: newEnabledOptions };
      }),
    );
  };

  const changeQuantity = (rowKey: string, inputValue: string) => {
    setCalculatorRows((currentRows) =>
      currentRows.map((productRow) => {
        if (productRow.key !== rowKey) return productRow;
        if (inputValue === '') return { ...productRow, quantity: 0 };
        let numericValue = Number(inputValue);
        if (isNaN(numericValue)) numericValue = 0;
        numericValue = Math.max(0, Math.min(30, numericValue));
        return { ...productRow, quantity: numericValue };
      }),
    );
  };

  const totalCost = calculatorRows.reduce((sum, productRow) => {
    t.options.forEach((option) => {
      if (productRow.enabledOptions[option.key]) sum += option.price * productRow.quantity;
    });
    return sum;
  }, 0);

  const scrollToContacts = () => {
    document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={styles.calc}>
      <h3 className={styles.title}>{t.title}</h3>

      {/* Desktop */}
      <div className={styles.table}>
        <div className={styles.header}>
          <div className={styles.name}></div>
          <div className={styles.qty}>
            <p>{t.qtyLabel}</p>
          </div>
          {t.options.map((option) => (
            <div key={option.key} className={styles.option}>
              <p className={styles.optionLabel}>{option.label}</p>
              <p className={styles.optionPrice}>₴ {option.price}</p>
            </div>
          ))}
        </div>
        {calculatorRows.map((productRow, index) => (
          <div key={productRow.key} className={styles.row}>
            <div className={styles.name}>
              {productRow.icon}
              {productRow.name} {index >= 2 && <span> *</span>}
            </div>
            <div className={styles.qty}>
              <input
                type='number'
                min='0'
                max='100'
                value={productRow.quantity}
                onChange={(e) => changeQuantity(productRow.key, e.target.value)}
              />
            </div>
            {t.options.map((option) => (
              <div key={option.key} className={styles.option}>
                <label className={styles.switch}>
                  <input
                    type='checkbox'
                    checked={productRow.enabledOptions[option.key]}
                    onChange={() => toggleOption(productRow.key, option.key)}
                  />
                  <span className={styles.slider} />
                </label>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Mobile */}
      <div className={styles.tablePhone}>
        <div className={styles.tableInputPointsPhoneRow}>
          <div className={styles.tableInputPointsPhone}>
            <div className={styles.tableNamePhoneRow}>
              {calculatorRows.map((productRow, index) => (
                <div key={productRow.key} className={styles.qtyPhoneBlock}>
                  <p className={styles.name}>
                    {productRow.name} {index >= 2 && <span> *</span>}
                  </p>
                  <input
                    type='number'
                    min='0'
                    max='100'
                    value={productRow.quantity === 0 ? '' : productRow.quantity}
                    onChange={(e) => changeQuantity(productRow.key, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.tableRowHeaderPhone}>
          {t.options.map((option) => (
            <div key={option.key} className={styles.option}>
              <p className={styles.optionLabel}>{option.label}</p>
              <p className={styles.optionPrice}>₴ {option.price}</p>
            </div>
          ))}
        </div>
        {calculatorRows.map((productRow) => (
          <div key={productRow.key} className={styles.rowPhone}>
            {t.options.map((option) => (
              <div key={option.key} className={styles.option}>
                <label className={styles.switch}>
                  <input
                    type='checkbox'
                    checked={productRow.enabledOptions[option.key]}
                    onChange={() => toggleOption(productRow.key, option.key)}
                  />
                  <span className={styles.slider} />
                </label>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className={styles.total}>₴ {totalCost.toLocaleString('uk-UA')}</div>

      <div className={styles.buttonsBlock}>
        <a className={styles.buttonTest} onClick={scrollToContacts} style={{ cursor: 'pointer' }}>
          {t.consultationButton} <BsArrowRightShort className={styles.buttonIcon} />
        </a>
        {/* <a
          className={clsx(styles.buttonTest, styles.buttonPayment)}
          onClick={() => setIsInvoiceModalOpen(true)}
          style={{ cursor: 'pointer' }}>
          <BsReceiptCutoff className={styles.buttonIcon} />
          {t.invoiceButton}
        </a> */}
        <a
          href='https://docs.google.com/forms/d/e/1FAIpQLScF7Bg7K9h0wBgkuPckEoFz3r8Aj-ABnts30KvyucOxbDmYWw/viewform'
          target='_blank'
          className={clsx(styles.buttonTest, styles.buttonPay)}>
          <BsCreditCard2Back className={styles.buttonIcon} />
          {t.payButton}
        </a>
      </div>

      <div className={styles.textBottomCalcBlock}>
        <p className={styles.textBottomCalc}>
          <span>*</span> {t.bottomNote}
        </p>
      </div>

      <InvoiceModal
        isOpen={isInvoiceModalOpen}
        onClose={() => setIsInvoiceModalOpen(false)}
        totalCost={totalCost}
        t={t.invoiceModal}
      />
    </div>
  );
}
