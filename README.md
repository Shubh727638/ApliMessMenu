# Apli Mess Menu

Find nearby messes and tiffin services. Compare daily menus, prices, timings and ratings, and save the ones you like.

- **FrontEnd/**: React 18 + MUI single-page app (Create React App)
- **Backend/**: Express + MongoDB (Mongoose) API

## Quick start

```bash
npm run install-all   # installs root, Backend and FrontEnd dependencies
npm run dev           # API on :5000 + React dev server on :3000
```

Open http://localhost:3000.

MongoDB is optional for local development. If the API can't reach MongoDB it serves the
built-in sample listings from `Backend/data/seedMesses.js`, so the site works out of the box.
When MongoDB is reachable and the `messes` collection is empty, the sample data is inserted
automatically. `npm run seed` resets the collection to the sample data.

## Configuration

Copy the example env files (`Backend/.env.example`, `FrontEnd/.env.example`) to `.env` and adjust them:

| File | Variable | Purpose |
| --- | --- | --- |
| `Backend/.env` | `PORT` | API port (default `5000`) |
| | `MONGODB_URI` | MongoDB connection string |
| | `CORS_ORIGIN` | Comma-separated allowed origins (empty = allow all) |
| `FrontEnd/.env` | `REACT_APP_API_URL` | API base URL if it's hosted on another domain |
| | `REACT_APP_AUTH0_DOMAIN` / `REACT_APP_AUTH0_CLIENT_ID` | Auth0 SPA app used for login |

In Auth0, add your site URL to **Allowed Callback URLs**, **Allowed Logout URLs** and **Allowed Web Origins**.

## Production

```bash
npm run build   # builds FrontEnd/build
npm start       # Express serves the API and the built site on one port
```

## API

| Method | Path | Description |
| --- | --- | --- |
| GET | `/api/health` | Health check, reports whether MongoDB or sample data is in use |
| GET | `/api/messes?q=&type=veg\|non-veg` | List and search messes (name, area, tags, menu items) |
| GET | `/api/messes/:id` | One mess, by slug or Mongo id |
| POST | `/api/contact` | `{ name, email, message }`, validated and stored |

## Before going live

- Replace the sample listings in `Backend/data/seedMesses.js` (names, phones and prices are placeholders).
- Add real photos by setting `image` (a URL) on each mess. Without one, a generated cover is shown.
- Check the contact details in `FrontEnd/src/config.js`.
