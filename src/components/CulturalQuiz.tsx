"use client";
import React, { useState, useEffect } from 'react';
import { Trophy, RotateCcw, CheckCircle, XCircle } from 'lucide-react';

const CulturalQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [questions, setQuestions] = useState<{ question: string; options: string[]; correct: number; explanation: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    generateQuiz();
  }, []);

  const generateQuiz = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/generate-quiz');
      if (response.ok) {
        const data = await response.json();
        setQuestions(data.questions);
      }
    } catch (error) {
      console.error('Failed to generate quiz:', error);
      // Fallback questions
      setQuestions([
        {
          question: "What is Nigeria's capital city?",
          options: ["Lagos", "Abuja", "Kano", "Port Harcourt"],
          correct: 1,
          explanation: "Abuja became Nigeria's capital in 1991, designed as a planned city to serve as the federal capital territory."
        },
        {
          question: "Which of these is NOT one of Nigeria's major ethnic groups?",
          options: ["Hausa", "Yoruba", "Zulu", "Igbo"],
          correct: 2,
          explanation: "Zulu is a South African ethnic group. Nigeria's three largest ethnic groups are Hausa, Yoruba, and Igbo."
        },
        {
          question: "What does 'Jollof Rice' refer to?",
          options: ["A type of music", "A traditional dish", "A dance style", "A festival"],
          correct: 1,
          explanation: "Jollof Rice is a popular West African dish made with rice, tomatoes, peppers, and various spices, considered a staple in Nigerian cuisine."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    generateQuiz();
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return "Excellent! You're a Nigeria culture expert! 🇳🇬";
    if (percentage >= 60) return "Great job! You know quite a bit about Nigeria!";
    if (percentage >= 40) return "Good effort! Keep learning about Nigerian culture.";
    return "Keep exploring Nigeria's rich culture - there's so much to discover!";
  };

  if (loading) {
    return (
      <section className="px-6 md:px-16 py-16 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Generating your cultural quiz...</p>
        </div>
      </section>
    );
  }

  if (showResult) {
    return (
      <section className="px-6 md:px-16 py-16 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-green-800 mb-4">Quiz Complete!</h2>
            <div className="text-6xl font-bold text-green-600 mb-2">
              {score}/{questions.length}
            </div>
            <p className="text-xl text-gray-600 mb-6">{getScoreMessage()}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Performance</h3>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">{score}</div>
                <div className="text-sm text-gray-600">Correct Answers</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">{questions.length - score}</div>
                <div className="text-sm text-gray-600">Incorrect Answers</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {Math.round((score / questions.length) * 100)}%
                </div>
                <div className="text-sm text-gray-600">Accuracy</div>
              </div>
            </div>
          </div>

          <button
            onClick={restartQuiz}
            className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center mx-auto"
          >
            <RotateCcw className="mr-2" size={20} />
            Take Another Quiz
          </button>
        </div>
      </section>
    );
  }

  if (questions.length === 0) return null;

  const question = questions[currentQuestion];

  return (
    <section className="px-6 md:px-16 py-16 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-green-800 mb-4">Nigeria Culture Quiz</h2>
          <p className="text-gray-600">Test your knowledge of Nigerian culture and traditions</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-8">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-600">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span className="text-sm text-gray-600">
                Score: {score}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0}%` }}
              />
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              {question.question}
            </h3>

            <div className="space-y-3">
              {question.options.map((option: string, index: number) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    selectedAnswer === index
                      ? 'border-green-600 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                      selectedAnswer === index ? 'border-green-600' : 'border-gray-300'
                    }`}>
                      {selectedAnswer === index && (
                        <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                      )}
                    </div>
                    <span className="text-gray-800">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {selectedAnswer !== null && (
            <div className="mb-6">
              <div className={`p-4 rounded-lg ${
                selectedAnswer === question.correct
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-red-50 border border-red-200'
              }`}>
                <div className="flex items-center mb-2">
                  {selectedAnswer === question.correct ? (
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600 mr-2" />
                  )}
                  <span className={`font-medium ${
                    selectedAnswer === question.correct ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {selectedAnswer === question.correct ? 'Correct!' : 'Incorrect'}
                  </span>
                </div>
                <p className="text-gray-700 text-sm">{question.explanation}</p>
              </div>
            </div>
          )}

          <div className="text-center">
            <button
              onClick={handleNext}
              disabled={selectedAnswer === null}
              className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CulturalQuiz;