import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import Dashboard from './screens/Dashboard';
import FavoriteList from './screens/favoriteList';
import FavFocus from './screens/FavFocus';
import { randomQuote, randomPicture } from './ApiClientService';

const Stack = createStackNavigator();

const App = () => {
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
      console.error('Houston, we have a problem:', error);
    }
  }

  const storeData = async () => {
    try {
      const obj = isNext
        ? nextObjToSave
        : objToSave;
      const jsonObj = JSON.stringify(obj)
      await AsyncStorage.setItem(key, jsonObj)
      setKey((key) => (+key + 1).toString())
      setFavorites(getSavedFavorites())
      alert('saved it for you boo')
    } catch (error) {
      console.error('oh no something happened:', error);
    }
  }

  const removeFavorite = async (unlike) => {
    try {
      await AsyncStorage.removeItem(unlike)
      getSavedFavorites();
      alert("IT'S GONE MUTHAFUCKAAAAAAAAAAA");
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
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Dashboard">
              {(props) => <Dashboard
              getRandomPicture={getRandomPicture}
              getRandomQuote={getRandomQuote}
              nextQuote={nextQuote}
              quote={quote}
              picture={picture}
              nextPicture={nextPicture}
              isNext={isNext}
              storeData={storeData}
              {...props}
              />}
          </Stack.Screen>
          <Stack.Screen
            name="FavoriteList"> 
              {(props) => <FavoriteList
              favorites={favorites}
              removeFavorite={removeFavorite}
              {...props} />}
          </Stack.Screen>
          <Stack.Screen 
            name="FavFocus"
            component={FavFocus} />
        </Stack.Navigator>
      </NavigationContainer>
  )
}

export default App;