import React, { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, ImageBackground, FlatList } from 'react-native';
import HomeQuote from './components/homeQuote';
import { randomQuote, randomPicture } from './ApiClientService';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';


export default function App() {
  const [quote, setQuote] = useState({});
  const [picture, setPicture] = useState([]);

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
      .then(res => setPicture([res.url]))
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
          source={{uri: picture[0]}}>
            <GestureRecognizer 
              onSwipeLeft={() => getRandomQuote()}>
              <HomeQuote quote={quote.quote} author={quote.author} />
            </GestureRecognizer>
        </ImageBackground>
      </View>
      </GestureRecognizer>
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