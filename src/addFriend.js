import { db } from "../firebaseConfig";
import { getAuth, updateEmail, verifyBeforeUpdateEmail } from "firebase/auth";
import { doc, updateDoc, setDoc } from "firebase/firestore";

const addFriend = (uid1, uid2) => {
  const docRef1 = doc(db, "users", uid1, "friendships", uid2);
  //   return setDoc(docRef1, {
  //     uid1: uid1,
  //     uid2: uid2,
  //     accepted: true,
  //     created_at: Date.now(),
  //   });

  const docRef2 = doc(db, "users", uid2, "friendships", uid1);
  //   return setDoc(docRef2, {
  //     uid1: uid2,
  //     uid2: uid1,
  //     accepted: false,
  //     created_at: Date.now(),
  //   });

  Promise.all([
    setDoc(docRef2, {
      uid1: uid2,
      uid2: uid1,
      accepted: false,
      created_at: Date.now(),
    }),
    setDoc(docRef1, {
      uid1: uid1,
      uid2: uid2,
      accepted: true,
      created_at: Date.now(),
    }),
  ]).then(() => {
    console.log("Success");
  });
};

export default addFriend;
