import React, { useRef, useState } from 'react';
import { SafeAreaView, View, StyleSheet, ImageBackground, PermissionsAndroid, Alert, Platform } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { Entypo } from '@expo/vector-icons'; 

// SHARING
import { captureRef } from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';

// ANIMATIONS
import LottieView from 'lottie-react-native';
import polaroid from '../animations/polaroid.json';

import HomeQuote from '../components/homeQuote';

const FavFocus = ({ item }) => {
  const parsed = JSON.parse(item[1]);
  const viewRef = useRef();
  const polaroidAnimation = useRef();

  const playPolaroid = () => {
    polaroidAnimation.current.play();
  }

  const getUri = async () => {
    const uriStr = await captureRef(viewRef, {
      format: 'png',
      quality: 0.8,
    });
    return `file:///${uriStr}`;
  }

  const getPermissionAndroid = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Image Download Permission',
          message: 'Can I pls save pics to your phone, pls?',
          buttonNegative: 'Nah mate',
          buttonPositive: 'Yeah man!'
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      };
      Alert.alert(
        '',
        'Can I pls save pics to your phone, pls?',
        [{text: 'Yeah man!', onPress: () => {}}],
        {cancelable: false},
      );
    } catch (error) {
      console.error('oh nosies: ', error)
    }
  }

  const downloadImage = async () => {
    try {
      const uri = await getUri();
      if (Platform.OS === 'android') {
        const granted = await getPermissionAndroid();
        if (!granted) return;
      }

      const image = MediaLibrary.saveToLibraryAsync(uri);
      if (image) {
         Alert.alert(
           '',
           'Saved to your camera roll!',
           [{text: 'Yeah man!', onPress: () => {}}],
           {cancelable: false},
           );
        
      } 
    } catch (error) {
      console.error('troubles downloading image: ', error)
    }
  }

  const shareImage = async () => {
    const uri = await getUri();
    if (!(await Sharing.isAvailableAsync())) {
      alert('Ai ya, looks like we cannot share');
      return;
    }
    await Sharing.shareAsync(uri);
  }

  return (
    <SafeAreaView>
      <Modal>
        <LottieView
          ref={polaroidAnimation}
          loop={false}
          source={polaroid} />
      </Modal>
      <View style={styles.container} >
        <ImageBackground
          ref={viewRef}
          style={styles.picture}
          source={{uri: parsed.picture}} >
            <View style={styles.quote} >
              <HomeQuote
                quote={parsed.quote}
                author={parsed.author} />
              </View>
        </ImageBackground>
        <View style={styles.buttons}>
          <TouchableOpacity 
            onPress={() => {
              downloadImage()}} >
              <Entypo 
                name="save" 
                size={48} 
                color="white" />
            </TouchableOpacity>
          <TouchableOpacity
            onPress={shareImage} >
              <Entypo 
                name="share" 
                size={48} 
                color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  picture: {
    width: '100%',
    height: '90%',
    justifyContent: 'center',
    alignContent: 'center',
    marginBottom: 0,
  },
  container: {
    height: '100%',
    width: '100%',
    padding: 20,
    alignContent: 'center',
    justifyContent: 'center',
  },
  buttons: {
    marginTop: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',

  },
  quote: {
    alignSelf: 'center',
  },
  flash: {
    height: '100%',
    width: '100%',
  }
})

export default FavFocus;