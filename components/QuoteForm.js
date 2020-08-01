import React, { useState } from 'react';
import { Button, TextInput, View, StyleSheet, SafeAreaView } from 'react-native';

import HomeQuote from './homeQuote';

const QuoteForm = ({ setQuote, setDisplaySettings, setDisplayForm }) => {

  const [customQuote, setCustomQuote] = useState('');
  const [customAuthor, setCustomAuthor] = useState('Author McAuthorFace');

  let objToSave = {};

  const quoteInputHandler = (input) => {
    objToSave = {
      quote: input,
      author: customAuthor
    };
    setCustomQuote(input);
    if (input) {
      setQuote(objToSave);
    }
  }
  const authorInputHandler = (input) => {
    objToSave = {
      quote: customQuote,
      author: input
    };
    setCustomAuthor(input);
    if (input) {
      setQuote(objToSave);
    }
  }

  const submitHandler = (input) => {
    if (input) {
      setCustomQuote('');
      setCustomAuthor('');
    }
    setDisplayForm(false);
    setDisplaySettings(false);
    setCustomQuote('');
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
          returnKeyLabel='done'
          value={customQuote}
          />
        <TextInput
          style={styles.textInput}
          enablesReturnKeyAutomatically={true}
          onFocus={() => setCustomAuthor('')}
          placeholder="Your author"
          autoCapitalize="words"
          multiline={true}
          onChangeText={text => authorInputHandler(text)}
          returnKeyLabel='done'
          value={customAuthor}
          />
        <Button
          style={styles.inspire}
          title="Inspire"
          onPress={() => {submitHandler(objToSave);}} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 5,
    opacity: 0.95,
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
  },
  inspire: {
    marginTop: 10,
  }
})

export default QuoteForm;