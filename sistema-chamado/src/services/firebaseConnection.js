import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyByBseh6o3CwD_IX6FVaSMbWJs5Yaqm74A",
    authDomain: "sistema-chamadp.firebaseapp.com",
    projectId: "sistema-chamadp",
    storageBucket: "sistema-chamadp.appspot.com",
    messagingSenderId: "423459547869",
    appId: "1:423459547869:web:74bff77c522569bd7b4934"
};

const firebaseApp = initializeApp(firebaseConfig)
const auth = getAuth(firebaseApp)

const db = getFirestore(firebaseApp);
const storage = getStorage()


export { auth, db, storage };

