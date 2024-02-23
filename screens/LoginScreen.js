import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Touchable,
  Alert,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";

import { auth, db } from "../firebaseConfig";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
} from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { CurrentUserContext } from "../contexts/userContext";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const { currentUid, setCurrentUid } = useContext(CurrentUserContext);

  //using replace here means that on the screen there is no back button to the login screen from home screen
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       // navigation.replace("HomeScreen");
  //       console.log("here in login screen");
  //       navigation.navigate("UserProfilePage");
  //     }
  //   });
  //   return unsubscribe;
  // }, []);

  // const handleSignUp = () => {
  //   createUserWithEmailAndPassword(auth, email, password)
  //     .then((userCredentials) => {
  //       const user = userCredentials.user;
  //       console.log("Signed in with:", user.email);
  //       return db.collection("users").doc(userCredentials.user.uid).setDoc({
  //         email: userCredentials.email
  //       })
  //     })
  //     .catch((error) => alert(error.message));
  // };

  const handleSignUpClick = () => {
    navigation.navigate("SignUpScreen");
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        const uid = userCredentials.user.uid;
        setCurrentUid(userCredentials.user.uid);
        if (auth.currentUser.emailVerified) {
          navigation.navigate("HomeScreen");
        } else {
          Alert.alert(
            "Only verified users can access the application",
            "Please verify your email and login",
            [
              {
                text: "Send verification again",
                onPress: () => {
                  sendEmailVerification(user).then(() => {
                    alert(
                      "Verification was sent to your email, please verify and login"
                    );
                  });
                },
              },
              {
                text: "Done",
              },
            ]
          );
        }
      })
      .catch((error) => alert(error.message));
    // setEmail("");
    setPassword("");
  };

  const handleForgotPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("password reset email sent, please check your email");
      })
      .catch((error) => {
        alert(
          "please insert your email and click again on Forgot password button"
        );
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer} name="form">
        <Text
          style={{
            fontSize: 40,
            fontWeight: "700",
            textAlign: "center",
            padding: 50,
          }}>
          Login
        </Text>
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
      </View>

      <View style={styles.buttonContainer}>
        <Pressable onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>

        <Text
          onPress={handleForgotPassword}
          style={[styles.input, { color: "red" }]}>
          Forgot Your Password?
        </Text>
        <Pressable
          onPress={handleSignUpClick}
          style={[styles.button, styles.buttonOutline]}>
          <Text style={styles.buttonOutlineText}>Sign up</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

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
