import { db } from "../firebaseConfig";
import { getAuth, updateEmail, verifyBeforeUpdateEmail } from "firebase/auth";
import {
  doc,
  getDoc,
  getDocs,
  query,
  collection,
  updateDoc,
} from "firebase/firestore";

const getAllFriends = (uid1) => {
  const queryRef = query(collection(db, "users", uid1, "friendships"));
  return getDocs(queryRef);
};

export default getAllFriends;
