import { Stack } from 'expo-router';
import { useState, useEffect } from 'react';

const TabsLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Simulación de verificación de autenticación (puedes usar un token o estado global)
    const checkAuth = () => {
      // Aquí podrías verificar un token almacenado (e.g., AsyncStorage)
      // Por ahora, asumimos que el login establece un estado
      setIsAuthenticated(!!false); // Cambia a true después de login
    };
    checkAuth();
  }, []);

  if (!isAuthenticated) {
    // Redirige al login si no está autenticado
    return null; // Expo Router manejará la redirección a (auth)
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="explore" options={{ title: 'Explore' }} />
    </Stack>
  );
};

export default TabsLayout;