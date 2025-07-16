import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

// Load service account key
const serviceAccount = JSON.parse(
  readFileSync(join(process.cwd(), 'serviceAccountKey.json'), 'utf8')
);

// Initialize Firebase Admin with service account
initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

async function exportCollection(collectionName) {
  const snapshot = await db.collection(collectionName).get();
  const data = [];
  
  snapshot.forEach(doc => {
    // Convert Firestore Timestamp to ISO string
    const docData = doc.data();
    if (docData.createdAt && docData.createdAt._seconds) {
      docData.createdAt = new Date(docData.createdAt._seconds * 1000).toISOString();
    }
    
    data.push({
      id: doc.id,
      ...docData
    });
  });
  
  return data;
}

async function exportAllData() {
  try {
    // Export posts
    const posts = await exportCollection('posts');
    console.log(`Exported ${posts.length} posts`);
    
    // Export categories if they exist
    const categories = await exportCollection('categories');
    console.log(`Exported ${categories.length} categories`);
    
    const data = {
      posts,
      categories
    };
    
    // Write to file with pretty formatting
    writeFileSync('firestore-export.json', JSON.stringify(data, null, 2));
    console.log('Data exported successfully to firestore-export.json');
    
    // Also output to console
    console.log('\nFirestore Data:');
    console.log(JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error exporting data:', error);
  } finally {
    process.exit();
  }
}

exportAllData(); 