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
import ConfirmDialog from "@/components/confirm-dialog";
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

import SweetFormEditor from "./SweetFormEditor";
import SweetsInventoryList from "./SweetsInventoryList";

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

export default function AdminPage() {
  const [token, setToken] = useState(null);
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [sweets, setSweets] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState(null);
  const [busy, setBusy] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState({
    open: false,
    id: null,
  });

  useEffect(() => {
    setToken(sessionStorage.getItem("adminToken"));
    setReady(true);
  }, []);

  useEffect(() => {
    if (token) loadSweets();
  }, [token]);

  function logout(text) {
    sessionStorage.removeItem("adminToken");
    setToken(null);
    setSweets([]);
    setForm(emptyForm);
    setIsModalOpen(false);
    if (text) setMessage({ type: "error", text });
  }

  async function call(path, { method = "GET", body, form: formData } = {}) {
    const headers = {};
    if (token) headers.Authorization = `Bearer ${token}`;
    if (body) headers["Content-Type"] = "application/json";

    const res = await fetch(`${API}${path}`, {
      method,
      headers,
      cache: "no-store",
      body: formData ?? (body ? JSON.stringify(body) : undefined),
    });
  

    if (res.status === 401 && token) {
      logout("Your session ended. Please log in again.");
      throw new Error("Session ended");
    }
    if (res.status === 204) return null;
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || "Something went wrong");
    return data;
  }

  async function loadSweets() {
    try {
      setSweets(await call("/sweets"));
    } catch (e) {
      if (e.message !== "Session ended")
        setMessage({ type: "error", text: e.message });
    }
  }

  async function login(e) {
    e.preventDefault();
    setBusy(true);
    setMessage(null);
    try {
      const data = await call("/admin/login", {
        method: "POST",
        body: { password },
      });
      sessionStorage.setItem("adminToken", data.token);
      setToken(data.token);
      setPassword("");
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
    setBusy(false);
  }

  function openNewForm() {
    setMessage(null);
    setForm(emptyForm);
    setIsModalOpen(true);
  }

  function startEdit(s) {
    setMessage(null);
    setForm({
      id: s.id,
      name: s.name,
      category: s.category,
      price: s.price ?? "",
      description: s.description,
      details: s.details ?? "",
      image: s.image ?? "",
      emoji: s.emoji ?? "",
      tint: s.tint ?? "#F7DCE0",
      sizes: (s.sizes ?? []).map((z) => ({
        label: z.label,
        price: String(z.price),
      })),
    });
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setForm(emptyForm);
  }

  async function onPhotoUpload(e) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setBusy(true);
    setMessage(null);
    try {
      const fd = new FormData();
      fd.append("photo", file);
      const data = await call("/uploads", { method: "POST", form: fd });
      setForm((prev) => ({ ...prev, image: data.path }));
      setMessage({
        type: "success",
        text: "Photo uploaded! Save to apply changes.",
      });
    } catch (err) {
      if (err.message !== "Session ended")
        setMessage({ type: "error", text: err.message });
    }
    setBusy(false);
  }

  async function handleSave(e) {
    e.preventDefault();
    setBusy(true);
    setMessage(null);

    const sizes = form.sizes
      .filter((s) => s.label.trim() && s.price !== "")
      .map((s) => ({ label: s.label.trim(), price: Number(s.price) }));

    const payload = {
      name: form.name,
      category: form.category,
      description: form.description,
      price: form.price === "" ? null : Number(form.price),
      details: form.details.trim() || null,
      image: form.image || null,
      emoji: form.emoji.trim() || null,
      tint: form.tint || null,
      sizes: sizes.length ? sizes : null,
    };

    try {
      if (form.id)
        await call(`/sweets/${form.id}`, { method: "PUT", body: payload });
      else await call("/sweets", { method: "POST", body: payload });
      await loadSweets();
      closeModal();
      setMessage({
        type: "success",
        text: `"${payload.name}" saved successfully!`,
      });
    } catch (err) {
      if (err.message !== "Session ended")
        setMessage({ type: "error", text: err.message });
    }
    setBusy(false);
  }

  async function handleDelete(s) {
    // if (!window.confirm(`Delete "${s.name}"? This action cannot be undone.`))
    //   return;
    setBusy(true);
    setMessage(null);
    try {
      await call(`/sweets/${s.id}`, { method: "DELETE" });
      await loadSweets();
      if (form.id === s.id) closeModal();
      setMessage({ type: "success", text: `"${s.name}" removed.` });
    } catch (err) {
      if (err.message !== "Session ended")
        setMessage({ type: "error", text: err.message });
    }
    setBusy(false);
  }

  const confirmDelete = (id) => {
    setDeleteConfirm({
      open: true,
      id,
    });
  };

  const handleConfirmDelete = async () => {
    const id = deleteConfirm.id;

    setDeleteConfirm({
      open: false,
      id: null,
    });

    await handleDelete(id);
  };

  const categories = [...new Set(sweets.map((s) => s.category))];

  if (!ready) return null;

  if (!API) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">
          <strong>Configuration Missing:</strong> NEXT_PUBLIC_API_URL is missing
          in .env.local.
        </Alert>
      </Container>
    );
  }

  if (!token) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #fff7ed 0%, #fef3c7 50%, #fed7aa 100%)",
          p: 2,
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
          {/* Header Badge Section */}
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
              sx={{ color: "#78350f", letterSpacing: "-0.5px" }}
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
              <StorefrontRoundedIcon sx={{ fontSize: 16 }} /> Admin Management
              Portal
            </Typography>
          </Box>

          {/* Form Content Body */}
          <Box sx={{ p: 4 }}>
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
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon sx={{ color: "#d97706" }} />
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
                        <VisibilityOffIcon sx={{ fontSize: 20 }} />
                      ) : (
                        <VisibilityIcon sx={{ fontSize: 20 }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
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
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
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

  return (
    <Box sx={{ bgcolor: "#fafaf9", minHeight: "100vh", pb: 8 }}>
      {/* Top Header Navbar */}
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
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{ justifyContent: "space-between", py: 1 }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Avatar
                sx={{
                  bgcolor: "#fff7ed",
                  color: "#d97706",
                  border: "1px solid #fed7aa",
                  width: 44,
                  height: 44,
                  fontSize: "1.25rem",
                }}
              >
                🧁
              </Avatar>
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography
                    variant="h6"
                    fontWeight="800"
                    sx={{ color: "#451a03", letterSpacing: "-0.3px" }}
                  >
                    HaYaan&apos;s Bakery
                  </Typography>
                  <Chip
                    label="Admin Portal"
                    size="small"
                    icon={<AdminPanelSettingsIcon style={{ fontSize: 14 }} />}
                    sx={{
                      bgcolor: "#fff7ed",
                      color: "#b45309",
                      fontWeight: 700,
                      fontSize: "0.7rem",
                      height: 22,
                      border: "1px solid #fde68a",
                    }}
                  />
                </Box>
                <Typography variant="caption" color="text.secondary">
                  Catalog & Menu Management
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={openNewForm}
                sx={{
                  bgcolor: "#d97706",
                  fontWeight: 700,
                  borderRadius: 2,
                  px: 2.5,
                  textTransform: "none",
                  boxShadow: "0 2px 8px rgba(217, 119, 6, 0.25)",
                  "&:hover": { bgcolor: "#b45309" },
                }}
              >
                Add Item
              </Button>
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
                  textTransform: "none",
                  "&:hover": { borderColor: "#a8a29e", bgcolor: "#f5f5f4" },
                }}
              >
                Live Site
              </Button>
              <IconButton
                onClick={() => logout()}
                title="Log Out"
                sx={{
                  bgcolor: "#fef2f2",
                  color: "#dc2626",
                  border: "1px solid #fecaca",
                  borderRadius: 2,
                  p: 1,
                  "&:hover": { bgcolor: "#fee2e2" },
                }}
              >
                <LogoutIcon fontSize="small" />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4 }}>
        {/* Quick Stats Overview Section */}
        <Grid container spacing={2.5} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                borderRadius: 3,
                bgcolor: "#ffffff",
                border: "1px solid",
                borderColor: "rgba(0, 0, 0, 0.06)",
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Avatar
                sx={{
                  bgcolor: "#fff7ed",
                  color: "#d97706",
                  width: 48,
                  height: 48,
                }}
              >
                <BakeryDiningIcon />
              </Avatar>
              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontWeight="500"
                >
                  Total Items
                </Typography>
                <Typography variant="h5" fontWeight="800" color="text.primary">
                  {sweets.length}
                </Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                borderRadius: 3,
                bgcolor: "#ffffff",
                border: "1px solid",
                borderColor: "rgba(0, 0, 0, 0.06)",
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Avatar
                sx={{
                  bgcolor: "#f0fdf4",
                  color: "#16a34a",
                  width: 48,
                  height: 48,
                }}
              >
                <CategoryIcon />
              </Avatar>
              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontWeight="500"
                >
                  Active Categories
                </Typography>
                <Typography variant="h5" fontWeight="800" color="text.primary">
                  {categories.length}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {message && (
          <Fade in={Boolean(message)}>
            <Alert
              severity={message.type === "success" ? "success" : "error"}
              onClose={() => setMessage(null)}
              sx={{ mb: 3, borderRadius: 2.5 }}
            >
              {message.text}
            </Alert>
          </Fade>
        )}

        {/* Inventory Items List */}
        <SweetsInventoryList
          sweets={sweets}
          onEdit={startEdit}
          // onDelete={handleDelete}
          onDelete={confirmDelete}
          busy={busy}
        />

        {/* Modal Editor Dialog */}
        <Dialog
          open={isModalOpen}
          onClose={closeModal}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: { borderRadius: 4, overflow: "hidden" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 3,
              py: 2,
              borderBottom: "1px solid",
              borderColor: "divider",
              bgcolor: "#fafafa",
            }}
          >
            <Typography variant="h6" fontWeight="700">
              {form.id ? "Edit Bakery Item" : "Create New Item"}
            </Typography>
            <IconButton onClick={closeModal} aria-label="close" size="small">
              <CloseIcon />
            </IconButton>
          </Box>

          <DialogContent sx={{ p: 3 }}>
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

      <ConfirmDialog
        open={deleteConfirm.open}
        onClose={() => {
          setDeleteConfirm({
            open: false,
            id: null,
          });
        }}
        title={"Delete"}
        content={"Are you sure you want to delete this Item"}
        action={
          <Button
            variant="contained"
            color="error"
            onClick={handleConfirmDelete}
          >
            Delete
          </Button>
        }
      />
    </Box>
  );
}
