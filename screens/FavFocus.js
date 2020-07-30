import React from 'react';
import { SafeAreaView, View, StyleSheet, ImageBackground } from 'react-native';
import HomeQuote from '../components/homeQuote';

const FavFocus = ({ route }) => {
  const item = route.params;
  const parsed = JSON.parse(item[1]);

  return (
    <SafeAreaView>
      <View>
        <ImageBackground
          style={styles.picture}
          source={parsed.picture} >
            <HomeQuote
              quote={parsed.quote}
              author={parsed.author} />
        </ImageBackground>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  picture: {
    width: '100%',
  }
})

export default FavFocus;