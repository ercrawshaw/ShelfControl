import { db } from "../firebaseConfig";
import { getAuth, updateEmail, verifyBeforeUpdateEmail } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

const acceptFriendship = (uid1, uid2) => {
  const docRef = doc(db, "users", uid1, "friendships", uid2);
  return updateDoc(docRef, {
    accepted: true,
  });
};

export default acceptFriendship;
