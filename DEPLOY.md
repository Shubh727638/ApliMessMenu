# Deploying Apli Mess Menu (free)

This deploys the whole app as **one free web service on Render**, backed by a
**free MongoDB Atlas database**. The Express server builds and serves the React
site and the API together, so there is one public URL and link previews work.

Total cost: ₹0. Time: ~20 minutes.

---

## Step 1 — Create a free database (MongoDB Atlas)

1. Go to <https://www.mongodb.com/cloud/atlas/register> and sign up (free).
2. Create a cluster → choose the **free M0** tier → pick a region near your users
   (e.g. Mumbai) → **Create**.
3. **Database Access** (left menu) → **Add New Database User**:
   - Choose **Password** auth. Set a username (e.g. `apli`) and a password.
   - Save the username and password somewhere — you'll need them in Step 3.
4. **Network Access** (left menu) → **Add IP Address** → **Allow access from
   anywhere** (`0.0.0.0/0`). This lets Render connect.
5. **Database** → **Connect** → **Drivers** → copy the connection string. It looks like:
   ```
   mongodb+srv://apli:<db_password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Edit that string: replace `<db_password>` with your real password, and add the
   database name `aplimessmenu` right before the `?`:
   ```
   mongodb+srv://apli:yourpassword@cluster0.xxxxx.mongodb.net/aplimessmenu?retryWrites=true&w=majority
   ```
   Keep this final string for Step 3.

## Step 2 — Put the code on GitHub

Already done — the repo is at **github.com/Shubh727638/ApliMessMenu**. Make sure the
branch you want to deploy (e.g. `main`) has the latest code. If your work is on the
`claude/...` branch, open a pull request and merge it into `main` first.

## Step 3 — Deploy on Render

1. Go to <https://render.com> and sign up with your GitHub account (free).
2. **New +** → **Blueprint**.
3. Select the **ApliMessMenu** repository. Render reads `render.yaml` and sets up
   the service automatically.
4. When prompted for the **MONGODB_URI** environment variable, paste the connection
   string from Step 1.6.
5. Click **Apply** / **Create**. The first build takes ~5 minutes.
6. When it finishes, Render gives you a URL like
   `https://apli-mess-menu.onrender.com`. Open it — your site is live, and it
   auto-fills with sample messes on first run.

> **Note:** the free Render service sleeps after ~15 minutes of no traffic, so the
> first visit after a quiet period takes ~50 seconds to wake up. That's normal for
> the free tier; upgrading removes it.

## Step 4 — (Optional) Turn on login

Login uses Auth0 and is optional — browsing, searching and sharing all work without
it. To enable it for your live URL:

1. Go to <https://manage.auth0.com> → your application.
2. Add your Render URL (e.g. `https://apli-mess-menu.onrender.com`) to:
   **Allowed Callback URLs**, **Allowed Logout URLs**, and **Allowed Web Origins**.
3. Save. If you use your own Auth0 app, also set `REACT_APP_AUTH0_DOMAIN` and
   `REACT_APP_AUTH0_CLIENT_ID` in Render → **Environment**, then redeploy.

## Step 5 — Add your real messes

The site ships with 6 sample listings. Replace them with real ones by editing
`Backend/data/seedMesses.js` and running the seed against your Atlas database:

```bash
# locally, once
MONGODB_URI="<your atlas string>" npm run seed
```

Each listing can set an `image` field (a public image URL) for a real photo;
without one, a generated coloured cover is shown.

---

### How updates deploy

Every time you push to the deployed branch, Render rebuilds and redeploys
automatically. Nothing else to do.

### Deploying somewhere else

The app is a standard Node server that serves `FrontEnd/build`. Any host that runs
Node works (Railway, Fly.io, a VPS). Build with `npm run build`, then run
`npm start`, with `MONGODB_URI` and `PORT` set in the environment.
