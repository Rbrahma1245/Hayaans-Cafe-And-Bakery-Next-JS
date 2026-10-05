# HaYaan's Cafe And Bakery

Website, API and admin page for HaYaan's Cafe And Bakery in Bengaluru.

- **Website** (Next.js): sweets menu, a page for each sweet, address and phone
- **API** (Express + SQLite, in `server/`): stores the sweets and photos
- **Admin page** (`/admin`): password login, add, edit and delete sweets, upload photos

## Run it

You need [Node.js](https://nodejs.org) 18 or newer. Use two terminals.

```bash
# Terminal 1: API
cd server
npm install
npm run dev
```

```bash
# Terminal 2: website (in the main folder)
npm install
npm run dev
```

- Website: http://localhost:3000
- Admin page: http://localhost:3000/admin
- API check: http://localhost:4000/sweets

## Before you start

1. Open `server/.env` and set `ADMIN_PASSWORD` to your own strong password.
2. In the same file set `TOKEN_SECRET` to a long random string. Make one with:
   `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
3. Never upload `server/.env` or `.env.local` to GitHub (the `.gitignore` already skips them).

## Folders

```
├── app/
│   ├── page.js                Home page
│   ├── sweets/[id]/page.js    Page for one sweet
│   ├── admin/                 Admin login and sweet manager
│   ├── layout.js              Fonts and page title
│   └── globals.css            Styling and animations
├── components/                Menu and sweet card
├── lib/
│   ├── api.js                 All API calls in one place
│   └── image.js               Works out photo links
├── data/sweets.js             Backup sweets, used if the API is not reachable
├── public/images/             Built-in photos
└── server/                    API, database and uploads
```

## Publishing

- **Website:** Vercel or Netlify. Add the environment variable `NEXT_API_URL` set to your API address (https).
- **API:** a Node host such as Render or Railway. Set the same variables as in `server/.env`, and set `CLIENT_ORIGIN` to your website address.
- The database and uploaded photos are files on the server's disk. Use a host with a persistent disk, or the sweets and photos can be lost when the server restarts.
- GitHub Pages cannot run the admin page or the API, and `npm run deploy` does not work with the sweet pages in this version.

## Contact

**Address:** Victorian Comfort, 18/1, Victoria Rd, Victoria Layout, Bengaluru, Karnataka 560047
**Phone:** 083102 21057
