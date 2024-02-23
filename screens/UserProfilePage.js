import {
  Text,
  View,
  Image,
  Platform,
  KeyboardAvoidingView,
  Pressable,
  TextInput,
} from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/userContext";
import { getUser } from "../src/getUser";
import { useFocusEffect } from "@react-navigation/native";
import updateUser from "../src/updateUser";
import deleteSingleUser from "../src/deleteUser";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { useNavigation } from "@react-navigation/native";
import LoadingMessage from "../components/LoadingMessage";
import NavigationBar from "../components/Navbar";

import {
  getAuth,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
//import ImageLibrary from "../components/Image-picker";
//import * as ImagePicker from 'expo-image-picker';

import styles from "../styles/styles";

import { auth } from "../firebaseConfig";
import { Switch } from "react-native-paper";
import updateProfileStatus from "../src/updateProfileStatus";


const UserProfilePage = () => {
  //const { currentUid, setCurrentUid } = useContext(CurrentUserContext);
  //Hardcoded user, remove later
  const currentUid = "N1xC3SF9KgNLNAde6sWvODrRaUO2";

  const [user, setUser] = useState();
  const [editable, isEditable] = useState(false);
  const navigation = useNavigation();
  const loggedInUser = getAuth().currentUser;
  const filename = "";
  const [image, setImage] = useState(null);
  const [status, requestPermission] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(()=>{
    (async()=>{
      //const libraryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync()
      requestPermission(libraryStatus.granted)
    })()
  },[])

  const [userAuth, setUserAuth] = useState(null);
  const [profileStatus, setProfileStatus] = useState("Private profile");
  const [isSwitchOn, setIsSwitchOn] = React.useState(true);

  


  const profilePicRef = ref(
    getStorage(),
    `images/${currentUid}/profilePicture/${filename}`
  );

  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
    profileStatus === "Private profile"
      ? (setProfileStatus("Public profile"),
        updateProfileStatus(currentUid, false))
      : (setProfileStatus("Private profile"),
        updateProfileStatus(currentUid, true));
  };

  //   useLayoutEffect(() => {
  //     getUser(currentUid, setUser);
  //   }, [currentUid]);

  useFocusEffect(
    React.useCallback(() => {
      getUser(currentUid, setUser);
    }, [currentUid])
  );

  // To have the track of the users and to see if their email has been verified
  // useEffect(() => {
  //   onAuthStateChanged(auth, (userCred) => {
  //     if (userCred) {
  //       console.log(userCred.email, "user is logged in");
  //       // console.log(
  //       //   userCred.email,
  //       //   userCred.emailVerified,
  //       //   "Has email been confirmed"
  //       // );
  //       const { email, emailVerified } = userCred;
  //       setUserAuth({ email, emailVerified });
  //     } else {
  //       console.log(userAuth.email, "user is logged out");
  //     }
  //   });
  // }, []);

  const handlePicPick = () => {
    //ImageLibrary()
    // uploadBytes(profilePicRef, file);
  };

  const handleEditClick = () => {
    editable ? isEditable(false) : isEditable(true);
  };

  const handleEditSubmission = () => {
    editable ? isEditable(false) : isEditable(true);
    console.log(currentUid);
    updateUser(currentUid, user).then(() => {
      alert("your profile has been updated");
    });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleDelete = () => {
    deleteSingleUser(currentUid, user).then(() => {
      navigation.navigate("Login");
    });
  };
  // const pickImage = async () => {
  //   if(status){
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //   mediaTypes: ImagePicker.MediaTypeOptions.All,
  //   allowsEditing: true,
  //   aspect: [4, 3],
  //   quality: 1,
//     });

// if (!result.canceled) {
//     setImage(result.assets[0].uri);
//   }
// }else{
//   console.warn("no access permissions for photo library")
// }
// };

  const handlePasswordChange = () => {
    sendPasswordResetEmail(auth, user.email).then(() => {
      alert(
        "password reset email sent, please check your email and login with the new password"
      );
    });
  };

  
  //if statement to wait until currentUid has updated before calling getUser again
  //and rendering the page
  if (user) {
    return (
      <View>
      <NavigationBar />
      <KeyboardAvoidingView style={styles.UPcontainer} behavior="padding">
        <View style={styles.profileContainer}>
          {/*<Image
            style={styles.profileImage}
            source={{ uri: user.avatar_img }}
          />
          <Text style={styles.profileText}>Firstname - {user.firstname}</Text>
          <Text style={styles.profileText}>Username - {user.username}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <Pressable style={[styles.button, styles.buttonOutline]}>
            <Text style={styles.buttonOutlineText}>Edit profile</Text>
          </Pressable>*/}

          <Pressable
            style={[styles.button, styles.buttonOutline]}
            //onPress={pickImage}
          >
            <Text style={styles.buttonOutlineText}>Pick a profile pic</Text>
          </Pressable>

          {image?<Image source={{ uri: image }} style={styles.image}/>:null}

          <View>
            <Text>{profileStatus}</Text>
            <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
          </View>

          <TextInput
            style={
              editable
                ? [styles.profileText, styles.editable]
                : styles.profileText
            }
            //style={styles.input}
            editable={editable}
            placeholder="First Name"
            value={user.firstname}
            onChangeText={(text) =>
              setUser((currentUser) => {
                return { ...currentUser, firstname: text };
              })
            }
          />
          <TextInput
            placeholder="Last Name"
            editable={editable}
            value={user.lastname}
            onChangeText={(text) =>
              setUser((currentUser) => {
                return { ...currentUser, lastname: text };
              })
            }
            style={
              editable
                ? [styles.profileText, styles.editable]
                : styles.profileText
            }
          />
          <TextInput
            placeholder="Username"
            value={user.username}
            // onChangeText={(text) => setUsername(text)}
            style={styles.profileText}
            readOnly
          />
          <TextInput
            placeholder="Email"
            style={styles.profileText}
            editable={editable}
            value={user.email}
            onChangeText={(text) =>
              setUser((currentUser) => {
                return { ...currentUser, email: text };
              })
            }
            readOnly
          />
          {/* {userAuth && (
            <Text
              style={[styles.profileText, { backgroundColor: "aquamarine" }]}
            >
              {userAuth?.emailVerified
                ? "Email is verified"
                : "Email is not verified"}
            </Text>
          )} */}
        </View>
        <View style={styles.buttonContainer}>
          {editable ? (
            <Pressable
              style={[styles.UPbutton, styles.buttonOutline]}
              onPress={handleEditSubmission}
            >
              <Text style={styles.buttonOutlineText}>Done!</Text>
            </Pressable>
          ) : (
            <Pressable
              style={[styles.UPbutton, styles.buttonOutline]}
              onPress={handleEditClick}
            >
              <Text style={styles.buttonOutlineText}>Edit profile</Text>
            </Pressable>
          )}
          <Pressable
            style={[styles.button, styles.buttonOutline]}
            onPress={handlePasswordChange}>
            <Text style={styles.buttonOutlineText}>Change Password</Text>
          </Pressable>
        </View>
        <View>
          <Pressable
            onPress={handleSignOut}
            style={[styles.UPbutton, styles.buttonOutline]}
          >
            <Text style={styles.buttonOutlineText}>Sign out</Text>
          </Pressable>
        </View>

        <View>
          <Pressable
            style={[styles.UPbutton, styles.buttonOutline]}
            onPress={handleDelete}
          >
            <Text style={styles.buttonOutlineText}>Delete profile</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
      </View>
    );
  }
};

export default UserProfilePage;


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#42273B",
//   },
//   profileContainer: {
//     width: "80%",
//   },
//   profileText: {
//     backgroundColor: "white",
//     color: "#42273B",
//     marginTop: 20,
//     fontWeight: "700",
//     fontSize: 16,
//     padding: 10,
//     borderColor: "white",
//     borderWidth: 2,
//     borderRadius: 5,
//   },
//   profileImage: {
//     width: 150,
//     height: 150,
//     borderRadius: 10,
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
//   editable: {
//     backgroundColor: "aquamarine",
//     fontWeight: "700",
//     fontSize: 16,
//   },
// });

