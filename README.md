# DeshiDwell

![DeshiDwell Logo](public/window.svg) <!-- Replace with your actual logo path if available -->

A modern, full-stack property rental platform built with Next.js, empowering users to discover, list, and manage verified rentals across Bangladesh. Features seamless authentication via Clerk, responsive UI with Tailwind CSS, and a MongoDB-powered backend for property management.

## Live-Link
` https://deshi-dwell.vercel.app/ `

## Features

- **User Authentication**: Secure sign-in/up with Clerk (email, social logins).
- **Property Management**: Add, view, edit, and delete listings with image uploads.
- **Search & Browse**: Filter properties by location, type, price, and amenities.
- **Dark Mode**: Toggleable theme for better accessibility.
- **Responsive Design**: Mobile-first UI with desktop optimizations.
- **Admin Dashboard**: Manage personal properties with stats (total value, avg. rent).
- **Celebratory UX**: Toast notifications and confetti on successful actions.

## Tech Stack

- **Frontend**: Next.js 16, React 19, Tailwind CSS 4, Lucide React (icons), React Hot Toast, Canvas Confetti, SweetAlert2.
- **Backend**: Node.js, Express 5, MongoDB 7, CORS, dotenv.
- **Auth**: Clerk.
- **Deployment**: Vercel (frontend), Render/MongoDB Atlas (backend).
- **Other**: Axios (API calls), Heroicons.

## Setup & Installation

### Prerequisites

- Node.js (v18+)
- MongoDB (local or Atlas cluster)
- Clerk account (for auth keys)
- Git

### Backend Setup

1. Clone the repo and navigate to backend folder:
   ```
   git clone <your-repo-url>
   cd backend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create `.env` file in backend root:
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   ```
4. Start the server:
   ```
   npm start
   ```
   - Server runs on `http://localhost:5000`.
   - Test: `GET /properties` should return empty array if no data.

### Frontend Setup

1. Navigate to root (Next.js app):
   ```
   cd ..  # From backend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create `.env.local` in root:
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
   NEXT_PUBLIC_API_URL=http://localhost:5000  # Update to production backend URL
   ```
4. Run dev server:
   ```
   npm run dev
   ```
   - App runs on `http://localhost:3000`.
   - Edit `app/page.js` for hot-reloads.

### Database Setup

- Use MongoDB Atlas (free tier): Create cluster, get connection string, whitelist IP 0.0.0.0/0.
- Collections: `properties` (fields: `_id`, `userId`, `title`, `price`, `location`, etc.).

### Build & Production

- Frontend: `npm run build` → `npm start` (runs on port 3000).
- Backend: Already production-ready with `npm start`.

## Route Summary

### Frontend Routes (Next.js App Router)

| Route                | Description                                      | Auth Required? |
| -------------------- | ------------------------------------------------ | -------------- |
| `/`                  | Home page: Hero, stats, testimonials, features.  | No             |
| `/properties`        | Browse all properties (search/filter).           | No             |
| `/properties/[id]`   | Single property details.                         | No             |
| `/add-property`      | Form to add new listing.                         | Yes            |
| `/manage-properties` | Dashboard: List, stats, delete owned properties. | Yes            |
| `/sign-in`           | Clerk sign-in page.                              | No             |
| `/sign-up`           | Clerk sign-up page.                              | No             |
| `/about`             | About page (static).                             | No             |
| `/contact`           | Contact form/page.                               | No             |

### Backend API Endpoints (Express)

| Method | Endpoint           | Description                                  |
| ------ | ------------------ | -------------------------------------------- |
| GET    | `/properties`      | Fetch all properties (paginated/filterable). |
| POST   | `/properties`      | Create new property (multipart for images).  |
| GET    | `/properties/[id]` | Get single property by ID.                   |
| PUT    | `/properties/[id]` | Update property.                             |
| DELETE | `/properties/[id]` | Delete property (auth check).                |

- **Auth**: Frontend uses Clerk; backend assumes `userId` from Clerk webhook or JWT (extend as needed).
- **Error Handling**: API returns JSON with status codes (200 OK, 404 Not Found, etc.).

## Deployment

- **Frontend (Vercel)**:
  1. Push to GitHub.
  2. Import repo in Vercel dashboard.
  3. Add env vars (e.g., Clerk keys, `NEXT_PUBLIC_API_URL=https://your-backend.vercel.app`).
  4. Deploy → Auto-builds on push.
- **Backend (Vercel Serverless or Render)**:
  1. For Vercel: Add `/api` routes in Next.js (migrate Express logic).
  2. For Render: Connect GitHub, set build `npm install`, start `npm start`, add env vars.
- **Database**: MongoDB Atlas (free for dev).
- **Custom Domain**: Add via Vercel/Render dashboard.


## License

MIT License © 2025 DeshiDwell Team. See [LICENSE](LICENSE) for details.
Made by Kazi Fabiha Golam Liya

---
