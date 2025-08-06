# Online Poll System (Mobile App with Expo)

This project is a mobile application built with **React Native** using **Expo**, designed for real-time polling interactions. It allows users to create polls, vote, and visualize results dynamically.

---

## Features

- **Poll Creation**: Users can create polls with multiple options.
- **Live Voting**: Users can vote on existing polls and see real-time results.
- **Dynamic Visualization**: Bar chart updates dynamically to reflect current votes.
- **User Authentication**: Login and signup functionality using Supabase.
- **Poll Sharing**: Creators can share polls with others.
- **Tailwind UI**: Clean, modern UI built with NativeWind (Tailwind CSS for React Native).
- **State Management**: Uses Redux Toolkit for scalable state handling.
- **Real-time Sync**: Powered by Supabase subscriptions.

---

## Tech Stack

- **Frontend**: React Native (Expo), NativeWind
- **State Management**: Redux Toolkit
- **Backend**: Supabase (Auth, Database, Realtime)
- **Chart**: Tailwind-styled custom bar chart
- **Storage**: AsyncStorage for session persistence

---

## Folder Structure

```

src/
├── components/ # Reusable components
├── screens/ # App screens
├── store/ # Redux slices and store setup
├── lib/ # Supabase client setup
├── assets/ # Images, icons, etc.
└── app/ # App entry point (Expo Router)

```

---

## Installation

Clone the repo:

```bash
git clone https://github.com/kaberege2/online-poll-system.git
cd online-poll-system
```

Install dependencies:

```bash
npm install
```

Add your Supabase URL and anon key to `.env`:

```env
SUPABASE_URL=your-url
SUPABASE_ANON_KEY=your-key
```

Run the app:

```bash
npx expo start
```

---

## Testing

To test poll voting and chart updates:

1. Login as two different users.
2. Vote on the same poll.
3. Observe chart update in real-time.

---

## Key Learnings

- Implementing real-time sync with Supabase.
- Building a Redux-powered architecture for mobile.
- Creating responsive, animated charts with just Tailwind.
- Designing a smooth mobile-first UI with NativeWind.
