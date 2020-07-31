import React from 'react';
import { StyleSheet, View, Text, ImageBackground, Button } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import LottieView from 'lottie-react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


import HomeQuote from '../components/homeQuote';
import { QuoteButton, PictureButton } from '../elements/buttons';
const heartExplode = require('../animations/heartExplode.json');

export default function Dashboard({ navigation, whichPictures, setQuoteType, quote, picture, setPictureType, storeData, whichQuotes, quoteType }) {

  return (
    <View>
      <GestureRecognizer
        onSwipeRight={() => whichPictures(pictureType)}>
      <View> 
        <ImageBackground 
          style={styles.picture}
          source={{uri: picture}}>
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
          <Button
            title="SECTION LIST"
            onPress={() => navigation.navigate('SectionList', {whichPictures, whichQuotes, setQuoteType, setPictureType})} />
        
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