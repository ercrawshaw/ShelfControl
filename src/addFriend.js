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
      created: Date.now(),
    }),
    setDoc(docRef1, {
      uid1: uid1,
      uid2: uid2,
      accepted: true,
      created: Date.now(),
    }),
  ])
  .then(() => {
    alert("Friend request sent")
  })
  .catch((err) => {
    alert("Friend request could not be sent at this time, please try again later")
  })
};

export default addFriend;
