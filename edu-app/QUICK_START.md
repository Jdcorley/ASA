# Quick Content Creation Cheatsheet

## 🚀 Add a New Lesson in 3 Steps

### Step 1: Create the lesson file
Create `src/lessons/MyNewLesson.jsx`:

```jsx
import { useState } from 'react'
import { QuestionCard, InteractiveSlider } from '../components/EducationComponents'

export const MyNewLesson = () => {
  const [answer, setAnswer] = useState(null)

  return (
    <div className="space-y-6 p-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          My Lesson Title
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Description of what students will learn
        </p>
      </div>

      <QuestionCard
        question="Your question here?"
        options={[
          { text: 'Option A' },
          { text: 'Option B' },
          { text: 'Option C' },
          { text: 'Option D' },
        ]}
        selectedAnswer={answer}
        onAnswer={setAnswer}
      />
    </div>
  )
}
```

### Step 2: Add to App.jsx imports (top of file)
```jsx
import { MyNewLesson } from './lessons/MyNewLesson'
```

### Step 3a: Add to lessons array in App.jsx
```jsx
{
  id: 'mynewlesson',
  title: 'My Subject',
  description: 'Short description',
  icon: '🎯',  // Pick an emoji
  color: 'bg-gradient-to-br from-red-500 to-orange-600',
  progress: 0,
}
```

### Step 3b: Add to renderLesson() switch in App.jsx
```jsx
case 'mynewlesson':
  return <MyNewLesson />
```

Done! Your lesson will appear on the home screen.

---

## 🎨 Color Combinations (Copy & Paste)

```jsx
bg-gradient-to-br from-blue-500 to-blue-700      // Blue
bg-gradient-to-br from-green-500 to-green-700    // Green
bg-gradient-to-br from-purple-500 to-purple-700  // Purple
bg-gradient-to-br from-red-500 to-red-700        // Red
bg-gradient-to-br from-yellow-500 to-orange-600  // Orange
bg-gradient-to-br from-pink-500 to-rose-700      // Pink
bg-gradient-to-br from-indigo-500 to-indigo-700  // Indigo
bg-gradient-to-br from-teal-500 to-cyan-700      // Teal
```

---

## 📱 Component Templates

### Multiple Choice Question
```jsx
const [answer, setAnswer] = useState(null)

<QuestionCard
  question="What is the capital of France?"
  options={[
    { text: 'London' },
    { text: 'Paris' },
    { text: 'Berlin' },
  ]}
  selectedAnswer={answer}
  onAnswer={setAnswer}
/>
```

### Interactive Number Slider
```jsx
const [number, setNumber] = useState(5)

<InteractiveSlider
  label="Pick a number"
  value={number}
  onChange={setNumber}
  min={0}
  max={100}
  unit=" points"
/>

{/* Show the result */}
<p>You picked: {number}</p>
```

### Flashcards
```jsx
<FlipCard
  front="Question: What is 2 + 2?"
  back="Answer: 4"
/>
```

### Progress Circle
```jsx
<ProgressRing progress={75} />
```

### Drag & Drop Game
```jsx
<DragDropGame
  items={['Dog', 'Cat', 'Eagle', 'Shark']}
  categories={['Land Animals', 'Water Animals', 'Flying Animals']}
  onComplete={(sorted) => console.log(sorted)}
/>
```

---

## 🎯 Interactive Pattern: Show Feedback

```jsx
const [answer, setAnswer] = useState(null)
const [showFeedback, setShowFeedback] = useState(false)

const handleAnswer = (index) => {
  setAnswer(index)
  setShowFeedback(true)
  setTimeout(() => setShowFeedback(false), 2000)
}

<QuestionCard
  question="What is 5 × 3?"
  options={[
    { text: '8' },
    { text: '15' },  // Correct answer is index 1
    { text: '12' },
  ]}
  selectedAnswer={answer}
  onAnswer={handleAnswer}
/>

{showFeedback && (
  <div className={`p-4 rounded-xl text-white text-center font-bold ${
    answer === 1 ? 'bg-green-500' : 'bg-red-500'
  }`}>
    {answer === 1 ? '✅ Correct!' : '❌ Try again!'}
  </div>
)}
```

---

## 🎨 Quick Styling

### Container with spacing
```jsx
<div className="space-y-6 p-4">
  {/* Content */}
</div>
```

### Card background
```jsx
<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
  {/* Content */}
</div>
```

### Button
```jsx
<button className="px-8 py-3 bg-primary-500 text-white rounded-full font-semibold transform active:scale-95 transition-all">
  Click Me
</button>
```

### Centered text
```jsx
<div className="text-center">
  <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
    Title
  </h2>
  <p className="text-gray-600 dark:text-gray-300">
    Description
  </p>
</div>
```

---

## 🎮 Full Quiz Example

```jsx
import { useState } from 'react'
import { QuestionCard, ProgressRing } from '../components/EducationComponents'

export const QuickQuiz = () => {
  const questions = [
    {
      question: 'What is 2 + 2?',
      options: [{ text: '3' }, { text: '4' }, { text: '5' }],
      correct: 1
    },
    {
      question: 'What color is the sky?',
      options: [{ text: 'Blue' }, { text: 'Green' }, { text: 'Red' }],
      correct: 0
    },
  ]

  const [currentQ, setCurrentQ] = useState(0)
  const [score, setScore] = useState(0)
  const [answer, setAnswer] = useState(null)
  const [finished, setFinished] = useState(false)

  const handleAnswer = (index) => {
    setAnswer(index)
    if (index === questions[currentQ].correct) {
      setScore(score + 1)
    }
    
    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ(currentQ + 1)
        setAnswer(null)
      } else {
        setFinished(true)
      }
    }, 1000)
  }

  if (finished) {
    return (
      <div className="space-y-6 p-4 text-center">
        <h2 className="text-3xl font-bold">Quiz Complete! 🎉</h2>
        <ProgressRing progress={(score / questions.length) * 100} />
        <p className="text-xl">
          Score: {score} / {questions.length}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-4">
      <p className="text-center text-gray-600">
        Question {currentQ + 1} / {questions.length}
      </p>
      <QuestionCard
        question={questions[currentQ].question}
        options={questions[currentQ].options}
        selectedAnswer={answer}
        onAnswer={handleAnswer}
      />
    </div>
  )
}
```

---

## 📝 Emoji Reference

Math: 🔢 ➕ ➖ ✖️ ➗ 📐 📊  
Science: 🔬 🧪 ⚗️ 🧬 🔭 ⚡ 🌍  
Language: 📚 ✏️ 📝 📖 💬 🗣️  
History: 🏛️ 📜 🗺️ 👑 ⚔️  
Art: 🎨 🖌️ 🎭 🎪  
Music: 🎵 🎶 🎸 🎹 🎤  
Achievement: ✅ 🎉 🏆 ⭐ 💯  
Progress: ⬆️ 📈 🚀 🎯

---

## 💡 Pro Tips

1. **Test on phone immediately** - The URL from `npm run dev` works on mobile
2. **Keep questions short** - Mobile screens are small
3. **Use emojis liberally** - They're universal and fun
4. **Add feedback quickly** - Students need instant response
5. **One concept per lesson** - Don't overwhelm

---

## 🆘 Common Issues

**Component not showing?**
- Check imports at top of file
- Make sure you added the lesson to renderLesson() in App.jsx

**Styling broken?**
- Check className quotation marks
- Make sure Tailwind classes are spelled correctly

**Can't see on phone?**
- Ensure phone is on same WiFi as computer
- Use the Network URL, not localhost

---

Happy teaching! For detailed documentation, see `CONTENT_GUIDE.md`
