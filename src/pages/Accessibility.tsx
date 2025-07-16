import React from 'react';
import { useTranslation } from 'react-i18next';

export const Accessibility: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language as 'en' | 'hi';

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className={`text-4xl font-bold text-[#2D2D2B] mb-8 ${currentLanguage === 'hi' ? 'font-devanagari' : ''}`}>
        {t('common.accessibility')}
      </h1>
      
      <div className={`prose lg:prose-lg ${currentLanguage === 'hi' ? 'font-devanagari' : ''}`}>
        {currentLanguage === 'en' ? (
          <>
            <h2>Our Commitment to Accessibility</h2>
            <p>At The Listening Home, we believe that everyone should have equal access to information and resources. We are committed to making our website accessible to all users, including those with disabilities.</p>

            <h2>Accessibility Features</h2>
            <p>Our website includes the following accessibility features:</p>
            <ul>
              <li>Keyboard navigation support</li>
              <li>Screen reader compatibility</li>
              <li>Text resizing without loss of functionality</li>
              <li>High contrast text for better readability</li>
              <li>Alt text for images</li>
              <li>Clear and consistent navigation</li>
              <li>Proper heading structure</li>
            </ul>

            <h2>Language Support</h2>
            <p>We provide content in both English and Hindi to serve our diverse audience. Our website features:</p>
            <ul>
              <li>Easy language switching</li>
              <li>Proper language attributes for screen readers</li>
              <li>Consistent translations across all pages</li>
              <li>Optimized fonts for both scripts</li>
            </ul>

            <h2>Design Principles</h2>
            <p>Our website follows these key design principles:</p>
            <ul>
              <li>Clean, readable layouts</li>
              <li>Sufficient color contrast</li>
              <li>Responsive design that works on all devices</li>
              <li>Clear focus indicators for keyboard navigation</li>
              <li>Consistent spacing and typography</li>
            </ul>

            <h2>Assistive Technology Support</h2>
            <p>Our website is designed to work with common assistive technologies:</p>
            <ul>
              <li>Screen readers (NVDA, JAWS, VoiceOver)</li>
              <li>Screen magnifiers</li>
              <li>Voice recognition software</li>
              <li>Browser accessibility tools</li>
            </ul>

            <h2>Known Issues</h2>
            <p>We continuously work to improve our website's accessibility. If you encounter any accessibility issues, please contact us through our contact page.</p>

            <h2>Standards Compliance</h2>
            <p>We strive to meet WCAG 2.1 Level AA standards and follow best practices for web accessibility.</p>

            <h2>Feedback</h2>
            <p>Your feedback helps us improve. If you have suggestions for improving our website's accessibility, please reach out through our contact page.</p>
          </>
        ) : (
          <>
            <h2>पहुंच के प्रति हमारी प्रतिबद्धता</h2>
            <p>द लिसनिंग होम में, हमारा मानना है कि सभी को जानकारी और संसाधनों तक समान पहुंच होनी चाहिए। हम अपनी वेबसाइट को सभी उपयोगकर्ताओं के लिए सुलभ बनाने के लिए प्रतिबद्ध हैं, जिसमें विकलांग व्यक्ति भी शामिल हैं।</p>

            <h2>पहुंच सुविधाएं</h2>
            <p>हमारी वेबसाइट में निम्नलिखित पहुंच सुविधाएं शामिल हैं:</p>
            <ul>
              <li>कीबोर्ड नेविगेशन समर्थन</li>
              <li>स्क्रीन रीडर संगतता</li>
              <li>कार्यक्षमता के नुकसान के बिना टेक्स्ट का आकार बदलना</li>
              <li>बेहतर पठनीयता के लिए उच्च कंट्रास्ट टेक्स्ट</li>
              <li>छवियों के लिए वैकल्पिक टेक्स्ट</li>
              <li>स्पष्ट और सुसंगत नेविगेशन</li>
              <li>उचित शीर्षक संरचना</li>
            </ul>

            <h2>भाषा समर्थन</h2>
            <p>हम अपने विविध दर्शकों की सेवा के लिए अंग्रेजी और हिंदी दोनों में सामग्री प्रदान करते हैं। हमारी वेबसाइट में ये सुविधाएं हैं:</p>
            <ul>
              <li>आसान भाषा स्विचिंग</li>
              <li>स्क्रीन रीडर्स के लिए उचित भाषा विशेषताएं</li>
              <li>सभी पृष्ठों पर सुसंगत अनुवाद</li>
              <li>दोनों लिपियों के लिए अनुकूलित फ़ॉन्ट</li>
            </ul>

            <h2>डिज़ाइन सिद्धांत</h2>
            <p>हमारी वेबसाइट इन प्रमुख डिज़ाइन सिद्धांतों का पालन करती है:</p>
            <ul>
              <li>साफ, पठनीय लेआउट</li>
              <li>पर्याप्त रंग कंट्रास्ट</li>
              <li>प्रतिक्रियाशील डिज़ाइन जो सभी उपकरणों पर काम करता है</li>
              <li>कीबोर्ड नेविगेशन के लिए स्पष्ट फोकस संकेतक</li>
              <li>सुसंगत स्पेसिंग और टाइपोग्राफी</li>
            </ul>

            <h2>सहायक तकनीक समर्थन</h2>
            <p>हमारी वेबसाइट सामान्य सहायक तकनीकों के साथ काम करने के लिए डिज़ाइन की गई है:</p>
            <ul>
              <li>स्क्रीन रीडर (NVDA, JAWS, VoiceOver)</li>
              <li>स्क्रीन मैग्निफायर</li>
              <li>आवाज पहचान सॉफ्टवेयर</li>
              <li>ब्राउज़र पहुंच उपकरण</li>
            </ul>

            <h2>ज्ञात समस्याएं</h2>
            <p>हम लगातार अपनी वेबसाइट की पहुंच में सुधार करने के लिए काम करते हैं। यदि आपको कोई पहुंच संबंधी समस्या का सामना करना पड़ता है, तो कृपया हमारे संपर्क पृष्ठ के माध्यम से हमसे संपर्क करें।</p>

            <h2>मानक अनुपालन</h2>
            <p>हम WCAG 2.1 लेवल AA मानकों को पूरा करने और वेब पहुंच के लिए सर्वोत्तम प्रथाओं का पालन करने का प्रयास करते हैं।</p>

            <h2>प्रतिक्रिया</h2>
            <p>आपकी प्रतिक्रिया हमें सुधार करने में मदद करती है। यदि आपके पास हमारी वेबसाइट की पहुंच में सुधार के लिए सुझाव हैं, तो कृपया हमारे संपर्क पृष्ठ के माध्यम से संपर्क करें।</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Accessibility; 