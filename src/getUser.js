import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { getAuth } from "firebase/auth";

export const getUser = (docId, setStateFn) => {
  const loggedInUser = getAuth().currentUser;
  if (loggedInUser !== null) {
    const docRef = doc(db, "users", docId);
    getDoc(docRef)
      .then((docSnap) => {
        return docSnap.data();
      })
      .then((user) => {
        if (user) {
          user.email = loggedInUser.email;
          setStateFn(user);
        }
      })
      .catch((error) => {
        console.error("user not found");
      });
  }
};
