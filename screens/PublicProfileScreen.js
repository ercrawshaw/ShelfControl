import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import addFriend from "../src/addFriend";
import { getAllCatalogues } from "../src/getAllCatalogues";
import { CurrentUserContext } from "../contexts/userContext";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles/styles";
import NavigationBar from "../components/Navbar";
import LoadingMessage from "../components/LoadingMessage";

const PublicProfileScreen = ({ route }) => {
  const navigation = useNavigation();
  const { currentUid } = useContext(CurrentUserContext);
  const { friend, friendshipData } = route.params;
  const [requested, isRequested] = useState(false);
  const [currentCatalogues, setCurrentCatalogues] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);

  function handleAddFriend() {
    //creating friendship document for both user
    addFriend(currentUid, friend.id);
    isRequested(true);
  };

  const handleCatalogueClick = (catalogue) => {
    navigation.navigate("SingleCatalogueScreen", {
      catalogue_id: catalogue,
      friendsUid: friend.id,
    });
  };

  useEffect(() => {
    console.log(friendshipData, "<<<< friendship data");
    getAllCatalogues(friend.id).then((res) => {
      let catalogues = [];
      res.forEach((doc) => {
        catalogues.push(doc.id);
      });
      setPageLoading(false);
      setCurrentCatalogues(catalogues);
    });
  }, []);

  //if add button click change to non editable and display "friend request sent"
  

  if (pageLoading) {
    return <LoadingMessage />;
  } else {
    return (
      <View>
        <NavigationBar />
        <View style={styles.profileContainer}>
        <View style={styles.profileHeader}>
            <Image
            style={styles.profileAvatar}
            source={{ uri: friend.data().avatar_img }}
            />
            <View style={styles.profileHeaderTextContainer}>
              <View>
                <Text style={styles.profileUsername}>{friend.data().username}</Text>

                {friendshipData.own_accepted && friendshipData.friend_accepted ? (
                  <View style={styles.FRButtonContainer}>
                  <Text style={[styles.buttonText, styles.button ]}>Friend</Text>
                  </View>
              ) : null}

              {friendshipData.own_accepted && friendshipData.friend_accepted === false ? (
                <View style={styles.FRButtonContainer}>
                    <Text style={[styles.buttonText, styles.button ]}>Pending</Text>
                </View>
              ) : null}
              
              {friendshipData.own_accepted === false && friendshipData.friend_accepted ? (
                <View style={styles.FRButtonContainer}>  
                  <Text style={styles.buttonText}>Friend Request Pending</Text>
                </View>
              ) : null}

              {friendshipData.hasOwnProperty('own_accepted') === false && friendshipData.hasOwnProperty('friend_accepted') === false ?   
              <View>
              <Pressable style={styles.button} onPress={handleAddFriend}>
                  <Text style={styles.buttonText}>Add Friend</Text>
              </Pressable>
              </View> : null
              }

                {/* {requested ? (
                <View>
                  <Text style={styles.pendingText}>Friend request pending</Text>
                </View>
                ) : (
                <Pressable style={styles.button} onPress={handleAddFriend}>
                  <Text style={styles.buttonText}>Add Friend</Text>
                </Pressable>
                )} */}
              </View>
            </View>
      </View>

          <Text style={styles.PPSHeader}>Catalogues</Text>

          <View>
            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={{ alignItems: "center" }}
            >
              {currentCatalogues.map((catalogue, i) => (
                <Pressable
                  style={[
                    styles.filledPressButton,
                    styles.filledPressButtonOutline,
                  ]}
                  key={i}
                  onPress={() => {
                    handleCatalogueClick(catalogue);
                  }}
                >
                  <Text style={styles.filledPressButtonText}>{catalogue}</Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
};

export default PublicProfileScreen;
