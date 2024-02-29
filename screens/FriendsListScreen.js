import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import { CurrentUserContext } from "../contexts/userContext";
import { db } from "../firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  addDoc,
} from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import NavigationBar from "../components/Navbar";
import styles from "../styles/styles";
import { getFriend } from "../src/getFriend";
import getFriendshipStatus from "../src/getFriendshipStatus";
import getAllFriends from "../src/getAllFriends";
import acceptFriendship from "../src/acceptFriendship";
import LoadingMessage from "../components/LoadingMessage";
import declineFriendship from "../src/declineFriendship";

const FriendsListScreen = () => {
  const { currentUid } = useContext(CurrentUserContext);
  const navigation = useNavigation();
  const [friends, setFriends] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    //grab the friends list -> need to return an id and a username for chat function to work
    const fetchFriends = async () => {
      try {
        const allFriendsUid = await getAllFriends(currentUid);
        //const friendsUids = allFriendsUid.docs.map((doc) => doc.data().uid2);
        const friendsData = allFriendsUid.docs.map((doc) => doc.data());

        const friendsList = await Promise.all(
          friendsData.map(async (friendData) => {
            const results = await Promise.all([
              //check on friend requests sent
              getFriendshipStatus(friendData.uid2, currentUid),
              //get the friend profile information
              getFriend(friendData.uid2),
            ]);
            return {
              id: results[1].id,
              username: results[1].data().username,
              avatar_img: results[1].data().avatar_img,
              friend_accepted: results[0].data().accepted,
              own_accepted: friendData.accepted,
            };
          })
        );
        setFriends(friendsList);
        setPageLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFriends();
  }, [currentUid]);

  const handleChatPress = async (friendId) => {
    try {
      const chatRoomId = await getOrCreateChatRoom(currentUid, friendId);
      if (chatRoomId) {
        navigation.navigate("ChatScreen", { chatRoomId });
      } else {
        console.error("Failed to get or create chat room.");
      }
    } catch (error) {
      console.error("Error handling chat press:", error);
    }
  };

  async function getOrCreateChatRoom(currentUserId, friendId) {
    const members = [currentUserId, friendId].sort();
    const chatRoomsRef = collection(db, "chatRooms");
    const q = query(chatRoomsRef, where("members", "==", members));

    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].id;
    } else {
      const newChatRoomData = {
        members: members,
        created_at: Date(),
      };
      const docRef = await addDoc(chatRoomsRef, newChatRoomData);
      return docRef.id;
    }
  }

  function handleViewProfile(friend) {
    getFriend(friend.id)
      .then((res) => {
        navigation.navigate("PublicProfile", {
          friend: res,
          friendshipData: friend,
        });
      })
      .catch((err) => {
        console.error("friend not found");
      });
  }

  function handleAcceptFriend(currentUid, friend) {
    const fetchFriend = async () => {
      try {
        const singleFriend = await acceptFriendship(currentUid, friend.id);
      } catch (err) {
        console.error(err);
      }
    };
    fetchFriend();
  }

  function handleDeleteFriend(currentUid, friend) {
    declineFriendship(currentUid, friend.id);
  }

  if (pageLoading) {
    return <LoadingMessage />
  }else{

  return (
    <SafeAreaView style={[styles.FLcontainer, styles.containerAndroid]}>
      <NavigationBar />
      <View style={styles.FLmainScreen}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={{ alignItems: "center" }}
        >
          {friends.map((friend, index) => (
            <View key={index} style={styles.friendContainer}>
              <View style={styles.innerFriendContainer}>
              <Pressable
                onPress={() => handleViewProfile(friend)}
              >
                <Image
                style={styles.FRImage}
                source={{ uri: friend.avatar_img }}
              /> 
              
              </Pressable>
              
              <Text style={[styles.buttonFriendText, { marginLeft: 10 }]}>
                  {friend.username}
              </Text>
              </View>

              

              {friend.own_accepted && friend.friend_accepted ? (
                <Pressable
                style={styles.chatButton}
                onPress={() => handleChatPress(friend.id)}
              >
                <Image 
                  style={styles.chatImage}
                  //source={{ uri:'../assets.chaticon.png' }}
                  source={require('../assets/chat-icon.png')}
                />
              </Pressable>
              ) : null}

              {friend.own_accepted && friend.friend_accepted === false ? (
                <View style={styles.FRButtonContainer}>
                  <Pressable
                    style={styles.FRButton}
                    onPress={() => handleAcceptFriend(currentUid, friend)}
                  >
                    <Text style={styles.FRButtonText}>Pending</Text>
                  </Pressable>

                  <Text style={[styles.buttonFriendText, { marginLeft: 10 }]}>
                    {friend.username}
                  </Text>
                </View>

                {friend.own_accepted && friend.friend_accepted ? (
                  <Pressable
                    style={styles.chatButton}
                    onPress={() => handleChatPress(friend.id)}
                  >
                    <Image
                      style={styles.chatImage}
                      //source={{ uri:'../assets.chaticon.png' }}
                      source={require("../assets/chat-icon.png")}
                      //source={require('/Users/ellecrawshaw/northcoders/ShelfControl/assets/chat-icon.png')}
                    />
                  </Pressable>
                ) : null}

                {friend.own_accepted && friend.friend_accepted === false ? (
                  <View style={styles.FRButtonContainer}>
                    <Pressable
                      style={styles.FRButton}
                      onPress={() => handleAcceptFriend(currentUid, friend)}
                    >
                      <Text style={styles.FRButtonText}>Pending</Text>
                    </Pressable>
                  </View>
                ) : null}
                {friend.own_accepted === false && friend.friend_accepted ? (
                  <View style={styles.FRButtonContainer}>
                    <Pressable
                      style={styles.FRButton}
                      onPress={() => handleAcceptFriend(currentUid, friend)}
                    >
                      <Text style={styles.FRButtonText}>Accept</Text>
                    </Pressable>
                    <View style={{ width: 5 }} />
                    <Pressable style={styles.FRdeclineButton}>
                      <Text
                        style={styles.FRdeclineButtonText}
                        onPress={() => handleDeleteFriend(currentUid, friend)}
                      >
                        Decline
                      </Text>
                    </Pressable>
                  </View>
                ) : null}
              </View>
            ))}
          </ScrollView>

          <View style={styles.FLfooter}>
            <Pressable
              style={[styles.bottomButton, styles.bottomButtonOutline]}
              onPress={() => {
                navigation.navigate("PublicUsersScreen");
              }}
            >
              <Text style={styles.bottomButtonText}>Find Friends</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    );
  }
};

export default FriendsListScreen;
