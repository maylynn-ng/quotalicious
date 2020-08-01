import React from 'react';
import { Dimensions, Animated, ImageBackground, Button, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

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


  return (
    <Animated.View 
      // style={[styles.container, { opacity, transform: [{ translateY }, { scale }]}]}
      >
      <ImageBackground 
        style={styles.picture}
        source={picture} >
          <TouchableOpacity 
            style={styles.quoteBox}
            onPress={() => navigation.navigate('FavFocus', item)} >
            <HomeQuote 
              quote={quote}
              author={author} />
          </TouchableOpacity>
          <Button 
            title="UNLIKE"
            onPress={() => removeFavorite((JSON.parse(item[0])).toString())} />
      </ImageBackground>
    </Animated.View>
  )
};

const styles = StyleSheet.create({
  picture: {
    width: '100%',
    alignSelf: 'center',
  },
  quoteBox: {
    alignSelf: 'center',
    marginTop: 10,
  },
  container: {
    width: '100%',
    marginTop: 10,
    // marginVertical: MARGIN,
    alignSelf: 'center',
  },
})

export default ListItem;