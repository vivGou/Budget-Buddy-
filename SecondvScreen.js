import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const SecondvScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { numPpl, numVacationDays, budget } = route.params;

  // Calculate the budget per person per day
  const calculatedBudget = budget / (numPpl * numVacationDays);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <Text style={styles.headerText}>Trip Details</Text>
          <Text style={styles.infoText}>{numPpl} people</Text>
          <Text style={styles.infoText}>{numVacationDays} days</Text>
          <Text style={styles.infoText}>${budget} budget</Text>
        </View>
        
        <View style={styles.budgetContainer}>
          <Text style={[styles.budgetText, styles.highlightText]}>
            Each person can spend ${calculatedBudget.toFixed(2)} per day to stay within the budget.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => navigation.navigate('AmountScreen', { budget, numVacationDays })}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#FFE5B4', // Light peach color
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  infoContainer: {
    backgroundColor: '#FFF5E1', // Light orange
    borderRadius: 10,
    padding: 20,
    shadowColor: '#FF4500',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF7F50', // Coral color
    marginBottom: 20,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 22,
    color: '#FF6347', // Light red-orange
    marginVertical: 5,
    textAlign: 'center',
  },
  budgetContainer: {
    backgroundColor: '#FFA500', // Lighter orange
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  budgetText: {
    fontSize: 18,
    color: '#FFF', // Darker orange
    textAlign: 'center',
  },
  highlightText: {
    fontWeight: 'bold',
    color: '#FFF', // Light red-orange for highlighted text
  },
  continueButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#FFA500',
    padding: 15,
    borderRadius: 30,
  },
  continueButtonText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default SecondvScreen;
