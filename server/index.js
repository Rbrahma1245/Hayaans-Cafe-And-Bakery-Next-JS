import "dotenv/config";
import express from "express";
import cors from "cors";
import multer from "multer";
import crypto from "node:crypto";
import { listSweets, listDeletedSweets, getSweet, createSweet, updateSweet, deleteSweet, enableSweet, supabase } from "./db.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.set("trust proxy", 1);
app.use(cors({ origin: process.env.CLIENT_ORIGIN || "*" }));
app.use(express.json({ limit: "100kb" }));

/* ---------- Login tokens ---------- */

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

/* ---------- Cloud Photo Uploads (Supabase Storage) ---------- */

// Use memory storage so we can stream the file buffer directly to Supabase
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    allowed.includes(file.mimetype) ? cb(null, true) : cb(new Error("Only JPG, PNG, WebP or GIF photos are allowed"));
  },
});

app.post("/uploads", requireAdmin, upload.single("photo"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No photo received" });

    const fileExt = req.file.originalname.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    // Upload to Supabase bucket named 'sweet-images'
    const { error: uploadError } = await supabase.storage
      .from("sweet-images")
      .upload(filePath, req.file.buffer, {
        contentType: req.file.mimetype,
        upsert: false,
      });

    if (uploadError) throw uploadError;

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from("sweet-images")
      .getPublicUrl(filePath);

    res.status(201).json({ path: publicUrlData.publicUrl });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Failed to upload image to cloud storage" });
  }
});

/* ---------- Sweets (Async database routes) ---------- */

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

app.get("/sweets", async (_req, res) => {
  console.log("SWEETS API CALl");
  
  try {
    res.json(await listSweets());
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch sweets" });
  }
});

app.get("/deletedSweets", async (_req, res) => {
  try {
    res.json(await listDeletedSweets());
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch deleted sweets" });
  }
});

app.get("/sweets/:id", async (req, res) => {
  try {
    const sweet = await getSweet(Number(req.params.id));
    if (!sweet) return res.status(404).json({ error: "Sweet not found" });
    res.json(sweet);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch sweet" });
  }
});

app.post("/sweets", requireAdmin, async (req, res) => {
  const error = validate(req.body);
  if (error) return res.status(400).json({ error });
  try {
    const newSweet = await createSweet(req.body);
    res.status(201).json(newSweet);
  } catch (err) {
    res.status(500).json({ error: "Failed to create sweet" });
  }
});

app.put("/sweets/:id", requireAdmin, async (req, res) => {
  const error = validate(req.body);
  if (error) return res.status(400).json({ error });
  try {
    const id = Number(req.params.id);
    const sweet = await updateSweet(id, req.body);
    if (!sweet) return res.status(404).json({ error: "Sweet not found" });
    res.json(sweet);
  } catch (err) {
    res.status(500).json({ error: "Failed to update sweet" });
  }
});

app.delete("/sweets/:id", requireAdmin, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const success = await deleteSweet(id);
    if (!success) return res.status(404).json({ error: "Sweet not found" });
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: "Failed to delete sweet" });
  }
});

app.patch("/sweets/:id/enable", requireAdmin, async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).json({ error: "Invalid sweet ID" });
    const enabled = await enableSweet(id);
    if (!enabled) return res.status(404).json({ error: "Deleted sweet not found" });
    res.json({ success: true, message: "Sweet enabled successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to enable sweet" });
  }
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong" });
});

app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));