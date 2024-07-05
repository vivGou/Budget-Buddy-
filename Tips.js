import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';


function TipsScreen() {
  const tipsData = [
    {
      title: 'Plan Your Budget',
      content: 'Allocate funds for accommodation, meals, transportation, and activities.',
    },
    {
      title: 'Use Travel Apps',
      content: 'Apps like currency converters and budget trackers can help manage expenses.',
    },
    {
      title: 'Eat Local Cuisine',
      content: 'Local restaurants often offer affordable and authentic dining experiences.',
    },
    {
      title: 'Pack Light',
      content: 'Avoid excess baggage fees and streamline your travel essentials.',
    },
    {
      title: 'Book Accommodation Early',
      content: 'Save money by booking your accommodation in advance, especially during peak seasons.',
    },
    {
      title: 'Travel Off-peak',
      content: 'Consider traveling during off-peak seasons for lower prices on flights and accommodations.',
    },
    {
      title: 'Shop at Local Markets',
      content: 'Explore local markets for fresh produce and unique souvenirs at better prices than tourist areas.',
    },
    {
      title: 'Use Public Transportation',
      content: 'Opt for public transport or walk instead of taxis to save on transportation costs.',
    },
    {
      title: 'Limit Dining Out',
      content: 'Balance dining out with preparing your meals to control expenses and experience local flavors.',
    },
  ];

  const navigation = useNavigation();

  const renderTips = () => {
    return tipsData.map((tip, index) => (
      <View key={index} style={styles.tipContainer}>
        <Text style={styles.tipTitle}>{tip.title}</Text>
        <Text style={styles.tipContent}>{tip.content}</Text>
      </View>
    ));
  };

  const handleClose = () => {
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🌟 Budget Tips for Your Trip</Text>
      <View style={styles.tipsContainer}>
        {renderTips()}
      </View>
      <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE5B4',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#FF8C00',
  },
  tipsContainer: {
    marginBottom: 20,
  },
  tipContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  tipTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FF8C00',
  },
  tipContent: {
    fontSize: 16,
    color: '#6b7280',
  },
  closeButton: {
    backgroundColor: '#FF8C00',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TipsScreen;
