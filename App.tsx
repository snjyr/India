import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import axios from 'axios';

const App = () => {
  const [inputText, setInputText] = useState('');
  const [responseText, setResponseText] = useState('');

  const handleSendRequest = async () => {
    try {
      // Mistral API endpoint
      const apiUrl = 'https://api.mistral.ai/v1/chat/completions';

      // Replace with your actual API key
      const apiKey = 'your_api_key_here';

      // Data structure to send to the Mistral API
      const data = {
        model: 'mistral-large-latest', // Specify the model you want to use
        messages: [
          {
            role: 'user',
            content: inputText,  // User's input text
          },
        ],
      };

      // Send POST request to the Mistral API
      const response = await axios.post(apiUrl, data, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      });

      // Assuming the response has a specific structure to extract the result
      setResponseText(response.data.choices[0].message.content); // Displaying the first choice response content
    } catch (error) {
      console.error(error);
      setResponseText(`Error: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mistral API Demo</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your prompt"
        value={inputText}
        onChangeText={setInputText}
      />
      <Button title="Send to Mistral API" onPress={handleSendRequest} />
      <Text style={styles.response}>{responseText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    marginBottom: 12,
    paddingLeft: 8,
  },
  response: {
    marginTop: 20,
    fontSize: 18,
  },
});

export default App;
