import React from 'react';
import { StyleSheet, View, Text, ImageBackground, Button } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import LottieView from 'lottie-react-native';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';

import HomeQuote from '../components/homeQuote';
import ButtonBar from '../components/ButtonBar';
const heartExplode = require('../animations/heartExplode.json');

export default function Dashboard({ navigation, setPicture, setQuote, whichPictures, setQuoteType, pictureType, quote, picture, setPictureType, storeData, whichQuotes, quoteType, setDisplayForm, setDisplaySettings, displayForm, displaySettings}) {

  const toggleDisplaySettings = () => {
    setDisplaySettings(prevState => !prevState)
  }

  const toggleDisplayForm = () => {
    setDisplayForm(prevState => !prevState)
  }

  return (
    <View>
      <GestureRecognizer
        onSwipeLeft={() => navigation.navigate('FavoriteList')}
        onSwipeRight={() => whichPictures(pictureType)}>
      <View> 

        <ImageBackground 
          style={styles.picture}
          source={{uri: picture}}>
            {!displaySettings && <Button
              title="SETTINGS"
              onPress={() => {setDisplaySettings(true)}} />}
              <Modal 
                onBackdropPress={toggleDisplaySettings}
                animationIn='zoomInUp'
                animationOut='zoomOutDown'
                isVisible={displaySettings}
                >
                <ButtonBar 
                  setDisplaySettings={setDisplaySettings}
                  setDisplayForm={setDisplayForm}
                  quote={quote}
                  storeData={storeData}
                  displayForm={displayForm}
                  toggleDisplayForm={toggleDisplayForm}
                  whichPictures={whichPictures} 
                  whichQuotes={whichQuotes} 
                  setQuote={setQuote}
                  setPicture={setPicture}
                  quoteType={quoteType}
                  setQuoteType={setQuoteType} 
                  setPictureType={setPictureType} 
                  navigation={navigation}
                  />
              </Modal>
              
                {/* <TapGestureHandler
                    numberOfTaps={2} 
                    onHandlerStateChange={() => storeData()} > */}
                  <GestureRecognizer 
                    onSwipeUp={() => whichQuotes(quoteType)}
                    >             
                    <View style={styles.quoteBox} >
                      <HomeQuote 
                        quote={quote.quote}   
                        author={quote.author} 
                        />
                    </View>
                  </GestureRecognizer>
                {/* </TapGestureHandler> */}
              <Button
                title="Save"
                onPress={() => storeData()} />
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
  quoteBox: {
    alignSelf: 'center',
  },
});