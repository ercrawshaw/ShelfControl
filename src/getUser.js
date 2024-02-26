import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { getAuth } from "firebase/auth";

export const getUser = (docId, setStateFn) => {
  const loggedInUser = getAuth().currentUser;
  if (loggedInUser !== null) {
    const docRef = doc(db, "users", docId);
    //console.log(docRef, "here doc ref");
    getDoc(docRef)
      .then((docSnap) => {
        // console.log(docSnap.data(), "<<here docSnap");
        return docSnap.data();
      })
      .then((user) => {
        if (user) {
          //console.log(user, "<<user");
          user.email = loggedInUser.email;
          setStateFn(user);
        }
      })
      .catch((error) => {
        console.log("user not found");
      });
  }
};
