import React from 'react';
import { View, Text, FlatList, SafeAreaView, StyleSheet, Button } from 'react-native';

import { QuoteButton, PictureButton } from '../elements/buttons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

const ButtonBar = ({navigation, whichPictures, toggleDisplayForm, toggleDisplaySettings, whichQuotes, setQuoteType, setPictureType}) => {

  const IMAGE_CHOICE = [
    { buttonName: 'Random',
      buttonType: 'random'},
    { buttonName: 'Monochrome',
      buttonType: 'bw'},
    { buttonName: 'Blur',
      buttonType: 'blur'}];

  const QUOTE_CHOICE = [
    { buttonName: 'Inspirational',
      buttonType: 'random'},
    { buttonName: 'Kanye West',
      buttonType: 'kanye'},
    { buttonName: 'Donald Trump',
      buttonType: 'trump'},
    { buttonName: 'Taylor Swift',
      buttonType: 'taylor'}];
  
  return (
    <SafeAreaView>
      <View style={styles.container} >
        <View>
          <Text style={styles.headings} >QUOTE CHOICE</Text>
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
          <Text style={styles.headings} >IMAGE CHOICE</Text>
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
        <View>
          <Text style={styles.headings} >CUSTOMIZE</Text>
            <Button
              title="Quote"
              onPress={() => {
                toggleDisplayForm()
                toggleDisplaySettings()}} />
        </View>
      </View> 
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    opacity: 0.8,
    borderRadius: 5,
    width: '60%',
    padding: 10,
  },
  headings: {
    textAlign: 'center',
    margin: 5,
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
  }
})

export default ButtonBar;
