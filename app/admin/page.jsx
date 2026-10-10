"use client";

import { useEffect, useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  IconButton,
  Alert,
  TextField,
  Typography,
  Toolbar,
  Paper,
  InputAdornment,
  CircularProgress,
  Fade,
  Chip,
  Grid,
} from "@mui/material";

import ConfirmDialog from "@/components/ui/confirm-dialog";

import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import LaunchIcon from "@mui/icons-material/Launch";
import LogoutIcon from "@mui/icons-material/Logout";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import BakeryDiningIcon from "@mui/icons-material/BakeryDining";
import CategoryIcon from "@mui/icons-material/Category";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

import SweetFormEditor from "../../components/admin/SweetFormEditor";
import SweetsInventoryList from "../../components/admin/SweetsInventoryList";
import StatusCard from "../../components/ui/StatusCard";
import { parseSizes } from "@/utils/const-function";

const API = process.env.NEXT_PUBLIC_API_URL;

const emptyForm = {
  id: null,
  name: "",
  category: "",
  price: "",
  description: "",
  details: "",
  image: "",
  emoji: "🍰",
  tint: "#F7DCE0",
  sizes: [],
};

/* ============================================================
   COMPONENT
============================================================ */

export default function AdminPage() {
  const [token, setToken] = useState(null);
  const [ready, setReady] = useState(false);

  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);

  const [sweets, setSweets] = useState([]);
  const [deletedSweets, setDeletedSweets] = useState([]);

  const [form, setForm] = useState(emptyForm);

  const [message, setMessage] = useState(null);
  const [busy, setBusy] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [deleteConfirm, setDeleteConfirm] = useState({
    open: false,
    id: null,
  });

  const [selectedStatus, setSelectedStatus] = useState("total-items");

  const [enablingId, setEnablingId] = useState(null);

  /* ============================================================
     SESSION
  ============================================================ */

  useEffect(() => {
    const savedToken = sessionStorage.getItem("adminToken");

    setToken(savedToken);
    setReady(true);
  }, []);

  useEffect(() => {
    if (token) {
      loadSweets();
      loadDeletedSweets();
    }
  }, [token]);

  /* ============================================================
     LOGOUT
  ============================================================ */

  function logout(text) {
    sessionStorage.removeItem("adminToken");

    setToken(null);
    setSweets([]);
    setDeletedSweets([]);
    setForm(emptyForm);
    setIsModalOpen(false);

    if (text) {
      setMessage({
        type: "error",
        text,
      });
    }
  }

  /* ============================================================
     API
  ============================================================ */

  async function call(path, { method = "GET", body, form: formData } = {}) {
    const headers = {};

    /*
     * Authentication
     */
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    /*
     * IMPORTANT:
     *
     * Only set application/json when sending JSON.
     *
     * When sending FormData, DO NOT set Content-Type.
     * The browser automatically sets:
     *
     * multipart/form-data; boundary=...
     */
    if (body !== undefined) {
      headers["Content-Type"] = "application/json";
    }

    const res = await fetch(`${API}${path}`, {
      method,
      headers,
      cache: "no-store",

      body: formData ?? (body !== undefined ? JSON.stringify(body) : undefined),
    });

    /*
     * Session expired
     */
    if (res.status === 401 && token) {
      logout("Your session ended. Please log in again.");

      throw new Error("Session ended");
    }

    /*
     * DELETE 204
     */
    if (res.status === 204) {
      return null;
    }

    /*
     * Parse response
     */
    const data = await res.json().catch(() => ({}));

    /*
     * API error
     */
    if (!res.ok) {
      throw new Error(
        data?.error ||
          data?.message ||
          `Request failed with status ${res.status}`,
      );
    }

    return data;
  }

  /* ============================================================
     LOAD SWEETS
  ============================================================ */

  async function loadSweets() {
    try {
      const data = await call("/sweets");

      setSweets(Array.isArray(data) ? data : []);
    } catch (e) {
      if (e.message !== "Session ended") {
        setMessage({
          type: "error",
          text: e.message,
        });
      }
    }
  }

  /* ============================================================
     LOAD DELETED SWEETS
  ============================================================ */

  async function loadDeletedSweets() {
    try {
      const data = await call("/deletedSweets");

      setDeletedSweets(Array.isArray(data) ? data : []);
    } catch (e) {
      if (e.message !== "Session ended") {
        setMessage({
          type: "error",
          text: e.message,
        });
      }
    }
  }

  /* ============================================================
     LOGIN
  ============================================================ */

  async function login(e) {
    e.preventDefault();

    setBusy(true);
    setMessage(null);

    try {
      const data = await call("/admin/login", {
        method: "POST",
        body: {
          password,
        },
      });

      sessionStorage.setItem("adminToken", data.token);

      setToken(data.token);
      setPassword("");
    } catch (err) {
      setMessage({
        type: "error",
        text: err.message,
      });
    } finally {
      setBusy(false);
    }
  }

  /* ============================================================
     FORM
  ============================================================ */

  function openNewForm() {
    setMessage(null);

    setForm({
      ...emptyForm,
      sizes: [],
    });

    setIsModalOpen(true);
  }

  function startEdit(s) {
    setMessage(null);

    const sizes = parseSizes(s.sizes);

    setForm({
      id: s.id,
      name: s.name ?? "",
      category: s.category ?? "",
      price: s.price ?? "",
      description: s.description ?? "",
      details: s.details ?? "",
      image: s.image ?? "",
      emoji: s.emoji ?? "",
      tint: s.tint ?? "#F7DCE0",

      sizes: sizes.map((z) => ({
        label: z?.label ?? "",
        price: z?.price == null ? "" : String(z.price),
      })),
    });

    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);

    setForm({
      ...emptyForm,
      sizes: [],
    });
  }

  /* ============================================================
     PHOTO UPLOAD
  ============================================================ */

  async function onPhotoUpload(e) {
    const file = e.target.files?.[0];

    /*
     * Allow selecting the same image again later
     */
    e.target.value = "";

    if (!file) {
      return;
    }

    /* ----------------------------------------------------------
       Validate file type
    ---------------------------------------------------------- */

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];

    if (!allowedTypes.includes(file.type)) {
      setMessage({
        type: "error",
        text: "Only JPG, PNG, WebP or GIF photos are allowed.",
      });

      return;
    }

    /* ----------------------------------------------------------
       Validate file size
       Backend limit = 5 MB
    ---------------------------------------------------------- */

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      setMessage({
        type: "error",
        text: "Photo must be smaller than 5 MB.",
      });

      return;
    }

    setBusy(true);
    setMessage(null);

    try {
      /*
       * Create multipart form
       */
      const fd = new FormData();

      /*
       * IMPORTANT:
       *
       * This must match:
       *
       * upload.single("photo")
       *
       * in Express.
       */
      fd.append("photo", file);


      /*
       * Upload
       */
      const data = await call("/uploads", {
        method: "POST",
        form: fd,
      });

      /*
       * Backend should return:
       *
       * {
       *   path: "https://...."
       * }
       */
      if (!data?.path) {
        throw new Error("Photo uploaded but no image URL was returned.");
      }

      /*
       * Save returned public URL in form
       */
      setForm((prev) => ({
        ...prev,
        image: data.path,
      }));

      setMessage({
        type: "success",
        text: "Photo uploaded! Save to apply changes.",
      });
    } catch (err) {
      console.error("Photo upload failed:", err);

      if (err.message !== "Session ended") {
        setMessage({
          type: "error",
          text: err.message || "Failed to upload photo.",
        });
      }
    } finally {
      setBusy(false);
    }
  }

  /* ============================================================
     SAVE
  ============================================================ */

  async function handleSave(e) {
    e.preventDefault();

    setBusy(true);
    setMessage(null);

    /*
     * Convert form sizes into API format
     */
    const sizes = parseSizes(form.sizes)
      .filter((s) => s?.label?.trim() && s?.price !== "")
      .map((s) => ({
        label: s.label.trim(),
        price: Number(s.price),
      }));

    const payload = {
      name: form.name.trim(),
      category: form.category.trim(),
      description: form.description.trim(),

      price: form.price === "" ? null : Number(form.price),

      details: form.details?.trim() ? form.details.trim() : null,

      image: form.image?.trim() ? form.image.trim() : null,

      emoji: form.emoji?.trim() ? form.emoji.trim() : null,

      tint: form.tint || null,

      sizes: sizes.length ? sizes : null,
    };

    try {
      if (form.id) {
        await call(`/sweets/${form.id}`, {
          method: "PUT",
          body: payload,
        });
      } else {
        await call("/sweets", {
          method: "POST",
          body: payload,
        });
      }

      await loadSweets();

      closeModal();

      setMessage({
        type: "success",
        text: `"${payload.name}" saved successfully!`,
      });
    } catch (err) {
      if (err.message !== "Session ended") {
        setMessage({
          type: "error",
          text: err.message,
        });
      }
    } finally {
      setBusy(false);
    }
  }

  /* ============================================================
     DELETE
  ============================================================ */

  async function handleDelete(s) {
    setBusy(true);
    setMessage(null);

    try {
      await call(`/sweets/${s.id}`, {
        method: "DELETE",
      });

      await loadSweets();
      await loadDeletedSweets();

      if (form.id === s.id) {
        closeModal();
      }

      setMessage({
        type: "success",
        text: `"${s.name}" removed.`,
      });
    } catch (err) {
      if (err.message !== "Session ended") {
        setMessage({
          type: "error",
          text: err.message,
        });
      }
    } finally {
      setBusy(false);
    }
  }

  /* ============================================================
     DELETE CONFIRMATION
  ============================================================ */

  function confirmDelete(id) {
    setDeleteConfirm({
      open: true,
      id,
    });
  }

  async function handleConfirmDelete() {
    /*
     * deleteConfirm.id contains the actual ID.
     */
    const selectedId = deleteConfirm.id;

    setDeleteConfirm({
      open: false,
      id: null,
    });

    /*
     * Find the item using the ID.
     */
    const item = sweets.find((s) => s.id === selectedId.id);

    if (item) {
      await handleDelete(item);
    }
  }

  /* ============================================================
     ENABLE DELETED ITEM
  ============================================================ */

  async function handleEnable(item) {
    setEnablingId(item.id);

    try {
      await call(`/sweets/${item.id}/enable`, {
        method: "PATCH",
      });

      await loadSweets();
      await loadDeletedSweets();

      setMessage({
        type: "success",
        text: `"${item.name}" enabled successfully.`,
      });
    } catch (err) {
      if (err.message !== "Session ended") {
        setMessage({
          type: "error",
          text: err.message,
        });
      }
    } finally {
      setEnablingId(null);
    }
  }

  /* ============================================================
     MESSAGE AUTO CLOSE
  ============================================================ */

  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      setMessage(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [message]);

  /* ============================================================
     STATUS
  ============================================================ */

  const isDeletedSelected = selectedStatus === "deleted-items";

  // const categories = [
  //   ...new Set(sweets.map((s) => s.category).filter(Boolean)),
  // ];

  const categories = [
    "Boxes",
    "Chocolates",
    "Cakes",
    "Pastries",
    "Cookies",
    "Cold treats",
  ];

  const Status = [
    {
      id: "total-items",
      label: "Total Items",
      value: sweets.length,
      icon: <BakeryDiningIcon />,
      iconBgColor: "#fff7ed",
      iconColor: "#d97706",
      clickable: true,
    },

    {
      id: "deleted-items",
      label: "Deleted Items",
      value: deletedSweets.length,
      icon: <CategoryIcon />,
      iconBgColor: "#fef2f2",
      iconColor: "#e43939",
      clickable: true,
    },

    {
      id: "categories",
      label: "Active Categories",
      value: categories.length,
      icon: <CategoryIcon />,
      iconBgColor: "#f0fdf4",
      iconColor: "#16a34a",
      clickable: false,
    },
  ];

  function handleStatusClick(stat) {
    setSelectedStatus(stat.id);
  }

  /* ============================================================
     LOADING
  ============================================================ */

  if (!ready) {
    return null;
  }

  /* ============================================================
     API ERROR
  ============================================================ */

  if (!API) {
    return (
      <Container
        maxWidth="md"
        sx={{
          mt: 4,
          px: 2,
        }}
      >
        <Alert severity="error">
          <strong>Configuration Missing:</strong> NEXT_PUBLIC_API_URL is missing
          in .env.local.
        </Alert>
      </Container>
    );
  }

  /* ============================================================
     LOGIN SCREEN
  ============================================================ */

  if (!token) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #fff7ed 0%, #fef3c7 50%, #fed7aa 100%)",
          p: { xs: 1.5, sm: 2 },
          boxSizing: "border-box",
        }}
      >
        <Paper
          elevation={0}
          component="form"
          onSubmit={login}
          sx={{
            width: "100%",
            maxWidth: 420,
            borderRadius: 4,
            overflow: "hidden",
            border: "1px solid",
            borderColor: "rgba(251, 146, 60, 0.2)",
            boxShadow: "0 20px 40px -15px rgba(217, 119, 6, 0.15)",
            bgcolor: "#ffffff",
          }}
        >
          {/* Login Header */}
          <Box
            sx={{
              bgcolor: "#fef3c7",
              pt: 4,
              pb: 3,
              px: 3,
              textAlign: "center",
              borderBottom: "1px solid",
              borderColor: "#fde68a",
            }}
          >
            <Avatar
              sx={{
                width: 72,
                height: 72,
                margin: "0 auto 12px",
                bgcolor: "#ffffff",
                boxShadow: "0 8px 16px -4px rgba(217, 119, 6, 0.2)",
                fontSize: "2.25rem",
                border: "2px solid #fcd34d",
              }}
            >
              🧁
            </Avatar>

            <Typography
              variant="h5"
              fontWeight="800"
              sx={{
                color: "#78350f",
                letterSpacing: "-0.5px",
                fontSize: {
                  xs: "1.35rem",
                  sm: "1.5rem",
                },
              }}
            >
              HaYaan&apos;s Bakery
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "#b45309",
                fontWeight: 500,
                mt: 0.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 0.5,
              }}
            >
              <StorefrontRoundedIcon sx={{ fontSize: 16 }} />
              Admin Management Portal
            </Typography>
          </Box>

          {/* Login Body */}
          <Box
            sx={{
              p: {
                xs: 2.5,
                sm: 4,
              },
            }}
          >
            <Typography
              variant="body1"
              fontWeight="600"
              color="text.primary"
              sx={{ mb: 2 }}
            >
              Sign in to your account
            </Typography>

            <TextField
              fullWidth
              id="admin-password"
              label="Password"
              type={showPw ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter access password"
              autoFocus
              required
              margin="none"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon
                        sx={{
                          color: "#d97706",
                        }}
                      />
                    </InputAdornment>
                  ),

                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPw((v) => !v)}
                        edge="end"
                        size="small"
                        aria-label={showPw ? "Hide password" : "Show password"}
                      >
                        {showPw ? (
                          <VisibilityOffIcon
                            sx={{
                              fontSize: 20,
                            }}
                          />
                        ) : (
                          <VisibilityIcon
                            sx={{
                              fontSize: 20,
                            }}
                          />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2.5,
                  bgcolor: "#fafafa",

                  transition: "all 0.2s ease-in-out",

                  "&:hover": {
                    bgcolor: "#ffffff",
                  },

                  "&.Mui-focused": {
                    bgcolor: "#ffffff",

                    boxShadow: "0 0 0 4px rgba(217, 119, 6, 0.12)",

                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#d97706",
                    },
                  },
                },
              }}
            />

            {message && (
              <Fade in={Boolean(message)}>
                <Alert
                  severity={message.type === "success" ? "success" : "error"}
                  variant="filled"
                  sx={{
                    mt: 2.5,
                    borderRadius: 2,
                    fontSize: "0.875rem",
                    fontWeight: 500,
                  }}
                >
                  {message.text}
                </Alert>
              </Fade>
            )}

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={busy}
              sx={{
                mt: 3,
                py: 1.4,
                borderRadius: 2.5,
                fontSize: "0.95rem",
                fontWeight: 700,
                textTransform: "none",
                bgcolor: "#d97706",

                boxShadow: "0 4px 12px rgba(217, 119, 6, 0.25)",

                transition: "all 0.2s ease-in-out",

                "&:hover": {
                  bgcolor: "#b45309",
                  boxShadow: "0 6px 16px rgba(180, 83, 9, 0.35)",
                  transform: "translateY(-1px)",
                },

                "&:active": {
                  transform: "translateY(0)",
                },
              }}
            >
              {busy ? (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <CircularProgress size={20} color="inherit" />

                  <span>Authenticating...</span>
                </Box>
              ) : (
                "Log In"
              )}
            </Button>
          </Box>
        </Paper>
      </Box>
    );
  }

  /* ============================================================
     ADMIN DASHBOARD
  ============================================================ */

  return (
    <Box
      sx={{
        bgcolor: "#fafaf9",
        minHeight: "100vh",
        pb: 8,
        width: "100%",
        overflowX: "hidden",
      }}
    >
      {/* ========================================================
          TOP HEADER
      ======================================================== */}

      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "#ffffff",
          borderBottom: "1px solid",
          borderColor: "rgba(0, 0, 0, 0.08)",
          color: "text.primary",
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            px: {
              xs: 1.5,
              sm: 2,
              md: 3,
            },
          }}
        >
          <Toolbar
            disableGutters
            sx={{
              justifyContent: "space-between",

              py: {
                xs: 1,
                sm: 1.5,
              },

              gap: {
                xs: 1.5,
                sm: 2,
              },

              flexDirection: {
                xs: "column",
                sm: "row",
              },

              alignItems: {
                xs: "stretch",
                sm: "center",
              },
            }}
          >
            {/* ==================================================
                BRAND
            ================================================== */}

            <Box
              sx={{
                display: "flex",
                alignItems: "center",

                gap: {
                  xs: 1,
                  sm: 1.5,
                },

                width: {
                  xs: "100%",
                  sm: "auto",
                },

                minWidth: 0,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: {
                    xs: 1,
                    sm: 1.5,
                  },
                  width: {
                    xs: "100%",
                    sm: "auto",
                  },
                  minWidth: 0,
                }}
              >
                <Box
                  sx={{
                    width: {
                      xs: 40,
                      sm: 44,
                    },
                    height: {
                      xs: 40,
                      sm: 44,
                    },
                    borderRadius: 2,
                    bgcolor: "#fff7ed",
                    border: "1px solid #fed7aa",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    overflow: "hidden",
                  }}
                >
                  <Box
                    component="img"
                    src="/logo.png"
                    alt="HaYaan's Cafe And Bakery"
                    sx={{
                      width: "80%",
                      height: "80%",
                      objectFit: "contain",
                      display: "block",
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    minWidth: 0,
                    flex: 1,
                  }}
                >
                  {/* Title + Admin Badge */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: {
                        xs: "flex-start",
                        sm: "center",
                      },

                      gap: 1,

                      flexWrap: {
                        xs: "wrap",
                        sm: "nowrap",
                      },

                      minWidth: 0,
                    }}
                  >
                    <Typography
                      variant="h6"
                      fontWeight="800"
                      sx={{
                        color: "#451a03",
                        letterSpacing: "-0.3px",

                        fontSize: {
                          xs: "1rem",
                          sm: "1.25rem",
                        },

                        lineHeight: 1.3,

                        whiteSpace: {
                          xs: "normal",
                          sm: "nowrap",
                        },

                        overflowWrap: "anywhere",
                      }}
                    >
                      HaYaan&apos;s Cafe And Bakery
                    </Typography>

                    <Chip
                      label="Admin Portal"
                      size="small"
                      icon={
                        <AdminPanelSettingsIcon
                          style={{
                            fontSize: 14,
                          }}
                        />
                      }
                      sx={{
                        bgcolor: "#fff7ed",
                        color: "#b45309",
                        fontWeight: 700,
                        fontSize: "0.7rem",
                        height: 22,
                        border: "1px solid #fde68a",

                        flexShrink: 0,
                      }}
                    />
                  </Box>

                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      display: "block",
                      mt: 0.25,
                    }}
                  >
                    Catalog & Menu Management
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* ==================================================
                HEADER ACTIONS
            ================================================== */}

            <Box
              sx={{
                display: "flex",
                gap: {
                  xs: 0.75,
                  sm: 1.5,
                },

                alignItems: "center",

                width: {
                  xs: "100%",
                  sm: "auto",
                },
              }}
            >
              {/* Add Item */}
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={openNewForm}
                sx={{
                  bgcolor: "#d97706",
                  fontWeight: 700,
                  borderRadius: 2,

                  px: {
                    xs: 1.25,
                    sm: 2.5,
                  },

                  flex: {
                    xs: 1,
                    sm: "initial",
                  },

                  minWidth: 0,

                  textTransform: "none",

                  whiteSpace: "nowrap",

                  boxShadow: "0 2px 8px rgba(217, 119, 6, 0.25)",

                  "&:hover": {
                    bgcolor: "#b45309",
                  },
                }}
              >
                Add Item
              </Button>

              {/* Live Site */}
              <Button
                variant="outlined"
                href="/"
                target="_blank"
                rel="noreferrer"
                startIcon={<LaunchIcon />}
                sx={{
                  borderRadius: 2,
                  borderColor: "#e7e5e4",
                  color: "#44403c",
                  fontWeight: 600,

                  flex: {
                    xs: 1,
                    sm: "initial",
                  },

                  minWidth: 0,

                  px: {
                    xs: 1.25,
                    sm: 2,
                  },

                  textTransform: "none",

                  whiteSpace: "nowrap",

                  "&:hover": {
                    borderColor: "#a8a29e",
                    bgcolor: "#f5f5f4",
                  },
                }}
              >
                Live Site
              </Button>

              {/* Logout */}
              <IconButton
                onClick={() => logout()}
                title="Log Out"
                sx={{
                  bgcolor: "#fef2f2",
                  color: "#dc2626",
                  border: "1px solid #fecaca",
                  borderRadius: 2,

                  p: {
                    xs: 0.9,
                    sm: 1,
                  },

                  flexShrink: 0,

                  "&:hover": {
                    bgcolor: "#fee2e2",
                  },
                }}
              >
                <LogoutIcon fontSize="small" />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* ========================================================
          MAIN CONTENT
      ======================================================== */}

      <Container
        maxWidth="xl"
        sx={{
          mt: {
            xs: 2,
            sm: 4,
          },

          px: {
            xs: 1.5,
            sm: 2,
            md: 3,
          },
        }}
      >
        {/* ======================================================
            STATUS CARDS
        ====================================================== */}

        <Grid container spacing={2.5} sx={{ mb: 4 }}>
          {Status.map((stat) => (
            <Grid xs={12} sm={6} md={3} key={stat.label}>
              <StatusCard
                icon={stat.icon}
                label={stat.label}
                value={stat.value}
                iconBgColor={stat.iconBgColor}
                iconColor={stat.iconColor}
                clickable={stat.clickable}
                onClick={() => handleStatusClick(stat)}
                active={selectedStatus === stat.id}
              />
            </Grid>
          ))}
        </Grid>

        {/* ======================================================
            MESSAGE
        ====================================================== */}

        {message && (
          <Fade in={Boolean(message)}>
            <Alert
              severity={message.type === "success" ? "success" : "error"}
              onClose={() => setMessage(null)}
              sx={{
                mb: 3,
                borderRadius: 2.5,
              }}
            >
              {message.text}
            </Alert>
          </Fade>
        )}

        {/* ======================================================
            INVENTORY
        ====================================================== */}

        <Box
          sx={{
            width: "100%",
            maxWidth: "100%",
            minWidth: 0,
          }}
        >
          <SweetsInventoryList
            sweets={isDeletedSelected ? deletedSweets : sweets}
            mode={isDeletedSelected ? "deleted" : "inventory"}
            onEdit={startEdit}
            onEnable={handleEnable}
            enablingId={enablingId}
            onDelete={confirmDelete}
            busy={busy}
          />
        </Box>

        {/* ======================================================
            MODAL EDITOR
        ====================================================== */}

        <Dialog
          open={isModalOpen}
          maxWidth="md"
          fullWidth
          fullScreen={false}
          slotProps={{
            paper: {
              sx: {
                width: "100%",
                maxWidth: {
                  xs: "100%",
                  sm: "900px",
                },
                margin: {
                  xs: 0,
                  sm: 2,
                },
                borderRadius: {
                  xs: 0,
                  sm: 4,
                },
                overflow: "hidden",
              },
            },
          }}
        >
          {/* Modal Header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",

              px: {
                xs: 2,
                sm: 3,
              },

              py: 2,

              borderBottom: "1px solid",

              borderColor: "divider",

              bgcolor: "#fafafa",
            }}
          >
            <Typography
              variant="h6"
              fontWeight="700"
              sx={{
                fontSize: {
                  xs: "1rem",
                  sm: "1.25rem",
                },
              }}
            >
              {form.id ? "Edit Bakery Item" : "Create New Item"}
            </Typography>

            <IconButton onClick={closeModal} aria-label="close" size="small">
              <CloseIcon />
            </IconButton>
          </Box>

          <DialogContent
            sx={{
              p: {
                xs: 2,
                sm: 3,
              },
            }}
          >
            <SweetFormEditor
              form={form}
              setForm={setForm}
              categories={categories}
              onSave={handleSave}
              onPhotoUpload={onPhotoUpload}
              onReset={closeModal}
              busy={busy}
            />
          </DialogContent>
        </Dialog>
      </Container>

      {/* ========================================================
          DELETE CONFIRMATION
      ======================================================== */}

      <ConfirmDialog
        open={deleteConfirm.open}
        onClose={() => {
          setDeleteConfirm({
            open: false,
            id: null,
          });
        }}
        title="Delete"
        content="Are you sure you want to delete this Item ?"
        action={
          <Button
            variant="contained"
            color="error"
            onClick={handleConfirmDelete}
            sx={{
              borderRadius: 1.5,
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Delete
          </Button>
        }
      />
    </Box>
  );
}
