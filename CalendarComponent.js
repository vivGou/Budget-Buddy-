import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarComponent = ({ onDatesSelected, onCloseCalendar }) => {
  const [selectedStart, setSelectedStart] = useState('');
  const [selectedEnd, setSelectedEnd] = useState('');

  const handleDayPress = (day) => {
    if (!selectedStart || (selectedStart && selectedEnd)) {
      setSelectedStart(day.dateString);
      setSelectedEnd('');
    } else if (selectedStart && !selectedEnd) {
      setSelectedEnd(day.dateString);
      const start = new Date(selectedStart);
      const end = new Date(day.dateString);
      const daysSelected = Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;
      onDatesSelected(daysSelected);
    }
  };

  const getMarkedDates = () => {
    let markedDates = {};

    if (selectedStart) {
      markedDates[selectedStart] = {
        selected: true,
        startingDay: true,
        color: '#FFA500',
      };

      if (selectedEnd) {
        let start = new Date(selectedStart);
        let end = new Date(selectedEnd);

        while (start <= end) {
          let dateString = start.toISOString().split('T')[0];
          markedDates[dateString] = {
            selected: true,
            color: '#FFA500',
            textColor: '#FFFFFF',
          };
          start.setDate(start.getDate() + 1);
        }

        markedDates[selectedEnd] = {
          selected: true,
          endingDay: true,
          color: '#FFA500',
        };
      } else {
        markedDates[selectedStart] = {
          selected: true,
          startingDay: true,
          endingDay: true,
          color: '#FFA500',
        };
      }
    }

    return markedDates;
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Calendar
          onDayPress={handleDayPress}
          markedDates={getMarkedDates()}
          markingType={'period'}
          theme={{
            selectedDayBackgroundColor: '#FFA500',
            todayTextColor: '#FFA500',
            dayTextColor: '#2d4150',
            textDisabledColor: '#d9e1e8',
            arrowColor: '#FFA500',
            monthTextColor: '#FFA500',
            indicatorColor: '#FFA500',
          }}
          style={styles.calendar}
        />
        <TouchableOpacity style={styles.continueButton} onPress={onCloseCalendar}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFE5B4',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  calendar: {
    width: '100%',
  },
  continueButton: {
    marginTop: 20,
    backgroundColor: '#FFA500',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CalendarComponent;
