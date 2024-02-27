import React from "react";
import { View, Image, Text, ActivityIndicator } from "react-native";
import { useState } from 'react';
import styles from "../styles/styles";


export default function LoadingMessage() {
    return (
      <View style={[styles.loadingContainer, styles.horizontal]}>
        <View style={styles.loadingTextView}>
          <Text style={styles.loadingText}>Page Loading</Text>
        </View>
        <View style={styles.activityIndicatorView}>
          <ActivityIndicator size="large" color='#42273B' />
        </View>
      </View>
    )
  };