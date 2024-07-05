import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Modal } from 'react-native';
import CalendarComponent from './CalendarComponent';
import { getTripData, storeTripData } from './Storage';
import { useNavigation, useRoute } from '@react-navigation/native';

function VacationScreen() {
  const [numPpl, setNumPpl] = useState(0);
  const [numVacationDays, setNumVacationDays] = useState(0);
  const [budget, setBudget] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const { tripId } = route.params;

  const [peopleModalVisible, setPeopleModalVisible] = useState(false);
  const [budgetModalVisible, setBudgetModalVisible] = useState(false);
  const [calendarModalVisible, setCalendarModalVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await getTripData(tripId);
      setNumPpl(data?.numPpl || 0);
      setNumVacationDays(data?.numVacationDays || 0);
      setBudget(data?.budget || '');
    })();
  }, [tripId]);

  const openPeopleModal = () => setPeopleModalVisible(true);
  const closePeopleModal = () => setPeopleModalVisible(false);
  const openCalendarModal = () => setCalendarModalVisible(true);
  const closeCalendarModal = () => setCalendarModalVisible(false);
  const openBudgetModal = () => setBudgetModalVisible(true);
  const closeBudgetModal = () => setBudgetModalVisible(false);

  const handleSetNumPpl = (value) => {
    const num = Number(value);
    setNumPpl(num);
    closePeopleModal();
    storeTripData(tripId, { numPpl: num, numVacationDays, budget });
  };

  const handleSetBudget = (value) => {
    setBudget(value);
    closeBudgetModal();
    storeTripData(tripId, { numPpl, numVacationDays, budget: value });
  };

  const handleDatesSelected = (daysSelected) => {
    setNumVacationDays(daysSelected);
    closeCalendarModal();
    storeTripData(tripId, { numPpl, numVacationDays: daysSelected, budget });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.text}>Welcome to the Vacation Screen!</Text>
        <View style={styles.dateContainer}>
          <Text style={styles.date}>Select the duration of your trip:</Text>
          <View style={styles.numPplContainer}>
            <TouchableOpacity onPress={openPeopleModal} style={styles.popupButton}>
              <Text style={styles.popupButtonText}>Number of people: {numPpl}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={openCalendarModal} style={styles.popupButton}>
              <Text style={styles.popupButtonText}>Number of vacation days: {numVacationDays}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={openBudgetModal} style={styles.popupButton}>
              <Text style={styles.popupButtonText}>Vacation budget: ${budget}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {(numPpl > 0 && numVacationDays > 0 && budget) && (
          <TouchableOpacity
            style={styles.continueButton}
            onPress={() => navigation.navigate('SecondvScreen', { numPpl, numVacationDays, budget })}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Modals for inputs */}
      <Modal visible={peopleModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter Number of People</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={numPpl.toString()}
              onChangeText={(text) => setNumPpl(Number(text))}
            />
            <TouchableOpacity style={styles.modalButton} onPress={() => handleSetNumPpl(numPpl)}>
              <Text style={styles.modalButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={budgetModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter Vacation Budget</Text>
            <TextInput
              style={styles.input}
              value={budget}
              onChangeText={(text) => setBudget(text)}
            />
            <TouchableOpacity style={styles.modalButton} onPress={() => handleSetBudget(budget)}>
              <Text style={styles.modalButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Calendar Modal */}
      <Modal visible={calendarModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Vacation Dates</Text>
            <CalendarComponent
              onDatesSelected={handleDatesSelected}
              onCloseCalendar={closeCalendarModal}
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFE5B4',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
    width: '100%',
  },
  text: {
    fontSize: 24,
    marginVertical: 20,
  },
  dateContainer: {
    width: '90%',
    padding: 20,
    backgroundColor: '#FFF5E1',
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  date: {
    fontFamily: 'Roboto',
    color: '#B7410E',
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  numPplContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  popupButton: {
    backgroundColor: '#FFD700',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '80%',
    alignItems: 'center',
  },
  popupButtonText: {
    fontSize: 18,
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#FFA500',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: '50%',
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 18,
    color: '#fff',
  },
  continueButton: {
    backgroundColor: '#FFA500',
    padding: 15,
    borderRadius: 30,
    marginTop: 20,
  },
  continueButtonText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default VacationScreen;
