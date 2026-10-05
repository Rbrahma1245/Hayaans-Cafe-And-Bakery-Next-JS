import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";
import { seedSweets } from "./seed.js";

const dbPath = process.env.DB_PATH || "./data/cafe.db";
fs.mkdirSync(path.dirname(dbPath), { recursive: true });

const db = new Database(dbPath);
db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS sweets (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT NOT NULL,
    category    TEXT NOT NULL,
    price       REAL,
    description TEXT NOT NULL,
    details     TEXT,
    image       TEXT,
    emoji       TEXT,
    tint        TEXT,
    sizes       TEXT,
    is_deleted  TEXT NOT NULL DEFAULT 'N'
  )
`);

const toSweet = (row) => (row ? { ...row, sizes: row.sizes ? JSON.parse(row.sizes) : null } : null);

const clean = (d) => ({
  name: d.name.trim(),
  category: d.category.trim(),
  price: d.price ?? null,
  description: d.description.trim(),
  details: d.details ?? null,
  image: d.image ?? null,
  emoji: d.emoji ?? null,
  tint: d.tint ?? null,
  sizes: d.sizes ? JSON.stringify(d.sizes) : null,
});

const insert = db.prepare(`
  INSERT INTO sweets (name, category, price, description, details, image, emoji, tint, sizes)
  VALUES (@name, @category, @price, @description, @details, @image, @emoji, @tint, @sizes)
`);

export function listSweets() {
  return db.prepare("SELECT * FROM sweets WHERE is_deleted = 'N' ORDER BY id").all().map(toSweet);
}
export function listDeletedSweets() {
  return db.prepare("SELECT * FROM sweets WHERE is_deleted = 'Y' ORDER BY id").all().map(toSweet);
}

export function getSweet(id) {
  return toSweet(db.prepare("SELECT * FROM sweets WHERE id = ? AND is_deleted = 'N'").get(id));
}

export function createSweet(data) {
  const result = insert.run(clean(data));
  return getSweet(result.lastInsertRowid);
}

export function updateSweet(id, data) {
  const result = db
    .prepare(`UPDATE sweets SET name=@name, category=@category, price=@price, description=@description,
              details=@details, image=@image, emoji=@emoji, tint=@tint, sizes=@sizes WHERE id=@id AND is_deleted = 'N'`)
    .run({ ...clean(data), id });
  return result.changes ? getSweet(id) : null;
}

export function deleteSweet(id) {
  return db
    .prepare(`
      UPDATE sweets
      SET is_deleted = 'Y'
      WHERE id = ?
        AND is_deleted = 'N'
    `)
    .run(id).changes > 0;
}

export function enableSweet(id) {
  return db
    .prepare(`
      UPDATE sweets
      SET is_deleted = 'N'
      WHERE id = ?
        AND is_deleted = 'Y'
    `)
    .run(id).changes > 0;
}

// Fill an empty database with the starter sweets
if (db.prepare("SELECT COUNT(*) AS n FROM sweets").get().n === 0) {
  db.transaction((items) => items.forEach((s) => insert.run(clean(s))))(seedSweets);
}


// db.exec(`
//   ALTER TABLE sweets
//   ADD COLUMN is_deleted TEXT NOT NULL DEFAULT 'N'
// `);