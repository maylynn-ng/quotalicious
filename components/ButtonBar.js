import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import Modal from 'react-native-modal';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import QuoteForm from './QuoteForm';
import { QuoteButton, PictureButton } from '../elements/buttons';

const ButtonBar = ({whichPictures, displayForm, setDisplayForm, setDisplaySettings, whichQuotes, setPicture, setQuote, setQuoteType, setPictureType}) => {

  let isSettingsVisible = true;

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

  const _pickImage = async () => {
    try { 
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1
      });
      if (!result.cancelled) {
        setPicture(result.uri)
      }
    } catch (error) {
      console.error('error in picking Image: ', error)
    }
  }

  return (
    <View>
      <Modal
        style={styles.quoteForm}
        onBackdropPress={() => setDisplayForm(false)}
        animationIn='bounceInUp'
        animationOut='bounceOutDown'
        isVisible={displayForm} 
        >
          <QuoteForm
          setQuote={setQuote}
          displayForm={displayForm}
          setDisplaySettings={setDisplaySettings}
          setDisplayForm={setDisplayForm} />
        </Modal>

      {isSettingsVisible &&
      <View style={styles.container} >
        <View>
          <Text style={styles.headings} >QUOTE CHOICE</Text>
          <FlatList
            data={QUOTE_CHOICE}
            keyExtractor={(item) => item.buttonType}
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
            keyExtractor={(item) => item.buttonType}
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
                setDisplayForm(true);
                isSettingsVisible = false;}} />
            <Button
              title="Image"
              onPress={() => _pickImage()} />
        </View>
      </View> }
    </View>
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
  },
  quoteForm: {
    marginTop: -200,
  }
})

export default ButtonBar;
