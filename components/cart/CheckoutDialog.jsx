"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import DeliveryDiningRoundedIcon from "@mui/icons-material/DeliveryDiningRounded";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";

const ORANGE = "#d97706";
const DARK_ORANGE = "#b45309";

const PINCODE_REGEX = /^[1-9]\d{5}$/;

/* ================= PHONE HELPERS ================= */

// Keeps digits only, and strips a leading 0 / 91 when the number is pasted
// (for example "+91 98765 43210" or "098765 43210").
const cleanPhone = (raw, { pasted = false } = {}) => {
  let d = String(raw).replace(/\D/g, "");

  if (pasted) {
    if (d.startsWith("0") && d.length > 10) d = d.slice(1);
    if (d.startsWith("91") && d.length > 10) d = d.slice(2);
  }

  return d.slice(0, 10);
};

// Returns an error message, or "" if the number is valid.
const validatePhone = (digits) => {
  if (!digits) return "Please enter your phone number";
  if (digits.length < 10) return "Phone number must be 10 digits";
  if (!/^[6-9]/.test(digits))
    return "Mobile number must start with 6, 7, 8 or 9";
  if (/^(\d)\1{9}$/.test(digits)) return "Please enter a valid phone number";
  return "";
};

const EMPTY = {
  name: "",
  phone: "", // 10 digits only, no +91
  type: "delivery",
  house: "",
  street: "",
  landmark: "",
  city: "Bengaluru",
  pincode: "",
  notes: "",
};

