import { useState, useEffect } from 'react'
import { InteractiveSlider, QuestionCard } from '../components/EducationComponents'

export const PhysicsLesson = () => {
  const [velocity, setVelocity] = useState(5)
  const [angle, setAngle] = useState(45)
  const [isLaunched, setIsLaunched] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [selectedAnswer, setSelectedAnswer] = useState(null)

  const gravity = 9.8
  const scale = 10

  useEffect(() => {
    if (!isLaunched) return

    const startTime = Date.now()
    const interval = setInterval(() => {
      const t = (Date.now() - startTime) / 1000
      const radians = (angle * Math.PI) / 180

      const x = velocity * Math.cos(radians) * t * scale
      const y = (velocity * Math.sin(radians) * t - 0.5 * gravity * t * t) * scale

      if (y < 0) {
        setIsLaunched(false)
        setPosition({ x: 0, y: 0 })
        clearInterval(interval)
      } else {
        setPosition({ x, y })
      }
    }, 16)

    return () => clearInterval(interval)
  }, [isLaunched, velocity, angle])

  const maxHeight = Math.pow(velocity * Math.sin((angle * Math.PI) / 180), 2) / (2 * gravity)
  const range = (Math.pow(velocity, 2) * Math.sin(2 * (angle * Math.PI) / 180)) / gravity

  return (
    <div className="space-y-6 p-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Projectile Motion
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Explore how velocity and angle affect a projectile's path
        </p>
      </div>

      <InteractiveSlider
        label="Launch Velocity"
        value={velocity}
        onChange={setVelocity}
        min={1}
        max={20}
        unit=" m/s"
      />

      <InteractiveSlider
        label="Launch Angle"
        value={angle}
        onChange={setAngle}
        min={0}
        max={90}
        unit="°"
      />

      <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 shadow-xl">
        <div className="relative w-full h-64 bg-white/20 rounded-xl overflow-hidden">
          <div
            className="absolute bottom-4 left-4 w-8 h-8 bg-yellow-400 rounded-full shadow-lg transition-all duration-75"
            style={{
              transform: `translate(${position.x}px, ${-position.y}px)`,
            }}
          />
          
          {!isLaunched && (
            <div className="absolute bottom-4 left-4 w-8 h-8 flex items-center justify-center">
              <div className="w-1 h-12 bg-white/50 origin-bottom" 
                   style={{ transform: `rotate(${angle}deg)` }} />
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 h-2 bg-green-500" />
        </div>

        <button
          onClick={() => setIsLaunched(true)}
          disabled={isLaunched}
          className="w-full mt-4 px-6 py-3 bg-white text-purple-600 rounded-full font-bold disabled:bg-gray-300 disabled:text-gray-500 transform active:scale-95 transition-all"
        >
          {isLaunched ? 'In Flight...' : '🚀 Launch!'}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center">
          <div className="text-3xl mb-2">📏</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Max Height</div>
          <div className="text-xl font-bold text-primary-600 dark:text-primary-400">
            {maxHeight.toFixed(1)} m
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center">
          <div className="text-3xl mb-2">🎯</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Range</div>
          <div className="text-xl font-bold text-primary-600 dark:text-primary-400">
            {range.toFixed(1)} m
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4 border-l-4 border-yellow-500">
        <div className="flex items-start space-x-3">
          <span className="text-2xl">💡</span>
          <div>
            <h4 className="font-bold text-gray-800 dark:text-white mb-1">
              Did You Know?
            </h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              The optimal angle for maximum range in projectile motion is 45° (when air resistance is ignored). 
              Try adjusting the angle to see how it affects the distance!
            </p>
          </div>
        </div>
      </div>

      <QuestionCard
        question="At what angle should you launch a projectile to achieve maximum range?"
        options={[
          { text: '30 degrees' },
          { text: '45 degrees' },
          { text: '60 degrees' },
          { text: '90 degrees' },
        ]}
        selectedAnswer={selectedAnswer}
        onAnswer={setSelectedAnswer}
      />

      {selectedAnswer !== null && (
        <div
          className={`p-4 rounded-xl text-center font-bold text-white ${
            selectedAnswer === 1 ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          {selectedAnswer === 1
            ? '🎉 Correct! 45° gives the maximum range!'
            : '❌ Try again! Experiment with different angles to find out.'}
        </div>
      )}

      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white">
        <h3 className="text-xl font-bold mb-3">⚡ Key Physics Concepts</h3>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Horizontal velocity remains constant (no air resistance)</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Vertical velocity changes due to gravity (9.8 m/s²)</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Path forms a parabola shape</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Time to max height = time from max height to ground</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
