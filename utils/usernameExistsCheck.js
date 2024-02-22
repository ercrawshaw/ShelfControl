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
  return getDocs(q).then((snapShot) => {
    if (!snapShot.empty) {
      alert("username is already taken");
      return Promise.reject({ message: "username is already taken" });
    }
  });
};

export { usernameExistsCheckFunc };
