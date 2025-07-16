import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize Firebase Admin with your service account
const serviceAccount = JSON.parse(
  readFileSync(join(__dirname, '..', 'serviceAccountKey.json'), 'utf-8')
);

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

// Example translated post
const samplePost = {
  title: {
    en: "The Impact of Technology on Modern Education",
    hi: "आधुनिक शिक्षा पर प्रौद्योगिकी का प्रभाव"
  },
  excerpt: {
    en: "Discover how digital tools and online learning platforms are transforming the educational landscape and creating new opportunities for students worldwide.",
    hi: "जानें कैसे डिजिटल टूल्स और ऑनलाइन लर्निंग प्लेटफॉर्म शैक्षिक परिदृश्य को बदल रहे हैं और दुनिया भर के छात्रों के लिए नए अवसर बना रहे हैं।"
  },
  content: {
    en: `Technology has revolutionized education in unprecedented ways. From interactive learning apps to virtual classrooms, the digital transformation has made education more accessible, engaging, and personalized than ever before.

Key benefits include:
- 24/7 access to learning resources
- Interactive and multimedia content
- Real-time feedback and assessment
- Global collaboration opportunities
- Adaptive learning paths

However, challenges remain. Digital divide, screen time concerns, and the need for teacher training are important considerations that educational institutions must address.`,
    hi: `प्रौद्योगिकी ने शिक्षा को अभूतपूर्व तरीकों से क्रांतिकारी बना दिया है। इंटरैक्टिव लर्निंग ऐप्स से लेकर वर्चुअल क्लासरूम तक, डिजिटल परिवर्तन ने शिक्षा को पहले से कहीं अधिक सुलभ, आकर्षक और व्यक्तिगत बना दिया है।

प्रमुख लाभ हैं:
- शिक्षण संसाधनों तक 24/7 पहुंच
- इंटरैक्टिव और मल्टीमीडिया सामग्री
- रीयल-टाइम फीडबैक और मूल्यांकन
- वैश्विक सहयोग के अवसर
- अनुकूली सीखने के मार्ग

हालांकि, चुनौतियां बनी हुई हैं। डिजिटल डिवाइड, स्क्रीन टाइम संबंधी चिंताएं और शिक्षक प्रशिक्षण की आवश्यकता महत्वपूर्ण विचार हैं जिन्हें शैक्षिक संस्थानों को संबोधित करना चाहिए।`
  },
  author: {
    en: "Prof. David Smith",
    hi: "प्रो. डेविड स्मिथ"
  },
  category: "Education",
  categories: ["education", "technology", "digital-learning"],
  imageUrl: "https://images.unsplash.com/photo-1501504905252-473c47e087f8",
  createdAt: Timestamp.now()
};

async function uploadPost(post) {
  try {
    console.log('Attempting to add document to posts collection...');
    const docRef = await db.collection('posts').add(post);
    console.log('Post uploaded successfully with ID:', docRef.id);
    console.log('Document data:', post);
    return docRef.id;
  } catch (error) {
    console.error('Error uploading post:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack
    });
    throw error;
  }
}

// Upload the sample post
console.log('Starting post upload process...');
uploadPost(samplePost)
  .then((docId) => {
    console.log('Sample post upload completed successfully');
    console.log('Document ID:', docId);
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error in main upload process:', error);
    process.exit(1);
  });

