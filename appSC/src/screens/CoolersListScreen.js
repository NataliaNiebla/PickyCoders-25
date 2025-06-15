// /screens/CoolersListScreen.js
import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import Layout from "../components/Layout";
import GlobalStyles from "../constants/GlobalStyles";
import Colors from "../constants/Colors";

const coolersData = [
  { id: "C001", temp: 5.1, riesgo: 0.8 },
  { id: "C002", temp: 3.8, riesgo: 0.3 },
  { id: "C003", temp: 6.4, riesgo: 0.95 },
];

const CoolersListScreen = () => {
  const renderCooler = ({ item }) => {
    const riesgoColor =
      item.riesgo > 0.7
        ? Colors.danger
        : item.riesgo > 0.4
        ? Colors.warning
        : Colors.success;

    return (
      <View style={[GlobalStyles.card, { borderLeftWidth: 5, borderLeftColor: riesgoColor }]}>
        <Text style={GlobalStyles.text}>ID: {item.id}</Text>
        <Text style={GlobalStyles.text}>Temp: {item.temp} °C</Text>
        <Text style={[GlobalStyles.text, { color: riesgoColor }]}>
          Riesgo: {(item.riesgo * 100).toFixed(1)}%
        </Text>
        <TouchableOpacity>
          <Text style={{ color: Colors.primary, marginTop: 6 }}>Ver Detalles</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
  <Layout scroll={false}>
    <Text style={GlobalStyles.title}>Lista de Coolers</Text>
    <FlatList
      data={coolersData}
      keyExtractor={(item) => item.id}
      renderItem={renderCooler}
    />
  </Layout>
);
};

export default CoolersListScreen;
