import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons'; 

const HomeQuote = ({quote, storeData, removeFavorite, author}) => {

  const [isLiked, setIsLiked] = useState(false);
  // const item = 
  
  // (JSON.parse(item[0])).toString()

  return (
    <View style={styles.quoteBox}> 
      <View>
        <Text style={styles.quote}>"{quote}"</Text>
        <Text style={styles.author}>-{author}</Text>
      </View>

        {/* <TouchableOpacity 
          onPress={() => {
            if (!isLiked) {
              storeData();
              setIsLiked(true)}
            else {
              // removeFavorite();
              setIsLiked(false)}
          }}>
        {!isLiked
          ? <AntDesign 
            style={styles.likeIcon}
            name="hearto" 
            size={36} 
            color="black" />
            : <AntDesign 
                style={styles.likeIcon}
                name="heart" 
                size={36} 
                color="black" />} */}

        {/* </TouchableOpacity> */}
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