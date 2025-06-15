import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AddClientModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  latitud: number;
  longitud: number;
}

export default function AddClientModal({
  isVisible,
  onClose,
  onSuccess,
  latitud,
  longitud
}: AddClientModalProps) {
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [refrigeradores, setRefrigeradores] = useState('');
  const [tipo, setTipo] = useState('');

  const handleGuardar = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      await axios.post(
        'http://localhost:3000/api/clientes',
        {
          nombre,
          direccion,
          numeroRefrigeradores: parseInt(refrigeradores),
          tipoEstablecimiento: tipo,
          estadoServicio: 'activo',
          ubicacion: {
            latitud,
            longitud
          }
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      console.error('Error al guardar cliente', err);
    }
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Agregar Cliente</Text>

          <TextInput
            placeholder="Nombre"
            style={styles.input}
            value={nombre}
            onChangeText={setNombre}
          />
          <TextInput
            placeholder="Dirección"
            style={styles.input}
            value={direccion}
            onChangeText={setDireccion}
          />
          <TextInput
            placeholder="Nº de refrigeradores"
            keyboardType="numeric"
            style={styles.input}
            value={refrigeradores}
            onChangeText={setRefrigeradores}
          />
          <TextInput
            placeholder="Tipo de establecimiento"
            style={styles.input}
            value={tipo}
            onChangeText={setTipo}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onClose} style={[styles.button, styles.cancel]}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleGuardar} style={styles.button}>
              <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    width: '90%',
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 16
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    backgroundColor: '#0066FF',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4
  },
  cancel: {
    backgroundColor: '#ccc'
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold'
  }
});
