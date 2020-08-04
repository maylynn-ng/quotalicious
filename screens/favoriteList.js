import React, { useRef, useState } from 'react';
import { SafeAreaView, Text, View, FlatList, StyleSheet } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import ListItem from '../components/ListItem';
import RickRoll from './RICKROLL';

// ANIMATIONS
import LottieView from 'lottie-react-native';
import meerkat from '../animations/meerkat.json';

const FavoriteList = ({ navigation, favorites, removeFavorite }) => {

  const meerkatAnimation = useRef(null);
  const [rickRoll, setRickRoll] = useState(false);

  return (
    <SafeAreaView>
      <Text style={styles.text} >Quotalicious</Text>
      {favorites.length ? 
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          data={favorites}
          keyExtractor={item => item[0]}
          renderItem={({item}) => 
            <ListItem
              item={item}
              style={styles.item}
              quote={JSON.parse(item[1]).quote}
              author={JSON.parse(item[1]).author}
              navigation={navigation}
              picture={{uri: (JSON.parse(item[1])).picture}}
              removeFavorite={removeFavorite}/>}
          />
        </View>
        : 
        <View>

          <Modal
            isVisible={rickRoll}
            animationIn="rotate"
            animationOut="rotate"
            onBackdropPress={() => setRickRoll(false)} >
            <RickRoll />
          </Modal>
          
          <LottieView
            style={styles.meerkat}
            ref={meerkatAnimation}
            autoPlay={true}
            loop={true}
            source={meerkat} />
            <TouchableWithoutFeedback
              onPress={() => setRickRoll(true)}>
            <View style={styles.easterEgg} />
          </TouchableWithoutFeedback>
          <Text style={styles.emptyText}>
            Where Da Likes At??
          </Text>
        </View>}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  list: {
    alignContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold',
    padding: 15,
  },
  container: {
    padding: 15,
    height: '100%',
  },
  item: {
    alignSelf: 'center',
  },
  meerkat: {
    width: 300,
    alignSelf: 'center',
  },
  emptyText: {
    textAlign: 'center', 
    fontSize: 32,
    fontWeight: 'bold',
  },
  easterEgg: {
    height: 20,
    width: 20,
    alignSelf: 'center',
  }
})

export default FavoriteList;