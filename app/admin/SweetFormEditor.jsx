"use client";

import { imageUrl } from "@/lib/image";

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
  const setField = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const addSizeRow = () => {
    setField("sizes", [...form.sizes, { label: "", price: "" }]);
  };

  const updateSizeRow = (index, field, value) => {
    setField(
      "sizes",
      form.sizes.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const removeSizeRow = (index) => {
    setField(
      "sizes",
      form.sizes.filter((_, i) => i !== index)
    );
  };

  console.log(categories, 'categoriescategories');
  

  return (
    <section className="adm-editor-card" ref={formRef}>
      <div className="editor-banner">
        <div>
          <h2>{form.id ? "Edit Treat Details" : "Add New Treat"}</h2>
          <p>{form.id ? `Editing ID: #${form.id}` : "Fill in details to publish to menu"}</p>
        </div>
        {form.id && <span className="mode-badge editing">Editing Mode</span>}
      </div>

      <form onSubmit={onSave} className="editor-form">
        {/* Basic Info Group */}
        <div className="form-section">
          <span className="section-label">1. General Information</span>
          <div className="form-grid-2">
            <div className="field">
              <label htmlFor="itemName">Item Name *</label>
              <input
                id="itemName"
                value={form.name}
                placeholder="e.g. Pistachio Milk Cake"
                onChange={(e) => setField("name", e.target.value)}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="itemCategory">Category *</label>
              <input
                id="itemCategory"
                list="category-suggestions"
                value={form.category}
                placeholder="Select or type..."
                onChange={(e) => setField("category", e.target.value)}
                required
              />
              <datalist id="category-suggestions">
                {categories.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </div>
          </div>

          <div className="field mt-3">
            <label htmlFor="basePrice">Base Price (₹)</label>
            <input
              id="basePrice"
              type="number"
              min="0"
              step="1"
              placeholder="e.g. 250 (Optional if custom sizes are used)"
              value={form.price}
              onChange={(e) => setField("price", e.target.value)}
            />
          </div>

          <div className="field mt-3">
            <label htmlFor="itemDesc">Short Description *</label>
            <textarea
              id="itemDesc"
              rows="2"
              value={form.description}
              placeholder="Short catchy summary displayed on card..."
              onChange={(e) => setField("description", e.target.value)}
              required
            />
          </div>

          <div className="field mt-3">
            <label htmlFor="itemDetails">Full Details & Ingredients</label>
            <textarea
              id="itemDetails"
              rows="3"
              value={form.details}
              placeholder="Detailed ingredients, allergens, serving suggestions..."
              onChange={(e) => setField("details", e.target.value)}
            />
          </div>
        </div>

        {/* Portion Sizes Group */}
        <div className="form-section mt-4">
          <span className="section-label">2. Portion Sizes & Multi-Pricing</span>
          <div className="sizes-container">
            {form.sizes.map((sz, i) => (
              <div className="size-row-item" key={i}>
                <input
                  placeholder="Portion / Size (e.g., Half Kg, Pack of 4)"
                  value={sz.label}
                  onChange={(e) => updateSizeRow(i, "label", e.target.value)}
                />
                <input
                  type="number"
                  min="0"
                  placeholder="Price (₹)"
                  value={sz.price}
                  onChange={(e) => updateSizeRow(i, "price", e.target.value)}
                />
                <button
                  type="button"
                  className="icon-delete-btn"
                  onClick={() => removeSizeRow(i)}
                  title="Remove size"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              className="adm-btn ghost full-width"
              onClick={addSizeRow}
            >
              + Add Size Option
            </button>
          </div>
        </div>

        {/* Media & Customization */}
        <div className="form-section mt-4">
          <span className="section-label">3. Styling & Media</span>
          <div className="media-upload-box">
            <div className="media-preview" style={{ background: form.tint || "#F7DCE0" }}>
              {form.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={imageUrl(form.image)} alt="Preview" />
              ) : (
                <span className="preview-emoji">{form.emoji || "🍰"}</span>
              )}
            </div>

            <div className="upload-controls">
              <label className="adm-btn outline small upload-btn">
                {busy ? "Uploading..." : "📷 Choose Photo"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={onPhotoUpload}
                  disabled={busy}
                  hidden
                />
              </label>

              {form.image && (
                <button
                  type="button"
                  className="adm-btn danger-ghost small"
                  onClick={() => setField("image", "")}
                >
                  Remove Photo
                </button>
              )}
              <small className="help-text">JPG, PNG, WebP up to 5MB</small>
            </div>
          </div>

          <div className="form-grid-2 mt-3">
            <div className="field">
              <label>Fallback Emoji</label>
              <input
                value={form.emoji}
                onChange={(e) => setField("emoji", e.target.value)}
                placeholder="🍰"
              />
            </div>

            <div className="field">
              <label>Card Color Accent</label>
              <div className="color-picker-input">
                <input
                  type="color"
                  value={form.tint}
                  onChange={(e) => setField("tint", e.target.value)}
                />
                <span className="color-code">{form.tint}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form Footer Actions */}
        <div className="editor-actions">
          <button className="adm-btn primary large" disabled={busy}>
            {busy ? "Saving..." : form.id ? "💾 Save Changes" : "✨ Publish Treat"}
          </button>
          {form.id && (
            <button type="button" className="adm-btn ghost large" onClick={onReset}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  );
}