import React, { useState } from 'react'
import { InteractiveSlider, QuestionCard, ProgressRing, FlipCard } from '../components/EducationComponents'

export const MathLesson = () => {
  const [sliderValue, setSliderValue] = useState(5)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)

  const handleAnswer = (index) => {
    setSelectedAnswer(index)
    setShowFeedback(true)
    setTimeout(() => setShowFeedback(false), 2000)
  }

  return (
    <div className="space-y-6 p-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Understanding Multiplication
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Let's explore how multiplication works visually
        </p>
      </div>

      <InteractiveSlider
        label="How many groups?"
        value={sliderValue}
        onChange={setSliderValue}
        min={1}
        max={10}
      />

      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          {sliderValue} × 3 = {sliderValue * 3}
        </h3>
        <div className="flex flex-wrap gap-2 justify-center">
          {Array.from({ length: sliderValue }).map((_, groupIndex) => (
            <div
              key={groupIndex}
              className="flex gap-1 p-2 bg-primary-100 dark:bg-primary-900 rounded-lg"
            >
              {Array.from({ length: 3 }).map((_, itemIndex) => (
                <div
                  key={itemIndex}
                  className="w-8 h-8 bg-primary-500 rounded-full animate-bounce-slow"
                  style={{ animationDelay: `${(groupIndex * 3 + itemIndex) * 0.1}s` }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <QuestionCard
        question="If you have 4 baskets with 3 apples each, how many apples do you have in total?"
        options={[
          { text: '7 apples' },
          { text: '12 apples' },
          { text: '9 apples' },
          { text: '10 apples' },
        ]}
        selectedAnswer={selectedAnswer}
        onAnswer={handleAnswer}
      />

      {showFeedback && (
        <div
          className={`p-4 rounded-xl text-center font-bold text-white ${
            selectedAnswer === 1 ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          {selectedAnswer === 1 ? '🎉 Correct! Great job!' : '❌ Try again! Think about 4 × 3'}
        </div>
      )}
    </div>
  )
}

export const ScienceLesson = () => {
  const flashcards = [
    { front: 'What is H₂O?', back: 'Water! Two hydrogen atoms and one oxygen atom.' },
    { front: 'What is photosynthesis?', back: 'The process plants use to convert sunlight into energy.' },
    { front: 'What is gravity?', back: 'The force that attracts objects toward each other.' },
  ]

  const [currentCard, setCurrentCard] = useState(0)

  return (
    <div className="space-y-6 p-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Science Flashcards
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Tap to flip the card and learn!
        </p>
      </div>

      <FlipCard front={flashcards[currentCard].front} back={flashcards[currentCard].back} />

      <div className="flex justify-between items-center">
        <button
          onClick={() => setCurrentCard(Math.max(0, currentCard - 1))}
          disabled={currentCard === 0}
          className="px-6 py-3 bg-primary-500 text-white rounded-full font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed transform active:scale-95 transition-all"
        >
          ← Previous
        </button>
        <span className="text-gray-600 dark:text-gray-300 font-semibold">
          {currentCard + 1} / {flashcards.length}
        </span>
        <button
          onClick={() => setCurrentCard(Math.min(flashcards.length - 1, currentCard + 1))}
          disabled={currentCard === flashcards.length - 1}
          className="px-6 py-3 bg-primary-500 text-white rounded-full font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed transform active:scale-95 transition-all"
        >
          Next →
        </button>
      </div>
    </div>
  )
}

export const LanguageLesson = () => {
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(0)
  const totalQuestions = 3

  const questions = [
    {
      question: 'Which word is a noun?',
      options: [{ text: 'run' }, { text: 'quickly' }, { text: 'house' }, { text: 'beautiful' }],
      correct: 2,
    },
    {
      question: 'What is a synonym for "happy"?',
      options: [{ text: 'sad' }, { text: 'joyful' }, { text: 'angry' }, { text: 'tired' }],
      correct: 1,
    },
    {
      question: 'Which sentence is correct?',
      options: [
        { text: 'She go to school.' },
        { text: 'She goes to school.' },
        { text: 'She going to school.' },
        { text: 'She goed to school.' },
      ],
      correct: 1,
    },
  ]

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)

  const handleAnswer = (index) => {
    setSelectedAnswer(index)
    if (index === questions[currentQuestion].correct) {
      setScore(score + 1)
    }
    setAnswered(answered + 1)

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
      }
    }, 1500)
  }

  const progress = (answered / totalQuestions) * 100

  return (
    <div className="space-y-6 p-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          English Language Quiz
        </h2>
        <ProgressRing progress={progress} />
      </div>

      {answered < totalQuestions ? (
        <QuestionCard
          question={questions[currentQuestion].question}
          options={questions[currentQuestion].options}
          selectedAnswer={selectedAnswer}
          onAnswer={handleAnswer}
        />
      ) : (
        <div className="bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl p-8 text-center text-white shadow-xl">
          <h3 className="text-3xl font-bold mb-4">Quiz Complete! 🎉</h3>
          <p className="text-xl mb-4">
            You scored {score} out of {totalQuestions}
          </p>
          <button
            onClick={() => {
              setScore(0)
              setAnswered(0)
              setCurrentQuestion(0)
              setSelectedAnswer(null)
            }}
            className="px-8 py-3 bg-white text-primary-600 rounded-full font-bold transform active:scale-95 transition-all"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  )
}
