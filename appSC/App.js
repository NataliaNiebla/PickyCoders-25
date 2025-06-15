import React from 'react';
import { Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import GlobalStyles from './constants/GlobalStyles'; 
import Home from './screens/Home'; 

export default function App() {
  const [fontsLoaded] = useFonts({
    'inter': require('./assets/fonts/inter.ttf'),
  });

  if (!fontsLoaded) return null;

  return (
    <View style={GlobalStyles.container}>
      <Home />
    </View>
  );
}


