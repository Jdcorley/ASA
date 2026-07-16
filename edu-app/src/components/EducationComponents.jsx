import React from 'react'

export const LessonCard = ({ title, description, icon, color, onClick, progress = 0 }) => {
  return (
    <div
      onClick={onClick}
      className={`${color} rounded-2xl p-6 shadow-lg cursor-pointer transform transition-all duration-300 active:scale-95 hover:scale-105 border-2 border-white/20`}
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-white/90 text-sm mb-4">{description}</p>
      {progress > 0 && (
        <div className="w-full bg-white/30 rounded-full h-2 overflow-hidden">
          <div
            className="bg-white h-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  )
}

export const QuestionCard = ({ question, options, onAnswer, selectedAnswer }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        {question}
      </h3>
      <div className="space-y-3">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(index)}
            className={`w-full p-4 rounded-xl text-left transition-all duration-300 ${
              selectedAnswer === index
                ? 'bg-primary-500 text-white transform scale-105'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-primary-100 dark:hover:bg-gray-600'
            }`}
          >
            <span className="font-semibold mr-2">{String.fromCharCode(65 + index)}.</span>
            {option.text}
          </button>
        ))}
      </div>
    </div>
  )
}

export const InteractiveSlider = ({ label, value, onChange, min = 0, max = 100, unit = '' }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
      <label className="block text-lg font-semibold text-gray-800 dark:text-white mb-4">
        {label}
      </label>
      <div className="flex items-center space-x-4">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1 h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
        />
        <span className="text-2xl font-bold text-primary-600 dark:text-primary-400 min-w-[80px] text-right">
          {value}{unit}
        </span>
      </div>
    </div>
  )
}

export const ProgressRing = ({ progress, size = 120, strokeWidth = 8 }) => {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (progress / 100) * circumference

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-gray-200 dark:text-gray-700"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="text-primary-500 transition-all duration-500"
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute text-2xl font-bold text-gray-800 dark:text-white">
        {Math.round(progress)}%
      </span>
    </div>
  )
}

export const FlipCard = ({ front, back }) => {
  const [isFlipped, setIsFlipped] = React.useState(false)

  return (
    <div
      onClick={() => setIsFlipped(!isFlipped)}
      className="relative w-full h-64 cursor-pointer perspective-1000"
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        <div
          className="absolute w-full h-full backface-hidden bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 flex items-center justify-center shadow-xl"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <p className="text-white text-2xl font-bold text-center">{front}</p>
        </div>
        <div
          className="absolute w-full h-full backface-hidden bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 flex items-center justify-center shadow-xl"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <p className="text-white text-xl text-center">{back}</p>
        </div>
      </div>
    </div>
  )
}

export const DragDropGame = ({ items, categories, onComplete }) => {
  const [draggedItem, setDraggedItem] = React.useState(null)
  const [categorizedItems, setCategorizedItems] = React.useState({})

  const handleDragStart = (item) => {
    setDraggedItem(item)
  }

  const handleDrop = (category) => {
    if (draggedItem) {
      setCategorizedItems({
        ...categorizedItems,
        [category]: [...(categorizedItems[category] || []), draggedItem],
      })
      setDraggedItem(null)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 mb-6">
        {items
          .filter((item) => !Object.values(categorizedItems).flat().includes(item))
          .map((item, index) => (
            <div
              key={index}
              draggable
              onDragStart={() => handleDragStart(item)}
              className="bg-gradient-to-r from-primary-400 to-primary-600 text-white px-4 py-2 rounded-full cursor-move hover:shadow-lg transform hover:scale-105 transition-all"
            >
              {item}
            </div>
          ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((category) => (
          <div
            key={category}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(category)}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 min-h-32 border-2 border-dashed border-gray-300 dark:border-gray-600"
          >
            <h4 className="font-bold text-gray-800 dark:text-white mb-2">{category}</h4>
            <div className="flex flex-wrap gap-2">
              {(categorizedItems[category] || []).map((item, index) => (
                <span
                  key={index}
                  className="bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 px-3 py-1 rounded-full text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
