import React from 'react';
import { Text, View, TextInput, StyleSheet, Button } from 'react-native';
import { useValue } from './ValueContext';
import { useNavigation } from '@react-navigation/native';

function SettingsScreen() {
  const { currentValue, setCurrentValue } = useValue();
  const navigation = useNavigation();

  const isUsernameFilled = currentValue.username !== '';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter username"
        placeholderTextColor="#FF8C00"
        onChangeText={(text) => {
          setCurrentValue({ ...currentValue, username: text });
        }}
      />
      {isUsernameFilled && (
        <>
          <Text style={styles.welcomeText}>Welcome to Budget Buddy {currentValue.username}!</Text>
          <View style={styles.buttonContainer}>
            <Button title="Continue" onPress={() => navigation.navigate('About')} color="#FF4500" />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE5B4',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FF8C00',
    fontFamily: 'Cochin',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#FF8C00',
    borderWidth: 1,
    margin: 10,
    width: '80%',
    padding: 10,
    color: '#D2691E',
  },
  welcomeText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#D2691E',
    marginVertical: 10,
    lineHeight: 24,
  },
  continueText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#D2691E',
    marginVertical: 10,
    lineHeight: 24,
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
});

export default SettingsScreen;
