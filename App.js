import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import Dashboard from './screens/Dashboard';
import FavoriteList from './screens/favoriteList';
import FavFocus from './screens/FavFocus';
import ButtonBar from './components/ButtonBar';
import RickRoll from './screens/RICKROLL';
import Quotalicious from './splashScreens/quotalicious';
import {
  randomQuote,
  randomPicture,
  getKanye,
  getTaylor,
  getDonald,
  pictureBW,
  pictureBlur,
} from './ApiClientService';

const Stack = createStackNavigator();

const App = () => {
  const [quote, setQuote] = useState({});
  const [picture, setPicture] = useState('');
  const [key, setKey] = useState('0');
  const [favorites, setFavorites] = useState([]);
  const [quoteType, setQuoteType] = useState('random');
  const [pictureType, setPictureType] = useState('random');
  const [displaySettings, setDisplaySettings] = useState(false);
  const [displayForm, setDisplayForm] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  //const [displayQuotalicious, setDisplayQuotalicious] = useState(true);

  const objToSave = {
    quote: quote.quote,
    author: quote.author,
    picture: picture,
  };

  // DATA STORAGE
  const getSavedFavorites = async () => {
    try {
      const gottenKeys = await AsyncStorage.getAllKeys();
      const gottenFavorites = await AsyncStorage.multiGet(gottenKeys);
      const favsToGet = gottenFavorites.map(item => item);
      setFavorites(favsToGet);
    } catch (error) {
      console.error('Houston, we have a problem:', error);
    }
  };

  const storeData = async () => {
    try {
      const jsonObj = JSON.stringify(objToSave);
      await AsyncStorage.setItem(key, jsonObj);
      setKey(key => (+key + 1).toString());
      setFavorites(getSavedFavorites());
    } catch (error) {
      console.error('oh no something happened:', error);
    }
  };

  const removeFavorite = async unlike => {
    try {
      await AsyncStorage.removeItem(unlike);
      setIsLiked(false);
      getSavedFavorites();
    } catch (error) {
      console.error('no I dunnae think so', error);
    }
  };

  // REQUESTS
  const getRandomQuote = () => {
    randomQuote().then(res => {
      setQuote({
        quote: res.quote.quoteText,
        author: res.quote.quoteAuthor,
      });
    });
  };

  const getRandomPicture = () => {
    randomPicture().then(res => setPicture(res.url));
  };
  const getPictureBW = () => {
    pictureBW().then(res => setPicture(res.url));
  };
  const getPictureBlur = () => {
    pictureBlur().then(res => setPicture(res.url));
  };

  const getKanyeQuote = () => {
    let quoteObj = {};
    getKanye().then(res => {
      quoteObj.quote = res.quote;
      quoteObj.author = 'Kanye West';
      setQuote(quoteObj);
    });
  };
  const getTaylorQuote = () => {
    let quoteObj = {};
    getTaylor().then(res => {
      quoteObj.quote = res.quote;
      quoteObj.author = 'Taylor Swift';
      setQuote(quoteObj);
    });
  };

  const getDonaldQuote = () => {
    let quoteObj = {};
    getDonald().then(res => {
      quoteObj.quote = res.value;
      quoteObj.author = 'Donald Trump';
      setQuote(quoteObj);
    });
  };

  // DECIDE WHICH QUOTES/PICTURES
  const whichQuotes = quoteType => {
    if (quoteType === 'random') getRandomQuote();
    else if (quoteType === 'kanye') getKanyeQuote();
    else if (quoteType === 'taylor') getTaylorQuote();
    else if (quoteType === 'trump') getDonaldQuote();
    setIsLiked(false);
  };

  const whichPictures = pictureType => {
    if (pictureType === 'random') getRandomPicture();
    else if (pictureType === 'bw') getPictureBW();
    else if (pictureType === 'blur') getPictureBlur();
    setIsLiked(false);
  };

  // PERMISSIONS
  const getPermissionIos = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Cant save no pics without no permissions');
      }
    }
  };

  useEffect(() => {
    whichQuotes('random');
    getRandomPicture();
    getSavedFavorites();
    getPermissionIos();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Quotalicious" component={Quotalicious} />
        <Stack.Screen name="Dashboard">
          {props => (
            <Dashboard
              whichQuotes={whichQuotes}
              quote={quote}
              setQuote={setQuote}
              quoteType={quoteType}
              setQuoteType={setQuoteType}
              whichPictures={whichPictures}
              picture={picture}
              setPicture={setPicture}
              pictureType={pictureType}
              setPictureType={setPictureType}
              displayForm={displayForm}
              displaySettings={displaySettings}
              setDisplaySettings={setDisplaySettings}
              setDisplayForm={setDisplayForm}
              storeData={storeData}
              removeFavorite={removeFavorite}
              isLiked={isLiked}
              setIsLiked={setIsLiked}
              myKey={key}
              {...props}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="SectionList" component={ButtonBar} />
        <Stack.Screen name="FavoriteList">
          {props => (
            <FavoriteList favorites={favorites} removeFavorite={removeFavorite} {...props} />
          )}
        </Stack.Screen>
        <Stack.Screen name="FavFocus" component={FavFocus} />
        <Stack.Screen name="RickRoll" component={RickRoll} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
