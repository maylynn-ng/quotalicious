import React, { useState, useEffect, Component } from 'react';
import { StyleSheet, View, SafeAreaView, ImageBackground, Animated } from 'react-native';
import { FlingGestureHandler, Directions, State } from 'react-native-gesture-handler';
import HomeQuote from './components/homeQuote';
import { randomQuote, randomPicture } from './ApiClientService';


// export default function App() {
//   const [quote, setQuote] = useState('quotey-quote quote');
//   const [quoteAuthor, setQuoteAuthor] = useState('Author McAuthorFace');
//   const [picture, setPicture] = useState('');

//   const getRandomQuote = () => {
//     randomQuote()
//       .then(res => {
//         setQuote(res.quote.quoteText)
//         setQuoteAuthor(res.quote.quoteAuthor)
//       });
//   }

//   const getRandomPicture = () => {
//     randomPicture()
//       .then(res => setPicture(res.url))
//   }

//   useEffect(() => {
//     getRandomQuote();
//     getRandomPicture();
//   }, [])


//   return (
//     <SafeAreaView>
//       <View> 
//         <ImageBackground 
//         style={styles.container}
//         source={{
//           uri: picture
//         }}>
//           <FlingGestureHandler
//             direction={Directions.RIGHT | Directions.LEFT}
//             onGestureEvent={() => getRandomQuote()}>
//             <Animated.HomeQuote quote={quote} author={quoteAuthor}/>
//           </FlingGestureHandler>
//         </ImageBackground>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     height: '100%',
//     alignContent: 'center',
//     justifyContent: 'center',
//   },
// });

export default class App extends Component {

  constructor(props) {
    super(props);
    this.quote = 'quotey quote';
    this.quoteAuthor = 'author mcAuthorFace';
    this.picture = '';
  }

  componentDidMount() {
    getRandomQuote();
    getRandomPicture();
  }

  getRandomQuote = () => {
    randomQuote()
      .then(res => {
        this.quote = res.quote.quoteText;
        this.quoteAuthor = res.quote.quoteAuthor
      });
  }

  getRandomPicture = () => {
    randomPicture()
      .then(res => this.picture = res.url)
  }

  render() {
    return (
      <SafeAreaView>
        <View> 
          <ImageBackground 
          style={styles.container}
          source={{
            uri: this.picture
          }}>
            <FlingGestureHandler
              direction={Directions.RIGHT | Directions.LEFT}
              onGestureEvent={() => this.getRandomQuote()}>
              <Animated.HomeQuote quote={this.quote} author={this.quoteAuthor}/>
            </FlingGestureHandler>
          </ImageBackground>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignContent: 'center',
    justifyContent: 'center',
  },
});
