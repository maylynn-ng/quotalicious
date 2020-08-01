import React, { useState } from 'react';
import { TextInput, View, StyleSheet, SafeAreaView } from 'react-native';

import HomeQuote from './homeQuote';

const QuoteForm = ({setQuote, quote, storeData}) => {

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
  }
  const authorInputHandler = (input) => {
    objToSave = {
      quote: customQuote,
      author: input
    };
    setCustomAuthor(input);
    setQuote(objToSave);
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
          author={customAuthor}/>
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
    padding: 20,
    alignItems: 'center',
    width: '100%',
  },
  textInput: {
    marginTop: 20,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
  },
  quoteBox: {
    width: '100%',
    alignSelf: 'center',
  }
})

export default QuoteForm;