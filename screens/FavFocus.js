import React, { useRef, useState } from 'react';
import { SafeAreaView, View, StyleSheet, ImageBackground, PermissionsAndroid, Alert, Platform } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons'; 

// SHARING
import { captureRef } from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';

// ANIMATIONS
import LottieView from 'lottie-react-native';
import aeroplane from '../animations/paperaeroplane.json';
import sent from '../animations/sent.json';
import confetti from '../animations/confetti.json';

import HomeQuote from '../components/homeQuote';

const FavFocus = ({ item }) => {
  const [displayAeroplane, setDisplayAeroplane] = useState(false);
  const [displaySent, setDisplaySent] = useState(false);
  const [displayConfetti, setDisplayConfetti] = useState(false);
  const parsed = JSON.parse(item[1]);
  const viewRef = useRef();
  const aeroplaneAnimation = useRef();
  const sentAnimation = useRef();
  const confettiAnimation = useRef();

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
        setDisplayConfetti(true);
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
    await Sharing.shareAsync(uri)
  }

  return (
    <SafeAreaView>
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
        {displayAeroplane &&  <LottieView
          style={styles.aeroplane}
          ref={aeroplaneAnimation}
          autoPlay={true}
          loop={true}
          source={aeroplane} />}
        {displayConfetti &&  <LottieView
          style={styles.tick}
          ref={confettiAnimation}
          autoPlay={true}
          onAnimationFinish={() => setDisplayConfetti(false)}
          loop={false}
          source={confetti} />}
        {displaySent &&  <LottieView
          style={styles.sent}
          ref={sentAnimation}
          autoPlay={true}
          loop={false}
          source={sent} />}
        <View style={styles.buttons}>
          <TouchableOpacity 
            onPress={() => downloadImage()} >
              <Entypo 
                name="save" 
                size={48} 
                color="white" />
            </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              setDisplayAeroplane(true);
              await shareImage();
              setDisplayAeroplane(false);
              setDisplaySent(true);}}>
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
  aeroplane: {
    height: 400,
    width: 400,
    position: 'absolute',
    top: -10,
  },
  sent: {
    height: 400,
    width: 400,
    position: 'absolute',
    top: -10,
    left: -5,
  },
  tick: {
    position: 'absolute',
    left: -10,
    width: 400,
    height: 400,
  }
})

export default FavFocus;