import React, { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, ImageBackground, Button, TouchableOpacity, Text } from 'react-native';
import { randomQuote, randomPicture } from '../ApiClientService';
import GestureRecognizer from 'react-native-swipe-gestures';
import AsyncStorage from '@react-native-community/async-storage';

import HomeQuote from '../components/homeQuote';


export default function Dashboard({ navigation }) {
  const [quote, setQuote] = useState({});
  const [nextQuote, setNextQuote] = useState({}); 
  const [picture, setPicture] = useState();
  const [nextPicture, setNextPicture] = useState();
  const [key, setKey] = useState('0');
  const [favorites, setFavorites] = useState([]);

  let isNext = false;

  const objToSave = {
    quote: quote.quote,
    author: quote.author,
    picture: picture,
  }
  const nextObjToSave = {
    quote: nextQuote.quote,
    author: nextQuote.author,
    picture: nextPicture,
  }

  const getSavedFavorites = async () => {
    try {
      const gottenKeys = await AsyncStorage.getAllKeys();
      const gottenFavorites = await AsyncStorage.multiGet(gottenKeys);
      const favsToGet = gottenFavorites.map(item => item)
      setFavorites(favsToGet);
    } catch (error) {
      console.log('Houston, we have a problem:', error);
    }
  }

  const storeData = async () => {
    try {
      const obj = isNext
        ? nextObjToSave
        : objToSave;
      setFavorites([...favorites, obj])
      const jsonObj = JSON.stringify(obj)
      const keyStr = key.toString();
      await AsyncStorage.setItem(keyStr, jsonObj)
      setKey((key) => (+key + 1).toString())
      alert('saved it for you boo')
    } catch (error) {
      console.error('oh no something happened:', error);
    }
  }

  const removeFavorite = async (unlike) => {
    try {
      const storageKey = unlike.toString()
      await AsyncStorage.removeItem(storageKey)
      setFavorites((favorites) => {
        favorites.filter((fav) => fav[0] !== storageKey)
      });
      alert("IT'S GONE MUTHAFUCKAAAAAAAAAAA");
      getSavedFavorites(); 
    } catch (error) {
      console.error('no I dunnae think so', error);
    }
  }

  const getRandomQuote = () => {
    randomQuote()
      .then(res => {
        setQuote({
          quote: res.quote.quoteText,
          author: res.quote.quoteAuthor})
      });
    randomQuote()
      .then(res => {
        setNextQuote({
          quote: res.quote.quoteText,
          author: res.quote.quoteAuthor})
      });
  }

  const getRandomPicture = () => {
    randomPicture()
      .then(res => setPicture(res.url))
    randomPicture()
      .then(res => setNextPicture(res.url))
  }

  useEffect(() => {
    getRandomQuote();
    getRandomPicture();
    getSavedFavorites();
  }, [])


  return (
    <SafeAreaView>
      <GestureRecognizer
        onSwipeRight={() => getRandomPicture()}>
      <View> 
        <ImageBackground 
          style={styles.picture}
          source={{uri: (isNext
            ? nextPicture
            : picture )}}>
            <GestureRecognizer 
              onSwipeLeft={() => getRandomQuote()}>
              <HomeQuote 
              quote={isNext
                ? nextQuote.quote
                : quote.quote}
                author={isNext 
                  ? nextQuote.author
                  : quote.author} />
            </GestureRecognizer>
        <Button
          title="Me Gusta"
          onPress={storeData} />
        <Button
          title="YA GUSTIDO"
          onPress={() => navigation.navigate('FavoriteList', {favorites, removeFavorite, getSavedFavorites})} />
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
  button: {
    borderColor: 'black',
    height: 50,
    width: 50,
    backgroundColor: 'orange',
  }
});