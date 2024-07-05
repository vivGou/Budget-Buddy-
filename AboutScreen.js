import React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';

function AboutScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>About Page</Text>
      <Text style={styles.text}>
        Welcome to the Budget app! The key benefits of budget apps are shown as they are
        incredibly effective for financial management by tracking income, expenses, and savings. 
        By simplifying real-time expense tracking, our app helps users know how to spend their money wisely -- 
        identifying areas of excessive spending and reducing unnecessary expenses.
        Whether you are saving for a vacation, starting a business, or planning a family trip,
        this app will allow you to track your progress and stay motivated!
        Customizable budget planning enables allocation across groceries, utilities,
        entertainment, and more, ensuring your spending remains within defined limits.
      </Text>

      <View style={styles.buttonContainer}>
        <Button title="Continue" onPress={() => navigation.navigate('Home')} color="#FF8C00" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFE5B4', // Light peach color
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF7F50', // Coral color
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});

export default AboutScreen;
