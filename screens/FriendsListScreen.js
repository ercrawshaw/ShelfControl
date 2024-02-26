import React, { useContext, useState, useEffect } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { CurrentUserContext } from '../contexts/userContext';
import { db } from '../firebaseConfig';
import { collection, query, where, getDocs, doc, getDoc, addDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';


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
               return { id: uid, username: userSnap.data().username };
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
 }


 return (
   <SafeAreaView style={styles.container}>
     <ScrollView
       style={styles.scrollView}
       contentContainerStyle={{ alignItems: "center" }}>
       {friends.map((friend, index) => (
         <View key={index} style={styles.friendContainer}>
           <Pressable
             style={[styles.button, styles.buttonOutline]}
             onPress={() => handleChatPress(friend.id)}
           >
             <Text style={styles.buttonCatalogueText}>{friend.username}</Text>
           </Pressable>
           <Pressable
             style={styles.chatButton}
             onPress={() => handleChatPress(friend.id)}
           >
             <Text style={styles.chatButtonText}>Chat</Text>
           </Pressable>
         </View>
       ))}
     </ScrollView>
   </SafeAreaView>
 );
};


const styles = StyleSheet.create({
 container: {
   flex: 1,
   justifyContent: "center",
   alignItems: "center",
   width: "100%",
 },
 button: {
   backgroundColor: "#42273B",
   width: "90%",
   paddingHorizontal: 15,
   paddingVertical: 15,
   borderRadius: 10,
   alignItems: "center",
   marginTop: 20,
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
   width: "100%",
 },
 chatButton: {
   backgroundColor: '#42273B',
   padding: 10,
   borderRadius: 10,
 },
 chatButtonText: {
   color: 'white',
   fontSize: 16,
 },
 friendContainer: {
   flexDirection: 'row',
   alignItems: 'center',
   justifyContent: 'space-between',
   width: '90%',
   marginVertical: 5,
   padding: 10,
   backgroundColor: '#f0f0f0',
   borderRadius: 10,
 }
});


export default FriendsListScreen;