export default function CheckoutDialog({ open, onClose, onSubmit, totalPrice }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  const set = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((er) => ({ ...er, [field]: undefined }));
  };

  /* ---------- phone handlers ---------- */
  const handlePhoneChange = (e) => {
    const digits = cleanPhone(e.target.value);
    setForm((f) => ({ ...f, phone: digits }));
    setErrors((er) => ({ ...er, phone: undefined }));
  };

  const handlePhonePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text");
    const digits = cleanPhone(text, { pasted: true });
    setForm((f) => ({ ...f, phone: digits }));
    setErrors((er) => ({ ...er, phone: undefined }));
  };

  const handlePhoneBlur = () => {
    // Only complain on blur once the user has typed something
    if (!form.phone) return;
    const msg = validatePhone(form.phone);
    setErrors((er) => ({ ...er, phone: msg || undefined }));
  };

  /* ---------- validation ---------- */
  const validate = () => {
    const er = {};

    if (!form.name.trim()) er.name = "Please enter your name";
    else if (form.name.trim().length < 2) er.name = "Name is too short";

    const phoneError = validatePhone(form.phone);
    if (phoneError) er.phone = phoneError;

    if (form.type === "delivery") {
      if (!form.house.trim()) er.house = "Enter house / flat number";
      if (!form.street.trim()) er.street = "Enter street / area";
      if (!form.city.trim()) er.city = "Enter city";

      const pin = form.pincode.trim();
      if (!pin) er.pincode = "Enter pincode";
      else if (!PINCODE_REGEX.test(pin))
        er.pincode = "Enter a valid 6-digit pincode";
    }

    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      ...form,
      name: form.name.trim(),
      phone: `+91${form.phone}`,
      house: form.house.trim(),
      street: form.street.trim(),
      landmark: form.landmark.trim(),
      city: form.city.trim(),
      pincode: form.pincode.trim(),
      notes: form.notes.trim(),
    });
  };

  const isDelivery = form.type === "delivery";

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      scroll="paper"
      PaperProps={{ sx: { borderRadius: 4 } }}
    >
      <DialogTitle sx={{ pr: 6, fontWeight: 900 }}>
        Your details
        <Typography sx={{ fontSize: "0.8rem", color: "#78716c", fontWeight: 500 }}>
          We&apos;ll send these with your order on WhatsApp.
        </Typography>
        <IconButton
          aria-label="Close"
          onClick={onClose}
          sx={{ position: "absolute", right: 12, top: 12 }}
        >
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ display: "grid", gap: 2, pt: 1 }}
        >
          {/* ===== CONTACT ===== */}
          <TextField
            label="Full name"
            value={form.name}
            onChange={set("name")}
            error={!!errors.name}
            helperText={errors.name}
            autoComplete="name"
            required
            autoFocus
          />

          <TextField
            label="Mobile number"
            value={form.phone}
            onChange={handlePhoneChange}
            onPaste={handlePhonePaste}
            onBlur={handlePhoneBlur}
            error={!!errors.phone}
            helperText={errors.phone}
            autoComplete="tel-national"
            type="tel"
            required
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Typography sx={{ fontWeight: 800, color: "#44403c" }}>
                      +91
                    </Typography>
                  </InputAdornment>
                ),
              },
              htmlInput: {
                inputMode: "numeric",
                pattern: "[0-9]*",
                maxLength: 10,
              },
            }}
          />

          {/* ===== DELIVERY / PICKUP ===== */}
          <ToggleButtonGroup
            exclusive
            fullWidth
            value={form.type}
            onChange={(_, v) => v && setForm((f) => ({ ...f, type: v }))}
            sx={{
              "& .MuiToggleButton-root": {
                textTransform: "none",
                fontWeight: 800,
                gap: 0.8,
                "&.Mui-selected": {
                  bgcolor: "#fff7ed",
                  color: DARK_ORANGE,
                  borderColor: ORANGE,
                },
              },
            }}
          >
            <ToggleButton value="delivery">
              <DeliveryDiningRoundedIcon fontSize="small" /> Delivery
            </ToggleButton>
            <ToggleButton value="pickup">
              <StorefrontRoundedIcon fontSize="small" /> Pickup
            </ToggleButton>
          </ToggleButtonGroup>

          {/* ===== ADDRESS (delivery only) ===== */}
          {isDelivery && (
            <>
              <Typography
                sx={{
                  mt: 0.5,
                  fontSize: "0.72rem",
                  fontWeight: 900,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  color: DARK_ORANGE,
                }}
              >
                Delivery address
              </Typography>

              <TextField
                label="House / Flat / Building no."
                value={form.house}
                onChange={set("house")}
                error={!!errors.house}
                helperText={errors.house}
                autoComplete="address-line1"
                required
              />

              <TextField
                label="Street / Area / Locality"
                value={form.street}
                onChange={set("street")}
                error={!!errors.street}
                helperText={errors.street}
                autoComplete="address-line2"
                required
              />

              <TextField
                label="Landmark (optional)"
                value={form.landmark}
                onChange={set("landmark")}
                placeholder="e.g. Near Victoria Hospital"
              />

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 2,
                }}
              >
                <TextField
                  label="City"
                  value={form.city}
                  onChange={set("city")}
                  error={!!errors.city}
                  helperText={errors.city}
                  autoComplete="address-level2"
                  required
                />

                <TextField
                  label="Pincode"
                  value={form.pincode}
                  onChange={(e) => {
                    const digits = e.target.value.replace(/\D/g, "").slice(0, 6);
                    setForm((f) => ({ ...f, pincode: digits }));
                    setErrors((er) => ({ ...er, pincode: undefined }));
                  }}
                  error={!!errors.pincode}
                  helperText={errors.pincode}
                  autoComplete="postal-code"
                  slotProps={{
                    htmlInput: { inputMode: "numeric", maxLength: 6 },
                  }}
                  required
                />
              </Box>
            </>
          )}

          {/* ===== PICKUP INFO ===== */}
          {!isDelivery && (
            <Box
              sx={{
                p: 1.5,
                borderRadius: 2.5,
                bgcolor: "#fff7ed",
                border: "1px solid #fed7aa",
              }}
            >
              <Typography sx={{ fontSize: "0.8rem", color: "#92400e", lineHeight: 1.6 }}>
                You&apos;ll pick up your order from our bakery. We&apos;ll tell you
                when it&apos;s ready on WhatsApp.
              </Typography>
            </Box>
          )}

          {/* ===== NOTES ===== */}
          <TextField
            label="Notes (optional), e.g. message on cake"
            value={form.notes}
            onChange={set("notes")}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            startIcon={<WhatsAppIcon />}
            sx={{
              minHeight: 52,
              borderRadius: 3,
              bgcolor: "#25D366",
              fontWeight: 900,
              textTransform: "none",
              "&:hover": { bgcolor: "#1eae53" },
            }}
          >
            Send order · ₹{totalPrice}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}