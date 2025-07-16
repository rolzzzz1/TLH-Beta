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

interface BlogPost {
  title: string;
  excerpt: string;
  content: string;
  author: string;
  categories: string[];
  imageUrl: string;
  createdAt: string;
}

async function uploadPosts() {
  try {
    // Read the posts from JSON file
    const postsData = JSON.parse(
      readFileSync(join(__dirname, '..', 'data', 'posts.json'), 'utf-8')
    );

    // Create a batch write
    const batch = db.batch();

    // Add each post to the batch
    for (const post of postsData.posts) {
      const docRef = db.collection('posts').doc(); // Auto-generate ID
      
      // Convert the ISO date string to Firestore Timestamp
      const createdAt = Timestamp.fromDate(new Date(post.createdAt));
      
      // Prepare the post data with Timestamp
      const postData = {
        ...post,
        createdAt
      };

      batch.set(docRef, postData);
      console.log(`Added post "${post.title}" to batch`);
    }

    // Commit the batch
    await batch.commit();
    console.log('Successfully uploaded all posts!');
  } catch (error) {
    console.error('Error uploading posts:', error);
  } finally {
    // Exit the process
    process.exit();
  }
}

// Run the upload
uploadPosts(); 