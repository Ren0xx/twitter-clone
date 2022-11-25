import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyAccXGIGkfINMr_zc44WhY5JscmT-LCifw",
    authDomain: "fake-twitter0.firebaseapp.com",
    projectId: "fake-twitter0",
    storageBucket: "fake-twitter0.appspot.com",
    messagingSenderId: "1006970130402",
    appId: "1:1006970130402:web:008e4cadef03771715b3bb",
    measurementId: "G-5DGFSVFCC4",
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
