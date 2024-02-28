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
import NavigationBar from "../components/Navbar";
import styles from "../styles/styles";
import LoadingMessage from "../components/LoadingMessage";

import moment from "moment";

import getAllFriends from "../src/getAllFriends";



const PublicUsersScreen = () => {
  //currentPublicUsers also shows person currently logged in, want to remove them
  const [currentPublicUsers, setCurrentPublicUsers] = useState([]);
  const { currentUid } = useContext(CurrentUserContext);
  const navigation = useNavigation();
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {

    Promise.all([getAllFriends(currentUid), getAllPublicUsers()])
    .then((res) => {
      let friendList = [];
      let publicUsers = [];

      res[0].forEach((doc) => {
        friendList.push(doc.id)
      })
      res[1].forEach((doc) => {
        if (doc.id !== currentUid && !friendList.includes(doc.id)) [
          publicUsers.push(doc)
        ]
      })

      setCurrentPublicUsers(publicUsers);
      setPageLoading(false);
    })

  }, []);

  function handleViewProfile(friend) {
    navigation.navigate("PublicProfile", { friend: friend });
  }

  if (pageLoading) {
    return <LoadingMessage />;
  } else {
    return (
      <View>
        <NavigationBar />
        <View>
          <Text style={styles.PUHeader}>
            Find other book lovers, become friends, and chat!
          </Text>
        </View>
        {/* <View style={styles.usersProfileContainer}> */}
        <ScrollView style={styles.PUScrollView}>
          {currentPublicUsers.map((friend, index) => {
            return (
              <View key={index} style={styles.userProfileItem}>
                <View style={styles.usersInfoContainer}>
                  <Image
                    style={styles.profileAvatar}
                    source={{ uri: friend.data().avatar_img }}
                  />
                  <View style={styles.profileHeaderTextContainer}>
                    <Text style={styles.userUsername}>
                      {friend.data().username}
                    </Text>
                    <Text>
                      Shelfer since{" "}
                      {moment(Date(friend.data().created)).format("YYYY")}
                    </Text>
                    <Pressable
                      style={styles.buttonViewProfile}
                      onPress={() => handleViewProfile(friend)}
                    >
                      <Text style={styles.buttonText}>View Profile</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
        {/* </View> */}
      </View>
    );
  }
};

export default PublicUsersScreen;
