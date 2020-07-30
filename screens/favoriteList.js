import React from 'react';
import { SafeAreaView, Button, Text, View, FlatList, ImageBackground, StyleSheet } from 'react-native';
import HomeQuote from '../components/homeQuote';

const FavoriteList = ({ route }) => {
  const {favorites, removeFavorite, getSavedFavorites} = route.params;
  return (
    <SafeAreaView>
      <Text>Me Likey</Text>
      <FlatList
        style={styles.list}
        onRefresh={() => getSavedFavorites()}
        refreshing={false}
        data={favorites}
        keyExtractor={item => item[0]}
        renderItem={({item}) => 
          <View style={styles.container}>
            <ImageBackground 
              style={styles.picture}
              source={{uri: (JSON.parse(item[1])).picture}} >
                <HomeQuote 
                  quote={JSON.parse(item[1]).quote}
                  author={JSON.parse(item[1]).author} />
                <Button 
                  title="UNLIKE"
                  onPress={() => removeFavorite((JSON.parse(item[0])))} />
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
  }
})

export default FavoriteList;