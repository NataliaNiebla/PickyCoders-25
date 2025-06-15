import { View, StyleSheet } from 'react-native';
import Header from '../components/Header'; // Asegúrate de que la ruta sea correcta

export default function ScreenLayout({ children }) {
  return (
    <View style={styles.container}>
     
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
