import { isSupported } from 'firebase/analytics';
import { FirebaseOptions, initializeApp } from 'firebase/app';
import { getPerformance } from 'firebase/performance';
import { isDev } from './isDev';

const firebaseConfig: FirebaseOptions = {
  apiKey: 'AIzaSyCh4kyWy3-higbBhQBndDjhGLChN9iwWvI',
  authDomain: 'bare-lige-ometer-6568b.firebaseapp.com',
  databaseURL: 'https://bare-lige-ometer-6568b.firebaseio.com',
  projectId: 'bare-lige-ometer-6568b',
  storageBucket: 'bare-lige-ometer-6568b.appspot.com',
  messagingSenderId: '630676087916',
  appId: '1:630676087916:web:6155aef8e58e215c036449',
  measurementId: 'G-PNV2NF5MND',
};

export const firebase = initializeApp(firebaseConfig);

export const monitorPerformance = async () => {
  if (!isDev && (await isSupported())) {
    getPerformance(firebase);
  }
};
