# A Little Question For You 💌

A cute, romantic, playful little website where I ask my boyfriend out on a date. ❤️

Built with **React + Vite**. No backend, no database, no logins — just a single
static site you can deploy for free.

---

## What it does

1. Opens on a romantic landing card with the question:
   > _"Baby, will you go on a date with me? ❤️"_
2. Two buttons: **YES ❤️** and **NO 🙈**
3. Clicking **NO** is... discouraged. The message changes each time, the button
   shrinks, dodges your cursor on desktop, and jumps to a safe random spot on
   mobile. The **YES** button grows bigger and shinier each time.
4. Clicking **YES** triggers confetti + floating hearts + a smooth fade into a
   beautiful **"DATE ACCEPTED"** confirmation card with a personal message.

---

## How to run it locally

You need [Node.js](https://nodejs.org/) (version 18 or newer) installed.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

Open the URL it prints (usually `http://localhost:5173`).

To create the production build:

```bash
npm run build     # outputs the static site into ./dist
npm run preview   # serves the production build locally to verify
```

---

## How to personalize it ✨

Open **`src/config.js`** and change the values:

```js
export const config = {
  yourName: "Komal",
  boyfriendName: "Baby",
  dateText: "Our Special Date ❤️",
  customMessage:
    "Thank you for saying yes.\nI just wanted one little date with my favorite person.\nNow you can't escape me. 😌❤️",
};
```

- **`yourName`** — shown at the bottom of the question card.
- **`boyfriendName`** — used in the main question and the "I knew you'd say yes" line.
- **`dateText`** — the title shown at the top of the date card on the YES screen.
- **`customMessage`** — the personal romantic message at the bottom of the YES screen. Use `\n` for line breaks.

That's the only file you need to touch. ❤️

---

## Deploy on Render (Static Site)

1. Push this project to a **GitHub** repository.
2. Go to [Render](https://render.com/) → **New** → **Static Site**.
3. Connect your GitHub repo and select it.
4. Fill in:
   - **Build Command:** `npm run build`
   - **Publish directory:** `dist`
5. Click **Create Static Site**. Done! 🎉

No environment variables. No database. No server.

---

## Project structure

```
romantic-date-invitation/
├── public/
│   └── heart.svg
├── src/
│   ├── components/
│   │   ├── LandingScreen.jsx   # The question + the playful NO button
│   │   ├── YesScreen.jsx        # The "DATE ACCEPTED" celebration screen
│   │   └── Confetti.jsx         # Canvas confetti animation
│   ├── App.jsx                  # Switches between the two screens
│   ├── main.jsx                 # React entry point
│   ├── config.js                # ← EDIT YOUR PERSONAL DETAILS HERE
│   └── index.css                # All styles (responsive + animations)
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## Tech

- **React 18** — UI library
- **Vite 5** — dev server + build tool
- **Plain modern CSS** — no UI framework, no Tailwind, no extra runtime deps
- **Google Fonts** — *Dancing Script* (romantic headings) + *Poppins* (body)
  with a system-font fallback so the site still works if the fonts fail to load

---

## Accessibility

- Real `<button>` elements with proper `aria-label`s
- Keyboard-focusable with visible focus rings
- `aria-live="polite"` on the changing NO messages
- `prefers-reduced-motion` is respected — animations are reduced or skipped
  for users who prefer reduced motion
- Touch-friendly hit targets (≥ 44px) on all buttons

---

Made with love. ❤️
