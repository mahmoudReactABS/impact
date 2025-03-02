import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import cntris from '../data/Countries.json';
import { db } from '../data/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const AppForm = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({ name: '', email: '', courseCategory: '', phoneNumber: '', country: '', option: '', takenTest: false, type: '', priceAfter: '' });
  const [course, setCourse] = useState([]);
  const [options, setOptions] = useState();

  const currentLanguage = i18n.language;
  const textAlignment = i18n.language === 'ar' ? 'text-right' : 'text-left';

  const countries = cntris;
  const countriesAr = countries.map((cnt) => cnt.nameAr);
  const countriesEn = countries.map((cnt) => cnt.nameEn);

  useEffect(() => {
    if (location.state) {
      setFormData(prevState => ({
        ...prevState,
        courseCategory: location.state.courseCategory || '',
        option: location.state.option || '',
        type: location.state.levelno || '',
        number: location.state.number || '',
        priceAfter: location.state.priceAfter || '',
      }));
    }
  }, [location.state]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const docRef = doc(db, "courses", formData.option);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const courseData = docSnap.data()?.[currentLanguage];

          if (courseData) {
            const filteredCourse = courseData.Options.filter((data) => data.id === formData.number);
            setCourse(filteredCourse);
            setOptions(courseData.Options.map(opt => opt.levelno));

          } else {
            console.log('No options data found.');
          }
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching course: ", error);
      }
    };

    fetchCourse();
  }, [formData.option, currentLanguage]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.courseCategory || !formData.phoneNumber || !formData.country || !formData.option || !formData.type) {
      Swal.fire({ icon: 'error', title: t('error'), text: t('pleaseFillAllFields'), timer: 1000, showConfirmButton: false });
      return;
    }

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
              <option value="IELTS">{t('ielts')}</option>
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
              {Array.isArray(options) ? options?.map(opt => <option value={opt}>{opt}</option>) : <option value="1 Level">{t('1level')}</option>}
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
              {i18n.language === 'ar' ? countriesAr.sort().map((cntry, index) => <option key={index} value={cntry}>{cntry}</option>) :
                countriesEn.sort().map((cntry, index) => <option key={index} value={cntry}>{cntry}</option>)}
              <option disabled value="other">{t('other')}</option>
            </select>
          </div>

          {/* Option Selection */}
          <div className="space-y-4">
            <label className="block text-lg font-bold text-black">{t('option')}</label>
            <select name="option" value={formData.courseCategory == 'IELTS' ? "Private" : formData.option} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-[var(--Input)] rounded-md">
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
