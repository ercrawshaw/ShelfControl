import React, { useState, useEffect } from "react";
import { StyleSheet, Button, View, Pressable, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles/styles";
import { Icon } from "react-native-paper";

export default BackNav = () => {
  const navigation = useNavigation();
  return (
    <View style={[styles.navbarBackButton]}>
      <Pressable
        icon="arrow-left-bold"
        style={styles.navPressableButton}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Text style={styles.navButtonText}> &lt; Back</Text>
      </Pressable>
    </View>
  );
};
