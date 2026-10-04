import "dotenv/config";
import express from "express";
import cors from "cors";
import multer from "multer";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { listSweets, getSweet, createSweet, updateSweet, deleteSweet } from "./db.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.set("trust proxy", 1);
app.use(cors({ origin: process.env.CLIENT_ORIGIN || "*" }));
app.use(express.json({ limit: "100kb" }));

/* ---------- Login tokens (signed, expire after 8 hours) ---------- */

const hmac = (body) =>
  crypto.createHmac("sha256", process.env.TOKEN_SECRET).update(body).digest("base64url");

function signToken(payload) {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${body}.${hmac(body)}`;
}

function verifyToken(token) {
  try {
    const [body, sig] = String(token || "").split(".");
    if (!body || !sig) return false;
    const a = Buffer.from(sig);
    const b = Buffer.from(hmac(body));
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;
    const { exp } = JSON.parse(Buffer.from(body, "base64url").toString());
    return typeof exp === "number" && exp > Date.now();
  } catch {
    return false;
  }
}

function safeEqual(a, b) {
  const ha = crypto.createHash("sha256").update(a).digest();
  const hb = crypto.createHash("sha256").update(b).digest();
  return crypto.timingSafeEqual(ha, hb);
}

function requireAdmin(req, res, next) {
  if (!process.env.TOKEN_SECRET) return res.status(503).json({ error: "TOKEN_SECRET is not set on the server" });
  const token = (req.get("authorization") || "").replace(/^Bearer\s+/i, "");
  if (!verifyToken(token)) return res.status(401).json({ error: "Please log in again" });
  next();
}

// Allow 5 wrong passwords per 15 minutes from one address
const attempts = new Map();

app.post("/admin/login", (req, res) => {
  if (!process.env.ADMIN_PASSWORD || !process.env.TOKEN_SECRET) {
    return res.status(503).json({ error: "ADMIN_PASSWORD or TOKEN_SECRET is not set on the server" });
  }
  const now = Date.now();
  const rec = attempts.get(req.ip);
  if (rec && rec.resetAt > now && rec.count >= 5) {
    return res.status(429).json({ error: "Too many attempts. Try again in a few minutes." });
  }
  if (!safeEqual(String(req.body?.password ?? ""), process.env.ADMIN_PASSWORD)) {
    if (!rec || rec.resetAt <= now) attempts.set(req.ip, { count: 1, resetAt: now + 15 * 60 * 1000 });
    else rec.count += 1;
    return res.status(401).json({ error: "Wrong password" });
  }
  attempts.delete(req.ip);
  res.json({ token: signToken({ exp: now + 8 * 60 * 60 * 1000 }) });
});

/* ---------- Photo uploads ---------- */

const uploadDir = path.resolve(process.env.UPLOAD_DIR || "./uploads");
fs.mkdirSync(uploadDir, { recursive: true });

const extensions = { "image/jpeg": ".jpg", "image/png": ".png", "image/webp": ".webp", "image/gif": ".gif" };

const upload = multer({
  storage: multer.diskStorage({
    destination: uploadDir,
    filename: (_req, file, cb) => cb(null, crypto.randomUUID() + extensions[file.mimetype]),
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) =>
    extensions[file.mimetype] ? cb(null, true) : cb(new Error("Only JPG, PNG, WebP or GIF photos are allowed")),
});

function removeUpload(image) {
  if (typeof image === "string" && image.startsWith("/uploads/")) {
    fs.unlink(path.join(uploadDir, path.basename(image)), () => {});
  }
}

app.use("/uploads", express.static(uploadDir, { maxAge: "7d" }));

app.post("/uploads", requireAdmin, (req, res) => {
  upload.single("photo")(req, res, (err) => {
    if (err) {
      const message = err.code === "LIMIT_FILE_SIZE" ? "Photo must be smaller than 5 MB" : err.message;
      return res.status(400).json({ error: message });
    }
    if (!req.file) return res.status(400).json({ error: "No photo received" });
    res.status(201).json({ path: `/uploads/${req.file.filename}` });
  });
});

/* ---------- Sweets ---------- */

function validate(b) {
  if (!b || typeof b !== "object") return "Body must be JSON";
  for (const k of ["name", "category", "description"]) {
    if (typeof b[k] !== "string" || !b[k].trim()) return `${k} is required`;
  }
  if (b.price != null && (typeof b.price !== "number" || !(b.price >= 0))) return "price must be a number";
  if (b.image != null && (typeof b.image !== "string" || !/^(\/|https?:\/\/)/.test(b.image))) return "image must be a path or link";
  if (b.tint != null && !/^#[0-9a-fA-F]{6}$/.test(b.tint)) return "tint must be a colour like #F7DCE0";
  if (b.sizes != null) {
    if (!Array.isArray(b.sizes)) return "sizes must be a list";
    for (const s of b.sizes) {
      if (!s || typeof s.label !== "string" || !s.label.trim() || typeof s.price !== "number" || !(s.price >= 0)) {
        return "each size needs a label and a price";
      }
    }
  }
  return null;
}

app.get("/health", (_req, res) => res.json({ ok: true }));

app.get("/sweets", (_req, res) => res.json(listSweets()));

app.get("/sweets/:id", (req, res) => {
  const sweet = getSweet(Number(req.params.id));
  if (!sweet) return res.status(404).json({ error: "Sweet not found" });
  res.json(sweet);
});

app.post("/sweets", requireAdmin, (req, res) => {
  const error = validate(req.body);
  if (error) return res.status(400).json({ error });
  res.status(201).json(createSweet(req.body));
});

app.put("/sweets/:id", requireAdmin, (req, res) => {
  const error = validate(req.body);
  if (error) return res.status(400).json({ error });
  const id = Number(req.params.id);
  const before = getSweet(id);
  const sweet = updateSweet(id, req.body);
  if (!sweet) return res.status(404).json({ error: "Sweet not found" });
  if (before && before.image !== sweet.image) removeUpload(before.image);
  res.json(sweet);
});

app.delete("/sweets/:id", requireAdmin, (req, res) => {
  const id = Number(req.params.id);
  const sweet = getSweet(id);
  if (!sweet) return res.status(404).json({ error: "Sweet not found" });
  deleteSweet(id);
  removeUpload(sweet.image);
  res.status(204).end();
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong" });
});

app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
