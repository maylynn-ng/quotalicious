import React, { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, ImageBackground } from 'react-native';
import { randomQuote, randomPicture } from './ApiClientService';
import GestureRecognizer from 'react-native-swipe-gestures';
import HomeQuote from './components/homeQuote';
import AsyncStorage from '@react-native-community/async-storage';


export default function App() {
  const [quote, setQuote] = useState({});
  const [picture, setPicture] = useState();
  const [key, setKey] = useState(0);

  const objToSave = {
    quote: quote.quote,
    author: quote.author,
    picture: picture,
  }

  const storeData = async () => {
    try {
      const jsonObj = JSON.stringify(objToSave);
      await AsyncStorage.setItem(key, jsonObj);
      setKey(key + 1);
    } catch (error) {
      console.error('oh no something happened:', error);
    }
  }

  const getRandomQuote = () => {
    randomQuote()
      .then(res => {
        setQuote({
          quote: res.quote.quoteText,
          author: res.quote.quoteAuthor})
      });
  }

  const getRandomPicture = () => {
    randomPicture()
      .then(res => setPicture(res.url))
  }

  useEffect(() => {
    getRandomQuote();
    getRandomPicture();
  }, [])


  return (
    <SafeAreaView>
      <GestureRecognizer
        onSwipeRight={() => getRandomPicture()}>
      <View> 
        <ImageBackground 
          style={styles.picture}
          source={{uri: picture}}>
            <GestureRecognizer 
              onSwipeLeft={() => getRandomQuote()}>
              <HomeQuote quote={quote.quote} author={quote.author} />
            </GestureRecognizer>
        </ImageBackground>
      </View>
      </GestureRecognizer>
      <Button
        title="Me Gusta"
        onPress={() => {}} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  picture: {
    height: '100%',
    width: '100%',
    alignContent: 'center',
    justifyContent: 'center',
  },
});