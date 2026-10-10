import { Avatar, Box, Paper, Typography } from "@mui/material";

const StatusCard = ({
  icon,
  label,
  value,
  iconBgColor = "#fff7ed",
  iconColor = "#d97706",
  onClick,
  active = false,
  clickable = true,
}) => {
  return (
    <Paper
      elevation={0}
      onClick={clickable ? onClick : undefined}
      sx={{
        position: "relative",
        overflow: "hidden",

        // Make every card fill its parent
        width: "100%",
        height: "100%",
        minWidth: 0,
        boxSizing: "border-box",

        p: 2.5,
        borderRadius: 3,

        bgcolor: active
          ? iconBgColor
          : "#ffffff",

        border: "1px solid",
        borderColor: active
          ? `${iconColor}66`
          : "rgba(0, 0, 0, 0.06)",

        display: "flex",
        alignItems: "center",
        gap: 2,

        cursor: clickable
          ? "pointer"
          : "default",

        transition: clickable
          ? "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease, background-color 0.25s ease"
          : "none",

        boxShadow: active
          ? `0 8px 24px ${iconColor}25`
          : "none",

        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,

          width: "100%",
          height: "3px",

          background: iconColor,

          transform:
            clickable && active
              ? "scaleX(1)"
              : "scaleX(0)",

          transformOrigin: "left",

          transition: clickable
            ? "transform 0.3s ease"
            : "none",
        },

        "&:hover": clickable
          ? {
              transform: "translateY(-5px)",
              borderColor:
                `${iconColor}66`,
              boxShadow:
                `0 12px 30px ${iconColor}22`,

              "& .status-avatar": {
                transform:
                  "scale(1.08) rotate(-5deg)",
                boxShadow:
                  `0 6px 15px ${iconColor}25`,
              },

              "& .status-value": {
                color: iconColor,
              },
            }
          : {},

        "&:active": clickable
          ? {
              transform:
                "translateY(-2px) scale(0.99)",
            }
          : {},

        // =========================================
        // MOBILE
        // =========================================
        "@media (max-width: 600px)": {
          width: "100%",
          height: "auto",

          p: 2,
          gap: 1.5,

          borderRadius: 2.5,

          "&:hover": clickable
            ? {
                transform: "none",
                borderColor:
                  `${iconColor}66`,
                boxShadow:
                  `0 8px 24px ${iconColor}18`,

                "& .status-avatar": {
                  transform: "none",
                  boxShadow: "none",
                },
              }
            : {},
        },
      }}
    >
      {/* Icon */}
      <Avatar
        className="status-avatar"
        sx={{
          bgcolor: active
            ? "#ffffff"
            : iconBgColor,

          color: iconColor,

          width: 48,
          height: 48,

          flexShrink: 0,

          transition: clickable
            ? "transform 0.3s ease, box-shadow 0.3s ease"
            : "none",
        }}
      >
        {icon}
      </Avatar>

      {/* Content */}
      <Box
        sx={{
          minWidth: 0,
          flex: 1,
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
          fontWeight="500"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </Typography>

        <Typography
          className="status-value"
          variant="h5"
          fontWeight="800"
          color={
            active
              ? iconColor
              : "text.primary"
          }
          sx={{
            transition: clickable
              ? "color 0.25s ease"
              : "none",
          }}
        >
          {value}
        </Typography>
      </Box>
    </Paper>
  );
};

export default StatusCard;
