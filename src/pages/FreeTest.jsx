import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import cntris from '../data/Countries.json';
import Swal from 'sweetalert2';
import { toast } from "react-hot-toast";
import { db, collection, addDoc } from '../data/firebaseConfig';
import { query, where, getDocs } from 'firebase/firestore';

const FreeTest = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  // Form state for managing input data
  const [formData, setFormData] = useState({ name: '', email: '', phoneNumber: '', country: '', courseCategory: '' });

  // Handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  // Define text alignment for languages
  const textAlignment = i18n.language === 'ar' ? 'text-right' : 'text-left';
  const countries = cntris;

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that all fields are filled
    if (!formData.name || !formData.email || !formData.courseCategory || !formData.phoneNumber || !formData.country) {
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
      // Check for uniqueness based on email
      const q = query(collection(db, 'Free Test'), where('email', '==', formData.email), or('phoneNumber', '==', formData.phoneNumber), or('name', '==', formData.name));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // If a document with the same email exists, show an error message
        Swal.fire({
          icon: 'error',
          title: t('error'),
          text: t('duplicateEntry'),
          timer: 1000,
          showConfirmButton: false
        });
        return;
      } else {
        // If no duplicate is found, add the new document to Firestore
        const docRef = await addDoc(collection(db, 'Free Test'), {
          name: formData.name,
          email: formData.email,
          courseCategory: formData.courseCategory,
          phoneNumber: formData.phoneNumber,
          country: formData.country,
          submittedAt: new Date().toDateString()
        });

        navigate('/');
        toast.success("Your application form has been successfully submitted. Thank you for your application", {
          duration: 4000,
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
      <h2 className="text-2xl font-bold my-4">{t('BookFree')}</h2>
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

        {/* Course Category Field */}
        <div data-aos="fade-right" data-aos-duration="2000" className="space-y-4">
          <label className="block text-lg font-bold text-black">{t('courseCategory')}</label>
          <select name="courseCategory" value={formData.courseCategory} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-[var(--Input)] rounded-md">
            <option disabled value="">
              {t('category')}
            </option>
            <option value="Group">{t('group')}</option>
            <option value="Private">{t('private')}</option>
            <option value="IELTS">{t('ielts')}</option>
          </select>
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

export default FreeTest;