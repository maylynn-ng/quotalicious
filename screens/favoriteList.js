import React from 'react';
import { SafeAreaView, Dimensions, Animated, Button, Text, View, FlatList, ImageBackground, StyleSheet } from 'react-native';
import ListItem from '../components/ListItem';
import { TouchableOpacity } from 'react-native-gesture-handler';



const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const y = new Animated.Value(0);
const onScroll = Animated.event([{
  nativeEvent: { contentOffset: {y} }}], 
  { useNativeDriver: true })


const FavoriteList = ({ navigation, favorites, removeFavorite }) => {

  return (
    <SafeAreaView>
      <Text style={styles.text} >Quotalicious</Text>
      <AnimatedFlatList
        scrollEventThrottle={16}
        style={styles.list}
        data={favorites}
        keyExtractor={item => item[0]}
        renderItem={({item, index}) => 
          <ListItem
            quote={JSON.parse(item[1]).quote}
            author={JSON.parse(item[1]).author}
            index={index}
            item={item}
            y={y}
            navigation={navigation}
            picture={{uri: (JSON.parse(item[1])).picture}}
            removeFavorite={removeFavorite}/>}
        {...{onScroll}}
        />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  list: {
    alignContent: 'center',
  },
})

export default FavoriteList;