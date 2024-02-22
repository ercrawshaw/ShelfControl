import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
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

  const usernameExistsCheckFunc = (username) => {
    const colRef = collection(db, "users");
    const q = query(colRef, where("username", "==", username));
    return getDocs(q)
    .then((snapShot) => {
      if(!snapShot.empty) {
        setErrors(true)
        alert("username is already taken")
        // return errors;
      } else {
        setErrors(false)
      }
    });
  };



  const handleSignUp = () => {
    //can add a validate password here - user need to enter password twice
    //can add email and username check - don't already exist

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

    usernameExistsCheckFunc(username);
    console.log(errors);
    if (validatePasswordFunc(password, confirmPassword) && !errors===true) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          const user = userCredentials.user;

          console.log("Signed in with:", user.email);
          setCurrentUid(userCredentials.user.uid);
          addUser(userCredentials.user.uid, username, firstname, lastname);
          navigation.navigate("UserProfilePage");
          // email verification on sign up
          sendEmailVerification(user).then(() => {
            alert("email verification was sent");
          });
        })
        .catch((error) => alert(error.message));
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
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
          style={[styles.button, styles.buttonOutline]}>
          <Text style={styles.buttonOutlineText}>Sign up</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#42273B",
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#42273B",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#42273B",
    fontWeight: "700",
    fontSize: 16,
  },
});
