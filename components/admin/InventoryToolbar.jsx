"use client";

import {
  Box,
  Chip,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";

import {
  Search,
  Close,
  Category,
  Sort,
  Inventory2,
  RestoreFromTrashOutlined,
} from "@mui/icons-material";

export default function InventoryToolbar({
  title = "Inventory Dashboard",
  subtitle = "Manage your sweets inventory",

  totalItems = 0,
  filteredItems = 0,

  search = "",
  onSearchChange,

  selectedCategory = "All",
  onCategoryChange,

  categories = ["All"],

  sortBy = "name",
  onSortChange,

  isDeletedMode = false,

  searchPlaceholder = "Search sweets...",
}) {
  return (
    <Box
      sx={{
        mb: 3,
        p: {
          xs: 2,
          sm: 2.5,
        },

        borderRadius: 3,

        border: "1px solid #f0e7df",

        bgcolor: "rgba(255,255,255,0.95)",

        boxShadow: "0 4px 18px rgba(120,72,32,0.06)",
      }}
    >
      {/* =========================
          HEADER
      ========================== */}
      <Stack
        direction={{
          xs: "column",
          sm: "row",
        }}
        spacing={2}
        sx={{
          mb: 2,
          justifyContent: "space-between",
        }}
      >
        {/* Title */}
        <Stack direction="row" sx={{ alignItems: "center" }} spacing={1.5}>
          <Box
            sx={{
              width: 44,
              height: 44,
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 2.5,
              bgcolor: "#fff7ed",
              border: "1px solid #fed7aa",
              color: "#d97706",
            }}
          >
            {isDeletedMode ? <RestoreFromTrashOutlined /> : <Inventory2 />}
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: {
                  xs: "1rem",
                  sm: "1.1rem",
                },

                fontWeight: 800,

                color: "#292524",

                lineHeight: 1.3,
              }}
            >
              {title}
            </Typography>

            <Typography
              sx={{
                mt: 0.25,

                fontSize: "0.78rem",

                color: "#a8a29e",
              }}
            >
              {subtitle}
            </Typography>
          </Box>
        </Stack>

        {/* Count */}
        <Chip
          label={
            <>
              <strong>{filteredItems}</strong>
              {" of "}
              {totalItems} items
            </>
          }
          size="small"
          sx={{
            alignSelf: {
              xs: "flex-start",
              sm: "center",
            },

            height: 30,

            px: 0.5,

            borderRadius: 999,

            bgcolor: "#fff7ed",

            color: "#9a3412",

            border: "1px solid #fed7aa",

            fontWeight: 600,

            "& .MuiChip-label": {
              px: 1.25,
            },

            "& strong": {
              color: "#c2410c",
              fontWeight: 800,
            },
          }}
        />
      </Stack>

      {/* =========================
          CONTROLS
      ========================== */}
      <Stack
        direction={{
          xs: "column",
          md: "row",
        }}
        spacing={1.25}
      >
        {/* =========================
            SEARCH
        ========================== */}
        <TextField
          fullWidth
          size="small"
          value={search}
          onChange={(event) => onSearchChange?.(event.target.value)}
          placeholder={searchPlaceholder}
          sx={{
            flex: 1,

            "& .MuiOutlinedInput-root": {
              height: 44,

              borderRadius: 2,

              bgcolor: "#fafaf9",

              "& fieldset": {
                borderColor: "#e7e5e4",
              },

              "&:hover fieldset": {
                borderColor: "#d6d3d1",
              },

              "&.Mui-focused": {
                bgcolor: "#fff",

                "& fieldset": {
                  borderColor: "#fb923c",
                },
              },
            },

            "& input": {
              fontSize: "0.85rem",
              fontWeight: 500,
            },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search
                    sx={{
                      fontSize: 21,
                      color: "#a8a29e",
                    }}
                  />
                </InputAdornment>
              ),

              endAdornment: search ? (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => onSearchChange?.("")}
                    edge="end"
                    aria-label="Clear search"
                    sx={{
                      color: "#a8a29e",

                      "&:hover": {
                        color: "#c2410c",

                        bgcolor: "#fff7ed",
                      },
                    }}
                  >
                    <Close fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ) : null,
            },
          }}
        />

        {/* =========================
            FILTERS
        ========================== */}
        <Stack
          direction="row"
          spacing={1.25}
          sx={{
            width: {
              xs: "100%",
              md: "auto",
            },
          }}
        >
          {/* Category */}
          <FormControl
            size="small"
            sx={{
              minWidth: {
                xs: 0,
                sm: 190,
              },

              flex: 1,
            }}
          >
            <InputLabel>Category</InputLabel>

            <Select
              value={selectedCategory}
              label="Category"
              onChange={(event) => onCategoryChange?.(event.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <Category
                    sx={{
                      fontSize: 19,
                      color: "#a8a29e",
                    }}
                  />
                </InputAdornment>
              }
              sx={{
                height: 44,

                borderRadius: 2,

                bgcolor: "#fafaf9",

                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#e7e5e4",
                },

                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#d6d3d1",
                },

                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#fb923c",
                },
              }}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category === "All" ? "All Categories" : category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Sort */}
          <FormControl
            size="small"
            sx={{
              minWidth: {
                xs: 0,
                sm: 150,
              },

              flex: {
                xs: 1,
                sm: "initial",
              },
            }}
          >
            <InputLabel>Sort</InputLabel>

            <Select
              value={sortBy}
              label="Sort"
              onChange={(event) => onSortChange?.(event.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <Sort
                    sx={{
                      fontSize: 19,
                      color: "#a8a29e",
                    }}
                  />
                </InputAdornment>
              }
              sx={{
                height: 44,

                borderRadius: 2,

                bgcolor: "#fafaf9",

                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#e7e5e4",
                },

                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#d6d3d1",
                },

                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#fb923c",
                },
              }}
            >
              <MenuItem value="name">Name</MenuItem>

              <MenuItem value="price">Price</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Stack>
    </Box>
  );
}
