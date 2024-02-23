import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { db } from "../firebaseConfig";
import { getAuth, updateEmail, verifyBeforeUpdateEmail } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

const updateProfileStatus = (uid, status) => {
  const docRef = doc(db, "users", uid);
  return updateDoc(docRef, {
    private: status,
  });
};

export default updateProfileStatus;
