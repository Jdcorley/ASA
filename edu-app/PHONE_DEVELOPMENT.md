# 📱 Developing EduLearn from Your Phone

This guide helps you develop your education app entirely from your phone using Cursor.

## 🚀 First Time Setup

### 1. Access Your Project
Open this project in Cursor on your phone. The app is located in the `edu-app` folder.

### 2. Start the Development Server
You have several options:

**Option A: Using the start script**
```bash
cd edu-app
./start.sh
```

**Option B: Direct command**
```bash
cd edu-app
npm run dev
```

The server will start and show you a URL like:
```
➜  Local:   http://localhost:3000/
➜  Network: http://172.30.0.2:3000/
```

### 3. View Your App
- If developing in Cursor on your phone, the preview should appear automatically
- The Network URL can be opened in any browser on the same WiFi
- For remote access, use: `npx ngrok http 3000`

## ✏️ Making Changes from Your Phone

### Quick Edits

All content files are designed for easy mobile editing:

1. **Add a new subject card**
   - Open `src/App.jsx`
   - Find the `lessons` array
   - Add a new entry (copy one of the existing ones)
   - Change the title, description, icon, and color

2. **Modify existing lessons**
   - Open `src/lessons/SampleLessons.jsx`
   - Edit the questions, answers, or flashcard content
   - Changes appear instantly!

3. **Create a new lesson**
   - Copy `src/lessons/LessonTemplate.jsx`
   - Rename it (e.g., `GeometryLesson.jsx`)
   - Edit the content
   - Follow the instructions at the bottom of the template

### Phone-Friendly Editing Tips

1. **Use the template** - Don't start from scratch
2. **Edit one section at a time** - Less scrolling, fewer mistakes
3. **Test frequently** - Make a change, check the preview
4. **Use emojis** - They're easy to type and add visual appeal
5. **Keep questions short** - Easier to type and read

## 🎨 Customization Guide

### Change Colors

Open `src/App.jsx` and modify the `color` field in any lesson:

```jsx
color: 'bg-gradient-to-br from-blue-500 to-blue-700'
```

Available color combos:
- `from-blue-500 to-blue-700` (Blue)
- `from-green-500 to-green-700` (Green)
- `from-purple-500 to-purple-700` (Purple)
- `from-red-500 to-red-700` (Red)
- `from-yellow-500 to-orange-600` (Orange)
- `from-pink-500 to-rose-700` (Pink)

### Change Icons

Just use emojis! Update the `icon` field:

```jsx
icon: '🔢'  // Math
icon: '🔬'  // Science
icon: '📚'  // Language
icon: '🎨'  // Art
icon: '🎵'  // Music
```

### Modify Questions

Open `src/lessons/SampleLessons.jsx` and find the question you want to change:

```jsx
<QuestionCard
  question="Your new question here?"
  options={[
    { text: 'New option 1' },
    { text: 'New option 2' },
    { text: 'New option 3' },
  ]}
  selectedAnswer={selectedAnswer}
  onAnswer={handleAnswer}
/>
```

## 🎮 Adding Interactive Elements

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

### Number Slider

```jsx
const [number, setNumber] = useState(5)

<InteractiveSlider
  label="Pick a number"
  value={number}
  onChange={setNumber}
  min={0}
  max={100}
/>
```

### Flashcard

```jsx
<FlipCard
  front="What is 2 + 2?"
  back="The answer is 4"
/>
```

## 📁 Project Structure

```
edu-app/
├── src/
│   ├── App.jsx                    ← Main navigation (edit here to add subjects)
│   ├── components/
│   │   └── EducationComponents.jsx ← Pre-built components (don't need to edit)
│   └── lessons/
│       ├── SampleLessons.jsx      ← Edit existing lessons here
│       └── LessonTemplate.jsx     ← Copy this for new lessons
├── CONTENT_GUIDE.md               ← Detailed documentation
├── QUICK_START.md                 ← Quick reference cheatsheet
└── README.md                      ← Project overview
```

## 🎯 Workflow for Creating Content

### For Quick Changes (5 minutes)
1. Open `src/lessons/SampleLessons.jsx`
2. Edit a question or answer
3. Save and check the preview
4. Done!

### For New Lessons (15-30 minutes)
1. Copy `src/lessons/LessonTemplate.jsx`
2. Rename to your subject (e.g., `ChemistryLesson.jsx`)
3. Edit the title and content
4. Open `src/App.jsx`
5. Add import and lesson entry (follow template instructions)
6. Save and test!

### For Major Updates
1. Work in small chunks
2. Test each change before moving on
3. Use the template files as reference
4. Refer to QUICK_START.md for syntax

## 💡 Phone Development Best Practices

1. **Make small changes** - Test one thing at a time
2. **Use autocomplete** - Let your editor help you
3. **Copy existing code** - Modify rather than writing from scratch
4. **Test on real device** - The preview is your friend
5. **Keep it simple** - Complex code is harder to edit on mobile

## 🆘 Troubleshooting

### App not loading?
- Check that you're in the `edu-app` directory
- Make sure `npm install` was run
- Try restarting the dev server

### Changes not showing?
- Save the file
- Check for syntax errors (red squiggly lines)
- Reload the preview

### Component not appearing?
- Check that you imported it at the top of the file
- Verify the component name is spelled correctly
- Make sure the component is inside the return statement

### Styling looks wrong?
- Check for missing closing tags `</div>`
- Verify className is in quotes: `className="..."`
- Make sure there are no missing curly braces `{}`

## 🎓 Learning Resources

- **QUICK_START.md** - Cheatsheet for common tasks
- **CONTENT_GUIDE.md** - Detailed component documentation
- **LessonTemplate.jsx** - Fully commented example to copy

## 🚀 Next Steps

1. **Customize the sample lessons** - Make them your own
2. **Add your first new subject** - Use the template
3. **Share with friends** - Get feedback on your phone
4. **Iterate and improve** - Teaching is an iterative process

## 📱 Pro Tips for Mobile Development

- Use landscape mode for more screen space
- Enable split screen to see code and preview side-by-side
- Use voice dictation for longer text content
- Add content in short sessions (10-15 minutes)
- Focus on the teaching, not the code

---

Happy creating! Remember: The best way to learn is by doing. Start with small changes and build from there. 🎉
