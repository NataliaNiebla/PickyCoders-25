import React, { useState, useEffect } from 'react';
import { View, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ClientModal from '../../components/ClientModal/ClientModal';
import { styles } from './HomeScreen.styles';
import { globalStyles } from '../../styles/globalStyles';
import { colors } from '../../styles/colors';

// Mock client data (replace with backend fetch if needed)
const mockClients = [
  {
    id: '1',
    name: 'Cliente 1',
    address: 'Calle Falsa 123',
    serviceStatus: 'Refrigerador funcionando',
    coordinates: { latitude: -33.4489, longitude: -70.6693 },
  },
  {
    id: '2',
    name: 'Cliente 2',
    address: 'Avenida Siempre Viva 456',
    serviceStatus: 'Mantenimiento pendiente',
    coordinates: { latitude: -33.4389, longitude: -70.6593 },
  },
];

const HomeScreen = () => {
  const [region, setRegion] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Load user's zone from AsyncStorage on mount
  useEffect(() => {
    const loadUserZone = async () => {
      try {
        const userZone = await AsyncStorage.getItem('userZone');
        if (userZone) {
          setRegion(JSON.parse(userZone));
        } else {
          // Default zone if none is set (e.g., Santiago, Chile)
          const defaultZone = {
            latitude: -33.4489,
            longitude: -70.6693,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          };
          await AsyncStorage.setItem('userZone', JSON.stringify(defaultZone));
          setRegion(defaultZone);
        }
      } catch (error) {
        console.error('Error loading user zone:', error);
      }
    };
    loadUserZone();
  }, []);

  const handleMarkerPress = (client) => {
    setSelectedClient(client);
    setModalVisible(true);
  };

  const handleEdit = () => {
    Alert.alert('Editar', `Editar información de ${selectedClient?.name}`);
    setModalVisible(false);
  };

  const handleViewHistory = () => {
    Alert.alert('Historial', `Consultar historial de ${selectedClient?.name}`);
    setModalVisible(false);
  };

  const handleGenerateReport = () => {
    Alert.alert('Reporte', `Generar reporte para ${selectedClient?.name}`);
    setModalVisible(false);
  };

  return (
    <View style={globalStyles.container}>
      {region && (
        <MapView
          style={styles.map}
          region={region}
          scrollEnabled={false}
          zoomEnabled={false}
          rotateEnabled={false}
          pitchEnabled={false}
        >
          {mockClients.map((client) => (
            <Marker
              key={client.id}
              coordinate={client.coordinates}
              title={client.name}
              pinColor={colors.pin}
              onPress={() => handleMarkerPress(client)}
            />
          ))}
        </MapView>
      )}
      <ClientModal
        visible={modalVisible}
        client={selectedClient}
        onClose={() => setModalVisible(false)}
        onEdit={handleEdit}
        onViewHistory={handleViewHistory}
        onGenerateReport={handleGenerateReport}
      />
    </View>
  );
};

export default HomeScreen;

export const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
