import { initializeApp } from 'firebase/app';
import { getToken, onMessage, getMessaging } from 'firebase/messaging';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: 'AIzaSyC2DrV8cY-R5MZG1GwtBqi9C-HV8KCa71Q',
  authDomain: 'market-place-e8208.firebaseapp.com',
  projectId: 'market-place-e8208',
  storageBucket: 'market-place-e8208.appspot.com',
  messagingSenderId: '139934815468',
  appId: '1:139934815468:web:dad61481e513120780c1c9',
  measurementId: 'G-MJVP17YZEH',
};

const VAPID =
  'BEWDYnw8VUtOpgQ8_aZFctLrSusm3EnDVCEo-tq9JYUnJe7n38-qA1cT_xBs1A9w3l3QqWhfbCZyINYbAQABFr4';

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
const db = getFirestore(app);
const generateToken = async () => {
  let fcmToken = '';
  const permission = await Notification.requestPermission();
  if (permission === 'granted') {
    await getToken(messaging, {
      vapidKey: VAPID,
    })
      .then((currentToken) => {
        if (currentToken) {
          console.log(currentToken, 'currentToken');

          // Send the token to your server and update the UI if necessary
          fcmToken = currentToken;
        } else {
          // Show permission request UI
          console.log('No registration token available. Request permission to generate one.');
          // ...
        }
      })
      .catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        // ...
      });
  } else {
    console.error('Permission not granted for Notification');
  }
  return fcmToken;
};

export { messaging, getToken, onMessage, db, generateToken };
