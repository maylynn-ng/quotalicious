import React from 'react';
import { StyleSheet, View, Text, ImageBackground, Button } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import HomeQuote from '../components/homeQuote';
import ButtonBar from '../components/ButtonBar';


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
          {!displaySettings && 
            <TouchableOpacity 
              onPress={() => setDisplaySettings(true)}>
              <MaterialCommunityIcons 
                style={styles.settingsIcon}
                name="settings-box" 
                size={56} 
                color="black" />
            </TouchableOpacity>}
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
                 <View style={styles.quoteContainer}>
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
                </View>
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
  },
  settingsIcon: {
    width: 55,
    borderRadius: 10,
    position: 'absolute',
    top: 30,
    left: 10,
  },
  quoteBox: {
    alignSelf: 'center',
    margin: 20,
  },
  quoteContainer: {
    height: '100%',
    justifyContent: 'center',
  }
});