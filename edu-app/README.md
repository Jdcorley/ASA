# EduLearn

A beautiful, mobile-first education app that makes learning interactive and fun. Built with React, Vite, and TailwindCSS.

## Features

- 📱 **Mobile-First Design** - Optimized for phone screens and touch interactions
- 🎨 **Beautiful UI** - Modern gradients, smooth animations, dark mode support
- 🎮 **Interactive Components** - Pre-built educational components ready to use
- 📚 **Sample Lessons** - Math, Science, and Language lessons included
- ⚡ **Fast Development** - Hot reload, instant feedback, test on your phone
- 🎯 **Zero Configuration** - Just start creating content

## Quick Start

```bash
cd edu-app
npm install
npm run dev
```

Then open the displayed URL on your phone (make sure you're on the same WiFi network).

## What's Included

### Interactive Components

- **LessonCard** - Subject cards with progress tracking
- **QuestionCard** - Multiple choice questions with feedback
- **InteractiveSlider** - Visual number manipulation
- **ProgressRing** - Circular progress indicators
- **FlipCard** - Flashcard-style learning
- **DragDropGame** - Categorization and matching games

### Sample Lessons

- **Mathematics** - Interactive multiplication with visual groups
- **Science** - Flashcards for scientific concepts
- **English** - Grammar and vocabulary quiz

## Creating Your Own Lessons

See `CONTENT_GUIDE.md` for detailed instructions on:
- Using the pre-built components
- Creating new interactive lessons
- Customizing colors and animations
- Best practices for mobile learning experiences

## Tech Stack

- **React 18** - UI framework
- **Vite** - Fast build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Mobile-First** - Designed for phones, works everywhere

## Project Structure

```
edu-app/
├── src/
│   ├── components/
│   │   └── EducationComponents.jsx  # Reusable UI components
│   ├── lessons/
│   │   └── SampleLessons.jsx        # Example lessons
│   ├── App.jsx                       # Main app with navigation
│   ├── index.css                     # Global styles
│   └── main.jsx                      # App entry point
├── CONTENT_GUIDE.md                  # Content creation guide
└── package.json
```

## Testing on Your Phone

### Local Network (Same WiFi)
1. Run `npm run dev`
2. Look for the "Network: http://192.168.x.x:3000" URL
3. Open that URL on your phone

### Remote Testing (Any Network)
```bash
npx ngrok http 3000
```
Open the ngrok URL on your phone from anywhere!

## Customization

### Colors
All components use TailwindCSS classes. Customize colors in `tailwind.config.js`.

### Components
All educational components are in `src/components/EducationComponents.jsx` - customize or add new ones!

### Lessons
Create new lessons in `src/lessons/` and import them in `App.jsx`.

## Inspired By

This project is inspired by [Brilliant.org](https://brilliant.org) - making complex subjects accessible through interactive visual learning.

## Development from Phone

You can use Cursor on your phone to:
1. Edit lesson content
2. Add new questions and interactions
3. Customize colors and styles
4. Test immediately with live reload

## License

MIT - Feel free to use this for your educational projects!

## Contributing

Create new lessons, components, or improvements and share them with the community!

---

Built with ❤️ for learners everywhere
