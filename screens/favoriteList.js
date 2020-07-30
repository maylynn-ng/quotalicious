import React from 'react';
import { SafeAreaView, Text, View, FlatList, ImageBackground, StyleSheet } from 'react-native';
import HomeQuote from '../components/homeQuote';

const FavoriteList = ({ route }) => {
  const {favorites} = route.params;
  const ex = JSON.parse(favorites[0][1])
  console.log("🌀🌀🌀🌀🌀", ex.quote)
  return (
    <SafeAreaView>
      <Text>Me Likey</Text>
      <FlatList
        style={styles.list}
        data={favorites}
        keyExtractor={item => item[0]}
        renderItem={({item}) => 
          <View>
            <ImageBackground 
              style={styles.picture}
              source={{uri: (JSON.parse(item[1])).picture}} >
                <HomeQuote 
                  quote={JSON.parse(item[1]).quote}
                  author={JSON.parse(item[1]).author} />
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
    borderColor: 'black',
    backgroundColor: 'orange',
  },
  picture: {
    width: '100%',
  }

})

export default FavoriteList;