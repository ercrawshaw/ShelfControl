import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

const usernameExistsCheckFunc = (username) => {
  const colRef = collection(db, "users");
  const q = query(colRef, where("username", "==", username));
  getDocs(q).then((snapShot) => {
    if (!snapShot.empty) {
      alert("username is already taken");
      // return false;
      setErrors;
    }
  });
};

export { usernameExistsCheckFunc };
