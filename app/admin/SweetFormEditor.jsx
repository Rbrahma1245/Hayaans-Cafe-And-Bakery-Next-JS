"use client";

import { imageUrl } from "@/lib/image";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import DeleteSweepOutlinedIcon from "@mui/icons-material/DeleteSweepOutlined";
import RestaurantMenuOutlinedIcon from "@mui/icons-material/RestaurantMenuOutlined";
import StyleOutlinedIcon from "@mui/icons-material/StyleOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

export default function SweetFormEditor({
  form,
  setForm,
  categories,
  onSave,
  onPhotoUpload,
  onReset,
  busy,
  formRef,
}) {
  const setField = (key, value) => {
    setForm((f) => ({
      ...f,
      [key]: value,
    }));
  };

  const addSizeRow = () => {
    setField("sizes", [
      ...form.sizes,
      {
        label: "",
        price: "",
      },
    ]);
  };

  const updateSizeRow = (index, field, value) => {
    setField(
      "sizes",
      form.sizes.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]: value,
            }
          : item,
      ),
    );
  };

  const removeSizeRow = (index) => {
    setField(
      "sizes",
      form.sizes.filter((_, i) => i !== index),
    );
  };

  return (
    <Box
      ref={formRef}
      component="section"
      sx={{
        width: "100%",
        maxWidth: 1000,
        mx: "auto",
        minWidth: 0,
      }}
    >
      {/* =====================================================
          HEADER
      ====================================================== */}
      <Paper
        elevation={0}
        sx={{
          mb: { xs: 2, sm: 3 },
          p: { xs: 2, sm: 2.5, md: 3 },
          borderRadius: { xs: 3, md: 4 },
          background:
            "linear-gradient(135deg, #fff7ed 0%, #fffbeb 55%, #fef3c7 100%)",
          border: "1px solid #fed7aa",
          position: "relative",
          overflow: "hidden",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* Decorative Circle */}
        <Box
          sx={{
            position: "absolute",
            right: { xs: -50, md: -30 },
            top: { xs: -50, md: -40 },
            width: { xs: 120, md: 140 },
            height: { xs: 120, md: 140 },
            borderRadius: "50%",
            bgcolor: "rgba(251, 146, 60, 0.12)",
          }}
        />

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1.5, sm: 2 }}
          sx={{
            alignItems: {
              xs: "stretch",
              sm: "center",
            },
            justifyContent: "space-between",
            position: "relative",
            minWidth: 0,
          }}
        >
          {/* Header Left */}
          <Stack
            direction="row"
            spacing={{ xs: 1.25, sm: 2 }}
            sx={{
              alignItems: "center",
              minWidth: 0,
              flex: 1,
            }}
          >
            <Box
              sx={{
                width: { xs: 44, sm: 52 },
                height: { xs: 44, sm: 52 },
                minWidth: { xs: 44, sm: 52 },
                borderRadius: { xs: 2.5, sm: 3 },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "#fff",
                color: "#d97706",
                border: "1px solid #fed7aa",
                boxShadow: "0 6px 16px rgba(217,119,6,0.12)",
              }}
            >
              <RestaurantMenuOutlinedIcon
                sx={{
                  fontSize: { xs: 22, sm: 24 },
                }}
              />
            </Box>

            <Box
              sx={{
                minWidth: 0,
                flex: 1,
              }}
            >
              <Typography
                variant="h5"
                fontWeight={800}
                sx={{
                  color: "#451a03",
                  letterSpacing: "-0.5px",
                  fontSize: {
                    xs: "1.15rem",
                    sm: "1.35rem",
                    md: "1.5rem",
                  },
                  lineHeight: 1.25,
                  overflowWrap: "break-word",
                }}
              >
                {form.id ? "Edit Treat Details" : "Add New Treat"}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: "#92400e",
                  mt: 0.4,
                  fontSize: {
                    xs: "0.78rem",
                    sm: "0.875rem",
                  },
                  lineHeight: 1.4,
                }}
              >
                {form.id
                  ? `Updating item #${form.id}`
                  : "Create a delicious new item for your menu"}
              </Typography>
            </Box>
          </Stack>

          {/* Editing Chip */}
          {form.id && (
            <Chip
              label="Editing"
              size="small"
              sx={{
                alignSelf: {
                  xs: "flex-start",
                  sm: "center",
                },
                bgcolor: "#fff",
                color: "#b45309",
                fontWeight: 700,
                border: "1px solid #fcd34d",
              }}
            />
          )}
        </Stack>
      </Paper>

      <Box
        component="form"
        onSubmit={onSave}
        sx={{
          width: "100%",
          minWidth: 0,
        }}
      >
        {/* =====================================================
            GENERAL INFORMATION
        ====================================================== */}
        <Card
          elevation={0}
          sx={{
            mb: { xs: 2, sm: 3 },
            borderRadius: { xs: 3, md: 4 },
            border: "1px solid #e7e5e4",
            overflow: "visible",
            width: "100%",
            minWidth: 0,
          }}
        >
          <CardContent
            sx={{
              p: {
                xs: 2,
                sm: 2.5,
                md: 3.5,
              },
              "&:last-child": {
                pb: {
                  xs: 2,
                  sm: 2.5,
                  md: 3.5,
                },
              },
            }}
          >
            <SectionHeader
              icon={<RestaurantMenuOutlinedIcon />}
              number="01"
              title="General Information"
              subtitle="Tell customers about this delicious treat"
            />

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "minmax(0, 1fr)",
                  md: "minmax(0, 1fr) minmax(0, 1fr)",
                },
                gap: { xs: 2, md: 2.5 },
                mt: { xs: 2.5, md: 3 },
                minWidth: 0,
              }}
            >
              <TextField
                fullWidth
                label="Item Name"
                placeholder="e.g. Pistachio Milk Cake"
                value={form.name}
                onChange={(e) => setField("name", e.target.value)}
                required
                slotProps={{
                  htmlInput: {
                    maxLength: 60,
                  },
                }}
              />

              <Autocomplete
                freeSolo
                fullWidth
                options={categories.filter(Boolean)}
                value={form.category || ""}
                inputValue={form.category || ""}
                onChange={(_, newValue) => {
                  setField("category", newValue || "");
                }}
                onInputChange={(_, newInputValue) => {
                  setField("category", newInputValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Category"
                    placeholder="Select or type a category"
                    required
                  />
                )}
              />
            </Box>

            <TextField
              fullWidth
              type="number"
              label="Base Price"
              placeholder="e.g. 250"
              value={form.price ?? ""}
              onChange={(e) => setField("price", e.target.value)}
              helperText="Leave empty if the item uses custom size pricing."
              sx={{
                mt: { xs: 2, md: 2.5 },
              }}
              slotProps={{
                input: {
                  startAdornment: (
                    <Typography
                      component="span"
                      sx={{
                        mr: 1,
                        color: "#b45309",
                        fontWeight: 700,
                      }}
                    >
                      ₹
                    </Typography>
                  ),
                },
                htmlInput: {
                  min: 0,
                  max: 100000,
                  step: 1,
                },
              }}
            />

            <TextField
              fullWidth
              multiline
              minRows={2}
              label="Short Description"
              placeholder="A short catchy description displayed on the product card..."
              value={form.description}
              onChange={(e) => setField("description", e.target.value)}
              required
              sx={{
                mt: { xs: 2, md: 2.5 },
              }}
              slotProps={{
                htmlInput: {
                  maxLength: 250,
                },
              }}
            />

            <TextField
              fullWidth
              multiline
              minRows={3}
              label="Full Details & Ingredients"
              placeholder="Ingredients, allergens, serving suggestions, etc."
              value={form.details}
              onChange={(e) => setField("details", e.target.value)}
              helperText="Optional. Add useful information customers may want to know."
              sx={{
                mt: { xs: 2, md: 2.5 },
              }}
              slotProps={{
                htmlInput: {
                  maxLength: 1000,
                },
              }}
            />
          </CardContent>
        </Card>

        {/* =====================================================
            SIZE & PRICING
        ====================================================== */}
        <Card
          elevation={0}
          sx={{
            mb: { xs: 2, sm: 3 },
            borderRadius: { xs: 3, md: 4 },
            border: "1px solid #e7e5e4",
            width: "100%",
            minWidth: 0,
          }}
        >
          <CardContent
            sx={{
              p: {
                xs: 2,
                sm: 2.5,
                md: 3.5,
              },
              "&:last-child": {
                pb: {
                  xs: 2,
                  sm: 2.5,
                  md: 3.5,
                },
              },
            }}
          >
            <SectionHeader
              icon={<StyleOutlinedIcon />}
              number="02"
              title="Portion Sizes & Pricing"
              subtitle="Offer different sizes and prices for this treat"
            />

            <Stack
              spacing={1.5}
              mt={{ xs: 2.5, md: 3 }}
              sx={{
                minWidth: 0,
              }}
            >
              {form.sizes.length === 0 && (
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 2, sm: 3 },
                    textAlign: "center",
                    bgcolor: "#fafaf9",
                    border: "1px dashed #d6d3d1",
                    borderRadius: 3,
                  }}
                >
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    color="text.secondary"
                  >
                    No custom sizes added
                  </Typography>

                  <Typography
                    variant="caption"
                    color="text.secondary"
                    display="block"
                    mt={0.5}
                  >
                    The base price will be used for this item.
                  </Typography>
                </Paper>
              )}

              {form.sizes.map((sz, i) => (
                <Paper
                  key={i}
                  elevation={0}
                  sx={{
                    p: { xs: 1.25, sm: 1.5 },
                    borderRadius: 3,
                    border: "1px solid #e7e5e4",
                    bgcolor: "#fafaf9",
                    minWidth: 0,
                  }}
                >
                  <Stack
                    direction={{
                      xs: "column",
                      sm: "row",
                    }}
                    spacing={1.5}
                    sx={{
                      minWidth: 0,
                    }}
                  >
                    <TextField
                      fullWidth
                      size="small"
                      label="Size / Portion"
                      placeholder="e.g. Half Kg"
                      value={sz.label}
                      onChange={(e) =>
                        updateSizeRow(i, "label", e.target.value)
                      }
                    />

                    <TextField
                      fullWidth
                      size="small"
                      label="Price"
                      placeholder="250"
                      type="number"
                      value={sz.price ?? ""}
                      onChange={(e) =>
                        updateSizeRow(i, "price", e.target.value)
                      }
                      sx={{
                        width: {
                          xs: "100%",
                          sm: 180,
                        },
                        minWidth: 0,
                      }}
                      slotProps={{
                        input: {
                          startAdornment: (
                            <Typography
                              component="span"
                              sx={{
                                mr: 0.5,
                                color: "#b45309",
                                fontWeight: 700,
                              }}
                            >
                              ₹
                            </Typography>
                          ),
                        },
                        htmlInput: {
                          min: 0,
                          max: 100000,
                          step: 1,
                        },
                      }}
                    />

                    <IconButton
                      type="button"
                      onClick={() => removeSizeRow(i)}
                      color="error"
                      sx={{
                        alignSelf: {
                          xs: "flex-end",
                          sm: "center",
                        },
                        bgcolor: "#fef2f2",
                        border: "1px solid #fecaca",
                        width: { xs: 42, sm: 40 },
                        height: { xs: 42, sm: 40 },
                        "&:hover": {
                          bgcolor: "#fee2e2",
                        },
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </Paper>
              ))}

              <Button
                type="button"
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={addSizeRow}
                fullWidth
                sx={{
                  mt: 1,
                  alignSelf: "flex-start",
                  borderRadius: 2.5,
                  borderColor: "#fed7aa",
                  color: "#b45309",
                  fontWeight: 700,
                  textTransform: "none",
                  py: { xs: 1.1, sm: 0.8 },
                  width: {
                    xs: "100%",
                    sm: "auto",
                  },
                  "&:hover": {
                    borderColor: "#fb923c",
                    bgcolor: "#fff7ed",
                  },
                }}
              >
                Add Size Option
              </Button>
            </Stack>
          </CardContent>
        </Card>

        {/* =====================================================
            MEDIA & STYLE
        ====================================================== */}
        <Card
          elevation={0}
          sx={{
            mb: { xs: 2, sm: 3 },
            borderRadius: { xs: 3, md: 4 },
            border: "1px solid #e7e5e4",
            width: "100%",
            minWidth: 0,
          }}
        >
          <CardContent
            sx={{
              p: {
                xs: 2,
                sm: 2.5,
                md: 3.5,
              },
              "&:last-child": {
                pb: {
                  xs: 2,
                  sm: 2.5,
                  md: 3.5,
                },
              },
            }}
          >
            <SectionHeader
              icon={<ImageOutlinedIcon />}
              number="03"
              title="Photo & Appearance"
              subtitle="Make your menu item look as delicious as it tastes"
            />

            <Paper
              elevation={0}
              sx={{
                mt: { xs: 2.5, md: 3 },
                p: { xs: 1.5, sm: 2 },
                borderRadius: 3,
                border: "1px solid #e7e5e4",
                bgcolor: "#fafaf9",
                minWidth: 0,
              }}
            >
              <Stack
                direction={{
                  xs: "column",
                  sm: "row",
                }}
                spacing={{ xs: 2, sm: 2.5 }}
                sx={{
                  minWidth: 0,
                }}
              >
                {/* Preview */}
                <Box
                  sx={{
                    width: {
                      xs: "100%",
                      sm: 180,
                    },
                    height: {
                      xs: 180,
                      sm: 150,
                    },
                    flexShrink: 0,
                    borderRadius: 3,
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: form.tint || "#F7DCE0",
                    border: "1px solid rgba(0,0,0,0.06)",
                    boxSizing: "border-box",
                  }}
                >
                  {form.image ? (
                    <Box
                      component="img"
                      src={imageUrl(form.image)}
                      alt="Preview"
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <Typography
                      sx={{
                        fontSize: {
                          xs: "4.5rem",
                          sm: "4rem",
                        },
                        lineHeight: 1,
                      }}
                    >
                      {form.emoji || "🍰"}
                    </Typography>
                  )}
                </Box>

                {/* Upload */}
                <Box
                  sx={{
                    minWidth: 0,
                    flex: 1,
                  }}
                >
                  <Typography fontWeight={700} mb={0.5}>
                    Product Photo
                  </Typography>

                  <Typography variant="body2" color="text.secondary" mb={2}>
                    Upload a clear photo of your bakery item.
                  </Typography>

                  <Stack
                    direction={{
                      xs: "column",
                      sm: "row",
                    }}
                    spacing={1}
                  >
                    <Button
                      component="label"
                      variant="contained"
                      startIcon={<CloudUploadOutlinedIcon />}
                      disabled={busy}
                      fullWidth
                      sx={{
                        width: {
                          xs: "100%",
                          sm: "auto",
                        },
                        bgcolor: "#d97706",
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: 700,
                        py: { xs: 1.1, sm: 0.8 },
                        "&:hover": {
                          bgcolor: "#b45309",
                        },
                      }}
                    >
                      {busy ? "Uploading..." : "Choose Photo"}

                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={onPhotoUpload}
                        disabled={busy}
                      />
                    </Button>

                    {form.image && (
                      <Button
                        type="button"
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteSweepOutlinedIcon />}
                        onClick={() => setField("image", "")}
                        fullWidth
                        sx={{
                          width: {
                            xs: "100%",
                            sm: "auto",
                          },
                          borderRadius: 2,
                          textTransform: "none",
                          fontWeight: 600,
                          py: { xs: 1.1, sm: 0.8 },
                        }}
                      >
                        Remove
                      </Button>
                    )}
                  </Stack>

                  <Typography
                    variant="caption"
                    color="text.secondary"
                    display="block"
                    mt={1}
                    sx={{
                      lineHeight: 1.4,
                    }}
                  >
                    JPG, PNG, WebP or GIF · Maximum 5 MB
                  </Typography>
                </Box>
              </Stack>
            </Paper>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "minmax(0, 1fr)",
                  sm: "minmax(0, 1fr) minmax(0, 1fr)",
                },
                gap: { xs: 2, md: 2.5 },
                mt: { xs: 2, md: 2.5 },
                minWidth: 0,
              }}
            >
              <TextField
                fullWidth
                label="Fallback Emoji"
                value={form.emoji}
                onChange={(e) => setField("emoji", e.target.value)}
                placeholder="🍰"
                helperText="Used when no photo is available."
              />

              <Paper
                elevation={0}
                sx={{
                  border: "1px solid #d6d3d1",
                  borderRadius: 2,
                  p: 1.5,
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  minWidth: 0,
                }}
              >
                <Box
                  sx={{
                    minWidth: 0,
                    flex: 1,
                  }}
                >
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    color="text.secondary"
                  >
                    Card Color Accent
                  </Typography>

                  <Typography
                    variant="body1"
                    fontWeight={700}
                    sx={{
                      mt: 0.3,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {form.tint}
                  </Typography>
                </Box>

                <Box
                  component="input"
                  type="color"
                  value={form.tint || "#F7DCE0"}
                  onChange={(e) => setField("tint", e.target.value)}
                  sx={{
                    flexShrink: 0,
                    width: 48,
                    height: 48,
                    p: 0,
                    border: 0,
                    borderRadius: 2,
                    cursor: "pointer",
                    bgcolor: "transparent",
                  }}
                />
              </Paper>
            </Box>
          </CardContent>
        </Card>

        {/* =====================================================
            ACTIONS
        ====================================================== */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 1.5, sm: 2 },
            mt: { xs: 2, sm: 3 },
            borderRadius: { xs: 2.5, sm: 3 },
            border: "1px solid #e7e5e4",
            bgcolor: "#fff",
            boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "stretch",
              gap: 1.5,

              flexDirection: {
                xs: "column-reverse",
                sm: "row",
              },

              width: "100%",
            }}
          >
            {form.id && (
              <Button
                type="button"
                variant="outlined"
                startIcon={<CancelOutlinedIcon />}
                onClick={onReset}
                disabled={busy}
                fullWidth
                sx={{
                  width: {
                    xs: "100%",
                    sm: "auto",
                  },
                  minWidth: {
                    sm: 120,
                  },
                  borderRadius: 2.5,
                  px: 3,
                  py: { xs: 1.15, sm: 1 },
                  textTransform: "none",
                  fontWeight: 700,
                  borderColor: "#d6d3d1",
                  color: "#57534e",
                }}
              >
                Cancel
              </Button>
            )}

            <Button
              type="submit"
              variant="contained"
              startIcon={<SaveOutlinedIcon />}
              disabled={busy}
              fullWidth
              sx={{
                width: {
                  xs: "100%",
                  sm: "auto",
                },
                minWidth: {
                  sm: 170,
                },
                borderRadius: 2.5,
                px: 3.5,
                py: 1.2,
                bgcolor: "#d97706",
                textTransform: "none",
                fontWeight: 800,
                boxShadow: "0 5px 14px rgba(217, 119, 6, 0.25)",
                "&:hover": {
                  bgcolor: "#b45309",
                },
              }}
            >
              {busy ? "Saving..." : form.id ? "Save Changes" : "Publish Treat"}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

