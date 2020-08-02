import React, { useState, useRef } from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';

import FavFocus from '../screens/FavFocus';
import HomeQuote from './homeQuote';

// ANIMATIONS
import LottieView from 'lottie-react-native';
import deleteButton from '../animations/delete.json';
import explode from '../animations/explode.json';

const ListItem = ({ quote, author, item, picture, removeFavorite}) => {
  const key = JSON.parse(item[0]);
  const [displayFocus, setDisplayFocus] = useState(false);
  const [displayExplode, setDisplayExplode] = useState(false);
  const [displayCard, setDisplayCard] = useState(true);

  const deleteAnimation = useRef(null);
  const explodeAnimation = useRef(null);

  const playDelete = () => {
    deleteAnimation.current.play();
    setDisplayExplode(true);
  }

  return (
      <View style={styles.holder}>

        <ImageBackground 
          style={styles.picture}
          source={picture} >
          <View>
            <View>
            <TouchableOpacity
              onPress={() => {
                playDelete()
                }} >
              <LottieView
                style={styles.delete}
                ref={deleteAnimation}
                loop={false}
                progress={1}
                source={deleteButton} />
            </TouchableOpacity>
            </View>
            <View>
            <TouchableOpacity 
              style={styles.quoteBox}
              onPress={() => setDisplayFocus(true)} >
              <HomeQuote 
                quote={quote}
                author={author} />
                
               {displayExplode && <LottieView
                  style={styles.explode}
                  ref={explodeAnimation}
                  loop={false}
                  autoPlay={true}
                  onAnimationFinish={() => removeFavorite(key.toString())}
                  source={explode} />}
            </TouchableOpacity>
            </View>

          </View>
        </ImageBackground>
      <Modal
        isVisible={displayFocus}
        onBackdropPress={() => setDisplayFocus(false)}
        animationIn='zoomInDown'
        animationOut='zoomOutUp' >
        <FavFocus 
          item={item} />
      </Modal>
      </View>
  )
};

const styles = StyleSheet.create({
  picture: {
    width: '95%',
    alignSelf: 'center',
    margin: 0,
  },
  quoteBox: {
    alignSelf: 'center',
    width: '80%',
    margin: 20,
  },
  container: {
    width: '100%',
    marginTop: 10,
    alignSelf: 'center',
  },
  holder: {
    borderRadius: 5,
    marginBottom: 15,
    margin: 0,
    flexDirection: 'row',
  },
  delete: {
    width: 50,
    margin: 0,
  },
  explode: {
    position: 'absolute',
    width: 500,
    top: -50,
    left: -50,
  }
})

export default ListItem;