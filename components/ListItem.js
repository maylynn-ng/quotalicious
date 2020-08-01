import React, { useState } from 'react';
import { Dimensions, View, Animated, ImageBackground, Button, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import GestureRecognizer from 'react-native-swipe-gestures';
import Modal from 'react-native-modal';
import { AntDesign } from '@expo/vector-icons'; 

import FavFocus from '../screens/FavFocus';
import HomeQuote from './homeQuote';

const { height: wHeight } = Dimensions.get('window');
const { width } = Dimensions.get('window');
const height = wHeight - 64;
const ratio = 200/300;
const MARGIN = 16;
const CARD_HEIGHT = (width * 0.8 * ratio) + MARGIN * 2;

const ListItem = ({ navigation, y, index, quote, author, item, picture, removeFavorite}) => {

  // const position = Animated.subtract(index * CARD_HEIGHT, y);
  // const isDisappearing = -CARD_HEIGHT;
  // const isTop = 0;
  // const isBottom = height - CARD_HEIGHT;
  // const isAppearing = height;
  // const translateY = Animated.add(
  //   Animated.add(
  //     y, 
  //     y.interpolate({
  //   inputRange: [0, 0.0001 + index * CARD_HEIGHT],
  //   outputRange: [0, -index * CARD_HEIGHT],
  //   extrapolateRight: 'clamp',
  //   })
  //   ),
  //   position.interpolate({
  //     inputRange: [isBottom, isAppearing],
  //     outputRange: [0, -CARD_HEIGHT / 4],
  //     extrapolate: 'clamp',
  //   })
  // );

  // const scale = position.interpolate({
  //   inputRange: [isDisappearing, isTop, isBottom, isAppearing],
  //   outputRange: [0.5, 1, 1, 0.5],
  //   extrapolate: "clamp",
  // })
  // const opacity = position.interpolate({
  //   inputRange: [isDisappearing, isTop, isBottom, isAppearing],
  //   outputRange: [0.5, 1, 1, 0.5],
  // })

  const [displayFocus, setDisplayFocus] = useState(false);

  return (
    <Animated.View 
      // style={[styles.container, { opacity, transform: [{ translateY }, { scale }]}]}
      >
      <View style={styles.holder}>

        <ImageBackground 
          style={styles.picture}
          source={picture} >
          <TouchableOpacity 
              onPress={() => removeFavorite((JSON.parse(item[0])).toString())} >
              <AntDesign 
                style={styles.deleteButton}
                name="closecircle"
                size={24}
                color="black" />
            </TouchableOpacity>
          <View>
              <TouchableOpacity 
                style={styles.quoteBox}
                onPress={() => setDisplayFocus(true)} >
                <HomeQuote 
                  quote={quote}
                  author={author} />
              </TouchableOpacity>
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
    </Animated.View>
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
  deleteButton: {
    width: 25,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  container: {
    width: '100%',
    marginTop: 10,
    // marginVertical: MARGIN,
    alignSelf: 'center',
  },
  holder: {
    borderRadius: 5,
    marginBottom: 15,
    margin: 0,
    flexDirection: 'row',
  }
})

export default ListItem;