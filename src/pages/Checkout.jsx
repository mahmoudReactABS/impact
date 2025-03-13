import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';
import visa from '../assets/visa.png';
import mastercard from '../assets/Mastercard.png';
import pp from '../assets/pp.png';
import { db, collection, addDoc } from '../data/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

function Checkout() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state?.formData;
  const currentLanguage = i18n.language;

  const [course, setCourse] = useState({ Options: [{ duration: 'N/A', Hours: 'N/A', priceAfter: 'N/A' }] });
  const [finalPrice, setPrice] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  const send = async (filteredPrice) => {
    if (latitude && longitude) {
      try {
        const dataAfter = await fetch("https://impact-backend-ten.vercel.app/get-currency", {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify({
            latitude,
            longitude,
            priceUSD: filteredPrice,
          })
        });
        const finalDataAfter = await dataAfter.json();
        if (finalDataAfter) {
          console.log(finalDataAfter.finalPrice);
          setPrice(finalDataAfter.finalPrice);
          setLoading(false); // Set loading to false after data is fetched
        }
      } catch (error) {
        console.error("Error fetching currency data:", error);
        setLoading(false); // Set loading to false in case of error as well
      }
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    }
  }, []);

  const [cardholderName, setCardholderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [ccv, setCcv] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const fetchCourseData = async () => {
      if (!formData?.option || !formData?.number) return;

      try {
        const courseRef = doc(db, 'courses', formData.option);
        const courseSnap = await getDoc(courseRef);

        if (courseSnap.exists()) {
          const courseData = courseSnap.data();
          const courseLangData = courseData[currentLanguage] || courseData.en;

          const filteredOptions = courseLangData.Options.filter(opt => opt.id === formData.number);
          setFiltered(filteredOptions);
          setCourse(courseLangData);

          if (latitude && longitude && filteredOptions.length > 0) {
            const priceFromFiltered = filteredOptions[0].priceAfter;
            send(priceFromFiltered);
          }
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
      }
    };

    fetchCourseData();
  }, [formData, currentLanguage, latitude, longitude, t]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation
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

    const currentDate = new Date();
    const [year, month] = expirationDate.split('-');
    const expiryDate = new Date(year, month - 1);

    if (expiryDate < currentDate) {
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

    try {
      const currentDate = new Date();
      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();

      const timeString = `${hours}:${minutes}`;

      const paymentData = {
        courseCategory: formData?.courseCategory,
        courseOption: formData?.option,
        courseType: formData?.type,
        email: formData?.email,
        takenTest: formData?.takenTest,
        money: finalPrice,
        dateSubmit: `${new Date().getDay()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
        timeSubmit: timeString,
        name: formData?.name,
        paymentMethod: selectedOption,
      };

      const RequestData = {
        courseCategory: formData?.courseCategory,
        phoneNumber: formData?.phoneNumber,
        courseOption: formData?.option,
        courseType: formData?.type,
        email: formData?.email,
        country: formData?.country,
        option: 'Course Reservation',
        takenTest: formData?.takenTest,
        name: formData?.name,
      };

      const docRef = await addDoc(collection(db, 'Payments'), paymentData);
      const docRef1 = await addDoc(collection(db, 'Requests'), RequestData);
      navigate('/');
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
    <main className="space-y-8 md:px-40 px-4">
      <h2 className="text-2xl font-bold my-4">{t('checkout')}</h2>

      <section className="grid text-start grid-cols-1 lg:grid-cols-2 gap-8">
        <article data-aos="fade-right" data-aos-duration="2000" className="p-10 space-y-8 bg-[var(--Input)] rounded-4xl">
          <h1 className="text-4xl font-bold my-2">{filtered[0]?.levelno}</h1>
          <h2 className="text-2xl font-bold">{t('courseDetails')}</h2>
          <ul className="space-y-2 list-disc px-4 text-2xl">
            <li>
              <span className="font-bold">{t('duration')}: </span> {filtered[0]?.totalTime}
            </li>
            <li>
              <span className="font-bold">{t('sessionLength')}: </span> {filtered[0]?.Hours} {t('hours')}
            </li>
            <li>
              <span className="font-bold">{t('mode')}: </span> {t('online')}
            </li>
          </ul>
          <div>
            <h2 className="text-xl font-bold my-2">{t('price')}</h2>
            {loading ? (
              <h2 className="text-5xl font-bold my-2">{t('loading')}</h2>
            ) : (
              <h2 className="text-5xl text-[var(--Yellow)] font-bold my-2">{finalPrice}</h2>
            )}
          </div>
        </article>

        <article data-aos="fade-left" data-aos-duration="2000" className="p-10 space-y-5 bg-[var(--Input)] rounded-4xl">
          <h1 className="text-2xl font-bold">{t('chooseYourOption')}</h1>
          <div className="grid grid-cols-6 md:grid-cols-8 gap-6">
            <div className={`rounded-lg h-full col-span-2 p-3 cursor-pointer ${selectedOption === 'visa' ? 'bg-[#0D5CAE4D]' : ''} flex justify-center items-center`} onClick={() => handleOptionClick('visa')}>
              <img src={visa} alt="Visa" className="h-full w-full drop-shadow-xl" />
            </div>
            <div className={`rounded-lg h-full col-span-2 p-3 cursor-pointer ${selectedOption === 'mastercard' ? 'bg-[#0D5CAE4D]' : ''} flex justify-center items-center`} onClick={() => handleOptionClick('mastercard')}>
              <img src={mastercard} alt="Mastercard" className="h-full w-full drop-shadow-xl" />
            </div>
            <div className={`rounded-lg h-full col-span-2 p-3 cursor-pointer ${selectedOption === 'PayPal' ? 'bg-[#0D5CAE4D]' : ''} flex justify-center items-center`} onClick={() => handleOptionClick('PayPal')}>
              <img src={pp} alt="PayPal" className="h-full w-full drop-shadow-xl" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <section>
              <label className="block text-[var(--SubText)]">{t('cardholderName')}</label>
              <input type="text" value={cardholderName} required onChange={(e) => setCardholderName(e.target.value)} className="border-2 border-[var(--SubTextBorder)] p-2 mt-2 rounded-lg w-full" />
            </section>
            <section>
              <label className="block text-[var(--SubText)]">{t('cardNumber')}</label>
              <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} maxLength="16" required className="border-2 border-[var(--SubTextBorder)] p-2 mt-2 rounded-lg w-full" />
            </section>
            <section>
              <label className="block text-[var(--SubText)]">{t('expirationDate')}</label>
              <input type="month" value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)} required className="border-2 border-[var(--SubTextBorder)] p-2 mt-2 rounded-lg w-full" />
            </section>
            <section>
              <label className="block text-[var(--SubText)]">{t('ccv')}</label>
              <input type="text" value={ccv} onChange={(e) => setCcv(e.target.value)} maxLength="3" required className="border-2 border-[var(--SubTextBorder)] p-2 mt-2 rounded-lg w-full" />
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
