# Pharmly — PTCB Top 200 Drug Study App

Professional flashcard study tool for the PTCB pharmacy tech exam.

## Quick Start

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build
```

## Deploy to Vercel

```bash
npm install -g vercel
vercel
```

## Project Structure

```
src/
├── components/
│   ├── Topbar.jsx / .module.css       # Navigation bar
│   ├── Flashcard.jsx / .module.css    # Core flashcard with flip animation
│   ├── Sidebar.jsx / .module.css      # Filter panel
│   └── SessionComplete.jsx / .css     # End-of-session results
├── pages/
│   └── FlashcardsPage.jsx / .css      # Main page layout + deck logic
├── hooks/
│   ├── useProgress.js                 # localStorage persistence
│   └── useSpeech.js                   # Web Speech API TTS
├── data/
│   └── drugs.json                     # 200 PTCB drugs (verified)
└── styles/
    └── globals.css                    # Design tokens + resets
```

## Features (Sprint 1)

- [x] Flashcard flip with smooth 3D animation (Framer Motion)
- [x] Brand → Generic and Generic → Brand modes
- [x] Voice pronunciation (Web Speech API)
- [x] Spaced repetition ratings: Again / Hard / Good / Easy
- [x] Progress persistence via localStorage
- [x] Category filter (15 categories)
- [x] Special filters: Controlled, Brand Discontinued, Weak Cards, Unseen
- [x] Shuffle deck
- [x] Session complete screen with stats
- [x] Keyboard shortcuts: Space, ←→, 1/2/3/4
- [x] Fully responsive

## Upcoming Sprints

- [ ] Quiz mode (multiple choice)
- [ ] Matching game
- [ ] Word search
- [ ] Crossword
- [ ] Practice exam (80 questions, timed)
- [ ] Paywall / auth (Stripe + Supabase)

## Tech Stack

- React 18 + Vite
- Framer Motion (flip animation)
- CSS Modules
- localStorage (no backend for Sprint 1)
- Web Speech API (TTS, browser-native)
