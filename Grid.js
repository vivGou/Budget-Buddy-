import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, ScrollView, Text } from 'react-native';

const Grid = ({ days, dayIndex, setBudget, setDayData }) => {
  const createInitialGridData = () => [
    ['Activity', 'Amount'],
    ['', ''],
  ];

  const [gridData, setGridData] = useState(Array.from({ length: days }, createInitialGridData));
  const [blinkOpacity, setBlinkOpacity] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlinkOpacity(opacity => (opacity === 1 ? 0 : 1)); // Toggle opacity
    }, 1000); // Interval for blinking (1000ms)

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  useEffect(() => {
    setDayData(gridData);
  }, [gridData, setDayData]);

  const addRow = (dayIndex) => {
    const newGridData = gridData.map((grid, index) => {
      if (index === dayIndex) {
        return [...grid, ['', '']];
      }
      return grid;
    });
    setGridData(newGridData);
  };

  const updateCell = (dayIndex, rowIndex, colIndex, value) => {
    const newGridData = gridData.map((grid, gIndex) => {
      if (gIndex === dayIndex) {
        return grid.map((row, rIndex) =>
          row.map((cell, cIndex) => (rIndex === rowIndex && cIndex === colIndex ? value : cell))
        );
      }
      return grid;
    });
    setGridData(newGridData);

    // Handle amount input and update budget
    if (rowIndex > 0 && colIndex === 1) {
      const amount = parseFloat(value);
      if (!isNaN(amount) && amount >= 0) {
        const previousAmount = parseFloat(gridData[dayIndex][rowIndex][colIndex]) || 0;
        const difference = amount - previousAmount;
        setBudget(prevBudget => prevBudget - difference); // Update the budget
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {gridData.map((grid, gridDayIndex) => (
          <View key={gridDayIndex} style={styles.dayContainer}>
            <Text style={styles.dayText}>Day {gridDayIndex + 1}</Text>
            {grid.map((rowData, rowIndex) => (
              <View key={rowIndex} style={styles.row}>
                {rowData.map((item, colIndex) => (
                  <View key={colIndex} style={styles.cell}>
                    <TextInput
                      style={rowIndex === 0 ? styles.headerText : styles.cellText}
                      value={item}
                      onChangeText={(text) => updateCell(gridDayIndex, rowIndex, colIndex, text)}
                      placeholder={rowIndex === 0 ? (colIndex === 0 ? 'Activity' : 'Amount') : ''}
                      editable={!(rowIndex === 0 && colIndex === 1)} // Make header text non-editable
                    />
                  </View>
                ))}
              </View>
            ))}
            <TouchableOpacity style={styles.addRowButton} onPress={() => addRow(gridDayIndex)}>
              <Text style={[styles.addRowText, { opacity: blinkOpacity }]}>➕ Add Row</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  dayContainer: {
    marginBottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  dayText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF7F50',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cell: {
    backgroundColor: '#FFF5E1',
    borderWidth: 2,
    borderColor: '#FC6A03',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    minWidth: 100,
    maxWidth: 200,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF7F50',
    textAlign: 'center',
  },
  cellText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  addRowButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#FCAE1E',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addRowText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default Grid;
