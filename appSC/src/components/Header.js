import react from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Header() {
    return (
        <View style={styles.container}>
        <Text style={styles.title}>Mi Aplicación</Text>
        <Text style={styles.subtitle}>Bienvenido a la app</Text>
        </View>
    );
    }

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#6200ee',
        padding: 20,
        alignItems: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    subtitle: {
        color: '#fff',
        fontSize: 16,
    },
});