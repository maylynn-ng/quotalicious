import React from 'react';
import { SafeAreaView, View, Image, StyleSheet } from 'react-native';

const RickRoll = () => {

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Image
          style={{width: 300, height: 200}}
          source={{uri: 'https://media.giphy.com/media/lgcUUCXgC8mEo/giphy.gif'}} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    width: 300,
    height: 200,
  }
})

export default RickRoll;