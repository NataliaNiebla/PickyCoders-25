import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { globalStyles } from '../../constants/GlobalStyles';

const ClientModal = ({ visible, client, onClose, onEdit, onViewHistory, onGenerateReport }) => { // componente modal para la información detallada de un cliente
  if (!client) return null;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>{client.name}</Text>
          <Text style={styles.detail}>Dirección: {client.address}</Text>
          <Text style={styles.detail}>Estado del servicio: {client.serviceStatus}</Text>
          
          <TouchableOpacity style={globalStyles.button} onPress={onEdit}>
            <Text style={globalStyles.buttonText}>Editar Información</Text>
          </TouchableOpacity>
          <TouchableOpacity style={globalStyles.button} onPress={onViewHistory}>
            <Text style={globalStyles.buttonText}>Consultar Historial</Text>
          </TouchableOpacity>
          <TouchableOpacity style={globalStyles.button} onPress={onGenerateReport}>
            <Text style={globalStyles.buttonText}>Generar Reporte</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[globalStyles.button, styles.closeButton]} onPress={onClose}>
            <Text style={globalStyles.buttonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ClientModal;

import { StyleSheet } from 'react-native';
import { colors } from '../../constants/Colors';

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.modalBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 10,
  },
  detail: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: colors.gray,
  },
});

