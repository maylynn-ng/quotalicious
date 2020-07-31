import React from 'react';
import { SafeAreaView, Button, Text, View, FlatList, ImageBackground, StyleSheet } from 'react-native';
import HomeQuote from '../components/homeQuote';
import { TouchableOpacity } from 'react-native-gesture-handler';

const FavoriteList = ({ navigation, favorites, removeFavorite }) => {

  return (
    <SafeAreaView>
      <Text style={styles.text} >Quotalicious</Text>
      <FlatList
        style={styles.list}
        data={favorites}
        keyExtractor={item => item[0]}
        renderItem={({item}) => 
          <View style={styles.container}>
            <ImageBackground 
              style={styles.picture}
              source={{uri: (JSON.parse(item[1])).picture}} >
                <TouchableOpacity 
                  onPress={() => navigation.navigate('FavFocus', item)} >
                  <HomeQuote 
                    quote={JSON.parse(item[1]).quote}
                    author={JSON.parse(item[1]).author} />
                </TouchableOpacity>
                <Button 
                  title="UNLIKE"
                  onPress={() => removeFavorite((JSON.parse(item[0])).toString())} />
            </ImageBackground>
          </View>
        } >
      </FlatList>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  list: {
    alignContent: 'center',
  },
  container: {
    width: '100%',
    marginTop: 10,
  },
  picture: {
    width: '100%',
  },
  text: {
    textAlign: 'center',
    fontSize: 32,
    margin: 10,
    fontWeight: 'bold',
  }
})

export default FavoriteList;