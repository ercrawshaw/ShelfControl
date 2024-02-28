import { db } from "../firebaseConfig";
import { doc, updateDoc, getDoc, deleteDoc } from "firebase/firestore";

const cancelFriendRequest = (uid1, uid2) => {
  console.log(uid1, "<<<here uid1");
  console.log(uid2, "<<<here uid2");
  const docRef1 = doc(db, "users", uid1, "friendships", uid2);
  const docRef2 = doc(db, "users", uid2, "friendships", uid1);
  //return deleteDoc(docRef1);

  Promise.all([
    deleteDoc(docRef1), deleteDoc(docRef2)
  ])
  .then(() => {
    alert("Friend request cancelled")
  })
  .catch((err) => {
    alert("Friend request could not be cancelled at this time, please try again later")
  })
};

export default cancelFriendRequest;