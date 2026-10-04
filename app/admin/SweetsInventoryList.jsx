"use client";

import { useState, useMemo } from "react";
import { imageUrl } from "@/lib/image";

export default function SweetsInventoryList({ sweets, onEdit, onDelete, busy }) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");

  // Extract unique categories
  const categories = useMemo(() => {
    return ["All", ...new Set(sweets.map((s) => s.category).filter(Boolean))];
  }, [sweets]);

  // Filter & Sort Logic
  const filteredSweets = useMemo(() => {
    return sweets
      .filter((item) => {
        const matchesSearch =
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.description?.toLowerCase().includes(search.toLowerCase());
        const matchesCategory =
          selectedCategory === "All" || item.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === "name") return a.name.localeCompare(b.name);
        if (sortBy === "price") return (a.price || 0) - (b.price || 0);
        return 0;
      });
  }, [sweets, search, selectedCategory, sortBy]);

  console.log(filteredSweets, 'filteredSweetsfilteredSweets');
  

  return (
    <section className="adm-inventory-section">
      {/* Top Header & Search Bar */}
      <div className="inventory-toolbar">
        <div className="toolbar-header">
          <h2>Inventory Dashboard</h2>
          <span className="count-badge">{filteredSweets.length} of {sweets.length} items</span>
        </div>

        <div className="toolbar-controls">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search items..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button className="clear-btn" onClick={() => setSearch("")}>✕</button>
            )}
          </div>

          <div className="filter-group">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="adm-select"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "All" ? "All Categories" : cat}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="adm-select"
            >
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid Display */}
      {filteredSweets.length === 0 ? (
        <div className="empty-inventory-state">
          <span className="empty-icon">🧁</span>
          <h3>No treats found</h3>
          <p>Try adjusting your search filters or add a new treat using the form.</p>
        </div>
      ) : (
        <div className="inventory-grid">
          {filteredSweets.map((item) => (
            <article className="inventory-card" key={item.id}>
              {/* Media Preview Box */}
              <div className="card-media-wrap" style={{ background: item.tint || "#F7DCE0" }}>
                {item.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={imageUrl(item.image)} alt={item.name} className="card-img" />
                ) : (
                  <span className="card-emoji-large">{item.emoji || "🍰"}</span>
                )}
                <span className="category-pill">{item.category}</span>
              </div>

              {/* Info Body */}
              <div className="card-body">
                <div className="card-title-row">
                  <h3>{item.name}</h3>
                  <div className="price-tag">
                    {item.sizes?.length ? (
                      <span className="multi-size-tag">{item.sizes.length} sizes</span>
                    ) : item.price != null ? (
                      `₹${item.price}`
                    ) : (
                      "N/A"
                    )}
                  </div>
                </div>

                <p className="card-desc">{item.description}</p>

                {item.sizes?.length > 0 && (
                  <div className="size-chips-preview">
                    {item.sizes.map((sz, idx) => (
                      <span key={idx} className="size-chip">
                        {sz.label}: ₹{sz.price}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="card-actions">
                <button
                  type="button"
                  className="adm-btn outline small"
                  onClick={() => onEdit(item)}
                  disabled={busy}
                >
                  ✏️ Edit
                </button>
                <button
                  type="button"
                  className="adm-btn danger-ghost small"
                  onClick={() => onDelete(item)}
                  disabled={busy}
                >
                  🗑️ Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}