import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Button, Text, View, StyleSheet } from 'react-native';

// import components
import Question from './components/Question';
import Summary from './components/Summary';

// questionaire
const sampleQuestions = [
  {
    prompt: "In the first Shrek movie, Shrek bathes in mud and brushes his teeth with bug juice.",
    type: "true-false",
    choices: [
      "True",
      "False",
    ],
    correct: 0  // true is correct
  },
  {
    prompt: "What song does Donkey famously sing when Shrek tells him to stop talking?",
    type: "multiple-choice",
    choices: [
      "Let It Go",
      "I'm a Believer",
      "I'm All Alone",
      "All Star",
    ],
    correct: 2  // i'm all alone
  },
  {
    prompt: "Which songs does Donkey sing in the first Shrek movie?",
    type: "multiple-answer",
    choices: [
      "Let It Go",
      "I'm a Believer",
      "On the Road Again",
      "Livin' La Vida Loca",
    ],
    correct: [1, 2]  // i'm a believer, on the road again
  },
];

// main app with navigation
const Stack = createStackNavigator();

export default function App() {
  const [userAnswers, setUserAnswers] = useState(Array(sampleQuestions.length).fill(null));
  
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="StartScreen">
          <Stack.Screen name="StartScreen" options={{ title: 'Quiz App' }}>
            {(props) => (
              <View style={styles.container}>
                <Text style={styles.header}>Welcome to the Quiz App</Text>
                <Button
                  title="Start Quiz"
                  onPress={() => props.navigation.navigate('Question', {
                    data: sampleQuestions,
                    index: 0,
                    userAnswers: userAnswers,
                    setUserAnswers: setUserAnswers
                  })}
                />
              </View>
            )}
          </Stack.Screen>
          <Stack.Screen 
            name="Question" 
            component={Question} 
            options={{ title: 'Question', headerLeft: null }} 
          />
          <Stack.Screen 
            name="Summary" 
            component={Summary} 
            options={{ title: 'Results', headerLeft: null }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  }
});

export { Question, Summary };