'use client';

import { useEffect, useState, useRef } from 'react';
import styles from './Register.module.scss';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useRouter, useParams } from 'next/navigation';
import clsx from 'clsx';
import { registerStep1 } from '@/lib/api/auth';
import { BsArrowLeftShort } from 'react-icons/bs';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const translations = {
  ua: {
    title: 'Реєстрація',
    titleSub: 'автосервісу',
    description:
      'CRMmech допомагає відстежувати клієнтів, персонал та фінанси в реальному часі — з відеоаналітикою та штучним інтелектом',
    businessText: 'Всі права захищені.',
    formTitle: 'Реєстрація',
    nameLabel: "Ім'я*",
    namePlaceholder: "Ваше ім'я",
    surnameLabel: 'Прізвище*',
    surnamePlaceholder: 'Ваше прізвище',
    phoneLabel: 'Телефон*',
    cityLabel: 'Місто*',
    cityPlaceholder: 'Ваше місто',
    addressLabel: 'Адреса*',
    addressPlaceholder: 'Ваша адреса',
    workshopLabel: 'Назва автосервісу*',
    workshopPlaceholder: 'Автосервіс',
    emailLabel: 'Email*',
    emailPlaceholder: 'example@domain.com',
    passwordLabel: 'Пароль*',
    passwordPlaceholder: '••••••••',
    buttonRegister: 'Зареєструватися',
    alreadyHaveAccount: 'Вже є акаунт?',
    loginLink: 'Увійти',
    errorRequiredName: "Ім'я обов'язкове",
    errorRequiredSurname: "Прізвище обов'язкове",
    errorRequiredEmail: "Email обов'язковий",
    errorInvalidEmail: 'Невірний формат email',
    errorMinPassword: 'Мінімум 6 символів',
    errorRequiredPassword: "Пароль обов'язковий",
    errorRequiredPhone: "Телефон обов'язковий",
    errorInvalidPhone: 'Некоректний телефон',
    errorRequiredWorkshop: "Назва обов'язкова",
    errorRequiredCity: "Місто обов'язкове",
    errorRequiredAddress: "Адреса обов'язкова",
    errorRegistrationFailed: 'Помилка реєстрації. Спробуйте ще раз.',
    successMessage: 'Лист з підтвердженням відправлено!',
    successMessageSpam: '( Перевірте свою пошту, включаючи папку "Спам" )',
  },
  ru: {
    title: 'Регистрация',
    titleSub: 'автосервиса',
    description:
      'CRMmech помогает отслеживать клиентов, персонал и финансы в реальном времени — с видеоаналитикой и искусственным интеллектом',
    businessText: 'Все права защищены.',
    formTitle: 'Регистрация',
    nameLabel: 'Имя*',
    namePlaceholder: 'Ваше имя',
    surnameLabel: 'Фамилия*',
    surnamePlaceholder: 'Ваша фамилия',
    phoneLabel: 'Телефон*',
    cityLabel: 'Город*',
    cityPlaceholder: 'Город',
    addressLabel: 'Адрес*',
    addressPlaceholder: 'Адрес',
    workshopLabel: 'Название автосервиса*',
    workshopPlaceholder: 'Автосервис',
    emailLabel: 'Email*',
    emailPlaceholder: 'example@domain.com',
    passwordLabel: 'Пароль*',
    passwordPlaceholder: '••••••••',
    buttonRegister: 'Зарегистрироваться',
    alreadyHaveAccount: 'Уже есть аккаунт?',
    loginLink: 'Войти',
    errorRequiredName: 'Имя обязательно',
    errorRequiredSurname: 'Фамилия обязательна',
    errorRequiredEmail: 'Email обязателен',
    errorInvalidEmail: 'Неверный формат email',
    errorMinPassword: 'Минимум 6 символов',
    errorRequiredPassword: 'Пароль обязателен',
    errorRequiredPhone: 'Телефон обязателен',
    errorInvalidPhone: 'Некорректный телефон',
    errorRequiredWorkshop: 'Название обязательно',
    errorRequiredCity: 'Город обязателен',
    errorRequiredAddress: 'Адрес обязателен',
    errorRegistrationFailed: 'Ошибка регистрации. Попробуйте ещё раз.',
    successMessage: 'Письмо с подтверждением отправлено!',
    successMessageSpam: '( Проверьте свою почту, включая папку "Спам" )',
  },
  en: {
    title: 'Registration',
    titleSub: 'of car service',
    description:
      'CRMmech helps track customers, staff, and finances in real time — powered by video analytics and artificial intelligence',
    businessText: 'All rights reserved.',
    formTitle: 'Sign Up',
    nameLabel: 'Name*',
    namePlaceholder: 'Your name',
    surnameLabel: 'Surname*',
    surnamePlaceholder: 'Your surname',
    phoneLabel: 'Phone*',
    cityLabel: 'City*',
    cityPlaceholder: 'Your city',
    addressLabel: 'Address*',
    addressPlaceholder: 'Your address',
    workshopLabel: 'Name of workshop*',
    workshopPlaceholder: 'Workshop',
    emailLabel: 'Email*',
    emailPlaceholder: 'example@domain.com',
    passwordLabel: 'Password*',
    passwordPlaceholder: '••••••••',
    buttonRegister: 'Sign Up',
    alreadyHaveAccount: 'Already have an account?',
    loginLink: 'Log in',
    errorRequiredName: 'Name is required',
    errorRequiredSurname: 'Surname is required',
    errorRequiredEmail: 'Email is required',
    errorInvalidEmail: 'Invalid email format',
    errorMinPassword: 'Minimum 6 characters',
    errorRequiredPassword: 'Password is required',
    errorRequiredPhone: 'Phone is required',
    errorInvalidPhone: 'Incorrect phone number',
    errorRequiredWorkshop: 'Name workshop is required',
    errorRequiredCity: 'City is required',
    errorRequiredAddress: 'Address is required',
    errorRegistrationFailed: 'Registration error. Please try again.',
    successMessage: 'Confirmation email sent!',
    successMessageSpam: '( Check your email, including your Spam folder )',
  },
};

