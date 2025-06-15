import React, { useState, useEffect } from 'react';
import { CommonActions, useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator
} from 'react-native';
import { login } from '../api/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  // ClienteDashboard: undefined; ← aún no la tienes
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  time: {
    position: 'absolute',
    top: 50,
    right: 20,
    fontSize: 16,
    color: '#dc2626'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#dc2626',
    marginBottom: 8,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 24,
    textAlign: 'center'
  },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 14,
    borderRadius: 12,
    marginBottom: 16
  },
  togglePassword: {
    textAlign: 'right',
    color: '#dc2626',
    marginBottom: 16
  },
  button: {
    backgroundColor: '#dc2626',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

const handleLogin = async () => {
  if (!email || !contraseña) {
    Alert.alert('Error', 'Por favor ingresa tu correo y contraseña');
    return;
  }

  setIsLoading(true);
  try {
    const data = await login(email, contraseña);

    await AsyncStorage.setItem('token', data.token);
    await AsyncStorage.setItem('rol', data.rol);
    await AsyncStorage.setItem('usuario', JSON.stringify(data.usuario));

    Alert.alert('Éxito', `Bienvenido ${data.usuario.nombre}`);

    // ✅ Navegación corregida:
    if (data.rol === 'asesor') {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Home' }]
        })
      );
    } else {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'ClienteDashboard' }]
        })
      );
    }
  } catch (error: any) {
    Alert.alert('Error', error.message || 'Ocurrió un error al iniciar sesión');
  } finally {
    setIsLoading(false);
  }
};

return (
  <View style={styles.container}>
    <Text style={styles.time}>{currentTime}</Text>
    <Text style={styles.title}>Iniciar Sesión</Text>
    <Text style={styles.subtitle}>Ingresa tus credenciales para continuar</Text>
    <TextInput
      style={styles.input}
      placeholder="Correo electrónico"
      value={email}
      onChangeText={setEmail}
      autoCapitalize="none"
      keyboardType="email-address"
    />
    <TextInput
      style={styles.input}
      placeholder="Contraseña"
      value={contraseña}
      onChangeText={setContraseña}
      secureTextEntry={!showPassword}
    />
    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
      <Text style={styles.togglePassword}>
        {showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
      </Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={isLoading}>
      {isLoading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.buttonText}>Ingresar</Text>
      )}
    </TouchableOpacity>
  </View>
);

};

export default LoginScreen;