/* =========================================================
   SECTION HEADER
========================================================= */

function SectionHeader({ icon, number, title, subtitle }) {
  return (
    <Stack
      direction="row"
      spacing={{ xs: 1.25, sm: 1.5 }}
      sx={{
        alignItems: "center",
        minWidth: 0,
      }}
    >
      {/* Icon */}
      <Box
        sx={{
          width: { xs: 38, sm: 42 },
          height: { xs: 38, sm: 42 },
          minWidth: { xs: 38, sm: 42 },
          flexShrink: 0,
          borderRadius: { xs: 2, sm: 2.5 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#fff7ed",
          color: "#d97706",
          border: "1px solid #fed7aa",
        }}
      >
        {icon}
      </Box>

      {/* Text */}
      <Box
        sx={{
          minWidth: 0,
          flex: 1,
        }}
      >
        <Stack
          direction="row"
          spacing={0.75}
          sx={{
            alignItems: "center",
            minWidth: 0,
          }}
        >
          <Typography
            variant="caption"
            fontWeight={800}
            sx={{
              color: "#d97706",
              letterSpacing: 0.5,
              flexShrink: 0,
            }}
          >
            {number}
          </Typography>

          <Typography
            variant="h6"
            fontWeight={800}
            sx={{
              color: "#292524",
              fontSize: {
                xs: "0.95rem",
                sm: "1.05rem",
              },
              lineHeight: 1.3,
              minWidth: 0,
              overflowWrap: "break-word",
            }}
          >
            {title}
          </Typography>
        </Stack>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            fontSize: {
              xs: "0.75rem",
              sm: "0.875rem",
            },
            lineHeight: 1.4,
            mt: 0.15,
          }}
        >
          {subtitle}
        </Typography>
      </Box>
    </Stack>
  );
}
