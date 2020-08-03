import React, { useRef } from 'react';
import { SafeAreaView, View, Image } from 'react-native';
import LottieView from 'lottie-react-native';

import lickingLips from '../animations/lickingLips.json';

const Quotalicious = () => {
  const lipsAnimation = useRef();

  const playLips = () => {
    lipsAnimation.current.play();
  }

  return (
    <SafeAreaView>
      <View>
        <Image 
          source={{uri: "https://www.canva.com/design/DAEDtwD7Mxo/view"}} />
        <LottieView 
          ref={lipsAnimation}
          loop={false}
          source={lickingLips} />
      </View>
    </SafeAreaView>
  )
}

export default Quotalicious;