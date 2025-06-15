import { StyleSheet } from "react-native";
import Colors from "./Colors";

const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 16,
  },
  title: {
    fontSize: 24,
    color: Colors.primary,
    marginBottom: 12,
    fontFamily: 'inter',
  },
  text: {
    fontSize: 16,
    color: Colors.text,
    fontFamily: 'inter',
  },
  customFont: {
    fontFamily: 'inter',
  },
  card: {
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    marginVertical: 8,
  },
});

export default GlobalStyles;
