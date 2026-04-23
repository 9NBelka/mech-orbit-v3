'use client';

import { useState } from 'react';
import styles from './InvoiceModal.module.scss';
import { BsX } from 'react-icons/bs';
import emailjs from '@emailjs/browser';

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalCost: number;
  t: {
    title: string;
    companyNamePlaceholder: string;
    ipnPlaceholder: string;
    addressPlaceholder: string;
    emailRequired: string;
    emailInvalid: string;
    phoneRequired: string;
    phoneInvalid: string;
    notSpecified: string;
    successAlert: string;
    errorAlert: string;
    sendButton: string;
    sendingButton: string;
    payCardButton: string;
    payCardAlert: string;
  };
}

export default function InvoiceModal({ isOpen, onClose, totalCost = 0, t }: InvoiceModalProps) {
  const [formData, setFormData] = useState({ companyName: '', ipn: '', address: '', email: '', phone: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email.trim()) newErrors.email = t.emailRequired;
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = t.emailInvalid;
    if (!formData.phone.trim()) newErrors.phone = t.phoneRequired;
    else if (formData.phone.replace(/\D/g, '').length < 9) newErrors.phone = t.phoneInvalid;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    const formattedPrice = totalCost.toLocaleString('uk-UA', { style: 'currency', currency: 'UAH' });
    try {
      await emailjs.send('service_5wff385', 'template_w82ssye', {
        companyName: formData.companyName || t.notSpecified,
        ipn: formData.ipn || t.notSpecified,
        address: formData.address || t.notSpecified,
        email: formData.email,
        phone: formData.phone,
        totalCost: formattedPrice,
        rawTotalCost: totalCost,
        reply_to: formData.email,
      }, 'Mdbffxf-pXEUvjky3');
      alert(t.successAlert);
      onClose();
      setFormData({ companyName: '', ipn: '', address: '', email: '', phone: '' });
      setErrors({});
    } catch (error) {
      console.error('EmailJS error:', error);
      alert(t.errorAlert);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;
  const isFormValid = formData.email.trim() && formData.phone.trim() && !errors.email && !errors.phone;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <BsX className={styles.modalCloseIcon} onClick={onClose} />
        <h2 className={styles.title}>{t.title}</h2>
        <form className={styles.form} onSubmit={handleSubmitEmail}>
          <div className={styles.field}>
            <input type='text' name='companyName' value={formData.companyName} onChange={handleChange} placeholder={t.companyNamePlaceholder} />
          </div>
          <div className={styles.field}>
            <input type='text' name='ipn' value={formData.ipn} onChange={handleChange} placeholder={t.ipnPlaceholder} />
          </div>
          <div className={styles.field}>
            <input type='text' name='address' value={formData.address} onChange={handleChange} placeholder={t.addressPlaceholder} />
          </div>
          <div className={styles.field}>
            <input type='email' name='email' value={formData.email} onChange={handleChange} placeholder='Email *'
              className={errors.email ? styles.errorInput : ''} required />
            {errors.email && <span className={styles.errorText}>{errors.email}</span>}
          </div>
          <div className={styles.field}>
            <input type='tel' name='phone' value={formData.phone} onChange={handleChange} placeholder={`${t.phoneRequired.split(' ')[0]} *`}
              className={errors.phone ? styles.errorInput : ''} required />
            {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
          </div>
          <button type='submit' className={styles.btnEmail} disabled={isSubmitting || !isFormValid}>
            {isSubmitting ? t.sendingButton : t.sendButton}
          </button>
        </form>
        <button onClick={() => { alert(t.payCardAlert); onClose(); }} className={styles.btnCard}>
          {t.payCardButton}
        </button>
      </div>
    </div>
  );
}