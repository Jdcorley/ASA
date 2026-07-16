# EduLearn - Mobile-First Education App

An interactive education platform inspired by Brilliant, designed to be developed and tested directly from your phone.

## 🎯 Features

- **Mobile-First Design**: Optimized for phone screens with touch-friendly interactions
- **Interactive Components**: Pre-built educational components ready to use
- **Beautiful UI**: Modern gradient designs with dark mode support
- **Zero Config**: Just edit content, no complex setup needed

## 🚀 Getting Started

### On Your Computer
```bash
cd edu-app
npm install
npm run dev
```

Then open the URL shown (with your local IP) on your phone to test.

### On Your Phone (via Cursor)
Just edit the files and the preview will auto-reload!

## 📱 Available Components

### 1. LessonCard
Create subject cards for your home screen:
```jsx
<LessonCard
  title="Mathematics"
  description="Learn multiplication"
  icon="🔢"
  color="bg-gradient-to-br from-blue-500 to-blue-700"
  progress={50}
  onClick={() => {/* navigate to lesson */}}
/>
```

### 2. QuestionCard
Multiple choice questions:
```jsx
<QuestionCard
  question="What is 2 + 2?"
  options={[
    { text: '3' },
    { text: '4' },
    { text: '5' },
  ]}
  selectedAnswer={selectedAnswer}
  onAnswer={(index) => handleAnswer(index)}
/>
```

### 3. InteractiveSlider
Visual number manipulation:
```jsx
<InteractiveSlider
  label="How many groups?"
  value={sliderValue}
  onChange={setSliderValue}
  min={1}
  max={10}
  unit=" groups"
/>
```

### 4. ProgressRing
Show completion status:
```jsx
<ProgressRing progress={75} size={120} strokeWidth={8} />
```

### 5. FlipCard
Flashcard-style learning:
```jsx
<FlipCard
  front="What is H₂O?"
  back="Water! Two hydrogen and one oxygen."
/>
```

### 6. DragDropGame
Categorization games:
```jsx
<DragDropGame
  items={['Apple', 'Carrot', 'Banana']}
  categories={['Fruits', 'Vegetables']}
  onComplete={(results) => {/* check answers */}}
/>
```

## 🎨 Creating New Lessons

### Step 1: Create a new lesson file
Create a file in `src/lessons/YourLesson.jsx`:

```jsx
import React, { useState } from 'react'
import { InteractiveSlider, QuestionCard } from '../components/EducationComponents'

export const YourLesson = () => {
  const [answer, setAnswer] = useState(null)

  return (
    <div className="space-y-6 p-4">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
        Your Lesson Title
      </h2>
      
      {/* Add your interactive components here */}
      <QuestionCard
        question="Your question?"
        options={[
          { text: 'Option 1' },
          { text: 'Option 2' },
        ]}
        selectedAnswer={answer}
        onAnswer={setAnswer}
      />
    </div>
  )
}
```

### Step 2: Add to App.jsx
1. Import your lesson:
```jsx
import { YourLesson } from './lessons/YourLesson'
```

2. Add to lessons array:
```jsx
{
  id: 'yourlesson',
  title: 'Your Subject',
  description: 'Learn amazing things',
  icon: '🎯',
  color: 'bg-gradient-to-br from-red-500 to-orange-600',
  progress: 0,
}
```

3. Add to renderLesson():
```jsx
case 'yourlesson':
  return <YourLesson />
```

## 🎨 Customizing Colors

Pre-defined gradient combinations:
- Blue: `bg-gradient-to-br from-blue-500 to-blue-700`
- Green: `bg-gradient-to-br from-green-500 to-green-700`
- Purple: `bg-gradient-to-br from-purple-500 to-purple-700`
- Orange: `bg-gradient-to-br from-yellow-500 to-orange-600`
- Pink: `bg-gradient-to-br from-pink-500 to-rose-700`
- Indigo: `bg-gradient-to-br from-indigo-500 to-indigo-700`

## 📐 Layout Tips

### Mobile-First Spacing
```jsx
<div className="space-y-6 p-4">
  {/* Your content */}
</div>
```

### Responsive Grid
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Cards */}
</div>
```

### Touch-Friendly Buttons
```jsx
<button className="px-8 py-4 bg-primary-500 text-white rounded-full transform active:scale-95 transition-all">
  Tap Me
</button>
```

## 🎓 Lesson Ideas

### Math
- Visual fraction builder
- Geometry shape explorer
- Equation balancing game
- Number line interactions

### Science
- Periodic table explorer
- Solar system model
- Chemical reaction simulator
- Body systems interactive

### Language
- Vocabulary matching game
- Grammar correction challenges
- Sentence building
- Reading comprehension with interactive elements

### History
- Timeline slider
- Map-based events
- Historical figure cards
- Era comparison tools

## 🔧 Advanced Customization

### Adding Animations
```jsx
className="animate-bounce-slow"
className="animate-pulse-slow"
className="transition-all duration-500"
```

### Custom Interactive Elements
Use React state to create any interaction:
```jsx
const [value, setValue] = useState(0)
const [isCorrect, setIsCorrect] = useState(false)
const [showHint, setShowHint] = useState(false)
```

### Dark Mode Support
All components automatically support dark mode. Use:
```jsx
className="bg-white dark:bg-gray-800"
className="text-gray-800 dark:text-white"
```

## 📱 Testing on Your Phone

### Same WiFi Network
1. Start dev server: `npm run dev`
2. Note the "Network" URL (e.g., `http://192.168.1.5:3000`)
3. Open that URL on your phone

### Using ngrok (for remote testing)
```bash
npx ngrok http 3000
```
Open the ngrok URL on any device anywhere!

## 🎯 Design Philosophy

1. **Touch-First**: Large tap targets, swipe gestures
2. **Visual Learning**: Show concepts, don't just tell
3. **Immediate Feedback**: Instant response to interactions
4. **Progressive Disclosure**: Start simple, add complexity
5. **Playful Design**: Make learning fun with animations

## 📚 Next Steps

1. **Add More Lessons**: Copy the sample lesson structure
2. **Create Games**: Use DragDropGame or create custom interactions
3. **Track Progress**: Save completion data (add localStorage or database)
4. **Add Authentication**: Let users create accounts
5. **Build Content Library**: Organize lessons by difficulty

## 🎨 Resources for Content

- **Icons**: Use emojis or add icon library (react-icons)
- **Animations**: TailwindCSS built-in + custom CSS
- **Math Rendering**: Consider adding KaTeX for equations
- **Charts/Graphs**: Consider adding recharts for data visualization

## 💡 Pro Tips

1. Test every interaction on your phone - desktop mouse is different!
2. Keep text large and readable (18px minimum)
3. Add loading states for better UX
4. Use haptic feedback where possible (vibration API)
5. Keep lessons short (5-10 minutes max)

Happy teaching! 🚀
