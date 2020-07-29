import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomeQuote = ({quote, author}) => {
  return (
    <View style={styles.quoteBox}> 
      <Text style={styles.quote}>" {quote} "</Text>
      <Text style={styles.author}>-{author}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  quoteBox: {
    backgroundColor: '#d4d4d4',
    opacity: 0.7,
    margin: 10,
    padding: 20,
    borderRadius: 5,
  },

  quote: {
    fontSize: 18,
  },

  author: {
    fontSize: 12,
    fontStyle: 'italic',
    textAlign: 'right',
    marginTop: 5,
    marginRight: 10,
  }
})

export default HomeQuote;