type Lang = 'ua' | 'ru' | 'en';

const defaultCountry: Record<Lang, string> = { ua: 'ua', ru: 'ru', en: 'gb' };

export default function RegisterPage() {
  const params = useParams();
  const lang = (params?.lang as Lang) || 'ua';
  const t = translations[lang] || translations.ua;
  const router = useRouter();
  const currentYear = new Date().getFullYear();
  const cityInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    phone: '',
    workshopName: '',
    city: '',
    address: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateField = (name: string, value: string) => {
    let error = '';
    if (name === 'name') error = value.trim() ? '' : t.errorRequiredName;
    if (name === 'surname') error = value.trim() ? '' : t.errorRequiredSurname;
    if (name === 'email') {
      if (!value) error = t.errorRequiredEmail;
      else if (!validateEmail(value)) error = t.errorInvalidEmail;
    }
    if (name === 'password') {
      if (!value) error = t.errorRequiredPassword;
      else if (value.length < 6) error = t.errorMinPassword;
    }
    if (name === 'phone') {
      if (!value || value.length < 6) error = t.errorRequiredPhone;
    }
    if (name === 'workshopName') error = value.trim() ? '' : t.errorRequiredWorkshop;
    if (name === 'city') error = value.trim() ? '' : t.errorRequiredCity;
    if (name === 'address') error = value.trim() ? '' : t.errorRequiredAddress;
    setErrors((prev) => ({ ...prev, [name]: error }));
    return error;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) validateField(name, value);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const handlePhoneChange = (value: string) => {
    setFormData((prev) => ({ ...prev, phone: '+' + value }));
    if (touched.phone) validateField('phone', value);
  };

  useEffect(() => {
    if (typeof window === 'undefined' || !(window as any).google || !cityInputRef.current) return;
    const autocomplete = new (window as any).google.maps.places.Autocomplete(cityInputRef.current, {
      types: ['(cities)'],
    });
    autocomplete.setOptions({ fields: ['address_components', 'formatted_address', 'name'] });
    const listener = autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      setFormData((prev) => ({ ...prev, city: place.formatted_address || place.name }));
    });
    return () => (window as any).google.maps.event.removeListener(listener);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fields = [
      'name',
      'surname',
      'phone',
      'city',
      'address',
      'workshopName',
      'email',
      'password',
    ];
    setTouched(Object.fromEntries(fields.map((f) => [f, true])));
    const errs = fields.map((f) => validateField(f, formData[f as keyof typeof formData]));
    if (errs.some((err) => err)) return;
    try {
      await registerStep1({
        first_name: formData.name,
        last_name: formData.surname,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        workshop_name: formData.workshopName,
        address: formData.address,
        city: formData.city,
        language: lang === 'en' ? 'en' : lang === 'ru' ? 'ru' : 'uk',
      });
      setIsSuccess(true);
      setFormData({
        name: '',
        surname: '',
        phone: '',
        workshopName: '',
        city: '',
        address: '',
        email: '',
        password: '',
      });
    } catch (err) {
      setErrors({ email: t.errorRegistrationFailed });
    }
  };

  const isFormValid =
    formData.name.trim() &&
    formData.surname.trim() &&
    formData.phone.trim() &&
    formData.city.trim() &&
    formData.address.trim() &&
    formData.workshopName.trim() &&
    formData.email &&
    validateEmail(formData.email) &&
    formData.password.length >= 6 &&
    Object.values(errors).every((err) => !err);

  const renderField = (name: string, type: string, label: string, placeholder: string) => (
    <div key={name} className={styles.field}>
      <label className={styles.label}>{label}</label>
      <div className={styles.inputWrapper}>
        <input
          type={type}
          name={name}
          value={formData[name as keyof typeof formData]}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={clsx(styles.input, errors[name] && touched[name] && styles.errorInput)}
        />
      </div>
      {errors[name] && touched[name] && <span className={styles.error}>{errors[name]}</span>}
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <p className={styles.backText} onClick={() => router.push(`/${lang}`)}>
          <BsArrowLeftShort className={styles.icon} />
          back
        </p>
        <div className={styles.content}>
          <h1 className={styles.title}>
            {t.title} <span className={styles.highlight}>{t.titleSub}</span>
          </h1>
          <div className={styles.screenshotWrapper}>
            <img
              src='/images/mech-orbit-screen-dashboard.webp'
              alt='CRMmech'
              className={styles.screenshot}
            />
          </div>
          <p className={styles.description}>{t.description}</p>
          <footer className={styles.footer}>
            &copy; {currentYear} {t.businessText}
          </footer>
        </div>
      </div>

      <div className={styles.rightSide}>
        <div className={clsx(styles.formContainer, isSuccess && styles.successContainer)}>
          <div className={clsx(styles.formWrapper, isSuccess && styles.fadeOut)}>
            <h2 className={styles.formTitle}>{t.formTitle}</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
              {/* 1. Имя */}
              {renderField('name', 'text', t.nameLabel, t.namePlaceholder)}

              {/* 2. Фамилия */}
              {renderField('surname', 'text', t.surnameLabel, t.surnamePlaceholder)}

              {/* 3. Телефон */}
              <div className={styles.field}>
                <label className={styles.label}>{t.phoneLabel}</label>
                <div className={clsx(styles.inputWrapper, styles.phoneWrapper)}>
                  <PhoneInput
                    country={defaultCountry[lang]}
                    value={formData.phone.replace('+', '')}
                    onChange={handlePhoneChange}
                    onBlur={() => {
                      setTouched((prev) => ({ ...prev, phone: true }));
                      validateField('phone', formData.phone);
                    }}
                    inputClass={clsx(
                      styles.phoneInput,
                      errors.phone && touched.phone && styles.errorInput,
                    )}
                    buttonClass={styles.phoneFlag}
                    dropdownClass={styles.phoneDropdown}
                    preferredCountries={['ua', 'ru', 'gb', 'us', 'de', 'pl']}
                  />
                </div>
                {errors.phone && touched.phone && (
                  <span className={styles.error}>{errors.phone}</span>
                )}
              </div>

              {/* 4. Город */}
              <div className={styles.field}>
                <label className={styles.label}>{t.cityLabel}</label>
                <div className={styles.inputWrapper}>
                  <input
                    ref={cityInputRef}
                    type='text'
                    name='city'
                    defaultValue={formData.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={t.cityPlaceholder}
                    className={clsx(styles.input, errors.city && touched.city && styles.errorInput)}
                  />
                </div>
                {errors.city && touched.city && <span className={styles.error}>{errors.city}</span>}
              </div>

              {/* 5. Адрес */}
              {renderField('address', 'text', t.addressLabel, t.addressPlaceholder)}

              {/* 6. Название автосервиса */}
              {renderField('workshopName', 'text', t.workshopLabel, t.workshopPlaceholder)}

              {/* 7. Email */}
              {renderField('email', 'email', t.emailLabel, t.emailPlaceholder)}

              {/* 8. Пароль */}
              <div className={styles.field}>
                <label className={styles.label}>{t.passwordLabel}</label>
                <div className={styles.inputWrapper}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={t.passwordPlaceholder}
                    className={clsx(
                      styles.input,
                      errors.password && touched.password && styles.errorInput,
                    )}
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className={styles.eyeBtn}>
                    {showPassword ? (
                      <FaEye className={styles.passwordIcon} />
                    ) : (
                      <FaEyeSlash className={styles.passwordIcon} />
                    )}
                  </button>
                </div>
                {errors.password && touched.password && (
                  <span className={styles.error}>{errors.password}</span>
                )}
              </div>

              <button
                type='submit'
                className={clsx(styles.submitBtn, !isFormValid && styles.disabledBtn)}>
                {t.buttonRegister}
              </button>
            </form>

            <p className={styles.signup}>
              {t.alreadyHaveAccount}{' '}
              <a href='https://app.crmmech.com/' className={styles.signupLink}>
                {t.loginLink}
              </a>
            </p>
          </div>

          <div className={clsx(styles.successWrapper, !isSuccess && styles.fadeOut)}>
            <div className={styles.successMessage}>
              <p>{t.successMessage}</p>
              <p className={styles.successMessageSpam}>{t.successMessageSpam}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
