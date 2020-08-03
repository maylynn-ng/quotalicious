import React, { useRef } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

import lickingLips from '../animations/lickingLips.json';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Quotalicious = ({navigation}) => {
  const lipsAnimation = useRef();

  return (
    <SafeAreaView>
      <TouchableOpacity 
        onPress={() => navigation.navigate('Dashboard')}>

      <View style={styles.container}>
        <View style={styles.lips}>
          <LottieView 
            style={styles.lips}
            ref={lipsAnimation}
            autoPlay={true}
            loop={false}
            source={lickingLips} />
        </View>
        <Text style={styles.text}>Quotalicious</Text>
      </View>
      </TouchableOpacity>
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