import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBJAlHqgUjdOX4ivdHzW80-B3kD_8QFly8',
  authDomain: 'forum-app-348305.firebaseapp.com',
  projectId: 'forum-app-348305',
  storageBucket: 'forum-app-348305.appspot.com',
  messagingSenderId: '735525196734',
  appId: '1:735525196734:web:6d035c5078176e69ef9fef',
  measurementId: 'G-QXHG96G51H',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
