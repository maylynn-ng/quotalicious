import React, { useState } from 'react';
import { StyleSheet, View, Text, ImageBackground, Button } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import LottieView from 'lottie-react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


import HomeQuote from '../components/homeQuote';
import ButtonBar from '../components/ButtonBar';
const heartExplode = require('../animations/heartExplode.json');

export default function Dashboard({ navigation, whichPictures, setQuoteType, pictureType, quote, picture, setPictureType, storeData, whichQuotes, quoteType }) {

  const [displaySettings, setDisplaySettings] = useState(false);

  const toggleDisplaySettings = () => {
    setDisplaySettings(prevState => !prevState)
  }

  return (
    <View>
      <GestureRecognizer
        onSwipeRight={() => whichPictures(pictureType)}>
      <View> 
        <ImageBackground 
          style={styles.picture}
          source={{uri: picture}}>
            {!displaySettings && <Button
              title="SETTINGS"
              onPress={() => toggleDisplaySettings()} />}
              {displaySettings && (<ButtonBar 
                toggleDisplaySettings={toggleDisplaySettings}
                whichPictures={whichPictures} 
                whichQuotes={whichQuotes} 
                setQuoteType={setQuoteType} 
                setPictureType={setPictureType} />)}
            <GestureRecognizer 
              onSwipeLeft={() => whichQuotes(quoteType)}>
              <HomeQuote 
                quote={quote.quote}
                author={quote.author} />
            </GestureRecognizer>
            
          <Button
            title="Me Gusta"
            onPress={storeData} />
          <Button
            title="YA GUSTIDO"
            onPress={() => navigation.navigate('FavoriteList')} />
          <GestureRecognizer
            onSwipeLeft={() => navigation.navigate('FavoriteList')} >
            <Text>Swipe to favlist</Text>
          </GestureRecognizer>

        </ImageBackground>
      </View>
      </GestureRecognizer>
    </View>
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
  },
});