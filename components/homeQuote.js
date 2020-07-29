import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomeQuote = ({quote, author}) => {
  return (
    <View style={styles.quoteBox}> 
      <Text style={styles.quote}>{quote}</Text>
      <Text style={styles.author}>-{author}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  quoteBox: {
    backgroundColor: '#d4d4d4',
    margin: 10,
    padding: 10,
  },

  quote: {
    fontSize: 16,
  },

  author: {
    fontSize: 12,
    fontStyle: 'italic',
    textAlign: 'right',
  }
})

export default HomeQuote;