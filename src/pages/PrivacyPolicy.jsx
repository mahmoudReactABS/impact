import React from 'react';
import { useTranslation } from 'react-i18next';

const PrivacyPolicy = () => {
  const { i18n } = useTranslation();

  return (
    i18n.language === 'ar' ? (
      <main className='space-y-5 mx-10 md:mx-12 xl:mx-60' style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1>سياسة الخصوصية</h1>

        <h2>1. البيانات التي تجمعها</h2>
        <p>قد نقوم بجمع البيانات التالية عند استخدام تطبيق "أكاديمية إمباكت إنجلش":</p>
        <ul className='list-disc mx-8'>
          <li><strong>المعلومات الشخصية:</strong> الاسم، رقم الهاتف، البريد الإلكتروني.</li>
          <li><strong>معلومات الحساب:</strong> بيانات تسجيل الدخول والمعلومات الشخصية.</li>
          <li><strong>معلومات الدورات:</strong> الدورات المسجلة، التقدم، والتقييمات.</li>
          <li><strong>معلومات الدفع:</strong> تفاصيل المعاملات وطرق الدفع (يتم معالجتها بواسطة برايات دفع آمنة).</li>
          <li><strong>معلومات الجهاز:</strong> نظام التشغيل ونوع المتصفح لتحسين التطبيق.</li>
        </ul>

        <h2>2. كيفية استخدام بياناتك</h2>
        <p>يتم استخدام بياناتك من أجل:</p>
        <ul className='list-disc mx-8'>
          <li>إدارة تسجيل الدورات وتتبع التقدم.</li>
          <li>تخصيص تجربة التعلم.</li>
          <li>معالجة المدفوعات بأمان.</li>
          <li>تحليل سلوك المستخدم وتحسين الخدمات.</li>
          <li>الامتثال للالتزامات القانونية ومنع الأنشطة الاحتيالية.</li>
        </ul>

        <h2>3. حماية البيانات</h2>
        <p>نضمن حماية بياناتك من خلال:</p>
        <ul className='list-disc mx-8'>
          <li>استخدام تقنيات التشفير لتخزين البيانات ونقلها.</li>
          <li>تقييد الوصول إلى البيانات الشخصية على الموظفين المصرح لهم فقط.</li>
          <li>تحديث تدابير الأمان بانتظام لحماية معلوماتك.</li>
        </ul>

        <h2>4. سياسة الاسترداد</h2>
        <p>
          يمكن للطالب طلب استرداد الرسوم خلال 3 أيام من التسجيل إذا لم يتم التواصل معه من موظف خدمة العملاء لتنسيق المواعيد.
          يجب تقديم طلبات الاسترداد عبر قنوات دعم العملاء الرسمية. سيتم معالجة المبالغ المستردة خلال 7 أيام عمل بعد الموافقة.
          لا يمكن استرداد الرسوم إذا تم تنسيق موعد أو مجموعة للطالب أو تسجيله في مجموعة.
        </p>

        <h2>5. مشاركة البيانات</h2>
        <p>لا نقوم ببيع بياناتك الشخصية، ولكن قد نشاركها مع:</p>
        <ul className='list-disc mx-8'>
          <li>معالجي الدفع: لمعالجة المعاملات بأمان.</li>
          <li>شركاء التعليم: لتقديم خدمات تعليمية متكاملة.</li>
          <li>الجهات القانونية: إذا كان ذلك مطلوبًا بموجب القانون.</li>
        </ul>

        <h2>6. أمن البيانات</h2>
        <p>نطبق تدابير أمان قوية، تشمل:</p>
        <ul className='list-disc mx-8'>
          <li>تشفير البيانات باستخدام تقنية SSL.</li>
          <li>عمليات تدقيق أمنية منتظمة.</li>
          <li>ضوابط وصول صارمة.</li>
        </ul>

        <h2>7. حقوقك</h2>
        <p>لديك الحق في:</p>
        <ul className='list-disc mx-8'>
          <li>الوصول إلى بياناتك الشخصية.</li>
          <li>طلب تصحيح أو حذف بياناتك.</li>
          <li>إلغاء الاشتراك من الاتصالات التسويقية.</li>
        </ul>

        <h2>8. تغييرات على هذه السياسة</h2>
        <p>قد نقوم بتحديث سياسة الخصوصية بشكل دوري. سيتم إخطارك بالتغييرات عبر التطبيق.</p>

        <h2>9. نظام الدراسة</h2>
        <ul className='list-disc mx-8'>
          <li>يلتزم المدرس بتقديم كافة الإمكانيات والدعم الكامل للطالب من شرح المنهج والمصادر الإضافية التي يحتاجها الطالب للتأكد من الاستفادة الكاملة.</li>
          <li>تلتزم الإدارة وموظفي خدمة العملاء بمتابعة الطالب والتأكد من جودة الخدمة المقدمة لهم. يستطيع الطالب تقديم شكوى لموظف الخدمة المسؤول عنه.</li>
          <li>تلتزم الإدارة بحل مشكلة الطالب بما لا يتعارض مع النظام العام للأكاديمية.</li>
          <li>يلتزم الطالب بحضور المحاضرات وعدم الغياب أو التأخير وتنفيذ المهام المطلوبة لتحقيق أقصى استفادة.</li>
          <li>لا تقع أي مسؤولية على الأكاديمية نتيجة تدهور مستوى الطالب بسبب عدم الالتزام أو الغياب أو الحضور متأخرًا.</li>
          <li>يلتزم الطالب بالآداب العامة والأخلاقيات والاحترام المتبادل مع موظفي الأكاديمية، وأي تجاوز من الطالب ينتج عنه فصل الطالب بدون استرداد رسوم الاشتراك.</li>
          <li>يدرس الطالب في المستوى المناسب له، وهو ما يتم تحديده نتيجة اختبار تحديد مستوى من خلال مدرس ذو خبرة.</li>
          <li>التزام الطالب بالحضور وتسليم المهام وحضور اختبار نهاية المستوى والنجاح فيه شرط أساسي لاجتياز المستوى.</li>
        </ul>

        <h2>10. اتصل بنا</h2>
        <p>للإستفسارات أو طلبات الاسترداد، يرجى الاتصال بـ:</p>
        <ul className='list-disc mx-8'>
          <li><strong>الموقع الإلكتروني:</strong> <a href="http://www.impactacademy.com" target="_blank" rel="noopener noreferrer">www.impactacademy.com</a></li>
          <li><strong>البريد الإلكتروني:</strong> <a href="mailto:support@impactacademy.com">support@impactacademy.com</a></li>
          <li><strong>الهاتف:</strong> +201091085271</li>
        </ul>
      </main>
    ) : (
      <main className='space-y-5 mx-10 md:mx-12 xl:mx-60' style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1>Privacy Policy</h1>

        <h2>1. Data We Collect</h2>
        <p>We may collect the following types of personal data when you use the "Impact English Academy" application:</p>
        <ul className='list-disc mx-8'>
          <li><strong>Personal Information:</strong> Name, phone number, and email address.</li>
          <li><strong>Account Information:</strong> Login credentials and profile details.</li>
          <li><strong>Course Information:</strong> Enrolled courses, progress, and assessments.</li>
          <li><strong>Payment Information:</strong> Transaction details and payment methods (securely processed by third-party payment gateways).</li>
          <li><strong>Device Information:</strong> Information about your device, such as operating system and browser type, for app optimization.</li>
        </ul>

        <h2>2. How We Use Your Data</h2>
        <p>Your data is used for the following purposes:</p>
        <ul className='list-disc mx-8'>
          <li>To manage course enrollments and track progress.</li>
          <li>To personalize your learning experience.</li>
          <li>To process secure payments.</li>
          <li>To analyze user behavior and improve services.</li>
          <li>To comply with legal obligations and prevent fraudulent activities.</li>
        </ul>

        <h2>3. Data Protection</h2>
        <p>We prioritize your data security by:</p>
        <ul className='list-disc mx-8'>
          <li>Using encryption technologies for data storage and transmission.</li>
          <li>Restricting access to personal data to authorized personnel only.</li>
          <li>Regularly updating our security measures to protect your information.</li>
        </ul>

        <h2>4. Refund Policy</h2>
        <p>
          Students can request a refund within 3 days of registration if they have not been contacted by a customer service representative to schedule appointments.
          Refund requests must be made through official customer support channels.
          Refunds will be processed within 7 business days after approval.
          Refunds are not applicable if an appointment or group has been scheduled for the student, or if the student has been registered in a group.
        </p>

        <h2>5. Data Sharing</h2>
        <p>We do not sell or rent your personal data. However, we may share data with:</p>
        <ul className='list-disc mx-8'>
          <li><strong>Payment Processors:</strong> To handle secure transactions.</li>
          <li><strong>Educational Partners:</strong> For course-related services.</li>
          <li><strong>Legal Authorities:</strong> If required by law.</li>
        </ul>

        <h2>6. Data Security</h2>
        <p>We implement robust security measures, including:</p>
        <ul className='list-disc mx-8'>
          <li>Secure Socket Layer (SSL) encryption.</li>
          <li>Regular security audits and monitoring.</li>
          <li>Strict access controls.</li>
        </ul>

        <h2>7. Your Rights</h2>
        <p>You have the right to:</p>
        <ul className='list-disc mx-8'>
          <li>Access your personal data.</li>
          <li>Request corrections or deletions.</li>
          <li>Sign out of marketing communications.</li>
        </ul>

        <h2>8. Changes to This Policy</h2>
        <p>We may update this Privacy Policy periodically. Changes will be communicated through the app.</p>

        <h2>9. Study Rules</h2>
        <ul className='list-disc mx-8'>
          <li>The teacher is committed to providing all capabilities and full support to the student, including explanations, the curriculum, and additional resources that the student needs to ensure complete benefit.</li>
          <li>The administration, represented by customer service employees, is committed to following up with students and ensuring the quality of the service provided to them. The student can submit a complaint to the customer service employee responsible for them.</li>
          <li>The administration is committed to resolving the student's problem in a manner that does not conflict with the general system of the academy.</li>
          <li>The student is committed to attending lectures, not being absent or late, and carrying out the required tasks to achieve maximum benefit.</li>
          <li>The academy bears no responsibility for the deterioration of the student's level due to non-compliance, absence, or late attendance.</li>
          <li>The student is committed to general etiquette, ethics, and mutual respect with the academy's employees, and any transgression by the student will result in the student's expulsion without a refund of the subscription fees.</li>
          <li>The student studies at the appropriate level for them, which is determined because of a placement test by an experienced teacher.</li>
          <li>The student's commitment to attendance, submission of tasks, attendance of the end-of-level test, and passing it is a prerequisite for passing the level.</li>
        </ul>

        <h2>10. Contact Us</h2>
        <p>For questions or refund requests, please contact:</p>
        <ul className='list-disc mx-8'>
          <li><strong>Website:</strong> <a href="http://www.impactacademy.com" target="_blank" rel="noopener noreferrer">www.impactacademy.com</a></li>
          <li><strong>Email:</strong> <a href="mailto:support@impactacademy.com">support@impactacademy.com</a></li>
          <li><strong>Phone:</strong> +201091085271</li>
        </ul>
      </main>
    )
  );
};

export default PrivacyPolicy;