"use client";

import { useState, useMemo, useEffect } from "react";
import { imageUrl } from "@/lib/image";
import { FormControlLabel, Switch } from "@mui/material";
import { parseSizes } from "@/utils/const-function";
import AppPagination from "@/components/AppPagination";
import InventoryToolbar from "@/components/InventoryToolbar";

const ITEMS_PER_PAGE = 12;

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

  // Pagination
  const [page, setPage] = useState(1);

  const isDeletedMode = mode === "deleted";

  /*
   * Categories
   */
  const categories = useMemo(() => {
    return ["All", ...new Set(sweets.map((s) => s.category).filter(Boolean))];
  }, [sweets]);

  /*
   * Search + Filter + Sort
   */
  const filteredSweets = useMemo(() => {
    return sweets
      .filter((item) => {
        const searchValue = search.toLowerCase().trim();

        const matchesSearch =
          item.name?.toLowerCase().includes(searchValue) ||
          item.description?.toLowerCase().includes(searchValue);

        const matchesCategory =
          selectedCategory === "All" || item.category === selectedCategory;

        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === "name") {
          return (a.name || "").localeCompare(b.name || "");
        }

        if (sortBy === "price") {
          return (a.price || 0) - (b.price || 0);
        }

        return 0;
      });
  }, [sweets, search, selectedCategory, sortBy]);

  /*
   * Reset to page 1 whenever
   * search/filter/sort changes.
   */
  useEffect(() => {
    setPage(1);
  }, [search, selectedCategory, sortBy]);

  /*
   * Total pages
   */
  const pageCount = Math.ceil(filteredSweets.length / ITEMS_PER_PAGE);

  /*
   * Current page items
   */
  const paginatedSweets = useMemo(() => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;

    const endIndex = startIndex + ITEMS_PER_PAGE;

    return filteredSweets.slice(startIndex, endIndex);
  }, [filteredSweets, page]);

  /*
   * If an item is deleted from the
   * last page, make sure the page
   * doesn't become invalid.
   */
  useEffect(() => {
    if (pageCount > 0 && page > pageCount) {
      setPage(pageCount);
    }
  }, [page, pageCount]);

  /*
   * Pagination handler
   */
  const handlePageChange = (_, value) => {
    setPage(value);

    // Optional: scroll back to inventory
    window.scrollTo({
      top: document.getElementById("inventory")?.offsetTop - 80 || 0,
      behavior: "smooth",
    });
  };

  return (
    <section className="adm-inventory-section" id="inventory">
      {/* =========================
          TOOLBAR
      ========================== */}
      <InventoryToolbar
        title={isDeletedMode ? "Deleted Items" : "Inventory Dashboard"}
        subtitle={
          isDeletedMode
            ? "Manage your deleted sweets"
            : "Manage your sweets inventory"
        }
        totalItems={sweets.length}
        filteredItems={filteredSweets.length}
        search={search}
        onSearchChange={setSearch}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories}
        sortBy={sortBy}
        onSortChange={setSortBy}
        isDeletedMode={isDeletedMode}
      />

      {/* =========================
          EMPTY STATE
      ========================== */}
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
        <>
          {/* =========================
              INVENTORY GRID
          ========================== */}
          <div className="inventory-grid">
            {paginatedSweets.map((item) => (
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
                    <span className="card-emoji-large">
                      {item.emoji || "🍰"}
                    </span>
                  )}

                  <span className="category-pill">{item.category}</span>
                </div>

                {/* Details */}
                <div className="card-body">
                  <div className="card-title-row">
                    <h3>{item.name}</h3>

                    <div className="price-tag">
                      {parseSizes(item.sizes).length ? (
                        <span className="multi-size-tag">
                          {parseSizes(item.sizes).length} sizes
                        </span>
                      ) : item.price != null ? (
                        `₹${item.price}`
                      ) : (
                        "N/A"
                      )}
                    </div>
                  </div>

                  <p className="card-desc">{item.description}</p>

                  {Array.isArray(item.sizes) && item.sizes.length > 0 && (
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

          {/* =========================
              PAGINATION
          ========================== */}
          <AppPagination
            page={page}
            count={pageCount}
            onChange={handlePageChange}
            totalItems={filteredSweets.length}
            itemsPerPage={ITEMS_PER_PAGE}
            // showInfo
            showFirstLast
          />
        </>
      )}
    </section>
  );
}
