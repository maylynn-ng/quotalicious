import React, { useState, useRef } from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';

import FavFocus from '../screens/FavFocus';
import HomeQuote from './homeQuote';
import { FontAwesome } from '@expo/vector-icons';

// ANIMATIONS
import LottieView from 'lottie-react-native';
import explode from '../animations/explode.json';


const ListItem = ({ quote, author, item, picture, removeFavorite}) => {
  const key = JSON.parse(item[0]);
  const [displayFocus, setDisplayFocus] = useState(false);
  const [displayExplode, setDisplayExplode] = useState(false);

  const explodeAnimation = useRef(null);

  const playDelete = () => {
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
              <FontAwesome 
                style={styles.delete}
                name="bomb" 
                size={36} 
                color="white" />
            </TouchableOpacity>
            </View>
            <View>
            <TouchableOpacity 
              style={styles.quoteBox}
              onPress={() => setDisplayFocus(true)} >
              <HomeQuote 
                quote={quote}
                author={author} />
                
            </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
        {displayExplode && <LottieView
          style={styles.explode}
          ref={explodeAnimation}
          loop={false}
          autoPlay={true}
          onAnimationFinish={() => removeFavorite(key.toString())}
          source={explode} />}
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
    width: '100%',
    alignSelf: 'center',
    margin: 0,
  },
  quoteBox: {
    alignSelf: 'center',
    width: '80%',
    marginBottom: 40,
    marginLeft: 20,
    marginRight: -5,
  },
  container: {
    width: '100%',
    marginTop: 10,
    alignSelf: 'center',
  },
  holder: {
    borderWidth: 2,
    borderRadius: 5,
    margin: 0,
    flexDirection: 'row',
  },
  delete: {
    padding: 5,
    alignSelf: 'flex-end',
  },
  explode: {
    position: 'absolute',
    width: 500,
    height: 500,
    top: -50,
    left: -30,
    zIndex: 10,
  }
})

export default ListItem;