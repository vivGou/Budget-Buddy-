import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function VacationScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Other Screen!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE5B4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
  },
});

export default VacationScreen;