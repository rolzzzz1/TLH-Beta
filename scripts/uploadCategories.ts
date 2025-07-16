import { initializeApp } from 'firebase/app';
import { getFirestore, collection, writeBatch, doc } from 'firebase/firestore';
import { firebaseConfig } from '../src/config/firebase';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

const categories = [
  {
    id: 'depression',
    name: {
      en: 'Depression',
      hi: 'अवसाद'
    },
    description: {
      en: 'Understanding and coping with depression',
      hi: 'अवसाद को समझना और उससे निपटना'
    }
  },
  {
    id: 'anxiety',
    name: {
      en: 'Anxiety',
      hi: 'चिंता'
    },
    description: {
      en: 'Managing anxiety and panic disorders',
      hi: 'चिंता और घबराहट विकारों का प्रबंधन'
    }
  },
  {
    id: 'family-support',
    name: {
      en: 'Family Support',
      hi: 'पारिवारिक सहायता'
    },
    description: {
      en: 'Resources for families and caregivers',
      hi: 'परिवारों और देखभाल करने वालों के लिए संसाधन'
    }
  },
  {
    id: 'communication',
    name: {
      en: 'Communication',
      hi: 'संचार'
    },
    description: {
      en: 'Improving family communication during difficult times',
      hi: 'कठिन समय के दौरान पारिवारिक संचार में सुधार'
    }
  },
  {
    id: 'self-care',
    name: {
      en: 'Self Care',
      hi: 'स्व-देखभाल'
    },
    description: {
      en: 'Taking care of yourself while supporting others',
      hi: 'दूसरों की मदद करते हुए अपनी देखभाल करना'
    }
  },
  {
    id: 'trauma',
    name: {
      en: 'Trauma & PTSD',
      hi: 'आघात और पीटीएसडी'
    },
    description: {
      en: 'Dealing with trauma and its effects on mental health',
      hi: 'आघात और मानसिक स्वास्थ्य पर इसके प्रभावों से निपटना'
    }
  },
  {
    id: 'bipolar',
    name: {
      en: 'Bipolar Disorder',
      hi: 'बाइपोलर डिसऑर्डर'
    },
    description: {
      en: 'Understanding and managing bipolar disorder',
      hi: 'बाइपोलर डिसऑर्डर को समझना और प्रबंधित करना'
    }
  },
  {
    id: 'youth-mental-health',
    name: {
      en: 'Youth Mental Health',
      hi: 'युवा मानसिक स्वास्थ्य'
    },
    description: {
      en: 'Supporting children and teenagers with mental health challenges',
      hi: 'मानसिक स्वास्थ्य चुनौतियों वाले बच्चों और किशोरों की सहायता'
    }
  },
  {
    id: 'relationships',
    name: {
      en: 'Relationships',
      hi: 'रिश्ते'
    },
    description: {
      en: 'Maintaining healthy relationships during mental health challenges',
      hi: 'मानसिक स्वास्थ्य चुनौतियों के दौरान स्वस्थ रिश्तों को बनाए रखना'
    }
  },
  {
    id: 'recovery',
    name: {
      en: 'Recovery Journey',
      hi: 'स्वास्थ्य लाभ की यात्रा'
    },
    description: {
      en: 'Stories and support for the recovery process',
      hi: 'स्वास्थ्य लाभ की प्रक्रिया के लिए कहानियां और सहायता'
    }
  },
  {
    id: 'crisis-support',
    name: {
      en: 'Crisis Support',
      hi: 'संकट सहायता'
    },
    description: {
      en: 'Resources and guidance for crisis situations',
      hi: 'संकट की स्थितियों के लिए संसाधन और मार्गदर्शन'
    }
  },
  {
    id: 'mindfulness',
    name: {
      en: 'Mindfulness',
      hi: 'माइंडफुलनेस'
    },
    description: {
      en: 'Practicing mindfulness and emotional awareness',
      hi: 'माइंडफुलनेस और भावनात्मक जागरूकता का अभ्यास'
    }
  }
];

async function uploadCategories() {
  try {
    // Create a batch write
    const batch = writeBatch(db);

    // Add each category to the batch
    for (const category of categories) {
      const docRef = doc(collection(db, 'categories'), category.id);
      batch.set(docRef, category);
    }

    // Commit the batch
    await batch.commit();
    console.log('Successfully uploaded all categories!');
  } catch (error) {
    console.error('Error uploading categories:', error);
  } finally {
    // Exit the process
    process.exit();
  }
}

uploadCategories(); 