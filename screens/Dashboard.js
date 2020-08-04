import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, ImageBackground, SafeAreaView } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';

// COMPONENTS
import Modal from 'react-native-modal';
import { FontAwesome5, MaterialCommunityIcons} from '@expo/vector-icons'; 
import HomeQuote from '../components/homeQuote';
import ButtonBar from '../components/ButtonBar';

// ANIMATIONS
import LottieView from 'lottie-react-native';
import heartBookmark from '../animations/heartBookmark.json'
import confetti from '../animations/confetti.json';
import heartExplode from '../animations/heart.json';
import tap from '../animations/tap.json';
import swipe from '../animations/swipeRight.json';


export default function Dashboard({ navigation, myKey, isLiked, setIsLiked, removeFavorite, setPicture, setQuote, whichPictures, setQuoteType, pictureType, quote, picture, setPictureType, storeData, whichQuotes, quoteType, setDisplayForm, setDisplaySettings, displayForm, displaySettings}) {
  const [displayConfetti, setDisplayConfetti] = useState(false);
  const [displayTap, setDisplayTap] = useState(true);
  const [displaySwipe, setDisplaySwipe] = useState(false);
  const [liked, setLiked] = useState(false);

  const confettiAnimation = useRef(null);
  const bookmarkAnimation = useRef(null);
  const heartExplodeAnimation = useRef(null);
  const tapAnimation = useRef(null);
  const swipeAnimation = useRef(null);

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

  let showSwipeThenNull = () => {
    showSwipeThenNull = null;
    setDisplaySwipe(true);
  }

  const like = () => {
    storeData();
    likeAnimation();
    setIsLiked(true);
  }

  const unlike = async () => {
    await removeFavorite((+myKey - 1).toString());
    await setIsLiked(!isLiked);
  }

  const toggleLike = () => {
    isLiked
    ? unlike()
    : like();
  }

  useEffect(() => {
    setLiked(isLiked);
  }, [isLiked])

  return (
    <SafeAreaView>
    <View style={styles.screen}>
      <View style={styles.container}> 
      <GestureRecognizer
        onSwipeRight={() => {
          whichPictures(pictureType);
          setDisplaySwipe(false);}}
        onSwipeLeft={() => navigation.navigate('FavoriteList')}
         >
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
            <TouchableWithoutFeedback
              onPress={() => {
                whichQuotes(quoteType);
                setDisplayTap(false)
                showSwipeThenNull();}}>  
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
              {displayTap && 
              <LottieView
                style={styles.tap}
                ref={tapAnimation}
                loop={true}
                autoPlay={true}
                source={tap} /> }
              </View>
              {displayConfetti && <LottieView
                ref={confettiAnimation}
                autoPlay={false}
                loop={false}
                source={confetti} />}
            </View>
          </TouchableWithoutFeedback>
          <TouchableOpacity
            onPress={() => toggleLike()}>
            {!liked
            ? <LottieView
              style={styles.heartExplode}
              ref={heartExplodeAnimation}
              progress={0}
              autoSize={true}
              loop={false}
              source={heartExplode} />
            : <LottieView
            style={styles.heartExplode}
            ref={heartExplodeAnimation}
            progress={0.7}
            autoSize={true}
            loop={false}
            source={heartExplode} />}
          </TouchableOpacity>

          {displaySwipe && <LottieView
                style={styles.swipe}
                ref={swipeAnimation}
                loop={true}
                autoPlay={true}
                source={swipe} />}
          </View>
          </ImageBackground>
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
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  screen: {
    justifyContent: 'space-between',
    height: '100%',
    alignItems: 'center',
  },
  container: {
    flexGrow: 2,
    width: '95%',
    maxHeight: '88%',
    justifyContent: 'center',

  },  
  navBar: {
    opacity: 0.7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: 15,
  },
  picture: {
    justifyContent: 'center',
    height: '100%',
  },
  quoteBox: {
    alignSelf: 'center',
  },
  quoteContainer: {
    justifyContent: 'center',
  },
  bookmark: {
    zIndex: 10,
    width: 100,
    alignSelf: 'flex-end',
    marginTop: 36,
  },
  heartExplode: {
    height: 60,
    alignSelf: 'center',
    marginTop: 5,
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
  tap: {
    position: 'absolute',
    top: 40,
  },
  swipe: {
    position: 'absolute',
    width: 250,
    top: -40,
    left: 20,
  }
});
