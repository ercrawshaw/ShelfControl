import React, { useState, useEffect, useContext } from 'react';
import { View, TextInput, Pressable, FlatList, Text, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { useRoute } from '@react-navigation/native';
import { CurrentUserContext } from '../contexts/userContext';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const route = useRoute();
  const { chatRoomId } = route.params; 
  const { currentUid } = useContext(CurrentUserContext); 

  useEffect(() => {
    const messagesQuery = query(collection(db, 'chatRooms', chatRoomId, 'messages'), orderBy('createdAt', 'asc'));
    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const fetchedMessages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(fetchedMessages);
    });
    return () => unsubscribe(); 
  }, [chatRoomId]);

  const handleSend = async () => {
    if (inputText.trim()) {
      await addDoc(collection(db, 'chatRooms', chatRoomId, 'messages'), {
        text: inputText,
        createdAt: serverTimestamp(),
        senderId: currentUid,
      });
      setInputText('');
    }
  };

  return (
    
    <View style={styles.container}> 
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={[
            styles.message,
            item.senderId === currentUid ? styles.currentUserMessage : styles.otherUserMessage
          ]}>
            <Text style={[
              item.senderId === currentUid ? styles.currentUserMessageText : styles.otherUserMessageText
            ]}>
              {item.text}
            </Text>
          </View>
        )}
      />
      {/* <View style={styles.keyboardAvoidingContainer}>  */}
      <KeyboardAvoidingView behavior='padding' style={styles.keyboardInnerContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message..."
        />
        <Pressable style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </Pressable>
      </View>
      </KeyboardAvoidingView>
      {/* </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  keyboardAvoidingContainer: {
    position: 'absolute',
    bottom: 5,
    left: 0,
    right: 0,
  },
  keyboardInnerContainer: {
    flex: 1,
    position: 'absolute',
    bottom: 5,
    left: 0,
    right: 0,
  },
  message: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  currentUserMessage: {
    backgroundColor: '#42273B',
    alignSelf: 'flex-end',
  },
  otherUserMessage: {
    backgroundColor: '#f8f8f8',
    alignSelf: 'flex-start',
  },
  currentUserMessageText: {
    color: 'white',
  },
  otherUserMessageText: {
    color: 'black', 
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#f0f0f0',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#42273B',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    backgroundColor: 'white', 
  },
  sendButton: {
    backgroundColor: '#42273B',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ChatScreen;