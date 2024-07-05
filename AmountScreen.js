import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Grid from './Grid'; // Adjust the path according to your file structure
import { storeTripData, getTripData } from './Storage'; // Import storage functions

const AmountScreen = ({ route }) => {
  const { numVacationDays, tripId } = route.params; // Extract parameters from navigation route

  const [initialBudget, setInitialBudget] = useState(0); // State to hold the initial budget
  const [budget, setBudget] = useState(0); // State to hold the current budget
  const [dayData, setDayData] = useState(Array.from({ length: numVacationDays }, () => ({})));

  useEffect(() => {
    // Fetch initial budget from route params
    if (route.params && route.params.budget) {
      setInitialBudget(route.params.budget);
      setBudget(route.params.budget);
    }
  }, [route.params]);

  useEffect(() => {
    const fetchTripData = async () => {
      const tripData = await getTripData(tripId);
      if (tripData) {
        setBudget(tripData.budget || initialBudget);
        setDayData(tripData.dayData || Array.from({ length: numVacationDays }, () => ({})));
      }
    };
    fetchTripData();
  }, [tripId, initialBudget, numVacationDays]);

  useEffect(() => {
    const saveTripData = async () => {
      await storeTripData(tripId, { budget, dayData });
    };
    saveTripData();
  }, [tripId, budget, dayData]);

  const handleSetDayData = (index, data) => {
    const newDayData = [...dayData];
    newDayData[index] = data;
    setDayData(newDayData);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.text}>Total Budget: ${budget}</Text>
        {Array.from({ length: numVacationDays }).map((_, index) => (
          <View key={index} style={styles.dayContainer}>
            <Text style={styles.dayTitle}>Day {index + 1}</Text>
            <Grid
              days={1}
              dayIndex={index + 1}
              setBudget={setBudget}
              setDayData={(data) => handleSetDayData(index, data)}
            />
          </View>
        ))}
      </View>

      <View style={styles.container2}>
        <TouchableOpacity style={styles.clearButton} onPress={() => setBudget(initialBudget)}>
          <Text style={styles.clearButtonText}>Clear All</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#FFE5B4', // Light peach color
  },
  container: {
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
    marginTop: 0, // Added marginTop to move the container to the top
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF7F50', // Coral color
    marginBottom: 20,
    textAlign: 'center',
  },
  dayContainer: {
    marginBottom: 30,
    width: '90%',
    alignItems: 'center',
    backgroundColor: '#FFF5E1',
    padding: 10,
    borderRadius: 10,
  },
  dayTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF7F50',
    marginBottom: 10,
  },
  container2: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: '#8B4513', // Dark brown
    padding: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  clearButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  clearButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default AmountScreen;
