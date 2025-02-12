import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';

import Swal from 'sweetalert2';

import cntris from '../data/Countries.json';

const AppForm = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({ name: '', email: '', courseCategory: '', phoneNumber: '', country: '', option: '', takenTest: false, type: '' });

  useEffect(() => {
    if (location.state) {
      setFormData(prevState => ({
        ...prevState,
        courseCategory: location.state.courseCategory || '',
        option: location.state.option || '',
        type: location.state.levelno || '',
      }));
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const textAlignment = i18n.language === 'ar' ? 'text-right' : 'text-left';

  const countries = cntris;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for missing fields
    if (!formData.name || !formData.email || !formData.courseCategory || !formData.phoneNumber || !formData.country || !formData.option || !formData.type) {
      Swal.fire({
        icon: 'error',
        title: t('error'),
        text: t('pleaseFillAllFields'),
        timer: 1000,
        showConfirmButton: false
      });
      return;
    }

    console.log(formData);
    navigate('/checkout', { state: { formData } });
    window.scroll(0, 0);
  };

  return (
    <section className="md:px-40 px-4">
      <h2 className="text-2xl font-bold my-4">{t('applicationForm')}</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <article data-aos="fade-right" data-aos-duration="2000" className='space-y-4'>
          {/* Name Field */}
          <div className="space-y-4">
            <label className="block text-lg font-bold text-black">{t('name')}</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-[var(--Input)] rounded-md" placeholder={t('enterName')} />
          </div>

          {/* Email Field */}
          <div className="space-y-4">
            <label className="block text-lg font-bold text-black">{t('email')}</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-[var(--Input)] rounded-md" placeholder={t('enterEmail')} />
          </div>

          {/* Course Category Field */}
          <div className="space-y-4">
            <label className="block text-lg font-bold text-black">{t('courseCategory')}</label>
            <select name="courseCategory" value={formData.courseCategory} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-[var(--Input)] rounded-md">
              <option disabled value="">
                {t('category')}
              </option>
              <option value="ILETS">{t('ilets')}</option>
              <option value="general">{t('general')}</option>
            </select>
          </div>

          {/* Type Selection */}
          <div className="space-y-4">
            <label className="block text-lg font-bold text-black">{t('type')}</label>
            <select name="type" value={formData.type} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-[var(--Input)] rounded-md">
              <option disabled value="">
                {t('type')}
              </option>
              <option value="1 Level">1 Level</option>
              <option value="3 Levels">3 Levels</option>
            </select>
          </div>
        </article>

        <article data-aos="fade-left" data-aos-duration="2000" className='space-y-4'>
          {/* Phone Number Field */}
          <div className="space-y-4">
            <label className="block text-lg font-bold text-black">{t('phoneNumber')}</label>
            <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className={`mt-1 block w-full px-3 py-2 bg-[var(--Input)] rounded-md ${textAlignment}`} placeholder={t('enterPhoneNumber')} />
          </div>

          {/* Country Selection */}
          <div className="space-y-4">
            <label className="block text-lg font-bold text-black">{t('country')}</label>
            <select name="country" value={formData.country} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-[var(--Input)] rounded-md">
              <option disabled value="">
                {t('chooseCountry')}
              </option>
              {countries.map((country, index) => (
                <option key={index} value={country.nameEn}>
                  {i18n.language === 'ar' ? country.nameAr : country.nameEn}
                </option>
              ))}
            </select>
          </div>

          {/* Option Selection */}
          <div className="space-y-4">
            <label className="block text-lg font-bold text-black">{t('option')}</label>
            <select name="option" value={formData.option} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-[var(--Input)] rounded-md">
              <option disabled value="">
                {t('option')}
              </option>
              <option value="Group">{t('group')}</option>
              <option value="Private">{t('private')}</option>
            </select>
          </div>
        </article>

        {/* takenTest Field */}
        <div className="flex gap-4">
          <input type="checkbox" id="taken" name="takenTest" checked={formData.takenTest} onChange={handleChange} />
          <label htmlFor="taken">{t('takenTest')}</label>
        </div>

        {/* Submit and Back buttons */}
        <div className="flex flex-col gap-y-6 items-end md:flex-row md:justify-between mt-12 col-span-1 md:col-span-2">
          <button data-aos="fade-up-right" type="button" className="p-4 px-8 rounded-4xl border-2 border-[var(--Yellow)]"
            onClick={() => { window.history.back(); window.scroll(0, 0); }}>
            {t('back')}
          </button>
          <button data-aos="fade-up-left" type="submit" className="p-4 px-8 rounded-4xl bg-[var(--Yellow)]">
            {t('submit')}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AppForm;
