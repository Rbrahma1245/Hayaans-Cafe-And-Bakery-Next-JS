"use client";

import { useState, useMemo } from "react";
import { imageUrl } from "@/lib/image";
import { FormControlLabel, Switch } from "@mui/material";

export default function SweetsInventoryList({
  sweets,
  onEdit,
  onDelete,
  onEnable,
  enablingId,
  busy,
  mode = "inventory",
}) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");

  const isDeletedMode = mode === "deleted";

  const categories = useMemo(() => {
    return ["All", ...new Set(sweets.map((s) => s.category).filter(Boolean))];
  }, [sweets]);

  const filteredSweets = useMemo(() => {
    return sweets
      .filter((item) => {
        const searchValue = search.toLowerCase();

        const matchesSearch =
          item.name?.toLowerCase().includes(searchValue) ||
          item.description?.toLowerCase().includes(searchValue);

        const matchesCategory =
          selectedCategory === "All" || item.category === selectedCategory;

        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === "name") {
          return a.name.localeCompare(b.name);
        }

        if (sortBy === "price") {
          return (a.price || 0) - (b.price || 0);
        }

        return 0;
      });
  }, [sweets, search, selectedCategory, sortBy]);

  return (
    <section className="adm-inventory-section">
      {/* Toolbar */}
      <div className="inventory-toolbar">
        <div className="toolbar-header">
          <h2>{isDeletedMode ? "Deleted Items" : "Inventory Dashboard"}</h2>

          <span className="count-badge">
            {filteredSweets.length} of {sweets.length} items
          </span>
        </div>

        <div className="toolbar-controls">
          {/* Search */}
          <div className="search-box">
            <span className="search-icon">🔍</span>

            <input
              type="text"
              placeholder="Search items..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {search && (
              <button
                type="button"
                className="clear-btn"
                onClick={() => setSearch("")}
              >
                ✕
              </button>
            )}
          </div>

          {/* Filters */}
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

      {/* Empty State */}
      {filteredSweets.length === 0 ? (
        <div className="empty-inventory-state">
          <span className="empty-icon">🧁</span>

          <h3>{isDeletedMode ? "No deleted items" : "No treats found"}</h3>

          <p>
            {isDeletedMode
              ? "There are no deleted items to restore."
              : "Try adjusting your search filters or add a new treat."}
          </p>
        </div>
      ) : (
        <div className="inventory-grid">
          {filteredSweets.map((item) => (
            <article
              className={`inventory-card ${
                isDeletedMode ? "deleted-inventory-card" : ""
              }`}
              key={item.id}
            >
              {/* Image */}
              <div
                className="card-media-wrap"
                style={{
                  background: item.tint || "#F7DCE0",
                }}
              >
                {item.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={imageUrl(item.image)}
                    alt={item.name}
                    className="card-img"
                  />
                ) : (
                  <span className="card-emoji-large">{item.emoji || "🍰"}</span>
                )}

                <span className="category-pill">{item.category}</span>

                {/* {isDeletedMode && (
                  <span className="deleted-pill">
                    Deleted
                  </span>
                )} */}
              </div>

              {/* Details */}
              <div className="card-body">
                <div className="card-title-row">
                  <h3>{item.name}</h3>

                  <div className="price-tag">
                    {item.sizes?.length ? (
                      <span className="multi-size-tag">
                        {item.sizes.length} sizes
                      </span>
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

              {/* Actions */}
              <div className="card-actions">
                {isDeletedMode ? (

                  <FormControlLabel
                    label="Enable"
                    labelPlacement="end"
                    control={
                      <Switch
                        checked={false}
                        onChange={() => onEnable?.(item)}
                        disabled={enablingId === item.id}
                        color="success"
                      />
                    }
                    sx={{
                      margin: 0,
                      gap: 1,

                      "& .MuiFormControlLabel-label": {
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        color: "#44403c",
                      },
                    }}
                  />
                ) : (
                  <>
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
                  </>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
