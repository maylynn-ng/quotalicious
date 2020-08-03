import React from 'react';
import { SafeAreaView, View, Image, StyleSheet } from 'react-native';

const RickRoll = () => {

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Image
          style={styles.video}
          source={{uri: 'https://media.giphy.com/media/lgcUUCXgC8mEo/giphy.gif'}} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '80%',
    width: '100%',
    backgroundColor: 'orange',
    borderWidth: 5,
    borderColor: 'white',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    width: 300,
    height: 200,
    borderWidth: 3,
    borderRadius: 5,
    borderColor: 'white',
  }
})

export default RickRoll;