import React, { useRef } from 'react';
import { SafeAreaView, Text, View, FlatList, StyleSheet } from 'react-native';
import ListItem from '../components/ListItem';

// ANIMATIONS
import LottieView from 'lottie-react-native';
import meerkat from '../animations/meerkat.json';

const FavoriteList = ({ navigation, favorites, removeFavorite }) => {

  const meerkatAnimation = useRef(null);

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
          <LottieView
            style={styles.meerkat}
            ref={meerkatAnimation}
            autoPlay={true}
            loop={true}
            source={meerkat} />
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
  }
})

export default FavoriteList;