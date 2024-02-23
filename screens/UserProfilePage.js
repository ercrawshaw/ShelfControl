import {
  StyleSheet,
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
import { getAuth, signOut } from "firebase/auth";
import ImageLibrary from "../components/Image-picker";
import * as ImagePicker from 'expo-image-picker';
import styles from "../styles/styles";

const UserProfilePage = () => {
  const { currentUid, setCurrentUid } = useContext(CurrentUserContext);
  const [user, setUser] = useState();
  const [editable, isEditable] = useState(false);
  const navigation = useNavigation();
  const loggedInUser = getAuth().currentUser;
  const filename = "";
  const [image, setImage] = useState(null);
  const [status, requestPermission] = useState(null)
  useEffect(()=>{
    (async()=>{
      const libraryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync()
      requestPermission(libraryStatus.granted)
    })()
  },[])

  const profilePicRef = ref(
    getStorage(),
    `images/${currentUid}/profilePicture/${filename}`
  );

  //   useLayoutEffect(() => {
  //     getUser(currentUid, setUser);
  //   }, [currentUid]);

  useFocusEffect(
    React.useCallback(() => {
      getUser(currentUid, setUser);
    }, [currentUid])
  );

  const handlePicPick = () => {
    ImageLibrary()
    // uploadBytes(profilePicRef, file);
  };

  const handleEditClick = () => {
    editable ? isEditable(false) : isEditable(true);
  };

  const handleEditSubmission = () => {
    editable ? isEditable(false) : isEditable(true);
    updateUser(currentUid, user).then(() => {});
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
  const pickImage = async () => {
    if(status){
    let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
    });

if (!result.canceled) {
    setImage(result.assets[0].uri);
  }
}else{
  console.warn("no access permissions for photo library")
}
};

  //if statement to wait until currentUid has updated before calling getUser again
  //and rendering the page
  if (user) {
    return (
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
            onPress={pickImage}
          >
            <Text style={styles.buttonOutlineText}>Pick a profile pic</Text>
          </Pressable>
          {image?<Image source={{ uri: image }} style={styles.image}/>:null}

          <TextInput
            style={styles.profileText}
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
          {/* <TextInput
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
        />*/}
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
          />
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
    );
  }
};

export default UserProfilePage;

// const styles = StyleSheet.create({
//   UPcontainer: {
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

//   buttonContainer: {
//     width: "60%",
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 40,
//   },
//   UPbutton: {
//     backgroundColor: "#42273B",
//     width: "100%",
//     paddingHorizontal: 15,
//     paddingVertical: 15,
//     borderRadius: 10,
//     alignItems: "center",
//   },


//   buttonOutlineText: {
//     color: "#42273B",
//     fontWeight: "700",
//     fontSize: 16,
//   },
//   image:{ 
//     width: 300,
//     height: 300,
//     alignSelf:'center',
//     marginTop:10
//     },
// });
