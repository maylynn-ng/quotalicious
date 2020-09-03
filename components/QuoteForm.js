import React, { useState } from 'react';
import { Button, Text, TextInput, View, StyleSheet, SafeAreaView } from 'react-native';

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
    setDisplaySettings(false);;
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
      <View style={styles.quoteBox}>
        <View style={styles.quote}>
          <Text>"</Text>
          <TextInput
            style={styles.quoteInput}
            placeholder="Your quote"
            enablesReturnKeyAutomatically={true}
            autoCapitalize="sentences"
            multiline={true}
            onChangeText={text => {quoteInputHandler(text)}}
            returnKeyLabel='done'
            value={customQuote}
            />
            <Text style={styles.secondQuote}>"</Text>
        </View>
        <View style={styles.author}>
          <Text>- </Text>
            <TextInput
              style={styles.authorInput}
              enablesReturnKeyAutomatically={true}
              onFocus={() => setCustomAuthor('')}
              placeholder="Your author"
              autoCapitalize="words"
              multiline={true}
              onChangeText={text => authorInputHandler(text)}
              returnKeyLabel='done'
              value={customAuthor}
              />
        </View>
        </View>
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
    minHeight: 200,
    borderRadius: 5,
    opacity: 0.95,
    justifyContent: 'space-evenly',
  },
  quote: {
    flexDirection: 'row',
    fontSize: 20,
  },
  secondQuote: {
    alignSelf: 'flex-end',
    justifyContent: 'flex-start',
  },
  quoteInput: {
    fontSize: 20,
    margin: 10,
  },
  author: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  authorInput: {
    fontSize: 20,
  },
  quoteBox: {
    width: '90%',
    height: 150,
    alignSelf: 'center',
    backgroundColor: '#d4d4d4',
    opacity: 0.87,
    padding: 10,
    borderWidth: 5,
    borderRadius: 5, 
    borderColor: 'white',
    margin: 5,
    justifyContent: 'space-evenly',
  },
  inspire: {
    marginTop: 10,
  },
})

export default QuoteForm;