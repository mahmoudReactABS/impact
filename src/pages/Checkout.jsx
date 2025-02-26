import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';
import visa from '../assets/visa.png';
import mastercard from '../assets/Mastercard.png';
import pp from '../assets/pp.png';
import { db } from '../data/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

function Checkout() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state?.formData;
  const currentLanguage = i18n.language;

  const [course, setCourse] = useState({
    Options: [{ duration: 'N/A', Hours: 'N/A', priceAfter: 'N/A' }],
  });

  const [cardholderName, setCardholderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [ccv, setCcv] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  // Fetch course data from Firestore
  useEffect(() => {
    const fetchCourseData = async () => {
      if (!formData?.option) return;

      try {
        const courseRef = doc(db, 'courses', formData.option); // Reference to the course document
        const courseSnap = await getDoc(courseRef);

        if (courseSnap.exists()) {
          const courseData = courseSnap.data();
          setCourse(courseData[currentLanguage] || courseData.en); // Fallback to English if current language data is missing
        } else {
          console.error('Course not found in Firestore');
        }
      } catch (error) {
        console.error('Error fetching course data:', error);
        Swal.fire({
          title: t('error'),
          text: t('errorFetchingCourseData'),
          icon: 'error',
          showConfirmButton: false,
          timer: 1500,
        });
      } finally { }
    };

    fetchCourseData();
  }, [formData, currentLanguage, t]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedOption.trim().length === 0) {
      Swal.fire({
        title: t('error'),
        text: t('selectPaymentMethod'),
        icon: 'error',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    if (!cardholderName || !cardNumber || !expirationDate || !ccv) {
      Swal.fire({
        title: t('error'),
        text: t('pleaseFillAllFields'),
        icon: 'error',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    if (cardNumber.length !== 16) {
      Swal.fire({
        title: t('error'),
        text: t('invalidCardNumber'),
        icon: 'error',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    if (new Date(expirationDate) < new Date()) {
      Swal.fire({
        title: t('error'),
        text: t('invalidExpiryDate'),
        icon: 'error',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    if (ccv.length !== 3) {
      Swal.fire({
        title: t('error'),
        text: t('invalidCcv'),
        icon: 'error',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    Swal.fire({
      title: t('success'),
      text: t('paymentDoneSuccessfully'),
      icon: 'success',
      timer: 2000,
      showConfirmButton: false,
    });

    window.scroll(0, 0);
    navigate('/');
  };

  return (
    <main className="space-y-8 md:px-40 px-4">
      <h2 className="text-2xl font-bold my-4">{t('checkout')}</h2>

      <section className="grid text-start grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Course Details Section */}
        <article data-aos="fade-right" data-aos-duration="2000" className="p-10 space-y-8 bg-[var(--Input)] rounded-4xl">
          <h1 className="text-2xl font-bold">{t('courseTitle')}</h1>
          <h2 className="text-xl font-bold">{t('courseDetails')}</h2>
          <ul className="space-y-2 list-disc px-4">
            <li>
              <span className="font-bold text-lg">{t('duration')}: </span> {course.Options[0].duration} {t('weeks')}
            </li>
            <li>
              <span className="font-bold text-lg">{t('sessionLength')}: </span> {course.Options[0].Hours} {t('hours')}
            </li>
            <li>
              <span className="font-bold text-lg">{t('mode')}: </span> {t('online')}
            </li>
          </ul>
          <div>
            <h2 className="text-xl font-bold my-2">{t('price')}</h2>
            <h2 className="text-5xl text-[var(--Yellow)] font-bold my-2">{course.Options[0].priceAfter} $</h2>
          </div>
        </article>

        {/* Payment Method Selection */}
        <article data-aos="fade-left" data-aos-duration="2000" className="p-10 space-y-5 bg-[var(--Input)] rounded-4xl">
          <h1 className="text-2xl font-bold">{t('chooseYourOption')}</h1>
          <div className="grid grid-cols-6 md:grid-cols-8 gap-6">
            <div
              className={`rounded-lg h-full col-span-2 p-3 cursor-pointer ${selectedOption === 'visa' ? 'bg-[#0D5CAE4D]' : ''
                } flex justify-center items-center`}
              onClick={() => handleOptionClick('visa')}
            >
              <img src={visa} alt="Visa" className="h-full w-full drop-shadow-xl" />
            </div>
            <div
              className={`rounded-lg h-full col-span-2 p-3 cursor-pointer ${selectedOption === 'mastercard' ? 'bg-[#0D5CAE4D]' : ''
                } flex justify-center items-center`}
              onClick={() => handleOptionClick('mastercard')}
            >
              <img src={mastercard} alt="Mastercard" className="h-full w-full drop-shadow-xl" />
            </div>
            <div
              className={`rounded-lg h-full col-span-2 p-3 cursor-pointer ${selectedOption === 'pp' ? 'bg-[#0D5CAE4D]' : ''
                } flex justify-center items-center`}
              onClick={() => handleOptionClick('pp')}
            >
              <img src={pp} alt="PayPal" className="h-full w-full drop-shadow-xl" />
            </div>
          </div>

          {/* Payment Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <section>
              <label className="block text-[var(--SubText)]">{t('cardholderName')}</label>
              <input
                type="text"
                value={cardholderName}
                onChange={(e) => setCardholderName(e.target.value)}
                className="border-2 border-[var(--SubTextBorder)] p-2 mt-2 rounded-lg w-full"
                required
              />
            </section>
            <section>
              <label className="block text-[var(--SubText)]">{t('cardNumber')}</label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="border-2 border-[var(--SubTextBorder)] p-2 mt-2 rounded-lg w-full"
                maxLength="16"
                required
              />
            </section>
            <section>
              <label className="block text-[var(--SubText)]">{t('expirationDate')}</label>
              <input
                type="month"
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
                className="border-2 border-[var(--SubTextBorder)] p-2 mt-2 rounded-lg w-full"
                required
              />
            </section>
            <section>
              <label className="block text-[var(--SubText)]">{t('ccv')}</label>
              <input
                type="text"
                value={ccv}
                onChange={(e) => setCcv(e.target.value)}
                className="border-2 border-[var(--SubTextBorder)] p-2 mt-2 rounded-lg w-full"
                maxLength="3"
                required
              />
            </section>
            <section data-aos="fade-up" data-aos-duration="2000" className="flex justify-between mt-12 col-span-1 md:col-span-2">
              <button type="button" className="p-4 px-8 rounded-4xl border-2 border-[var(--Yellow)]" onClick={() => window.history.back()}>
                {t('back')}
              </button>
              <button type="submit" className="p-4 px-8 rounded-4xl bg-[var(--Yellow)]">
                {t('submit')}
              </button>
            </section>
          </form>
        </article>
      </section>
    </main>
  );
}

export default Checkout;