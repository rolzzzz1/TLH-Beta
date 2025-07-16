import React from 'react';
import { useTranslation } from 'react-i18next';

export const Terms: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language as 'en' | 'hi';

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className={`text-4xl font-bold text-[#2D2D2B] mb-8 ${currentLanguage === 'hi' ? 'font-devanagari' : ''}`}>
        {t('common.termsOfService')}
      </h1>
      
      <div className={`prose lg:prose-lg ${currentLanguage === 'hi' ? 'font-devanagari' : ''}`}>
        {currentLanguage === 'en' ? (
          <>
            <h2>Welcome to The Listening Home</h2>
            <p>By accessing and using this website, you accept and agree to be bound by the terms and conditions outlined in this agreement.</p>

            <h2>Use of Content</h2>
            <p>All content on this website is for informational purposes only. The content is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of qualified health providers with questions you may have regarding medical conditions.</p>

            <h2>Intellectual Property</h2>
            <p>The content, organization, graphics, design, and other matters related to the Site are protected under applicable copyrights and other proprietary laws. The copying, redistribution, use, or publication by you of any such matters or any part of the Site is strictly prohibited.</p>

            <h2>User Contributions</h2>
            <p>By submitting comments or feedback through our contact forms, you grant us the right to:</p>
            <ul>
              <li>Use, modify, and publish the content for any purpose</li>
              <li>Use the feedback to improve our services</li>
              <li>Share anonymous feedback as testimonials</li>
            </ul>

            <h2>Disclaimer of Warranties</h2>
            <p>The information on the website is provided "as is" without any representations or warranties, express or implied. We make no representations or warranties about:</p>
            <ul>
              <li>The accuracy or completeness of the information</li>
              <li>The suitability of the information for any purpose</li>
              <li>The availability of the website at any time</li>
            </ul>

            <h2>Limitation of Liability</h2>
            <p>We will not be liable for any indirect, special, or consequential damages arising from your use of the website or any linked external sites.</p>

            <h2>External Links</h2>
            <p>Our website may contain links to external sites. We are not responsible for the content or practices of these sites.</p>

            <h2>Changes to Terms</h2>
            <p>We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the website. Your continued use of the site constitutes acceptance of these changes.</p>

            <h2>Contact Information</h2>
            <p>For questions about these Terms of Service, please contact us through our contact page.</p>
          </>
        ) : (
          <>
            <h2>द लिसनिंग होम में आपका स्वागत है</h2>
            <p>इस वेबसाइट का उपयोग करके, आप इस समझौते में बताई गई नियमों और शर्तों को स्वीकार करते हैं और उनसे बाध्य होने के लिए सहमत होते हैं।</p>

            <h2>सामग्री का उपयोग</h2>
            <p>इस वेबसाइट पर सभी सामग्री केवल जानकारी के उद्देश्य से है। यह सामग्री पेशेवर चिकित्सा सलाह, निदान, या उपचार का विकल्प नहीं है। चिकित्सा स्थितियों के बारे में प्रश्नों के लिए हमेशा योग्य स्वास्थ्य प्रदाताओं की सलाह लें।</p>

            <h2>बौद्धिक संपदा</h2>
            <p>साइट से संबंधित सामग्री, संगठन, ग्राफिक्स, डिजाइन और अन्य मामले लागू कॉपीराइट और अन्य स्वामित्व कानूनों के तहत संरक्षित हैं। आपके द्वारा ऐसे किसी भी मामले या साइट के किसी भी हिस्से की कॉपी, पुनर्वितरण, उपयोग या प्रकाशन सख्ती से प्रतिबंधित है।</p>

            <h2>उपयोगकर्ता योगदान</h2>
            <p>हमारे संपर्क फॉर्म के माध्यम से टिप्पणियां या प्रतिक्रिया प्रस्तुत करके, आप हमें निम्नलिखित अधिकार देते हैं:</p>
            <ul>
              <li>किसी भी उद्देश्य के लिए सामग्री का उपयोग, संशोधन और प्रकाशन करना</li>
              <li>हमारी सेवाओं को बेहतर बनाने के लिए प्रतिक्रिया का उपयोग करना</li>
              <li>गुमनाम प्रतिक्रिया को प्रशंसापत्र के रूप में साझा करना</li>
            </ul>

            <h2>वारंटी का अस्वीकरण</h2>
            <p>वेबसाइट पर दी गई जानकारी बिना किसी प्रतिनिधित्व या वारंटी, व्यक्त या निहित के "जैसी है" प्रदान की जाती है। हम निम्नलिखित के बारे में कोई प्रतिनिधित्व या वारंटी नहीं देते:</p>
            <ul>
              <li>जानकारी की सटीकता या पूर्णता</li>
              <li>किसी भी उद्देश्य के लिए जानकारी की उपयुक्तता</li>
              <li>किसी भी समय वेबसाइट की उपलब्धता</li>
            </ul>

            <h2>देयता की सीमा</h2>
            <p>हम वेबसाइट या किसी भी लिंक की गई बाहरी साइटों के आपके उपयोग से उत्पन्न किसी भी अप्रत्यक्ष, विशेष या परिणामी क्षति के लिए उत्तरदायी नहीं होंगे।</p>

            <h2>बाहरी लिंक</h2>
            <p>हमारी वेबसाइट में बाहरी साइटों के लिंक हो सकते हैं। हम इन साइटों की सामग्री या प्रथाओं के लिए जिम्मेदार नहीं हैं।</p>

            <h2>नियमों में परिवर्तन</h2>
            <p>हम किसी भी समय इन नियमों को संशोधित करने का अधिकार सुरक्षित रखते हैं। परिवर्तन वेबसाइट पर पोस्ट करने के तुरंत बाद प्रभावी होंगे। साइट का आपका निरंतर उपयोग इन परिवर्तनों की स्वीकृति माना जाएगा।</p>

            <h2>संपर्क जानकारी</h2>
            <p>इन सेवा की शर्तों के बारे में प्रश्नों के लिए, कृपया हमारे संपर्क पेज के माध्यम से हमसे संपर्क करें।</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Terms; 