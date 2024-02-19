import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const addUser = (uid, username, firstname, lastname) => {
  return setDoc(doc(db, "users", uid), {
    username: username,
    firstname: firstname,
    lastname: lastname,
    avatar_img: "",
  }).catch((error) => alert(error));
};
