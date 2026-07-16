// Copy this template to create a new lesson quickly
// 1. Copy this file to src/lessons/YourLessonName.jsx
// 2. Replace YourLesson with your lesson name
// 3. Fill in the content sections
// 4. Import in App.jsx and add to navigation

import { useState } from 'react'
import {
  QuestionCard,
  InteractiveSlider,
  ProgressRing,
  FlipCard,
  DragDropGame,
} from '../components/EducationComponents'

export const YourLesson = () => {
  // State for tracking user interactions
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [sliderValue, setSliderValue] = useState(5)
  const [score, setScore] = useState(0)

  // Handler for answer selection with feedback
  const handleAnswer = (index, correctIndex) => {
    setSelectedAnswer(index)
    if (index === correctIndex) {
      setScore(score + 1)
    }
    
    // Auto-advance after delay
    setTimeout(() => {
      setCurrentStep(currentStep + 1)
      setSelectedAnswer(null)
    }, 1500)
  }

  return (
    <div className="space-y-6 p-4">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Your Lesson Title Here
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Brief description of what students will learn
        </p>
      </div>

      {/* Example: Interactive Slider */}
      <InteractiveSlider
        label="Adjust this value"
        value={sliderValue}
        onChange={setSliderValue}
        min={0}
        max={10}
        unit=" items"
      />

      {/* Example: Visual representation based on slider */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          Visual Representation
        </h3>
        <div className="flex flex-wrap gap-2 justify-center">
          {Array.from({ length: sliderValue }).map((_, index) => (
            <div
              key={index}
              className="w-12 h-12 bg-primary-500 rounded-lg animate-bounce-slow"
              style={{ animationDelay: `${index * 0.1}s` }}
            />
          ))}
        </div>
      </div>

      {/* Example: Multiple Choice Question */}
      <QuestionCard
        question="Your question here?"
        options={[
          { text: 'Option A' },
          { text: 'Option B - Correct Answer' },
          { text: 'Option C' },
          { text: 'Option D' },
        ]}
        selectedAnswer={selectedAnswer}
        onAnswer={(index) => handleAnswer(index, 1)} // 1 is the correct answer index
      />

      {/* Example: Feedback display */}
      {selectedAnswer !== null && (
        <div
          className={`p-4 rounded-xl text-center font-bold text-white transition-all ${
            selectedAnswer === 1 ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          {selectedAnswer === 1 
            ? '🎉 Correct! Great job!' 
            : '❌ Not quite. Try again!'}
        </div>
      )}

      {/* Example: Flashcard */}
      <FlipCard
        front="Front of card - Question or concept"
        back="Back of card - Answer or explanation"
      />

      {/* Example: Drag and Drop Game */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          Categorization Game
        </h3>
        <DragDropGame
          items={['Item 1', 'Item 2', 'Item 3', 'Item 4']}
          categories={['Category A', 'Category B']}
          onComplete={(results) => {
            console.log('Categorization complete:', results)
          }}
        />
      </div>

      {/* Example: Progress indicator */}
      <div className="text-center">
        <ProgressRing progress={(currentStep / 5) * 100} />
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          Progress: {currentStep} / 5 steps
        </p>
      </div>

      {/* Example: Action Button */}
      <button
        onClick={() => {
          // Reset or navigate
          setCurrentStep(0)
          setScore(0)
          setSelectedAnswer(null)
        }}
        className="w-full px-8 py-4 bg-gradient-to-r from-primary-500 to-purple-600 text-white rounded-xl font-bold transform active:scale-95 transition-all shadow-lg"
      >
        Start Over
      </button>

      {/* Example: Info Card */}
      <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
        <h4 className="text-xl font-bold mb-2">💡 Did You Know?</h4>
        <p className="text-white/90">
          Add interesting facts or tips related to your lesson here.
        </p>
      </div>
    </div>
  )
}

// TO ADD THIS LESSON TO YOUR APP:
// 
// 1. In App.jsx, add import:
//    import { YourLesson } from './lessons/YourLessonName'
//
// 2. Add to lessons array:
//    {
//      id: 'yourlesson',
//      title: 'Your Subject',
//      description: 'Short description',
//      icon: '🎯',
//      color: 'bg-gradient-to-br from-blue-500 to-blue-700',
//      progress: 0,
//    }
//
// 3. Add to renderLesson() switch statement:
//    case 'yourlesson':
//      return <YourLesson />
