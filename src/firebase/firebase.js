import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA68taIOb4t8YtKUzbC29acZ1TH2mUQMUc",
  authDomain: "events-near-me-34dd6.firebaseapp.com",
  databaseURL: "https://events-near-me-34dd6.firebaseio.com",
  projectId: "events-near-me-34dd6",
  storageBucket: "events-near-me-34dd6.appspot.com",
  messagingSenderId: "388241443272",
  appId: "1:388241443272:web:a3e39db583545a85f698fd",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
export { storage, firebase as default };
