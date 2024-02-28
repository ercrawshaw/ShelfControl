import {
  Text,
  View,
  Image,
  Platform,
  KeyboardAvoidingView,
  Pressable,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/userContext";
import { getUser } from "../src/getUser";
import { useFocusEffect } from "@react-navigation/native";
import updateUser from "../src/updateUser";
import deleteSingleUser from "../src/deleteUser";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigation } from "@react-navigation/native";
import LoadingMessage from "../components/LoadingMessage";
import NavigationBar from "../components/Navbar";
import { storage } from "../firebaseConfig";
import { doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { updateDoc } from "firebase/firestore";

import {
  getAuth,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
import * as ImagePicker from 'expo-image-picker';

import styles from "../styles/styles";

import { auth } from "../firebaseConfig";
import { Switch } from "react-native-paper";
import updateProfileStatus from "../src/updateProfileStatus";

const UserProfilePage = () => {
  const { currentUid, setCurrentUid } = useContext(CurrentUserContext);

  const [user, setUser] = useState();
  const [editable, isEditable] = useState(false);
  const navigation = useNavigation();
  const loggedInUser = getAuth().currentUser;
  const filename = "";
  const [image, setImage] = useState(null);
  const [status, requestPermission] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [imageUri, setImageUri] = useState(null);

  // useEffect(() => {
  //   (async () => {
  //     const libraryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync()
  //     requestPermission(libraryStatus.granted);
  //   })();
  // }, []);

  const [userAuth, setUserAuth] = useState(null);
  const [profileStatus, setProfileStatus] = useState("Private profile");
  const [isSwitchOn, setIsSwitchOn] = React.useState(true);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);
  
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.cancelled) {
      const uri = result.assets[0].uri;
      setImageUri(uri); // Optimistically update the UI to show the new image
      try {
        await uploadImage(uri);
        // The image has been uploaded successfully, the UI is already showing the new image
      } catch (error) {
        // Handle the error: revert the UI change if necessary, show an error message, etc.
        console.error("Failed to upload the image:", error);
        alert("Failed to upload image.");
        setImageUri(null); // Optionally revert the UI change
      }
    }
  };
  
  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const fileRef = ref(storage, `images/${currentUid}/profilePicture.jpg`);
    await uploadBytes(fileRef, blob);
  
    const url = await getDownloadURL(fileRef);
  
    const userRef = doc(db, 'users', currentUid);
    await updateDoc(userRef, {
      avatar_img: url,
    });
  
    alert("Profile picture uploaded successfully!");
  };

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
      setPageLoading(false);
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
    Alert.alert("Warning", "Are you sure you want to delete your account", [
      {
        text: "Yes, I am sure",
        onPress: () => {
          deleteSingleUser(currentUid, user).then(() => {
            navigation.navigate("Login");
          });
        },
      },
      {
        text: "No, keep my account ",
      },
    ]);
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
  if (pageLoading) {
    return <LoadingMessage />;
  } else if (user) {
    return (
      <View>
        <NavigationBar />

        <ScrollView style={styles.scrollView}>
          <View style={styles.signoutButtonContainer}>
            <Pressable onPress={handleSignOut} style={styles.signoutButton}>
              <Text style={styles.buttonOutlineText}>Sign out</Text>
            </Pressable>
          </View>

          <View style={styles.UPContainer}>
            <View style={styles.profileInformationContainer}>
              <View>
              <Image
              source={{ uri: imageUri || user.avatar_img }}
              style={styles.profileAvatar}
            />
                {editable ? (
                  <Pressable
                    style={styles.editingPicButton}
                    onPress={pickImage}
                  >
                    <Text style={styles.editingText}>
                      Pick a profile picture
                    </Text>
                  </Pressable>
                ) : null}
              </View>

              <View>
                <View
                  style={
                    editable
                      ? [styles.fullNameContainerEditable]
                      : styles.fullNameContainer
                  }
                >
                  <TextInput
                    style={
                      editable
                        ? [styles.UPText, styles.editableFN]
                        : [styles.UPText, styles.FNInput]
                    }
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
                        ? [styles.UPText, styles.editableLN]
                        : [styles.UPText, styles.LNInput]
                    }
                  />
                </View>
                <View style={styles.UPContactInfo}>
                  <TextInput
                    style={styles.contactText}
                    placeholder="Username"
                    value={user.username}
                    // onChangeText={(text) => setUsername(text)}
                    readOnly
                  />
                  <TextInput
                    style={styles.contactText}
                    placeholder="Email"
                    editable={editable}
                    value={user.email}
                    onChangeText={(text) =>
                      setUser((currentUser) => {
                        return { ...currentUser, email: text };
                      })
                    }
                    readOnly
                  />
                </View>
              </View>
            </View>

            <View style={styles.rowContainer}>
              <Text style={styles.UPtoggleText}>{profileStatus}</Text>
              <View style={{ width: 7 }} />
              <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
            </View>

            <View style={styles.UPButtonContainer}>
              <View>
                {editable ? (
                  <Pressable
                    style={[
                      styles.UPfilledPressButtonOutline,
                      styles.editingButton,
                    ]}
                    onPress={handleEditSubmission}
                  >
                    <Text style={styles.editingButtonText}>Done!</Text>
                  </Pressable>
                ) : (
                  <Pressable
                    style={[
                      styles.UPfilledPressButtonOutline,
                      styles.passwordButton,
                    ]}
                    onPress={handleEditClick}
                  >
                    <Text style={styles.buttonOutlineText}>Edit profile</Text>
                  </Pressable>
                )}
              </View>

              <View>
                <Pressable
                  style={[
                    styles.UPfilledPressButtonOutline,
                    styles.passwordButton,
                  ]}
                  onPress={handlePasswordChange}
                >
                  <Text style={styles.buttonOutlineText}>Change Password</Text>
                </Pressable>
              </View>

              <View>
                <Pressable
                  style={[
                    styles.UPfilledPressButtonOutline,
                    styles.deleteButton,
                  ]}
                  onPress={handleDelete}
                >
                  <Text style={styles.deleteText}>Delete profile</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
};

export default UserProfilePage;
