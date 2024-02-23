import React from 'react';
import { View, Text, FlatList, Dimensions, StyleSheet, Image } from 'react-native';
import styles from '../styles/styles';
const { width } = Dimensions.get('window');

const Carousel = ({ books }) => {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
        <Image source={{uri:'https://i.pinimg.com/originals/68/57/09/685709a8b2632bef579219d54469f358.png'}} style={styles.CarouselImage} />
        <Text style={styles.CarouselTitle}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.Carouselcontainer}>
      <FlatList
        data={books}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.title}
      />
    </View>
  );
};

// const styles = StyleSheet.create({
//   Carouselcontainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   item: {
//     width: width,
//     padding: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   CarouselTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   CarouselAuthor: {
//     fontSize: 16,
//     fontStyle: 'italic',
//     marginBottom: 5,
//   },
//   body: {
//     fontSize: 14,
//   },
//   CarouselImage: {
//     width: width,
//     height: 200,
//     resizeMode: 'cover',
//   },
// });

export default Carousel;
