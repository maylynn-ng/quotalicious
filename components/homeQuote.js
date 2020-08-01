import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 

const HomeQuote = ({quote, author}) => {
  return (
    <View style={styles.quoteBox}> 
      <View>
        <Text style={styles.quote}>"{quote}"</Text>
        <Text style={styles.author}>-{author}</Text>
      </View>
      <AntDesign 
        style={styles.likeIcon}
        name="hearto" 
        size={36} 
        color="black" />
    </View>
  )
}

const styles = StyleSheet.create({
  quoteBox: {
    backgroundColor: '#d4d4d4',
    width: '90%',
    opacity: 0.87,
    paddingVertical: 30,
    paddingHorizontal: 30,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },

  quote: {
    fontSize: 18,
  },
  likeIcon: {
    marginLeft: 10,
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