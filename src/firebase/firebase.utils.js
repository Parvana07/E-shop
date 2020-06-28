// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyBLqD6MfNBVj0EHI6KhtbaXogcBDWKdJd4",
  authDomain: "e-shop-db-59460.firebaseapp.com",
  databaseURL: "https://e-shop-db-59460.firebaseio.com",
  projectId: "e-shop-db-59460",
  storageBucket: "e-shop-db-59460.appspot.com",
  messagingSenderId: "197196638417",
  appId: "1:197196638417:web:7807cbfd7dc07f43af3df0",
  measurementId: "G-NWKQG71CLY",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (err) {
      console.log("error creating user", err.message);
    }
  }
  return userRef;
};

export const addCollectionAndDocuments = async (collectionKey, objectToAdd) => {
  const collectionRef = firestore.collection(collectionKey);
  // console.log("I am collection", collectionRef);

  //in order to save shop data in firebase we need to use batch function, because we can make one query at time and if server breaks we dont want to be able save half
  //of the data we have. We want to save all or none.
  const batch = firestore.batch();
  objectToAdd.forEach((obj) => {
    //we want to get the document at an empty string(give me a new document reference in the collection and randomly generate an ID for me)
    //if we do const newDocRef = collectionRef.doc(obj.title); it will create docs with ID same as title(mens, womens,hats etc..)
    const newDocRef = collectionRef.doc();
    // console.log(newDocRef);
    batch.set(newDocRef, obj);
  });
  //fire off batch request, but it returns a promise when commit succeds it will come back and resolve a void value meaning a null value and that's useful for us
  //because if call this function somewhere we can chain off this function and then call dot then and do something
  return await batch.commit();
};

export const convertCollectionSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });
  // console.log(transformedCollection);
  return transformedCollection.reduce((acc, collection) => {
    acc[collection.title.toLowerCase()] = collection;
    return acc;
  }, {});
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

var provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
//auth.signInWithPopup(provider);
export const signInWithGoogle = () =>
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });

export default firebase;
