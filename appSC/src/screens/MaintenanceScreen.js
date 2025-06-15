// /screens/MaintenanceScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import Layout from "../components/Layout";
import GlobalStyles from "../constants/GlobalStyles";

const MaintenanceScreen = () => {
  const [coolerId, setCoolerId] = useState("");
  const [comentario, setComentario] = useState("");

  const handleSubmit = () => {
    if (coolerId && comentario) {
      Alert.alert("✅ Registro exitoso", `Cooler: ${coolerId}`);
      setCoolerId("");
      setComentario("");
    } else {
      Alert.alert("⚠️ Campos requeridos", "Completa todos los campos.");
    }
  };

  return (
    <Layout>
      <Text style={GlobalStyles.title}>Registrar Mantenimiento</Text>

      <View style={GlobalStyles.card}>
        <Text style={GlobalStyles.text}>ID del Cooler</Text>
        <TextInput
          value={coolerId}
          onChangeText={setCoolerId}
          placeholder="Ej. C001"
          style={{ borderBottomWidth: 1, marginBottom: 12 }}
        />

        <Text style={GlobalStyles.text}>Comentario</Text>
        <TextInput
          value={comentario}
          onChangeText={setComentario}
          placeholder="Descripción del mantenimiento"
          multiline
          style={{
            borderWidth: 1,
            padding: 10,
            marginBottom: 16,
            minHeight: 80,
            textAlignVertical: "top",
          }}
        />

        <Button title="Registrar" onPress={handleSubmit} />
      </View>
    </Layout>
  );
};

export default MaintenanceScreen;
