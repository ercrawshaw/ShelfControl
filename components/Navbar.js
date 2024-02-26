import React,{ useState, useEffect } from 'react';
import {StyleSheet, Button, View, Pressable, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/styles';


export default NavigationBar= () =>{
    const navigation = useNavigation()
    return(
        <View style={styles.navbar}>
            <Pressable style={styles.navPressableButton} onPress={()=>{navigation.navigate('HomeScreen')}}>
                <Text style={styles.navButtonText}>Home</Text>
            </Pressable>
            <Pressable style={styles.navPressableButton} onPress={()=>{navigation.navigate('FriendsList')}}>
                <Text style={styles.navButtonText}>Friends</Text>
            </Pressable>
            <Pressable style={styles.navPressableButton} onPress={()=>{navigation.navigate('UserProfilePage')}}>
                <Text style={styles.navButtonText}>My Account</Text>
            </Pressable>
        </View>
    )
}
