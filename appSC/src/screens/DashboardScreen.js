// Resumen del estado general de los coolers
import React from "react";
import { View, Text } from "react-native";
import Layout from "../components/Layout";
import GlobalStyles from "../constants/GlobalStyles";
import Colors from "../constants/Colors";

const DashboardScreen = () => {
  const totalCoolers = 40;
  const fallas = 7;
  const temperaturaPromedio = 4.5;

  return (
    <Layout>
      <Text style={GlobalStyles.title}>Dashboard General</Text>

      <View style={GlobalStyles.card}>
        <Text style={GlobalStyles.text}>Coolers Totales: {totalCoolers}</Text>
        <Text style={GlobalStyles.text}>Coolers con Falla: {fallas}</Text>
        <Text style={GlobalStyles.text}>Temp. Promedio: {temperaturaPromedio} °C</Text>
      </View>

      <View style={GlobalStyles.card}>
        <Text style={[GlobalStyles.text, { color: Colors.warning }]}>
          ⚠️ Coolers en Riesgo: {(fallas / totalCoolers * 100).toFixed(1)}%
        </Text>
      </View>
    </Layout>
  );
};

export default DashboardScreen;
