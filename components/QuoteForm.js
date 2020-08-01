import React, { useState } from 'react';
import { TextInput, Text, View, StyleSheet, SafeAreaView } from 'react-native';

import HomeQuote from './homeQuote';

const QuoteForm = ({setQuote, quote, storeData, setQuoteType, quoteType}) => {

  const [customQuote, setCustomQuote] = useState('');
  const [customAuthor, setCustomAuthor] = useState('');

  let objToSave = {};

  const quoteInputHandler = (input) => {
    objToSave = {
      quote: input,
      author: customAuthor
    };
    setCustomQuote(input);
    setQuote(objToSave);
    console.log('quote',quote)
  }
  const authorInputHandler = (input) => {
    objToSave = {
      quote: customQuote,
      author: input
    };
    setCustomAuthor(input);
    setQuote(objToSave);
    console.log('auth',quote)
  }

  const submitHandler = () => {
    storeData(objToSave);
    TextInput.clear();
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <HomeQuote 
          style={styles.quoteBox}
          quote={customQuote}   
          author={quote.author}/>
        <TextInput
          style={styles.textInput}
          placeholder="Your quote"
          enablesReturnKeyAutomatically={true}
          autoCapitalize="sentences"
          multiline={true}
          onChangeText={text => quoteInputHandler(text)}
          onSubmitEditing={() => {submitHandler()}}
          />
        <TextInput
          style={styles.textInput}
          placeholder="Your Author"
          enablesReturnKeyAutomatically={true}
          autoCapitalize="sentences"
          multiline={true}
          onChangeText={text => authorInputHandler(text)}
          onSubmitEditing={() => {submitHandler()}}
          />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignContent: 'center',
    width: '100%',
  },
  textInput: {
    marginTop: 20,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
  quoteBox: {
    width: '100%',
    alignSelf: 'center',
  }
})

export default QuoteForm;