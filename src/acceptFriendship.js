import { db } from "../firebaseConfig";
import { doc, updateDoc, getDoc } from "firebase/firestore";

const acceptFriendship = (uid1, uid2) => {
  console.log(uid1, "<<<here uid1");
  console.log(uid2, "<<<here uid2");

  const docRef = doc(db, "users", uid1, "friendships", uid2);
  return updateDoc(docRef, { accepted: true });
};

export default acceptFriendship;
