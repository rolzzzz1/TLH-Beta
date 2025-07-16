import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';

// Initialize Firebase Admin
const serviceAccount = require('../serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function deleteCollection(collectionPath: string) {
  const collectionRef = db.collection(collectionPath);
  const query = collectionRef.orderBy('__name__').limit(500);

  return new Promise<void>((resolve, reject) => {
    deleteQueryBatch(db, query, resolve).catch(reject);
  });
}

async function deleteQueryBatch(db: admin.firestore.Firestore, query: admin.firestore.Query, resolve: () => void) {
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

interface FirestoreData {
  posts?: Record<string, admin.firestore.DocumentData>;
  categories?: Record<string, admin.firestore.DocumentData>;
}

async function restoreData() {
  try {
    // Read the export file
    const exportData = JSON.parse(fs.readFileSync(path.join(__dirname, '../firestore-export.json'), 'utf8')) as FirestoreData;

    console.log('Deleting existing collections...');
    // Delete existing collections
    await Promise.all([
      deleteCollection('posts'),
      deleteCollection('categories')
    ]);
    console.log('Existing collections deleted successfully');

    console.log('Restoring data from export file...');
    // Restore posts
    const postsPromises = Object.entries(exportData.posts || {}).map(([id, data]) => {
      return db.collection('posts').doc(id).set(data as admin.firestore.DocumentData);
    });

    // Restore categories
    const categoriesPromises = Object.entries(exportData.categories || {}).map(([id, data]) => {
      return db.collection('categories').doc(id).set(data as admin.firestore.DocumentData);
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