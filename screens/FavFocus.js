import React, { useRef } from 'react';
import { SafeAreaView, Button, View, StyleSheet, ImageBackground, PermissionsAndroid, Alert, Platform } from 'react-native';
import { captureRef } from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';

import HomeQuote from '../components/homeQuote';

const FavFocus = ({ route }) => {
  const item = route.params;
  const parsed = JSON.parse(item[1]);
  const viewRef = useRef();
  
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
          <Button 
            title="SAVE"
            onPress={downloadImage} />
          <Button 
            title="SHARE"
            onPress={shareImage} />
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
  saveShare: {
    backgroundColor: 'white',
  },
  buttons: {
    marginTop: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  quote: {
    alignSelf: 'center',
  }
})

export default FavFocus;