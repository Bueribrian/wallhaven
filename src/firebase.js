import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
let firebaseConfig = {
  apiKey: "AIzaSyDGXaO9dBB-IE6uSjp1vtVc-y1VJnCtdk4",
  authDomain: "wallhaven-23c69.firebaseapp.com",
  databaseURL: "https://wallhaven-23c69.firebaseio.com",
  projectId: "wallhaven-23c69",
  storageBucket: "wallhaven-23c69.appspot.com",
  messagingSenderId: "651350090443",
  appId: "1:651350090443:web:652ed01db4b2f7c409f14e",
  measurementId: "G-273DNTXPMF",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = async () => {
  await auth.signInWithPopup(provider);
};

export const singOutWithGoogle = () => {
  auth.signOut().then(
    function () {
      console.log("Signed Out");
    },
    function (error) {
      console.error("Sign Out Error", error);
    }
  );
};
export const generateFavsDocument = async (uid) => {
    if(!uid) return;

    const favsRef = firestore.doc(`favs/${uid}`);
    const snapshot = await favsRef.get()

    if(!snapshot.exists) {
        try{
            favsRef.set({images:[]})
        } catch (error) {
            console.error("Error creating Favs document", error)
        }
    }

    return getFavDocument(uid)
}

export const getFavDocument = async(uid) => {
    if(!uid) return null;
    try {
        const favDocument = await firestore.doc(`favs/${uid}`).get()

        return {
            ...favDocument.data()
        }
    } catch (error) {
        console.error("Error fetching Favorites", error)
    }
}
// Genera un usuario
export const generateUserDocument = async (user, additionalData) => {
  // Si se pasa un user null/undefinded, no hace nadad
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  // Si el snapshot no existe crea uno
  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    console.log(photoURL, user)
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData,
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  // Si el snapshot existe trae el usuario
  return getUserDocument(user.uid);
};

// Trae usuario
const getUserDocument = async (uid) => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();

    return {
      uid,
      ...userDocument.data(),
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};
