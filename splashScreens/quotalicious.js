import React, { useRef, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

import lickingLips from '../animations/lickingLips.json';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const Quotalicious = ({navigation}) => {
  const lipsAnimation = useRef();

  const goToDashboard = () => {
    setTimeout(() => {
      navigation.navigate('Dashboard');
    }, 4000)
  }

  useEffect(() => {
    lipsAnimation.current.play();
  }, [])

  return (
    <SafeAreaView>
      <TouchableWithoutFeedback 
        onPress={() => {
          lipsAnimation.current.play()
          goToDashboard();}}>

      <View style={styles.container}>
        <View style={styles.lips}>
          <LottieView 
            style={styles.lips}
            ref={lipsAnimation}
            autoPlay={true}
            onAnimationFinish={() => navigation.navigate('Dashboard')}
            loop={false}
            source={lickingLips} />
        </View>
        <Text style={styles.text}>Quotalicious</Text>
      </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },
  text: {
    alignSelf: 'center',
    fontSize: 56,
    fontWeight: 'bold',
    position: 'absolute',
    top: 150,
  },
  lips: {
    height: 400,
    width: 400,
    alignSelf: 'center',
  }
})

export default Quotalicious;