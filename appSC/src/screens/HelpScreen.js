import React from 'react';
import { View, Text } from 'react-native';

export default function HelpScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Manual de usuario</Text>
      <Text>Instrucciones de uso</Text>
      <Text>Preguntas frecuentes</Text>
      <Text>Contacto de soporte</Text>
    </View>
  );
}

