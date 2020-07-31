import React from 'react';
import { StyleSheet, View, Text, ImageBackground, Button } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import LottieView from 'lottie-react-native';


import HomeQuote from '../components/homeQuote';
import { TouchableOpacity } from 'react-native-gesture-handler';
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
          title="RANDOM PICTURE"
          onPress={() => {
            setPictureType('random')
            whichPictures('random')}} />
        <Button
          title="BW PICTURE"
          onPress={() => {
            setPictureType('bw')
            whichPictures('bw')}} />
        <Button
          title="BLUR PICTURE"
          onPress={() => {
            setPictureType('blur')
            whichPictures('blur')}} />
        <Button
          title="KANYE ME"
          onPress={() => {
            setQuoteType('kanye')
            whichQuotes('kanye')}} />
        <Button
          title="TRUMP ME"
          onPress={() => {
            setQuoteType('donald')
            whichQuotes('donald')}} />
        <Button
          title="TAYLOR ME"
          onPress={() => {
            setQuoteType('taylor')
            whichQuotes('taylor')}} />
        <Button
          title="INSPIRE ME"
          onPress={() => {
            setQuoteType('random')
            whichQuotes('random')}} />
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