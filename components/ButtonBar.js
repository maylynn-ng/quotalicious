import React from 'react';
import { View, Text, FlatList, SafeAreaView } from 'react-native';

import { QuoteButton, PictureButton } from '../elements/buttons';

const ButtonBar = ({ route }) => {
  const {whichPictures, whichQuotes, setQuoteType, setPictureType} = route.params
  const IMAGE_CHOICE = [
    {
      buttonName: 'Random',
      buttonType: 'random'
    },
    {
      buttonName: 'Monochrome',
      buttonType: 'bw'
    },
    {
      buttonName: 'Blur',
      buttonType: 'blur'
    }
  ];

  const QUOTE_CHOICE = [
    {
      buttonName: 'Inspirational',
      buttonType: 'random'
    },
    {
      buttonName: 'Kanye West',
      buttonType: 'kanye'
    },
    {
      buttonName: 'Donald Trump',
      buttonType: 'trump'
    },
    {
      buttonName: 'Taylor Swift',
      buttonType: 'taylor'
    }
  ];
  
  return (
    <SafeAreaView>
      <View>
        <Text>QUOTE CHOICE</Text>
        <FlatList
          data={QUOTE_CHOICE}
          keyExtractor={(item) => item.index}
          renderItem={
            ({item}) => <QuoteButton 
              buttonName={item.buttonName}
              typeName={item.buttonType}
              setQuoteType={setQuoteType}
              whichQuotes={whichQuotes} />}
          />
      </View>
      <View>
        <Text>IMAGE CHOICE</Text>
        <FlatList
          data={IMAGE_CHOICE}
          keyExtractor={(item) => item.index}
          renderItem={
            ({item}) => <PictureButton 
              buttonName={item.buttonName}
              typeName={item.buttonType}
              setPictureType={setPictureType}
              whichPictures={whichPictures} />}
          />
      </View>
    </SafeAreaView>
  )
}

export default ButtonBar;
