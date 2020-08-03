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

  return (
    <SafeAreaView>
    <View style={styles.screen}>
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
            animationIn='bounceInUp'
            animationOut='bounceOutDown'
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
          <TouchableOpacity
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
          </TouchableOpacity>
          </View>

        </ImageBackground>
        </View>
      </GestureRecognizer>
    </View>

        <View style={styles.navBar}>
          <View>
          <TouchableOpacity
            onPress={() => setDisplaySettings(true)} >
            <FontAwesome5 
              style={styles.hamburger}
              name="hamburger" 
              size={48} 
              color="black" />
          </TouchableOpacity>
          </View>
          <View style={styles.folder}>
            <TouchableOpacity
              onPress={() => navigation.navigate('FavoriteList')} >
              <MaterialCommunityIcons 
                name="folder-star" 
                size={48} 
                color="black" />
          </TouchableOpacity>
          </View>

        </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  screen: {
    justifyContent: 'flex-start',
    backgroundColor: 'blue',
  },
  container: {
    borderRadius: 5,
    padding: 10,
    paddingVertical: 0,
    backgroundColor: 'green',
    margin: 0,
  },  
  navBar: {
    opacity: 0.7,
    marginTop: 0,
    paddingTop: 0,
    borderColor: 'red',
    borderWidth: 1,
    borderStyle: 'solid',
    backgroundColor: 'orange',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  picture: {
    height: '95%',
    width: '100%',
    margin: 0,
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
    marginRight: 30,
  },
  confetti: {
    width: 400,
    marginTop: 30,
  },
  hamburger: {
    marginLeft: 30,
  },
});
