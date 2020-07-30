import React from 'react';
import { StyleSheet, View, SafeAreaView, ImageBackground, Button } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import HomeQuote from '../components/homeQuote';


export default function Dashboard({ navigation, getRandomPicture, getRandomQuote, nextQuote, quote, picture, nextPicture, isNext, storeData }) {

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
          onPress={() => navigation.navigate('FavoriteList')} />
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