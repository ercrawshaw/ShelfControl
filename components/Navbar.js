import React,{ useState, useEffect } from 'react';
import {StyleSheet, Button, View, Pressable, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/styles';


export default NavigationBar= () =>{
    const navigation = useNavigation()
    return(
        <View style={styles.navbar}>
            <Pressable style={styles.pressableButton} onPress={()=>{navigation.navigate('HomeScreen')}}>
                <Text style={styles.buttonText}>Home</Text>
            </Pressable>
            <Pressable style={styles.pressableButton} onPress={()=>{navigation.navigate('')}}>
                <Text style={styles.buttonText}>Friends</Text>
            </Pressable>
            <Pressable style={styles.pressableButton} onPress={()=>{navigation.navigate('UserProfilePage')}}>
                <Text style={styles.buttonText}>My Account</Text>
            </Pressable>
        
        </View>
    )
}
