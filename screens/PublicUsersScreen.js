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
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Public Users</Text>
      </View>
    <ScrollView contentContainerStyle={styles.scrollView}>
      {currentPublicUsers.map((user, index) => {
        return (
          <View key={index} style={styles.profileContainer}>
            <View style={styles.userInfoContainer}>
              <Image
                style={styles.avatar}
                source={{ uri: user.data().avatar_img }}
              />
              <View style={styles.usernameContainer}>
                <Text style={styles.username}>{user.data().username}</Text>
                <Pressable
                  style={styles.button}
                  onPress={() => handleViewProfile(user)}
                >
                  <Text style={styles.buttonText}>View Profile</Text>
                </Pressable>
              </View>
            </View>
          </View>
        );
      })}
    </ScrollView>
  </View>
  );
};

export default PublicUsersScreen;

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 20,
  },
  titleText: {
    fontSize: 40,
    textAlign: 'center',
    color: '#ffffff'
  },
  container: {
    flex: 1,
    backgroundColor: '#525171',
  },
  scrollView: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginRight: 20,
    marginLeft: 20,
  },
  usernameContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  username: {
    color: '#ffffff',
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#6F9871",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 30,
    marginRight: 20,
  },
  smallButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
  },
});
