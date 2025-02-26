import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import cntris from '../data/Countries.json';
import Swal from 'sweetalert2';
import { toast } from "react-hot-toast";
import { db, collection, addDoc } from '../data/firebaseConfig';
import { query, where, getDocs, or } from 'firebase/firestore';

const FreeTest = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ name: '', email: '', phoneNumber: '', country: '', option: '', });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const textAlignment = i18n.language === 'ar' ? 'text-right' : 'text-left';
  const countries = cntris;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.option || !formData.phoneNumber || !formData.country) {
      Swal.fire({
        icon: 'error',
        title: t('error'),
        text: t('pleaseFillAllFields'),
        timer: 1000,
        showConfirmButton: false
      });
      return;
    }

    try {
      const q = query(collection(db, 'Requests'),
        or(
          where('email', '==', formData.email),
          where('phoneNumber', '==', formData.phoneNumber),
          where('name', '==', formData.name)
        )
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        Swal.fire({
          icon: 'error',
          title: t('error'),
          text: t('dataAlreadyExists'),
          timer: 1000,
          showConfirmButton: false
        });
        return;
      } else {
        const docRef = await addDoc(collection(db, 'Requests'), {
          name: formData.name,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          country: formData.country,
          option: formData.option
        });

        navigate('/');
        toast.success(t('applicationSuccess'), {
          duration: 40000,
          position: "top-center",
          style: {
            background: "var(--Light)",
            color: "black",
            padding: "16px",
            width: "auto",
            borderRadius: "9999px",
            maxWidth: "80%",
            textAlign: "center"
          }
        });

        window.scroll(0, 0);
      }
    } catch (e) {
      console.error("Error adding document: ", e);
      Swal.fire({
        icon: 'error',
        title: t('error'),
        text: t('somethingwrong'),
        timer: 1000,
        showConfirmButton: false
      });
    }
  };

  return (
    <section className="md:px-40 px-4">
      <h2 className="text-2xl font-bold my-4">{t('applicationForm')}</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Name Field */}
        <div data-aos="fade-right" data-aos-duration="2000" className="space-y-4">
          <label className="block text-lg font-bold text-black">{t('name')}</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-[var(--Input)] rounded-md" placeholder={t('enterName')} />
        </div>

        {/* Email Field */}
        <div data-aos="fade-left" data-aos-duration="2000" className="space-y-4">
          <label className="block text-lg font-bold text-black">{t('email')}</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-[var(--Input)] rounded-md" placeholder={t('enterEmail')} />
        </div>

        {/* Phone Number Field */}
        <div data-aos="fade-right" data-aos-duration="2000" className="space-y-4">
          <label className="block text-lg font-bold text-black">{t('phoneNumber')}</label>
          <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className={`mt-1 block w-full px-3 py-2 bg-[var(--Input)] rounded-md ${textAlignment}`} placeholder={t('enterPhoneNumber')} />
        </div>

        {/* Country Selection */}
        <div data-aos="fade-left" data-aos-duration="2000" className="space-y-4">
          <label className="block text-lg font-bold text-black">{t('country')}</label>
          <select
            name="country" value={formData.country} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-[var(--Input)] rounded-md">
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

        {/* Option Field */}
        <div data-aos="fade-right" data-aos-duration="2000" className="space-y-4">
          <label className="block text-lg font-bold text-black">{t('option')}</label>
          <select name="option" value={formData.option} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-[var(--Input)] rounded-md">
            <option disabled value="">
              {t('chooseOption')}
            </option>
            <option value="Free Session">{t('freeSess')}</option>
            <option value="Free Test">{t('freeTest')}</option>
          </select>
        </div>
      </form>

        {/* Submit and Back buttons */}
        <div className="flex flex-col gap-y-6 items-end md:flex-row md:justify-between mt-12 col-span-1 md:col-span-2">
          <button data-aos="fade-up-right" type="button" className="p-4 px-8 rounded-4xl border-2 border-[var(--Yellow)]"
            onClick={() => { window.history.back(); window.scroll(0, 0); }}>
            {t('back')}
          </button>
          <button onClick={handleSubmit} data-aos="fade-up-left" type="submit" className="p-4 px-8 rounded-4xl bg-[var(--Yellow)]">
            {t('submit')}
          </button>
        </div>
    </section>
  );
};

export default FreeTest;
