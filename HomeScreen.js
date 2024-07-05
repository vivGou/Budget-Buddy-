import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useValue } from './ValueContext';
import { useNavigation } from '@react-navigation/native';
import { clearTripData, storeTrips, loadTrips } from './Storage';

function HomeScreen() {
  const { currentValue } = useValue();
  const navigation = useNavigation();
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    // Load trips from storage when component mounts
    const fetchTrips = async () => {
      const storedTrips = await loadTrips();
      setTrips(storedTrips);
    };

    fetchTrips();
  }, []);

  useEffect(() => {
    // Store trips in storage whenever trips state changes
    storeTrips(trips);
  }, [trips]);

  const handleAddTrip = async () => {
    const newTripId = Date.now().toString(); // Unique ID based on timestamp
    await clearTripData(newTripId);
    setTrips([...trips, { id: newTripId, name: '' }]);
  };

  const handleSaveTripName = (index, name) => {
    const updatedTrips = trips.map((trip, i) => (i === index ? { ...trip, name } : trip));
    setTrips(updatedTrips);
  };

  const handleClearTrip = (index) => {
    const tripId = trips[index].id;
    clearTripData(tripId);
    const updatedTrips = trips.filter((_, i) => i !== index);
    setTrips(updatedTrips);
  };

  const handleNavigateToTrip = (trip) => {
    navigation.navigate('Vacation', { tripId: trip.id, tripName: trip.name });
  };

  const handleNewTrip = () => {
    navigation.navigate('Tips');
  };

  const handleGPT = () => {
    navigation.navigate('GPTScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topRightContainer}>
        <Text style={styles.topRightText}>👤 {currentValue.username}</Text>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>🌄 Add Trip!</Text>
      </View>
      <ScrollView style={styles.tripList} contentContainerStyle={styles.tripListContent}>
        {trips.map((trip, index) => (
          <View key={trip.id} style={styles.newTripContainer}>
            <TextInput
              style={styles.input}
              placeholder="Unnamed Trip"
              value={trip.name}
              onChangeText={(name) => handleSaveTripName(index, name)}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.tripButton}
                onPress={() => handleNavigateToTrip(trip)}
              >
                <Text style={styles.tripButtonText}>{trip.name ? `✈️ ${trip.name}` : '✈️'}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.clearButton}
                onPress={() => handleClearTrip(index)}
              >
                <Text style={styles.clearButtonText}>❌</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
        <TouchableOpacity style={styles.addButton} onPress={handleAddTrip}>
          <Text style={styles.addButtonText}>➕ Add Trip</Text>
        </TouchableOpacity>
      </ScrollView>
      <TouchableOpacity style={styles.newTripButton} onPress={handleNewTrip}>
        <Text style={styles.newTripButtonText}>💡 Tips</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.gptButton} onPress={handleGPT}>
        <Text style={styles.gptButtonText}>🤖 GPT</Text>
      </TouchableOpacity>
    </View>
  );
}

const buttonSize = 60;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE5B4',
    alignItems: 'center',
    padding: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  titleText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FF8C00',
    fontFamily: 'Cochin',
  },
  topRightContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    alignItems: 'flex-end',
  },
  topRightText: {
    textAlign: 'right',
    color: '#D2691E',
    fontSize: 16,
    fontWeight: '500',
  },
  addButton: {
    backgroundColor: '#FF8C00',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  newTripContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    width: '90%',
    padding: 15,
    borderColor: '#FF8C00',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    textAlign: 'center',
    backgroundColor: '#FFF5E1',
  },
  tripList: {
    width: '100%',
  },
  tripListContent: {
    alignItems: 'center',
    paddingBottom: 25,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  tripButton: {
    backgroundColor: '#FF8C00',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginRight: 10,
    width: '40%',
  },
  tripButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  clearButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  clearButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  newTripButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: '#FF8C00',
    width: buttonSize,
    height: buttonSize,
    borderRadius: buttonSize / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  newTripButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  gptButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#FF8C00',
    width: buttonSize,
    height: buttonSize,
    borderRadius: buttonSize / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gptButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
