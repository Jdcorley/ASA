import { useState } from 'react'
import { LessonCard } from './components/EducationComponents'
import { MathLesson, ScienceLesson, LanguageLesson } from './lessons/SampleLessons'
import { PhysicsLesson } from './lessons/PhysicsLesson'

function App() {
  const [currentView, setCurrentView] = useState('home')
  const [lessons] = useState([
    {
      id: 'math',
      title: 'Mathematics',
      description: 'Learn multiplication with interactive visuals',
      icon: '🔢',
      color: 'bg-gradient-to-br from-blue-500 to-blue-700',
      progress: 0,
    },
    {
      id: 'science',
      title: 'Science',
      description: 'Explore basic scientific concepts',
      icon: '🔬',
      color: 'bg-gradient-to-br from-green-500 to-green-700',
      progress: 0,
    },
    {
      id: 'language',
      title: 'English',
      description: 'Master grammar and vocabulary',
      icon: '📚',
      color: 'bg-gradient-to-br from-purple-500 to-purple-700',
      progress: 0,
    },
    {
      id: 'physics',
      title: 'Physics',
      description: 'Explore projectile motion interactively',
      icon: '⚡',
      color: 'bg-gradient-to-br from-yellow-500 to-orange-600',
      progress: 0,
    },
    {
      id: 'chemistry',
      title: 'Chemistry',
      description: 'Coming soon: Elements and reactions',
      icon: '⚗️',
      color: 'bg-gradient-to-br from-pink-500 to-rose-700',
      progress: 0,
    },
    {
      id: 'history',
      title: 'History',
      description: 'Coming soon: World events timeline',
      icon: '🏛️',
      color: 'bg-gradient-to-br from-indigo-500 to-indigo-700',
      progress: 0,
    },
  ])

  const renderLesson = () => {
    switch (currentView) {
      case 'math':
        return <MathLesson />
      case 'science':
        return <ScienceLesson />
      case 'language':
        return <LanguageLesson />
      case 'physics':
        return <PhysicsLesson />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen pb-8">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          {currentView !== 'home' ? (
            <button
              onClick={() => setCurrentView('home')}
              className="flex items-center space-x-2 text-primary-600 dark:text-primary-400 font-semibold transform active:scale-95 transition-all"
            >
              <span className="text-2xl">←</span>
              <span>Back</span>
            </button>
          ) : (
            <div></div>
          )}
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            EduLearn
          </h1>
          <div className="w-16"></div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {currentView === 'home' ? (
          <>
            <div className="text-center mb-12">
              <div className="text-6xl mb-4">🎓</div>
              <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
                Welcome to EduLearn
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Learn through interactive lessons and fun games
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {lessons.map((lesson) => (
                <LessonCard
                  key={lesson.id}
                  title={lesson.title}
                  description={lesson.description}
                  icon={lesson.icon}
                  color={lesson.color}
                  progress={lesson.progress}
                  onClick={() => {
                    if (['math', 'science', 'language', 'physics'].includes(lesson.id)) {
                      setCurrentView(lesson.id)
                    }
                  }}
                />
              ))}
            </div>

            <div className="mt-12 bg-gradient-to-r from-primary-500 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
              <h3 className="text-2xl font-bold mb-4">🎯 Your Learning Journey</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-primary-600 font-bold">
                    ✓
                  </div>
                  <span className="text-lg">Interactive lessons</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-primary-600 font-bold">
                    ✓
                  </div>
                  <span className="text-lg">Visual learning experiences</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-primary-600 font-bold">
                    ✓
                  </div>
                  <span className="text-lg">Progress tracking</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="animate-fade-in">
            {renderLesson()}
          </div>
        )}
      </main>
    </div>
  )
}

export default App
