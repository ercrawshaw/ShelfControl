import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { auth, db } from "../firebaseConfig";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  validatePassword,
  sendEmailVerification,
} from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { addUser } from "../src/addUsers";
import { CurrentUserContext } from "../contexts/userContext";

import styles from "../styles/styles";
import { validatePasswordFunc } from "../utils/validatePassword";
import { usernameExistsCheckFunc } from "../utils/usernameExistsCheck";

const SignUpScreen = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const { currentUid, setCurrentUid } = useContext(CurrentUserContext);
  const navigation = useNavigation();

  const handleSignUp = () => {
    //Check for the Name TextInput
    if (!firstname.trim()) {
      alert("Please Enter Name");
      return;
    }
    if (!lastname.trim()) {
      alert("Please Enter Last Name");
      return;
    }
    if (!username.trim()) {
      alert("Please Enter Username");
      return;
    }

    if (!confirmPassword.trim()) {
      alert("Please confirm your password");
      return;
    }

    usernameExistsCheckFunc(username)
      .then(() => {
        if (validatePasswordFunc(password, confirmPassword)) {
          createUserWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
              const user = userCredentials.user;
              // console.log("Signed in with:", user.email);
              setCurrentUid(userCredentials.user.uid);
              addUser(userCredentials.user.uid, username, firstname, lastname);

              // email verification on sign up
              sendEmailVerification(user).then(() => {
                Alert.alert(
                  "Verification was sent to your email",
                  "Please verify and login",
                  [
                    {
                      text: "Done",
                      onPress: () => {
                        navigation.navigate("Login");
                      },
                    },
                  ]
                );
              });
            })
            .catch((error) => alert(error.message));
        }
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView style={styles.SUcontainer} behavior="padding">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="First Name"
          value={firstname}
          onChangeText={(text) => setFirstName(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Last Name"
          value={lastname}
          onChangeText={(text) => setLastName(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <Pressable
          onPress={handleSignUp}
          style={[styles.UPbutton, styles.buttonOutline]}>
          <Text style={styles.buttonOutlineText}>Sign up</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;

// const styles = StyleSheet.create({
//   SUcontainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   inputContainer: {
//     width: "80%",
//   },
//   input: {
//     backgroundColor: "white",
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     borderRadius: 10,
//     marginTop: 5,
//   },
//   buttonContainer: {
//     width: "60%",
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 40,
//   },
//   button: {
//     backgroundColor: "#42273B",
//     width: "100%",
//     paddingHorizontal: 15,
//     paddingVertical: 15,
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   buttonOutline: {
//     backgroundColor: "white",
//     marginTop: 5,
//     borderColor: "#42273B",
//     borderWidth: 2,
//   },
//   buttonText: {
//     color: "white",
//     fontWeight: "700",
//     fontSize: 16,
//   },
//   buttonOutlineText: {
//     color: "#42273B",
//     fontWeight: "700",
//     fontSize: 16,
//   },
// });
