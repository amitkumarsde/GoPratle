# GoPratle - Project Walkthrough (Note)

A short note to understand the Project.

**Live website:** https://go-pratle-delta.vercel.app/

---

## 1. What is GoPratle?

- A website to **post event requirements**.
- You can ask for an **Event Planner**, a **Performer** or a **Crew**.
- Everyone can **see all posts**, **filter** them and **open full details**.

**Tech in one line:** Next.js website + Express server + MongoDB database, all in TypeScript.

---

## 2. How I understood the task

- I split the task into **3 parts**:
  1. A step-by-step form
  2. Saving the data
  3. Showing the data back
- Some questions are the **same for every event** (name, date, place).
- Some questions **change by category** (planner, performer, crew).
- So I saved the data the same way: **common info + category info**.

---

## 3. My approach

- Kept the code **simple** and **organised**.
- Followed **MVC** - data, screens and logic are kept separate.
- Built in this order:
  1. Server and database
  2. Form
  3. List page and detail page
  4. Checks and error messages
  5. Design with logo colours

---

## 4. Key decisions (and why)

- **All form answers in one place** - going back a step never loses data.
- **Check data twice** - website shows mistakes fast, server keeps data safe.
- **Same reply style from the server** - the website always knows what to expect.
- **Category info saved in one group** - easy to store different questions for each category.
- **Filter on the website** - data is small, so filtering feels instant.

---

## 5. Assumptions

- No login yet - anyone can post.
- Budget is in **Indian Rupees**.
- An event can't be in the past.
- Multi-day events need an end date after the start date.
- Dropdown options are a **fixed list**.

---

## 6. How the app works (user side)

1. Open the **Home page** → click **Post a Requirement**.
2. **Step 1 - Basics:** name, type, date, place, category.
3. **Step 2 - Category questions:**
   - Planner → type of planning, services
   - Performer → type of act, style, hours
   - Crew → roles, number of people
4. **Step 3 - Budget & more:** budget, notes, a few more questions.
5. **Step 4 - Review:** check and **Submit**.
6. See **All Posts** → filter → open any post.

---

## 7. Website side (frontend)

- Pages: **Home, Post, All Posts, Post Detail, 404, Error**.
- **Continue** checks only the current step.
- A mistake shows a **red message** and the page **scrolls to it**.
- Before sending, answers are **cleaned up** (numbers become real numbers, only the chosen category's answers are sent).
- **One place** handles all calls to the server.
- **Reusable pieces** like buttons, inputs and error text.
- Colours: **orange**, **light orange** and **white**.

---

## 8. Server side (backend)

- Server **connects to the database first**, then starts.
- If the database fails, the server **stops**, so the host knows.
- Every request goes: **Address → Logic → Check → Save**.
- Wrong data → server says **which field** is wrong.
- Correct data → **saved** in the database.
- Wrong link or unknown address → clear **"not found"** message.

---

## 9. Talking to the server (API)

**3 main addresses**
- Get **all posts**
- Get **one post**
- **Create** a post

**Create - what is sent**
- Event basics: name, type, dates, place, venue
- Category, budget, notes
- Category answers (only for the chosen category)

**What comes back**
- Saved → success and the saved post
- Wrong data → a message for each wrong field
- Not found → "not found" message
- Server problem → simple "something went wrong" message

**Nice touch:** if the server finds a wrong field, the form **goes back to that step** and shows the message there.

---

## 10. Database flow (MongoDB)

**Saving**
- Form → Server → Check → Database
- The database also checks the basic rules again.
- **Date and time of posting** is saved automatically.

**Reading**
- All posts → **newest first**.
- One post → check the link is valid → find it → "not found" if missing.

---

## 11. Testing

- **Server:** about 20 checks - correct posts, empty forms, past dates, fake options, broken data, wrong links.
- **Website:** every form step, error messages, submit, list, filters, detail page, 404 page.
- **Server off:** checked the "Cannot connect" message and **Try again** button.
- **Code checks:** no type or lint errors.
- **Not done yet:** automated tests.

---

## 12. Tricky cases handled

- **Time zones** - a user in India can still pick "today", even though the server uses a different time zone.
- **End date before start date** - blocked.
- **Changing category midway** - only the final category's answers are saved.
- **Fake data sent directly to the server** - rejected.
- **Broken data, wrong links, server down** - clear messages, no crash.

---

## 13. Limitations

- Filtering is on the website - slow for thousands of posts.
- No login, no edit, no delete, no search.
- Category answers are checked by the server, not strictly by the database.
- Free server sleeps - first visit can be slow.

---

## 14. What I would improve

- Search, filter and pages **on the server**.
- **Edit and delete** posts.
- **Login**, so users manage their own posts.
- **Automated tests**.
- **Stricter database rules** for each category.

---