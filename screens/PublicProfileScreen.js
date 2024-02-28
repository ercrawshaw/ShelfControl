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
import cancelFriendRequest from "../src/cancelFriendRequest";
import getAllFriends from "../src/getAllFriends";
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
  const [friendData, setFriendData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [buttonMessage, setButtonMessage] = useState("Add Friend");

  function handleAddFriend() {
    //creating friendship document for both user
    if (!isPending) {
      addFriend(currentUid, friend.id);
      isRequested(true);
      setIsPending(true);
    };
    //deleting friendship document for both user
    if (isPending) {
      cancelFriendRequest(currentUid, friend.id);
      isRequested(false);
      setIsPending(false);
    }
    
    

    if (buttonMessage === "Add Friend") {
      setButtonMessage("Pending")
    }else{
      setButtonMessage("Add Friend")
    }
    
  };

  const handleCatalogueClick = (catalogue) => {
    navigation.navigate("SingleCatalogueScreen", {
      catalogue_id: catalogue,
      friendsUid: friend.id,
    });
  };

  useEffect(() => {
    console.log(isPending);
    if (friendshipData) {
      setFriendData(friendshipData)

    }else{
      setFriendData({
        own_accepted: false,
        friend_accepted: false,
      });
      getAllFriends(currentUid)
      .then((res) => {
        res.forEach((doc) => {
          if (doc.id === friend.id) {
            setIsPending(true)
            setButtonMessage("Pending")
          }
        })
      })
    }

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

                {friendData.own_accepted && friendData.friend_accepted ? (
                  <View style={styles.PPbutton}>
                  <Text style={styles.PPbuttonText}>Friend</Text>
                  </View>
              ) : null}

              {friendData.own_accepted && friendData.friend_accepted === false ? (
                  <View style={styles.PPbutton}>
                  <Text style={styles.PPbuttonText}>Pending</Text>
                  </View>
              ) : null}
              
              {friendData.own_accepted === false && friendData.friend_accepted ? (
                <View style={styles.PPbutton}>  
                <Text style={styles.PPbuttonText}>Friend Request Pending</Text>
                </View>
              ) : null}

              {friendData.own_accepted === false && friendData.friend_accepted === false ?  
              <View>
              <Pressable 
              style={styles.PPbutton}
              onPress={handleAddFriend}
              >
              <Text style={styles.PPbuttonText}>{buttonMessage}</Text>
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
