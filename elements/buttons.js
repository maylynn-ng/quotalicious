import React from 'react';
import { Button } from 'react-native';

export const QuoteButton = ({buttonName, typeName, whichQuotes, setQuoteType}) => {
  return (
    <Button 
      title={buttonName}
      onPress={() => {
        setQuoteType(typeName)
        whichQuotes(typeName)}
      }
    />
  )
}

export const PictureButton = ({buttonName, typeName, whichPictures, setPictureType}) => {
  return (
    <Button
      title={buttonName}
      onPress={() => {
        setPictureType(typeName)
        whichPictures(typeName)
      }} 
    />
  )
}

export default {
  QuoteButton,
  PictureButton
}