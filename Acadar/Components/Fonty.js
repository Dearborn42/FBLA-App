import React, { Children, useEffect } from 'react';
import { Text, View } from 'react-native';
import * as Font from 'expo-font';

const Fonty = ({children}) => {
  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        'ARCO': require('../assets/fonts/ARCO.ttf'),
      });
    };

    loadFont();
  }, []);
  return children
}

export default Fonty;
