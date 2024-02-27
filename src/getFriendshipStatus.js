import { db } from "../firebaseConfig";
import { getAuth, updateEmail, verifyBeforeUpdateEmail } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const getFriendshipStatus = (uid1, uid2) => {
  const docRef = doc(db, "users", uid1, "friendships", uid2);
  return getDoc(docRef);
};

export default getFriendshipStatus;
