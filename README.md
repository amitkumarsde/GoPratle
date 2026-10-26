# GoPratle - Event Requirement Posting App

A simple web app where people can post what they need for an event, like an **Event Planner**, a **Performer** or a **Crew**.

---

## What the app does

- Post an event requirement in **4 easy steps**
  1. **Event Basics** - event name, type, date (one day or many days), location, venue and category
  2. **Category Details** - questions that change based on the category you picked
  3. **Budget & More** - a few more category questions, budget and notes
  4. **Review** - check everything, then submit
- See **all posts** in a list, newest first
- **Filter** posts by category: All, Event Planner, Performer, Crew
- Open any post to see its **full details**
- Shows clear **error messages** under fields and scrolls to the first one you missed
- Shows **loading** and **error** states (for example when the server is down)
- Has a **404 page** for wrong links and an **error page** if something breaks

---

## Tech stack

**Frontend**
- Next.js (React) with TypeScript
- Tailwind CSS for styling
- Lucide React for icons

**Backend**
- Node.js with Express and TypeScript
- MongoDB with Mongoose

**Hosting**
- Frontend on **Vercel**
- Backend on **Render**
- Database on **MongoDB Atlas**

---

## Folder structure

The project uses the **MVC** pattern (Model, View, Controller).

```
GoPratle/
├── backend/
│   └── src/
│       ├── server.ts          # Starts the server
│       ├── app.ts             # Express setup (CORS, JSON, routes)
│       ├── config/            # Database connection
│       ├── constants/         # Allowed dropdown values
│       ├── models/            # MongoDB schema (Model)
│       ├── routes/            # API routes
│       ├── controllers/       # Request handlers (Controller)
│       ├── validators/        # Form data checks
│       └── middlewares/       # 404 and error handler
│
└── frontend/
    └── src/
        ├── app/               # Pages: Home, Post, All Posts, Post Detail (View)
        ├── components/
        │   ├── ui/            # Button, tags, detail rows
        │   ├── form/          # Input, Select, TextArea, Checkbox
        │   ├── layout/        # Navbar, Footer
        │   └── requirement/   # Form, list item, detail page, form steps
        ├── constants/         # Dropdown options, nav links
        ├── models/            # Data types (Model)
        ├── controllers/       # React hooks with page logic (Controller)
        ├── services/          # API calls
        └── utils/             # Formatting and validation helpers
```

---

## Before you start

You need:
- **Node.js 20** or newer
- **npm** (comes with Node.js)
- A **MongoDB** database (free MongoDB Atlas account or local MongoDB)

---

## How to run on your computer

### 1. Start the backend

- Go to the backend folder:
  ```bash
  cd backend
  ```
- Install packages:
  ```bash
  npm install
  ```
- Copy `.env.example` to a new file named `.env` and fill it in:
  ```env
  PORT=5000
  MONGODB_URI=your-mongodb-connection-string
  ```
- Start the server:
  ```bash
  npm run dev
  ```
- Open http://localhost:5000 – you should see **"GoPratle API is running"**

### 2. Start the frontend

- Open a new terminal and go to the frontend folder:
  ```bash
  cd frontend
  ```
- Install packages:
  ```bash
  npm install
  ```
- Copy `.env.example` to a new file named `.env`:
  ```env
  NEXT_PUBLIC_API_URL=http://localhost:5000
  ```
- Start the app:
  ```bash
  npm run dev
  ```
- Open http://localhost:3000 in your browser

---

## Environment variables

**Backend (`backend/.env`)**

| Name | What it is | Example |
|---|---|---|
| `PORT` | Port for the server (Render sets this itself) | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/gopratle` |

**Frontend (`frontend/.env`)**

| Name | What it is | Example |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Backend URL | `http://localhost:5000` |

- Never share or upload your real `.env` files. They are already in `.gitignore`.

---

## Useful commands

**Backend**
- `npm run dev` – build and start the server
- `npm run build` – build TypeScript into the `dist` folder
- `npm start` – start the built server

**Frontend**
- `npm run dev` – start the app in development mode
- `npm run build` – make a production build
- `npm start` – run the production build
- `npm run lint` – check the code for problems

---

## API endpoints

Base URL: `http://localhost:5000`

| Method | URL | What it does |
|---|---|---|
| GET | `/` | Check if the API is running |
| GET | `/api/requirements` | Get all posts (newest first) |
| GET | `/api/requirements/:id` | Get one post by its id |
| POST | `/api/requirements` | Create a new post |

**Example - create a post**

```json
{
  "eventName": "TechNova Annual Day 2026",
  "eventType": "Corporate",
  "startDate": "2026-12-05",
  "endDate": null,
  "location": "Bengaluru",
  "venue": "Taj Yeshwantpur",
  "category": "Performer",
  "budget": 350000,
  "notes": "Evening performance after the awards.",
  "details": {
    "performerType": "Band",
    "genre": "Bollywood and retro hits",
    "performanceDuration": 3,
    "audienceSize": 600,
    "soundSystemAvailable": true
  }
}
```

**Responses**
- Success: `{ "success": true, "data": { ... } }`
- Error: `{ "success": false, "message": "...", "errors": { "fieldName": "error message" } }`

**Status codes**
- `201` – post created
- `200` – data loaded
- `400` – wrong or missing data
- `404` – post or route not found
- `500` – server error

---

## Category details

Each category asks different questions and saves them in `details`.

**Event Planner**
- Planning scope (Full planning, Partial planning, Day-of coordination)
- Services needed (Venue sourcing, Decor & theme, Catering, Entertainment, Guest management, Logistics)
- Number of guests

**Performer**
- Performer type (Singer, Band, DJ, Dancer, Comedian, Emcee / Anchor, Magician, Other)
- Genre or style
- Performance duration (hours)
- Audience size
- Is a sound system available at the venue?

**Crew**
- Crew roles (Photographer, Videographer, Sound technician, Lighting technician, Stage manager, Security, Hospitality staff, Decorator)
- Number of crew members
- Shift length (hours)
- Should the crew bring their own equipment?

---

## Validation

Data is checked in **two places**:
- **Frontend** – shows errors right away while filling the form
- **Backend** – checks again before saving, so wrong data never reaches the database

Main rules:
- Event name must be at least 3 characters
- Event date cannot be in the past
- End date must be after the start date
- Location, category and budget are required
- Dropdown values must be from the allowed list
- Numbers like guests, budget and crew size must be more than 0

---

## Deployment

### Backend on Render

- Create a new **Web Service** on Render and connect your GitHub repo
- Fill in these settings:
  - **Root Directory:** `backend`
  - **Build Command:** `npm install --include=dev && npm run build`
  - **Start Command:** `npm start`
- `--include=dev` is needed because Render installs in production mode, which skips TypeScript and the `@types` packages used by the build
- Add environment variable:
  - `MONGODB_URI` = your MongoDB Atlas connection string
- In MongoDB Atlas, go to **Network Access** and allow `0.0.0.0/0` so Render can connect
- After deploy, copy your Render URL (for example `https://gopratle-api.onrender.com`)

### Frontend on Vercel

- Create a new project on Vercel and connect your GitHub repo
- Set **Root Directory** to `frontend`
- Add environment variable:
  - `NEXT_PUBLIC_API_URL` = your Render backend URL
- Click **Deploy**
- If you change `NEXT_PUBLIC_API_URL` later, **redeploy** so the new value is used

### Good to know

- Render's free plan **sleeps** when not used. The first request after a break can take up to a minute.
- CORS is open, so the Vercel site can call the Render API without extra setup.

---