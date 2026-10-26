# GoPratle - Event Requirement Posting App

A simple website where people post what they need for an event: an **Event Planner**, a **Performer** or a **Crew**.

**Live website:** https://go-pratle-delta.vercel.app/

---

## What you can do

- **Post a requirement** in 4 easy steps
  1. **Event Basics** - name, type, date, location, venue, category
  2. **Category Details** - questions change based on the category
  3. **Budget & More** - budget, notes and a few more questions
  4. **Review** - check everything and submit
- **See all posts** in a list, newest first
- **Filter** posts: All, Event Planner, Performer, Crew
- **Open a post** to see all its details

---

## Helpful things the app does

- Shows a **red message** under any wrong or empty field
- **Scrolls to the first mistake**, so you don't have to search
- Shows **"Loading..."** and **"Submitting..."** while waiting
- Shows a **"Cannot connect"** message with a **Try again** button if the server is down
- Has a **404 page** for wrong links and an **error page** if something breaks

---

## Tech used

| Part | Tool | In simple words |
|---|---|---|
| Frontend | Next.js + TypeScript | Builds the website pages |
| Styling | TailwindCSS | Makes the pages look good |
| Icons | Lucide React | Small icons |
| Backend | Node.js + Express | Server that receives and sends data |
| Database | MongoDB + Mongoose | Stores all the posts |
| Hosting | Vercel, Render, MongoDB Atlas | Puts the website, server and database online |

---

## Project structure

The project follows **MVC**:
- **Model** - what the data looks like
- **View** - what the user sees
- **Controller** - the logic in between

```
GoPratle/
├── backend/src/
│   ├── server.ts        # Starts the server
│   ├── app.ts           # Server setup and routes
│   ├── config/          # Database connection
│   ├── constants/       # Allowed dropdown values
│   ├── models/          # Database structure (Model)
│   ├── routes/          # API addresses
│   ├── controllers/     # What each API does (Controller)
│   ├── validators/      # Checks the form data
│   └── middlewares/     # Handles "not found" and errors
│
└── frontend/src/
    ├── app/             # Pages (View)
    ├── components/      # Reusable pieces
    │   ├── ui/             # Button, tags, detail rows
    │   ├── form/           # Input, Select, TextArea, Checkbox
    │   ├── layout/         # Navbar, Footer
    │   └── requirement/    # Form, list item, detail page, form steps
    ├── constants/       # Dropdown options and menu links
    ├── models/          # Data types (Model)
    ├── controllers/     # Page logic (Controller)
    ├── services/        # Talks to the API
    └── utils/           # Small helpers
```

---

## Run it on your computer

**You need:** Node.js 20 or newer, and a MongoDB database (free MongoDB Atlas works).

### 1. Backend

```bash
cd backend
npm install
```

- Make a file `backend/.env`:
  ```env
  PORT=5000
  MONGODB_URI=your-mongodb-connection-string
  ```
- Start it:
  ```bash
  npm run dev
  ```
- Open http://localhost:5000 - you should see **"GoPratle API is running"**

### 2. Frontend

```bash
cd frontend
npm install
```

- Make a file `frontend/.env`:
  ```env
  NEXT_PUBLIC_API_URL=http://localhost:5000
  ```
- Start it:
  ```bash
  npm run dev
  ```
- Open http://localhost:3000

**Note:** never share or upload your `.env` files. They are already ignored by Git.

---

## Commands

| Where | Command | What it does |
|---|---|---|
| Backend | `npm run dev` | Build and start the server |
| Backend | `npm run build` | Build only |
| Backend | `npm start` | Start the built server |
| Frontend | `npm run dev` | Start the website |
| Frontend | `npm run build` | Build for production |
| Frontend | `npm run lint` | Check the code for problems |

---

## API (server addresses)

| Method | Address | What it does |
|---|---|---|
| GET | `/` | Checks the server is running |
| GET | `/api/requirements` | Gets all posts, newest first |
| GET | `/api/requirements/:id` | Gets one post |
| POST | `/api/requirements` | Creates a new post |

**What the server replies**
- Saved → `201` and the saved post
- Wrong data → `400` and a message for each wrong field
- Not found → `404`
- Server problem → `500`

---

## Questions for each category

**Event Planner**
- Type of planning: Full, Partial or Day-of coordination
- Services needed: venue, decor, catering, entertainment, guests, logistics
- Number of guests

**Performer**
- Type: Singer, Band, DJ, Dancer, Comedian, Anchor, Magician, Other
- Style or genre
- How many hours
- Audience size
- Sound system at the venue? (Yes / No)

**Crew**
- Roles: Photographer, Videographer, Sound, Lighting, Stage manager, Security, Hospitality, Decorator
- Number of people
- Shift length in hours
- Bring their own equipment? (Yes / No)

---

## How data is checked

Data is checked **twice**:
- **On the website** - shows mistakes right away
- **On the server** - checks again before saving, for safety

Main rules:
- Event name: at least 3 letters
- Date: not in the past
- End date: after the start date
- Category, location and budget: required
- Dropdowns: only the given options
- Numbers (budget, guests, people, hours): more than 0

---

## Put it online

### Backend on Render

- New **Web Service** → connect your GitHub repo
- **Root Directory:** `backend`
- **Build Command:** `npm install --include=dev && npm run build`
- **Start Command:** `npm start`
- **Environment variable:** `MONGODB_URI` = your MongoDB Atlas link
- In MongoDB Atlas → **Network Access** → allow `0.0.0.0/0`

Why `--include=dev`? Render installs in production mode and skips the tools needed to build the code. This brings them back.

### Frontend on Vercel

- New project → connect your GitHub repo
- **Root Directory:** `frontend`
- **Environment variable:** `NEXT_PUBLIC_API_URL` = your Render server link
- Click **Deploy**
- If you change the server link later, **deploy again**

### Good to know

- Render's free plan **sleeps** when no one uses it. The first visit after a break can take up to a minute.
- The server allows requests from any website, so Vercel can talk to Render without extra setup.

---