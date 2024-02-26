import React, { useContext, useState, useEffect } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { CurrentUserContext } from '../contexts/userContext';
import { db } from '../firebaseConfig';
import { collection, query, where, getDocs, doc, getDoc, addDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import NavigationBar from "../components/Navbar";
import styles from '../styles/styles';
import { getFriend } from '../src/getFriend';


const FriendsListScreen = () => {
 const { currentUid } = useContext(CurrentUserContext);
 const [friends, setFriends] = useState([]);
 const navigation = useNavigation();


 useEffect(() => {
   const fetchFriends = async () => {
     try {
       if (currentUid) {
         const friendsCollectionRef = collection(db, 'users', currentUid, 'friendships');
         const q = query(friendsCollectionRef, where('accepted', '==', true));
         const querySnapshot = await getDocs(q);
         const friendsUids = querySnapshot.docs.map(doc => doc.data().uid2);


         const friendsList = (await Promise.all(
           friendsUids.map(async (uid) => {
             const userRef = doc(db, 'users', uid);
             const userSnap = await getDoc(userRef);
             if (userSnap.exists()) {
               return { id: uid, username: userSnap.data().username, accepted: userSnap.data().accepted };
             }
             return null;
           })
         )).filter(friend => friend !== null && friend.username !== "Unknown User");


         setFriends(friendsList);
       }
     } catch (error) {
       console.error("Failed to fetch friends:", error);
     }
   };


   fetchFriends();
 }, [currentUid]);


 const handleChatPress = async (friendId) => {
   try {
     const chatRoomId = await getOrCreateChatRoom(currentUid, friendId);
     if (chatRoomId) {
       navigation.navigate('ChatScreen', { chatRoomId });
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
 };

 function handleViewProfile(friend) {
  getFriend(friend.id)
  .then((res) => {
    navigation.navigate("PublicProfile", { friend: res });
  })
  .catch((err) => {
    console.log("friend not found");
  })
  
 };

 return (
  
  <SafeAreaView style={styles.FLcontainer}>
  <NavigationBar /> 
    <View style={styles.FLmainScreen}>
     <ScrollView
       style={styles.scrollView}
       contentContainerStyle={{ alignItems: "center" }}>
       {friends.map((friend, index) => (
         <View key={index} style={styles.friendContainer}>
           <Pressable
             style={[styles.button, styles.buttonOutline]}
             onPress={() => handleViewProfile(friend)}
           >
             <Text style={styles.buttonCatalogueText}>{friend.username}</Text>
           </Pressable>
          {friend.accepted? <Pressable
             style={styles.chatButton}
             onPress={() => handleChatPress(friend.id)}
           >
             <Text style={styles.chatButtonText}>Chat</Text>
           </Pressable> 
            :
            <View>
              <Pressable>
                <Text>Accept</Text>
              </Pressable>
              <Pressable>
                <Text>Decline</Text>
              </Pressable>
            </View>
          }
           
         </View>
       ))}
     </ScrollView>
     

      <View style={styles.FLfooter}>
        <Pressable 
        style={[styles.bottomButton, styles.bottomButtonOutline]}
        onPress={() => {navigation.navigate('PublicUsersScreen')}}
        >
          <Text style={styles.bottomButtonText}>Find Friends</Text>
        </Pressable>
      </View>

      </View>

   </SafeAreaView>
  
 );
};



 

export default FriendsListScreen;
