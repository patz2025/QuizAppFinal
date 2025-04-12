import React, { useState, useEffect } from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import { ButtonGroup } from 'react-native-elements';

function Question({ route, navigation }) {
  const { data, index, userAnswers, setUserAnswers } = route.params;
  const question = data[index];
  const isLastQuestion = index === data.length - 1;
  
  // for all question types
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedIndices, setSelectedIndices] = useState([]);
  
  // reset selections when question changes
  useEffect(() => {
    setSelectedIndex(null);
    setSelectedIndices([]);
  }, [index]);
  
  // handle next question button
  const handleNextQuestion = () => {
    // save the user's answer
    let newAnswers = [...userAnswers];
    
    if (question.type === 'multiple-answer') {
      newAnswers[index] = selectedIndices;
    } else {
      newAnswers[index] = selectedIndex;
    }
    
    if (isLastQuestion) {
      // go to summary if last question
      navigation.navigate('Summary', {
        questions: data,
        userAnswers: newAnswers,
      });
    } else {
      // go to next question
      navigation.navigate('Question', {
        data: data,
        index: index + 1,
        userAnswers: newAnswers,
        setUserAnswers: setUserAnswers
      });
    }
  };
  
  // handle multiple selection
  const updateMultiSelection = (idx) => {
    setSelectedIndices(current => {
      // create a new array to avoid direct state mutation
      const newSelection = [...current];
      
      // if selected remove
      if (newSelection.includes(idx)) {
        return newSelection.filter(i => i !== idx);
      } 
      // if not add it
      else {
        newSelection.push(idx);
        return newSelection;
      }
    });
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{question.prompt}</Text>
      
      <View testID="choices">
        {question.type === 'multiple-answer' ? (
          <ButtonGroup
            buttons={question.choices}
            selectedIndexes={selectedIndices}
            onPress={(idx) => updateMultiSelection(idx)}
            selectMultiple={true}
            vertical
            containerStyle={styles.buttonGroup}
            selectedButtonStyle={{backgroundColor: '#007AFF'}}
          />
        ) : (
          // true-false and multiple-choice the same way
          <ButtonGroup
            buttons={question.choices}
            selectedIndex={selectedIndex}
            onPress={(idx) => setSelectedIndex(idx)}
            vertical
            containerStyle={styles.buttonGroup}
            selectedButtonStyle={{backgroundColor: '#007AFF'}}
          />
        )}
      </View>
      
      <Button
        testID="next-question"
        title={isLastQuestion ? "Finish Quiz" : "Next Question"}
        onPress={handleNextQuestion}
        disabled={(question.type === 'multiple-answer' ? selectedIndices.length === 0 : selectedIndex === null)}
      />
    </View>
  );
}

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  questionText: {
    fontSize: 18,
    marginBottom: 20,
  },
  buttonGroup: {
    marginBottom: 20,
  }
});

export default Question;