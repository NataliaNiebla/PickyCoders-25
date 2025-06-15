import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

const Layout = ({ children, scroll = true }) => {
  const Container = scroll ? ScrollView : View;

  return (
    <Container style={styles.container}>
      <View style={styles.inner}>{children}</View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 16,
  },
  inner: {
    paddingVertical: 20,
  },
});

export default Layout;


