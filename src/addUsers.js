import { doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { DatePickerIOS } from "react-native";

export const addUser = (uid, username, firstname, lastname) => {
  return setDoc(doc(db, "users", uid), {
    username: username,
    firstname: firstname,
    lastname: lastname,
    avatar_img: "",
    created: Date.now(),
    private: true,
  }).catch((error) => alert(error));
};
