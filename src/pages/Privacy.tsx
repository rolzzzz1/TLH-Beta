import React from 'react';
import { useTranslation } from 'react-i18next';

export const Privacy: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language as 'en' | 'hi';

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className={`text-4xl font-bold text-[#2D2D2B] mb-8 ${currentLanguage === 'hi' ? 'font-devanagari' : ''}`}>
        {t('common.privacyPolicy')}
      </h1>
      
      <div className={`prose lg:prose-lg ${currentLanguage === 'hi' ? 'font-devanagari' : ''}`}>
        {currentLanguage === 'en' ? (
          <>
            <h2>Introduction</h2>
            <p>At The Listening Home, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website.</p>

            <h2>Information We Collect</h2>
            <p>We collect minimal information to provide you with the best possible experience:</p>
            <ul>
              <li>Language preferences</li>
              <li>Basic analytics data (page views, time spent on site)</li>
              <li>Any information you voluntarily provide through contact forms</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>We use the collected information to:</p>
            <ul>
              <li>Personalize your experience</li>
              <li>Improve our website</li>
              <li>Respond to your inquiries</li>
              <li>Send periodic emails (if you've opted in)</li>
            </ul>

            <h2>Data Protection</h2>
            <p>We implement various security measures to maintain the safety of your personal information. Your data is stored securely and is only accessible to authorized personnel.</p>

            <h2>Cookies</h2>
            <p>We use cookies to remember your language preferences and provide a better browsing experience. You can choose to disable cookies in your browser settings.</p>

            <h2>Third-Party Links</h2>
            <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites.</p>

            <h2>Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of communications</li>
            </ul>

            <h2>Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us through our contact page.</p>
          </>
        ) : (
          <>
            <h2>परिचय</h2>
            <p>द लिसनिंग होम में, हम आपकी गोपनीयता को गंभीरता से लेते हैं। यह गोपनीयता नीति बताती है कि हम आपकी व्यक्तिगत जानकारी को कैसे एकत्र, उपयोग और सुरक्षित करते हैं जब आप हमारी वेबसाइट का उपयोग करते हैं।</p>

            <h2>हम कौन सी जानकारी एकत्र करते हैं</h2>
            <p>हम आपको सर्वोत्तम संभव अनुभव प्रदान करने के लिए न्यूनतम जानकारी एकत्र करते हैं:</p>
            <ul>
              <li>भाषा प्राथमिकताएं</li>
              <li>बुनियादी विश्लेषण डेटा (पेज व्यू, साइट पर बिताया गया समय)</li>
              <li>संपर्क फॉर्म के माध्यम से आप स्वेच्छा से प्रदान करते हैं कोई भी जानकारी</li>
            </ul>

            <h2>हम आपकी जानकारी का उपयोग कैसे करते हैं</h2>
            <p>हम एकत्रित जानकारी का उपयोग करते हैं:</p>
            <ul>
              <li>आपके अनुभव को व्यक्तिगत बनाने के लिए</li>
              <li>हमारी वेबसाइट को बेहतर बनाने के लिए</li>
              <li>आपकी पूछताछ का जवाब देने के लिए</li>
              <li>समय-समय पर ईमेल भेजने के लिए (यदि आपने सहमति दी है)</li>
            </ul>

            <h2>डेटा सुरक्षा</h2>
            <p>हम आपकी व्यक्तिगत जानकारी की सुरक्षा बनाए रखने के लिए विभिन्न सुरक्षा उपाय लागू करते हैं। आपका डेटा सुरक्षित रूप से संग्रहीत किया जाता है और केवल अधिकृत कर्मियों को ही उपलब्ध होता है।</p>

            <h2>कुकीज़</h2>
            <p>हम आपकी भाषा प्राथमिकताओं को याद रखने और बेहतर ब्राउज़िंग अनुभव प्रदान करने के लिए कुकीज़ का उपयोग करते हैं। आप अपने ब्राउज़र सेटिंग्स में कुकीज़ को अक्षम कर सकते हैं।</p>

            <h2>तृतीय-पक्ष लिंक</h2>
            <p>हमारी वेबसाइट में तृतीय-पक्ष वेबसाइटों के लिंक हो सकते हैं। हम इन बाहरी साइटों की गोपनीयता प्रथाओं के लिए जिम्मेदार नहीं हैं।</p>

            <h2>आपके अधिकार</h2>
            <p>आपको निम्नलिखित अधिकार हैं:</p>
            <ul>
              <li>अपनी व्यक्तिगत जानकारी तक पहुंच</li>
              <li>गलत जानकारी को सही करना</li>
              <li>अपनी जानकारी को हटाने का अनुरोध</li>
              <li>संचार से ऑप्ट-आउट करना</li>
            </ul>

            <h2>हमसे संपर्क करें</h2>
            <p>यदि आपके पास इस गोपनीयता नीति के बारे में कोई प्रश्न हैं, तो कृपया हमारे संपर्क पेज के माध्यम से हमसे संपर्क करें।</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Privacy; 