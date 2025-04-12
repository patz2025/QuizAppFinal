import React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';

function Summary({ route }) {
  const { questions, userAnswers } = route.params;
  
  // calculate total score
  const calculateScore = () => {
    let score = 0;
    questions.forEach((question, idx) => {
      if (question.type === 'multiple-answer') {
        // for multiple-answer, check if arrays match
        const userAnswer = [...userAnswers[idx]].sort();
        const correctAnswer = [...question.correct].sort();
        
        if (userAnswer.length === correctAnswer.length && 
            userAnswer.every((value, index) => value === correctAnswer[index])) {
          score++;
        }
      } else {
        // for single answer questions
        if (userAnswers[idx] === question.correct) {
          score++;
        }
      }
    });
    return score;
  };
  
  const score = calculateScore();
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Quiz Summary</Text>
      <Text testID="total" style={styles.score}>
        Your Score: {score} out of {questions.length}
      </Text>
      
      {questions.map((question, qIndex) => {
        const userAnswer = userAnswers[qIndex];
        let isCorrect = false;
        
        if (question.type === 'multiple-answer') {
          const sortedUserAnswer = [...userAnswer].sort();
          const sortedCorrectAnswer = [...question.correct].sort();
          isCorrect = sortedUserAnswer.length === sortedCorrectAnswer.length && 
                      sortedUserAnswer.every((value, index) => value === sortedCorrectAnswer[index]);
        } else {
          isCorrect = userAnswer === question.correct;
        }
        
        return (
          <View key={qIndex} style={styles.questionSummary}>
            <Text style={styles.questionPrompt}>Q{qIndex + 1}: {question.prompt}</Text>
            <Text style={styles.resultText}>
              {isCorrect ? '✓ Correct' : '✗ Incorrect'}
            </Text>
            
            <View style={styles.answersList}>
              {question.choices.map((choice, cIndex) => {
                const isSelected = question.type === 'multiple-answer' 
                  ? userAnswer.includes(cIndex) 
                  : userAnswer === cIndex;
                  
                const isCorrectChoice = question.type === 'multiple-answer'
                  ? question.correct.includes(cIndex)
                  : question.correct === cIndex;
                
                return (
                  <Text 
                    key={cIndex} 
                    style={[
                      styles.choiceText,
                      isCorrectChoice && styles.correctAnswer,
                      isSelected && !isCorrectChoice && styles.incorrectAnswer
                    ]}
                  >
                    {choice}
                  </Text>
                );
              })}
            </View>
          </View>
        );
      })}
    </ScrollView>
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
  },
  score: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  questionSummary: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
  },
  questionPrompt: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  resultText: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  answersList: {
    marginLeft: 10,
  },
  choiceText: {
    fontSize: 14,
    marginBottom: 5,
  },
  correctAnswer: {
    fontWeight: 'bold',
    color: 'green',
  },
  incorrectAnswer: {
    textDecorationLine: 'line-through',
    color: 'red',
  }
});

export default Summary;