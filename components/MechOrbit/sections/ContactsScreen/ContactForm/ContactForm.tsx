'use client';

import { useState } from 'react';
import styles from './ContactForm.module.scss';
import Image from 'next/image';

interface ContactFormProps {
  t: {
    namePlaceholder: string;
    phonePlaceholder: string;
    cityPlaceholder: string;
    postsPlaceholder: string;
    formatPlaceholder: string;
    submitBtn: string;
    submittingBtn: string;
    successAlert: string;
    errorAlert: string;
    networkError: string;
    errors: {
      nameRequired: string;
      nameTooLong: string;
      phoneRequired: string;
      phoneTooShort: string;
      phoneTooLong: string;
      cityTooLong: string;
      numbersOnly: string;
      invalidFormat: string;
    };
  };
}

export default function ContactForm({ t }: ContactFormProps) {
  const [formData, setFormData] = useState({ name: '', phone: '', city: '', postsCount: '', ctoFormat: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_TOKEN;
  const CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === 'phone') {
      const filtered = value.replace(/[^+\d\s()-]/g, '');
      const digitsOnly = filtered.replace(/\D/g, '');
      newValue = digitsOnly.length > 12 ? filtered.slice(0, filtered.length - 1) : filtered;
    }
    if (name === 'name') {
      newValue = value.replace(/[^A-Za-zА-ЯҐЄІЇа-яґєії'\-\s]/g, '').slice(0, 20);
    }

    setFormData((prev) => ({ ...prev, [name]: newValue }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const validateField = (fieldName: string, value: string) => {
    let error = '';
    const trimmed = value.trim();
    if (fieldName === 'name') {
      if (!trimmed) error = t.errors.nameRequired;
      else if (trimmed.length > 20) error = t.errors.nameTooLong;
    }
    if (fieldName === 'phone') {
      if (!trimmed) error = t.errors.phoneRequired;
      else {
        const digits = value.replace(/\D/g, '');
        if (digits.length < 9) error = t.errors.phoneTooShort;
        else if (digits.length > 12) error = t.errors.phoneTooLong;
      }
    }
    if (fieldName === 'city' && trimmed.length > 50) error = t.errors.cityTooLong;
    if (fieldName === 'postsCount' && trimmed && !/^\d+$/.test(trimmed)) error = t.errors.numbersOnly;
    if (fieldName === 'ctoFormat' && trimmed && !/^[\d\s%\+()A-Za-zА-ЯҐЄІЇа-яґєії'\-]+$/.test(trimmed)) error = t.errors.invalidFormat;
    setErrors((prev) => ({ ...prev, [fieldName]: error }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = t.errors.nameRequired;
    if (!formData.phone.trim()) newErrors.phone = t.errors.phoneRequired;
    else {
      const digits = formData.phone.replace(/\D/g, '');
      if (digits.length < 9) newErrors.phone = t.errors.phoneTooShort;
    }
    setErrors(newErrors);
    return !newErrors.name && !newErrors.phone;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, phone: true, city: true, postsCount: true, ctoFormat: true });
    if (!validateForm()) return;
    setIsSubmitting(true);

    const message = `Нова заявка 🚀\n👤 ${formData.name.trim()}\n📞 ${formData.phone.trim()}\n🌆 ${formData.city.trim() || '—'}\n📊 ${formData.postsCount.trim() || '—'}\n🔧 ${formData.ctoFormat.trim() || '—'}`;

    try {
      const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: CHAT_ID, text: message }),
      });
      const data = await res.json();
      if (data.ok) {
        alert(t.successAlert);
        setFormData({ name: '', phone: '', city: '', postsCount: '', ctoFormat: '' });
        setTouched({});
        setErrors({});
      } else {
        alert(t.errorAlert);
      }
    } catch {
      alert(t.networkError);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.name.trim() !== '' && formData.phone.trim() !== '';

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        {[
          { name: 'name', type: 'text', placeholder: t.namePlaceholder },
          { name: 'phone', type: 'tel', placeholder: t.phonePlaceholder },
          { name: 'city', type: 'text', placeholder: t.cityPlaceholder },
          { name: 'postsCount', type: 'text', placeholder: t.postsPlaceholder },
          { name: 'ctoFormat', type: 'text', placeholder: t.formatPlaceholder },
        ].map(({ name, type, placeholder }) => (
          <div key={name} className={styles.field}>
            <input
              type={type}
              name={name}
              value={formData[name as keyof typeof formData]}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={placeholder}
              className={errors[name] && touched[name] ? styles.errorInput : ''}
            />
          </div>
        ))}
        <button type='submit' className={styles.submitBtn} disabled={isSubmitting || !isFormValid}>
          <Image src='/sendIcon.svg' alt='' width={20} height={20} className={styles.planeIcon} />
          {isSubmitting ? t.submittingBtn : t.submitBtn}
        </button>
      </form>
    </div>
  );
}