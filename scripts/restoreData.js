import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize Firebase Admin
const serviceAccount = JSON.parse(
  readFileSync(join(__dirname, '../serviceAccountKey.json'), 'utf8')
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function deleteCollection(collectionPath) {
  const collectionRef = db.collection(collectionPath);
  const query = collectionRef.orderBy('__name__').limit(500);

  return new Promise((resolve, reject) => {
    deleteQueryBatch(db, query, resolve).catch(reject);
  });
}

async function deleteQueryBatch(db, query, resolve) {
  const snapshot = await query.get();

  const batchSize = snapshot.size;
  if (batchSize === 0) {
    // When there are no documents left, we are done
    resolve();
    return;
  }

  // Delete documents in a batch
  const batch = db.batch();
  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });
  await batch.commit();

  // Recurse on the next process tick, to avoid exploding the stack.
  process.nextTick(() => {
    deleteQueryBatch(db, query, resolve);
  });
}

function convertTimestamps(obj) {
  if (!obj || typeof obj !== 'object') return obj;

  // Handle arrays
  if (Array.isArray(obj)) {
    return obj.map(item => convertTimestamps(item));
  }
  
  // Convert Firestore timestamp
  if (obj._seconds !== undefined && obj._nanoseconds !== undefined) {
    return new admin.firestore.Timestamp(obj._seconds, obj._nanoseconds);
  }

  // Convert ISO date strings to Firestore timestamps
  if (obj.createdAt && typeof obj.createdAt === 'string') {
    const date = new Date(obj.createdAt);
    if (!isNaN(date.getTime())) {
      obj.createdAt = admin.firestore.Timestamp.fromDate(date);
    }
  }

  // Handle nested objects
  const converted = {};
  for (const [key, value] of Object.entries(obj)) {
    converted[key] = convertTimestamps(value);
  }
  return converted;
}

async function restoreData() {
  try {
    // Read the export file
    const exportData = JSON.parse(readFileSync(join(__dirname, '../firestore-export.json'), 'utf8'));

    console.log('Deleting existing collections...');
    // Delete existing collections
    await Promise.all([
      deleteCollection('posts'),
      deleteCollection('categories')
    ]);
    console.log('Existing collections deleted successfully');

    console.log('Restoring data from export file...');
    
    // Log a sample post before conversion
    if (exportData.posts) {
      const samplePostId = Object.keys(exportData.posts)[0];
      console.log('Sample post before conversion:', JSON.stringify(exportData.posts[samplePostId], null, 2));
    }

    // Restore posts with timestamp conversion
    const postsPromises = Object.entries(exportData.posts || {}).map(([id, data]) => {
      const convertedData = convertTimestamps(data);
      // Log converted data
      console.log(`Converting post ${id}:`, JSON.stringify(convertedData, null, 2));
      return db.collection('posts').doc(id).set(convertedData);
    });

    // Restore categories with timestamp conversion
    const categoriesPromises = Object.entries(exportData.categories || {}).map(([id, data]) => {
      const convertedData = convertTimestamps(data);
      return db.collection('categories').doc(id).set(convertedData);
    });

    await Promise.all([...postsPromises, ...categoriesPromises]);
    console.log('Data restored successfully!');

  } catch (error) {
    console.error('Error restoring data:', error);
  } finally {
    // Exit the process
    process.exit();
  }
}

restoreData();
