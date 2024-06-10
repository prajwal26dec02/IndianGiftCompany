import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBFTSeNZA-wHnC1YXxCfA30vKf8LWCOlsw",
  authDomain: "demoproject-9a503.firebaseapp.com",
  projectId: "demoproject-9a503",
  storageBucket: "demoproject-9a503.appspot.com",
  messagingSenderId: "843018210006",
  appId: "1:843018210006:web:c4493d6fc779cebbbd1777"
};

const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const fireDb=getFirestore(app);

export{fireDb,auth};