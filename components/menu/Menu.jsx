"use client";

import { useState, useMemo, useEffect } from "react";
import { Box, Button, Stack, Typography, Pagination } from "@mui/material";
import SweetCard from "./SweetCard";
import AppPagination from "../ui/AppPagination";

const ITEMS_PER_PAGE = 12;

export default function Menu({ sweets }) {
  const categories = [
    "All",
    ...new Set(sweets.map((s) => s.category).filter(Boolean)),
  ];

  const [active, setActive] = useState("All");
  const [page, setPage] = useState(1);

  // Filter by category
  const visible =
    active === "All" ? sweets : sweets.filter((s) => s.category === active);

  // Total pages
  const pageCount = Math.ceil(visible.length / ITEMS_PER_PAGE);

  // Current page items
  const paginatedSweets = useMemo(() => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    return visible.slice(startIndex, endIndex);
  }, [visible, page]);

  // Reset to first page whenever category changes
  useEffect(() => {
    setPage(1);
  }, [active]);

  // Change page
  const handlePageChange = (_, value) => {
    setPage(value);

    // Optional: scroll back to menu
    window.scrollTo({
      top: document.getElementById("menu")?.offsetTop - 80 || 0,
      behavior: "smooth",
    });
  };

  return (
    <Box>
      {/* =========================================
          CATEGORY TABS
      ========================================= */}
      <Box
        component="nav"
        aria-label="Sweet categories"
        sx={{
          width: "100%",
          overflowX: "auto",
          pb: 1,
          mb: {
            xs: 3,
            sm: 4,
          },

          "&::-webkit-scrollbar": {
            height: 4,
          },

          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#fed7aa",
            borderRadius: 10,
          },
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          sx={{
            minWidth: "max-content",
            gap: 1,
            justifyContent: {
              xs: "flex-start",
              sm: "center",
            },
            alignItems: "center",
          }}
        >
          {categories.map((category) => {
            const isActive = category === active;

            return (
              <Button
                key={category}
                type="button"
                onClick={() => setActive(category)}
                variant={isActive ? "contained" : "outlined"}
                sx={{
                  minHeight: 40,
                  px: {
                    xs: 2,
                    sm: 2.5,
                  },
                  borderRadius: 99,
                  textTransform: "none",
                  fontSize: "0.82rem",
                  fontWeight: 800,
                  whiteSpace: "nowrap",

                  bgcolor: isActive ? "#d97706" : "#fff",

                  color: isActive ? "#fff" : "#57534e",

                  borderColor: isActive ? "#d97706" : "#e7e5e4",

                  boxShadow: isActive
                    ? "0 5px 14px rgba(217,119,6,.18)"
                    : "none",

                  transition: "all 0.2s ease",

                  "&:hover": {
                    bgcolor: isActive ? "#b45309" : "#fff7ed",

                    borderColor: isActive ? "#b45309" : "#fdba74",

                    color: isActive ? "#fff" : "#92400e",
                  },

                  "&:focus-visible": {
                    outline: "3px solid rgba(217,119,6,.25)",
                    outlineOffset: 2,
                  },
                }}
              >
                {category}
              </Button>
            );
          })}
        </Stack>
      </Box>

      {/* =========================================
          EMPTY STATE
      ========================================= */}
      {visible.length === 0 ? (
        <Box
          sx={{
            py: 8,
            px: 3,
            textAlign: "center",
            borderRadius: 4,
            border: "1px dashed #fed7aa",
            bgcolor: "#fffaf5",
          }}
        >
          <Typography
            sx={{
              fontSize: "2rem",
              mb: 1,
            }}
          >
            🍰
          </Typography>

          <Typography
            sx={{
              fontWeight: 800,
              color: "#44403c",
              fontSize: "1rem",
            }}
          >
            Nothing here yet
          </Typography>

          <Typography
            sx={{
              mt: 0.5,
              color: "#78716c",
              fontSize: "0.85rem",
            }}
          >
            Add sweets in the admin page.
          </Typography>
        </Box>
      ) : (
        <>
          {/* =========================================
              SWEET CARDS
          ========================================= */}
          <Box
            component="section"
            key={`${active}-${page}`}
            sx={{
              display: "grid",

              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)",
              },

              gap: {
                xs: 2,
                sm: 2.5,
                md: 3,
              },

              animation: "menuFadeIn 0.35s ease",

              "@keyframes menuFadeIn": {
                from: {
                  opacity: 0,
                  transform: "translateY(8px)",
                },
                to: {
                  opacity: 1,
                  transform: "translateY(0)",
                },
              },
            }}
          >
            {paginatedSweets.map((sweet, index) => (
              <SweetCard key={sweet.id} sweet={sweet} index={index} />
            ))}
          </Box>

          {/* =========================================
              PAGINATION
          ========================================= */}
          {pageCount > 1 && (
            <AppPagination
              page={page}
              count={pageCount}
              onChange={handlePageChange}
              totalItems={visible.length}
              itemsPerPage={ITEMS_PER_PAGE}
            />
          )}
        </>
      )}
    </Box>
  );
}
