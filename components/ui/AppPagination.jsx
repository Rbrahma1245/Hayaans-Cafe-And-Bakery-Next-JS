"use client";

import {
  Stack,
  Pagination,
  PaginationItem,
  Typography,
} from "@mui/material";

export default function AppPagination({
  page,
  count,
  onChange,
  totalItems = 0,
  itemsPerPage = 12,
  showInfo = false,
  showFirstLast = false,
  size = "medium",
}) {
  if (count <= 1) {
    return null;
  }

  const startItem =
    totalItems > 0
      ? (page - 1) * itemsPerPage + 1
      : 0;

  const endItem = Math.min(
    page * itemsPerPage,
    totalItems
  );

  return (
    <Stack
      direction={{
        xs: "column",
        sm: "row",
      }}
      spacing={2}
      sx={{
        mt: {
          xs: 4,
          sm: 5,
        },
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {showInfo && (
        <Typography
          sx={{
            fontSize: "0.8rem",
            fontWeight: 600,
            color: "#78716c",
          }}
        >
          Showing {startItem}-{endItem} of{" "}
          {totalItems}
        </Typography>
      )}

      <Pagination
        count={count}
        page={page}
        onChange={onChange}
        size={size}
        siblingCount={0}
        boundaryCount={1}
        showFirstButton={showFirstLast}
        showLastButton={showFirstLast}
        renderItem={(item) => (
          <PaginationItem
            {...item}
            slots={{
              first: () => <span>«</span>,
              last: () => <span>»</span>,
            }}
          />
        )}
        sx={{
          "& .MuiPaginationItem-root": {
            minWidth: 40,
            height: 40,
            borderRadius: "10px",
            fontWeight: 700,
            color: "#57534e",
            border: "1px solid #e7e5e4",
            backgroundColor: "#fff",
            transition: "all 0.2s ease",

            "&:hover": {
              backgroundColor: "#fff7ed",
              borderColor: "#fdba74",
              color: "#92400e",
            },
          },

          // Active page
          "& .MuiPaginationItem-root.Mui-selected": {
            background:
              "linear-gradient(135deg, #d97706, #ea580c)",
            color: "#fff",
            borderColor: "#d97706",
            boxShadow:
              "0 4px 12px rgba(217, 119, 6, 0.25)",

            "&:hover": {
              background:
                "linear-gradient(135deg, #b45309, #c2410c)",
            },
          },

          // First / Last
          "& .MuiPaginationItem-firstLast": {
            backgroundColor: "#fff7ed",
            color: "#92400e",
            borderColor: "#fed7aa",
            fontSize: "1.1rem",
          },

          "& .MuiPaginationItem-firstLast:hover": {
            backgroundColor: "#ffedd5",
          },

          // Previous / Next
          "& .MuiPaginationItem-previousNext": {
            backgroundColor: "#fff",
            fontSize: "1.15rem",
          },

          // Ellipsis
          "& .MuiPaginationItem-ellipsis": {
            border: "none",
            background: "transparent",
          },

          "@media (max-width: 480px)": {
            "& .MuiPaginationItem-root": {
              minWidth: 34,
              height: 34,
              borderRadius: "8px",
              fontSize: "0.8rem",
            },
          },
        }}
      />
    </Stack>
  );
}