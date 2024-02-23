import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { getAllPublicUsers } from "../src/getAllUsers";
import { CurrentUserContext } from "../contexts/userContext";
import { useNavigation } from "@react-navigation/native";

const PublicUsersScreen = () => {
  //currentPublicUsers also shows person currently logged in, want to remove them
  const [currentPublicUsers, setCurrentPublicUsers] = useState([]);
  const {currentUid} = useContext(CurrentUserContext);
  const navigation = useNavigation();

  useEffect(() => {
    getAllPublicUsers().then((res) => {
      let publicUsers = [];
      res.forEach((doc) => {
        //hardcoded currentUid - change to currentUid when authentification fixed
        if (doc.id !== 'N1xC3SF9KgNLNAde6sWvODrRaUO2') {
          publicUsers.push(doc);
        }
      });
      setCurrentPublicUsers(publicUsers);
    });
  }, []);

  function handleViewProfile(user) {
    navigation.navigate("PublicProfile", { user: user });
  }

  return (
    <View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ alignItems: "center" }}
      >
        {currentPublicUsers.map((user, index) => {
          return (
            <View key={index}>
              <Image
                style={styles.avatar}
                source={{ uri: user.data().avatar_img }}
              />
              <Text>{user.data().username}</Text>
              <Pressable
                style={styles.button}
                onPress={() => handleViewProfile(user)}
              >
                <Text style={styles.buttonText}>View profile</Text>
              </Pressable>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default PublicUsersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  avatar: {
    height: 50,
    width: 50,
  },
  button: {
    backgroundColor: "#42273B",
    width: "90%",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#42273B",
    borderWidth: 2,
  },
  buttonCatalogueText: {
    color: "#42273B",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  scrollView: {
    width: "95%",
  },
  bottomContainer: {
    marginBottom: 5,
  },
});
