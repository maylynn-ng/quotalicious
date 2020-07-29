import React, { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, ImageBackground, FlatList } from 'react-native';
import HomeQuote from './components/homeQuote';
import { randomQuote, randomPicture } from './ApiClientService';


export default function App() {
  const [quote, setQuote] = useState([{quote: "I'm a frickin quote", author: "me, bitch"}]);
  const [picture, setPicture] = useState('https://i.picsum.photos/id/566/200/300.jpg?hmac=gDpaVMLNupk7AufUDLFHttohsJ9-C17P7L-QKsVgUQU');

  const getRandomQuote = () => {
    randomQuote()
      .then(res => {
        setQuote([{
          quote: res.quote.quoteText,
          author: res.quote.quoteAuthor}])
      });
  }

  const getRandomPicture = () => {
    randomPicture()
      .then(res => setPicture(res.url))
  }

  useEffect(() => {
    getRandomQuote();
    getRandomPicture();
  }, [])


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}> 
        <ImageBackground 
          style={styles.picture}
          source={{uri: picture}}>
          <FlatList
            data={quote}
            keyExtractor={item => item.quote}
            renderItem= {
              ({item}) =>
              <HomeQuote quote={item.quote} author={item.author}/>
            }
            onRefresh={() => {
              //getRandomPicture()
              getRandomQuote()
            }}
            refreshing={false}/>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignContent: 'center',
  },
  picture: {
    height: '100%',
    width: '100%',
  },
});
