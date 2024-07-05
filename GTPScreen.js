import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';

function GPTScreen() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleAskQuestion = () => {
    // Simulate an AI response
    const simulatedAnswer = getAIResponse(question);
    setAnswer(simulatedAnswer);
  };

  const getAIResponse = (question) => {
    // Placeholder function to simulate AI response
    // You can replace this with an actual API call to an AI service
    return `You asked: "${question}". This is a simulated response.`;
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🤖 Ask GPT</Text>
      <TextInput
        style={styles.input}
        placeholder="Ask a question..."
        value={question}
        onChangeText={setQuestion}
      />
      <TouchableOpacity style={styles.askButton} onPress={handleAskQuestion}>
        <Text style={styles.askButtonText}>Ask</Text>
      </TouchableOpacity>
      {answer ? (
        <View style={styles.answerContainer}>
          <Text style={styles.answerText}>{answer}</Text>
        </View>
      ) : null}
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
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#FF8C00',
  },
  askButton: {
    backgroundColor: '#FF8C00',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
  },
  askButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  answerContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  answerText: {
    fontSize: 16,
    color: '#6b7280',
  },
});

export default GPTScreen;
