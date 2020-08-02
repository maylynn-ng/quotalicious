import React, { useRef } from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import Modal from 'react-native-modal';
import GestureRecognizer from 'react-native-swipe-gestures';
import { TouchableOpacity } from 'react-native-gesture-handler';

// COMPONENTS
import HomeQuote from '../components/homeQuote';
import ButtonBar from '../components/ButtonBar';

// ANIMATIONS
import LottieView from 'lottie-react-native';
import heartBookmark from '../animations/heartBookmark.json'
import confetti from '../animations/confetti.json';
import settings from '../animations/settings.json';
import heartExplode from '../animations/heartExplode.json';


export default function Dashboard({ navigation, removeFavorite, setPicture, setQuote, whichPictures, setQuoteType, pictureType, quote, picture, setPictureType, storeData, whichQuotes, quoteType, setDisplayForm, setDisplaySettings, displayForm, displaySettings}) {


  const confettiAnimation = useRef(null);
  const bookmarkAnimation = useRef(null);
  const settingsAnimation = useRef(null);
  const heartExplodeAnimation = useRef(null);

  const likeAnimation = () => {
    confettiAnimation.current.play();
    bookmarkAnimation.current.play();
    heartExplodeAnimation.current.play();
  }

  const playSettings = () => {
    settingsAnimation.current.play();
  }

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
          <Modal 
            onBackdropPress={toggleDisplaySettings}
            animationIn='slideInLeft'
            animationOut='slideOutLeft'
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

          <View style={styles.quoteContainer}>
          <TouchableOpacity
            onPress={() => {
              setDisplaySettings(true);
              playSettings();
            }} >
              <View style={styles.settingsArea}>
              <LottieView
                style={styles.settings}
                ref={settingsAnimation}
                progress={1}
                loop={false}
                source={settings} />
              </View>
          </TouchableOpacity>

          <GestureRecognizer 
            onSwipeUp={() => whichQuotes(quoteType)}
            >             
            <View style={styles.quoteBox} >
            <LottieView
              style={styles.bookmark}
              ref={bookmarkAnimation}
              autoPlay={false}
              loop={false}
              source={heartBookmark} />
              <HomeQuote 
                removeFavorite={removeFavorite}
                storeData={storeData}
                quote={quote.quote}   
                author={quote.author} 
                />
            </View>
            <LottieView
              ref={confettiAnimation}
              autoPlay={false}
              loop={false}
              source={confetti} />
          </GestureRecognizer>
          <TouchableOpacity
            onPress={() => {
              storeData();
              likeAnimation();
            }}>
            <LottieView
              style={styles.heartExplode}
              ref={heartExplodeAnimation}
              progress={1}
              loop={false}
              source={heartExplode} />
          </TouchableOpacity>
            </View>
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
  quoteBox: {
    alignSelf: 'center',
    margin: 20,
    marginTop: 60,
  },
  quoteContainer: {
    height: '100%',
    marginTop: -100,
    justifyContent: 'center',
  },
  bookmark: {
    zIndex: 10,
    width: 100,
    alignSelf: 'flex-end',
    marginRight: 0,
    marginTop: 36,
  },
  heartExplode: {
    width: 100,
    alignSelf: 'center',
  },
  confetti: {
    width: 400,
  },
  settings: {
    width: 200,
    marginTop: 10,
  },
  settingsArea: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    width: 100,

  }
});