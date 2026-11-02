# SkillSprint — Personal Skill Gap & Learning Tracker

SkillSprint is a full-stack web application that helps users organize their technical skills, track learning topics, and monitor their learning progress in one place.

## Features

- **User Authentication:** Register and log in securely.
- **Skill Management:** Add, update, and delete skills.
- **Topic Tracking:** Add learning topics under specific skills.
- **Progress Tracking:** Mark topics as completed or pending.
- **Dashboard:** View total skills, completed topics, and overall learning progress.
- **User-specific Data:** Each user can access only their own skills and topics.

## Tech Stack

**Frontend**
- React.js
- React Router
- Axios
- CSS

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

## Project Structure

```text
SkillSprint/
├── client/
│   ├── src/
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
└── README.md
```

## Getting Started

### 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
cd SkillSprint
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the backend:

```bash
npm run dev
```

Backend runs at:

`http://localhost:5000`

### 3. Frontend Setup

Open another terminal:

```bash
cd client
npm install
npm run dev
```

Open the local URL shown by Vite in your browser.

## Environment Variables

| Variable | Description |
|---|---|
| PORT | Backend server port |
| MONGO_URI | MongoDB connection string |
| JWT_SECRET | Secret key used for JWT authentication |

## Learning Outcomes

This project demonstrates practical implementation of:

- Full-stack application development
- REST API development
- Authentication and authorization
- MongoDB database integration
- React state management and API integration
- User-specific data handling

## Future Improvements

- Enhanced analytics and progress insights
- Additional learning productivity features
- Improved mobile responsiveness

---

**SkillSprint — Learn with purpose, grow with consistency.**