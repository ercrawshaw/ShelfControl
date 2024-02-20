import { StatusBar } from 'expo-status-bar';
import { Keyboard, StyleSheet, Text, TextInput, View, Button, Image, ScrollView } from 'react-native';
import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Card } from '@rneui/base';
import { useForm } from 'react-hook-form';




export default function ManualSearch() {
  const [isLoading, setIsLoading] = useState(false);
  const [bookTitle, setBookTitle] = useState('');
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');
  const [alert, setAlert] = useState('');
  const [text, setText] = useState('');
  const [manualAdd, setManualAdd] = useState(false);

  const [manualBookTitle, setManualBookTitle] = useState('');
  const [manualAuthorName, setManualAuthorName] = useState('');
  const [manualPublishDate, setManualPublishDate] = useState('');
  const [manuallyAddedBook, setMannuallyAddedBook] = useState({});

  function searchBook() {
    Keyboard.dismiss();
    setIsLoading(true);
    setManualAdd(false)

    if (bookTitle.length === 0) {
      setAlert('You must write a book title!')
      setIsLoading(false)
      setBookTitle('')
    }else{
      axios({
        method: 'get',
        url: `https://www.googleapis.com/books/v1/volumes?q=intitle:${bookTitle}`
      })
      .then((response) => {
        if (response.data.items) {
          setBooks(response.data.items)
          setIsLoading(false)
          setBookTitle('')
        }else{
          setError("No results found")
          setBooks([])
        }
      })
    }
    };

    function handleAddClick () {
      setManualAdd(true)
    };

    function handleManualBookAdd () {
      console.log(manualAuthorName, manualBookTitle, manualPublishDate)
      setMannuallyAddedBook({
        title: manualBookTitle,
        author: ma
      })
    };
      



  if (books.length === 0 && !manualAdd) {
    return (
      <View style={styles.container}>
        <Button 
        title="Manual Add"
        onPress={handleAddClick}
         />
        <TextInput 
          placeholder="Search title..."
          value={bookTitle}
          style={{
            backgroundColor: 'lightblue'
          }}
          onChangeText={(bookTitle) => setBookTitle(bookTitle)}
        />
        <Button 
        title="Search"
        onPress={searchBook}
        color='lightgreen'
        accessibilityLabel='Search for a book title'
        />
        <Text>{alert}</Text>
        <Text>{error}</Text>
        <StatusBar style="auto" />
      </View>
    );
  }else if (books.length !== 0 && !manualAdd){
    return (
      <View style={styles.container}>
        <Button 
        title="Manual Add"

        />
        <TextInput 
          placeholder="Search title..."
          value={bookTitle}
          style={{
            backgroundColor: 'lightblue'
          }}
          onChangeText={(bookTitle) => setBookTitle(bookTitle)}
        />
         <Button 
        title="Search"
        onPress={searchBook}
        color='lightgreen'
        accessibilityLabel='Search for a book title'
        />
        <StatusBar style="auto" />
        <ScrollView>
        <View style={styles.container}>
        {books.map((book, i) => {
          //const image = book.volumeInfo.imageLinks.thumbnail;
          return (
            
            <Card key={i} style={styles.container}>
            <View>
              <Text>title: {book.volumeInfo.title}</Text>
              <Text>author: {book.volumeInfo.authors}</Text>
              <Button title="Add Book">Add Book!</Button>
            </View>
            </Card>
            
          )
        })}
        </View>
        </ScrollView>
      </View>
    );
  }else if (manualAdd) {
    return (
      <View style={styles.container}>
        <Button 
        title="Manual Add"

        />
        <TextInput 
          placeholder="Search title..."
          value={bookTitle}
          style={{
            backgroundColor: 'lightblue'
          }}
          onChangeText={(bookTitle) => setBookTitle(bookTitle)}
        />
         <Button 
        title="Search"
        onPress={searchBook}
        color='lightgreen'
        accessibilityLabel='Search for a book title'
        />


      <View style={styles.container}>
      <Text>Manual Add</Text>
      <TextInput
        style={styles.input}
        autoCompleteType="username"
        placeholder="Book title"
        value={manualBookTitle}
        onChangeText={(manualBookTitle) => setManualBookTitle(manualBookTitle)}
      />
      <TextInput
        style={styles.input}
        autoCompleteType="email"
        keyboardType="email-address"
        textContentType="emailAddress"
        placeholder="Author name"
        value={manualAuthorName}
        onChangeText={(manualAuthorName) => setManualAuthorName(manualAuthorName)}
      />
      <TextInput
        style={styles.input}
        autoCompleteType="password"
        placeholder="Publication Year"
        value={manualPublishDate}
        onChangeText={(manualPublishDate) => setManualPublishDate(manualPublishDate)}
      />
      <Button 
      title="Add Book"
      onPress={handleManualBookAdd}
       />
      

    </View>
      </View>
    )
  }


  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20, // Increased margin between boxes
    width: '40%', // Shortened width
  },
});
