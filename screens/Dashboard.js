import React, { useRef, useState } from 'react';
import { StyleSheet, View, ImageBackground, SafeAreaView } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import { TouchableOpacity } from 'react-native-gesture-handler';

// COMPONENTS
import Modal from 'react-native-modal';
import { FontAwesome5, MaterialCommunityIcons, Octicons } from '@expo/vector-icons'; 
import HomeQuote from '../components/homeQuote';
import ButtonBar from '../components/ButtonBar';

// ANIMATIONS
import LottieView from 'lottie-react-native';
import heartBookmark from '../animations/heartBookmark.json'
import confetti from '../animations/confetti.json';
import heartExplode from '../animations/heart.json';



export default function Dashboard({ navigation, isLiked, setIsLiked, removeFavorite, setPicture, setQuote, whichPictures, setQuoteType, pictureType, quote, picture, setPictureType, storeData, whichQuotes, quoteType, setDisplayForm, setDisplaySettings, displayForm, displaySettings}) {
  const [displayConfetti, setDisplayConfetti] = useState(false);
  const [displayIcons, setDisplayIcons] = useState(true);
  const confettiAnimation = useRef(null);
  const bookmarkAnimation = useRef(null);
  const heartExplodeAnimation = useRef(null);

  const likeAnimation = async () => {
    await setDisplayConfetti(true)
    confettiAnimation.current.play();
    bookmarkAnimation.current.play();
    heartExplodeAnimation.current.play();
  }

  const toggleDisplaySettings = () => {
    setDisplaySettings(prevState => !prevState)
  }

  const toggleDisplayForm = () => {
    setDisplayForm(prevState => !prevState)
  }

  const hideIcons = () => {
    //styles.quoteContainer.justifyContent = 'flex-start';
    setDisplayIcons(false);
    //setTimeout(setDisplayIcons(false), 5000);
  }

  return (
    <SafeAreaView>
    <View>
      <GestureRecognizer
        onSwipeRight={() => {
          whichPictures(pictureType);
          setIsLiked(false)}}>
      <View style={styles.container}> 
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
          {displayIcons && 
              <View style={styles.settingsArea}>
                <TouchableOpacity
                  onPress={() => {
                    setDisplaySettings(true);
                    console.log('pressing burger');
                  }} >
                <FontAwesome5 
                  style={styles.hamburger}
                  name="hamburger" 
                  size={48} 
                  color="white" />
                  </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => hideIcons()} >
                <Octicons 
                  style={styles.eyeIcon}
                  name="eye-closed" 
                  size={36} 
                  color="white" />
              </TouchableOpacity>
              </View>}

          <GestureRecognizer
            onSwipeLeft={() => {
              whichQuotes(quoteType)
              setIsLiked(false)}}>  
            <View>           
              <View style={styles.quoteBox} >
                <LottieView
                  style={styles.bookmark}
                  ref={bookmarkAnimation}
                  duration={1500}
                  autoPlay={false}
                  loop={false}
                  source={heartBookmark} />
                  <HomeQuote 
                    removeFavorite={removeFavorite}
                    storeData={storeData}
                    quote={quote.quote}   
                    author={quote.author} />
              </View>
              {displayConfetti && <LottieView
                ref={confettiAnimation}
                autoPlay={false}
                loop={false}
                source={confetti} />}
            </View>
          </GestureRecognizer>
          {displayIcons && <TouchableOpacity
            onPress={() => {
              storeData();
              likeAnimation();}}>
            {!isLiked
            ? <LottieView
              style={styles.heartExplode}
              ref={heartExplodeAnimation}
              progress={0}
              autoSize={true}
              onAnimationFinish={() => setIsLiked(true)}
              loop={false}
              source={heartExplode} />
            : <LottieView
            style={styles.heartExplode}
            ref={heartExplodeAnimation}
            progress={0.7}
            autoSize={true}
            loop={false}
            source={heartExplode} />
            }
          </TouchableOpacity>}
          </View>
          {displayIcons && <TouchableOpacity
            onPress={() => navigation.navigate('FavoriteList')} >
            <View style={styles.folder}>
              <MaterialCommunityIcons 
                name="folder-star" 
                size={48} 
                color="white" />
            </View>
          </TouchableOpacity>}
        </ImageBackground>
      </View>
      </GestureRecognizer>
    </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    padding: 10,
  },  
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
    justifyContent: 'center',
    height: '100%',
    marginTop: -100,
  },
  bookmark: {
    zIndex: 10,
    width: 100,
    alignSelf: 'flex-end',
    marginRight: 0,
    marginTop: 36,
  },
  heartExplode: {
    height: 60,
    padding: 0,
    alignSelf: 'center',
    marginTop: 0,
  },
  folder: {
    width: 60,
    marginTop: 20,
    alignSelf: 'flex-end',
  },
  confetti: {
    width: 400,
    marginTop: 30,
  },
  settingsArea: {
    height: 100,
    top: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  hamburger: {
    marginLeft: 30,
  },
  eyeIcon: {
    width: 100,
    height: 100,
    marginTop: 63,
  }
});
