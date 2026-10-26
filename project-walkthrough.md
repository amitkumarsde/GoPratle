# GoPratle - Project Walkthrough (Note)

A short note to understand and revise the project. Easy words, one idea per point.

---

## 1. What the project is

- **GoPratle** is an **Event Requirement Posting App**.
- People post what they need for an event: an **Event Planner**, a **Performer** or a **Crew**.
- Everyone can see the posted requirements, filter them and open full details.
- **Frontend:** Next.js + TailwindCSS + Lucide icons
- **Backend:** Node.js + Express
- **Database:** MongoDB (with Mongoose)
- **Language:** TypeScript everywhere

---

## 2. How I understood the task

- The work has **three parts**:
  1. A multi-step form
  2. Saving the data
  3. Showing the data back
- The form has **common fields** (name, date, location) and **category fields** that change.
- So the data is split the same way: common fields + one **details** part for the category.

---

## 3. My approach

- Used **MVC** on both sides, so each file has one job.
- Kept the code **simple**: plain functions, simple checks, small reusable components.
- Built in this order:
  1. Backend API
  2. Form
  3. List and detail pages
  4. Validation and error handling
  5. UI polish (theme colors from the logo)

---

## 4. Key decisions

- **One form state object** - all form values in one place, so going back and forth between steps keeps the data.
- **One collection with a details object** - common fields on top, category fields inside details.
- **Category field** - tells if a post is Planner, Performer or Crew.
- **Validation in two places** - frontend for instant feedback, backend for safety.
- **Same reply shape for every API call** - success, message, data, errors.
- **Filtering in the browser** - data is small, so all posts load once and filtering is instant.

---

## 5. Assumptions

- No login for now - anyone can post and view.
- Budget is in **Indian Rupees**.
- Event date cannot be in the past.
- A multi-day event needs an end date after the start date.
- Dropdown options (event types, services, roles) are a **fixed list**.

---

## 6. Working application flow

1. User opens the **Home page** and clicks **Post a Requirement**.
2. **Step 1 - Event Basics:** name, type, single or multi-day date, location, venue, category.
3. **Step 2 - Category Details:** questions change by category.
   - Planner → planning scope, services
   - Performer → type, genre, duration
   - Crew → roles, crew size
4. **Step 3 - Budget & More:** a few more category questions, budget, notes.
5. **Step 4 - Review:** check everything, then **Submit**.
6. Success message → go to **All Posts** → filter by category → open the **detail page**.

---

## 7. Frontend - key points

- Pages: **Home, Post, All Posts, Post Detail, 404, Error**.
- One **custom hook** holds all form logic: values, current step, errors, loading.
- **Continue** checks only the current step.
  - Wrong field → red message + **scroll to the first wrong field**.
- Before sending, the form data is **converted to the API format** (numbers become numbers, only the chosen category's fields are sent).
- **One function for all API calls**, so error handling is in one place.
- **Reusable components:** input, select, button, error text, loading text, detail rows, category tag.
- Theme: **orange** primary, **light orange** secondary, **white** background.

---

## 8. Backend - key points

- Server **connects to MongoDB first**, then starts.
- If the database fails → the app **stops with an error**, so the host knows.
- App setup: **CORS**, **JSON reading**, routes, **JSON 404**, **central error handler**.
- Flow: **Route → Controller → Validator → Model → MongoDB**.
- Wrong data → **400** with an error for each field.
- Correct data → saved → **201**.

---

## 9. API - request and response

**Endpoints**
- **GET** all posts (newest first)
- **GET** one post by id
- **POST** create a post

**Request (create)** - sends:
- event name, type, start date, end date, location, venue
- category, budget, notes
- details (only for the chosen category)

**Response**
- Success → `201`, success true, the saved post
- Bad data → `400`, success false, a message, and an error for each wrong field
- Wrong id or route → `404`
- Server problem → `500`

**On the frontend**
- Field errors from the server → the form **jumps back to that step** and shows the error under the field.

---

## 10. MongoDB data flow

**Saving**
- Form → API → Validator → Mongoose → MongoDB
- Mongoose also checks: required fields, allowed category, budget at least 1.
- **createdAt** and **updatedAt** are added automatically.

**Reading**
- All posts → sorted by **newest first**.
- One post → first check the id format → then find it → **404** if not found.

---

## 11. Testing

- **API:** about 20 requests - valid posts for all 3 categories, empty data, past date, wrong dropdown values, broken JSON, wrong id, unknown route.
- **Website:** every form step, error messages and scroll, multi-day dates, submit, list, filters, detail page, 404 page.
- **Server down:** checked the "Cannot connect" message and the **Try again** button.
- **Code checks:** type-check and lint on both projects.
- **No automated tests yet.**

---

## 12. Edge cases handled

- **Today's date across time zones** - the server allows from yesterday (UTC), so a user in India can still pick their own "today".
- **End date before start date** - blocked on both sides.
- **Switching category** - only the chosen category's answers are sent.
- **Fake values sent straight to the API** - rejected by the backend.
- **Broken JSON, wrong id, unknown route, server down** - clear messages, no crash.

---

## 13. Limitations

- Filtering is in the browser - not good for thousands of posts.
- No login, no edit or delete, no search.
- The details part is checked by the backend, not strictly by the database schema.
- Render free plan sleeps - the first request can be slow.

---

## 14. What I would improve

- Search, filter and pagination **through the API**, with database indexes.
- **Edit and delete** posts.
- **User login**, so people manage their own posts.
- **Automated tests** for validation, API and form.
- **Stricter database schema** for each category.

---

## 15. Quick revision

- 4 steps · 3 categories · 3 API endpoints
- Validation: frontend + backend + database
- MVC on both sides
- Hosting: Vercel (frontend) + Render (backend) + MongoDB Atlas (database)
