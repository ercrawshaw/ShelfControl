import React from "react";
import { View, StyleSheet } from "react-native";
import { Searchbar } from 'react-native-paper';
import { useState, useEffect } from "react";


const SearchBarComponent = ({currentBooks, setMapArr, mapArr, searchQuery, setSearchQuery, foundBooks, setFoundBooks}) => {
    const [searched, setSearched] = useState(null);
  

    useEffect(() => {

        if (searched) {
            let matchedBooks = []
            currentBooks.map((book) => {
            if (book.data().title.includes(searchQuery)) {
                matchedBooks.push(book);
            }
        }) 
        setFoundBooks(matchedBooks)
        setSearchQuery(null)
        setSearched(null)
        }
    }, [searched])

    //console.log(currentBooks);

    return (
        <View>
        <Searchbar
            style={styles.searchbar}
            placeholder="Search for book"
            onChangeText={(searchQuery) => setSearchQuery(searchQuery)}
            value={searchQuery}
            onIconPress={(searched)=> setSearched(searchQuery)}
            onSubmitEditing={() => setSearched(true)}
        />
        </View>
    );
};

export default SearchBarComponent;

const styles = StyleSheet.create({
    searchbar: {
      width: '100%',
    },
   
  });
  
