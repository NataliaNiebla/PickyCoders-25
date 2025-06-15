import React from "react";
import { View, Text } from "react-native";
import Layout from "../components/Layout";
import GlobalStyles from "../constants/GlobalStyles";

const ProfileScreen = () => {
  return (
    <Layout>
      <Text style={GlobalStyles.title}>Perfil del Cliente</Text>
      <View style={GlobalStyles.card}>
        <Text style={GlobalStyles.text}>Nombre: Juan Pérez</Text>
        <Text style={GlobalStyles.text}>Correo: juan@example.com</Text>
        <Text style={GlobalStyles.text}>ID Cliente: 124XK9</Text>
      </View>
    </Layout>
  );
};

export default ProfileScreen;

