// src/pages/admin/Products.jsx
import axios from "axios";
import {
  Delete,
  ImagePlus,
  Package,
  Plus,
  Sparkles,
  Upload,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

//-------------- Modal UI tokens -----------------
const MODAL_INPUT_CLASS =
  "w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10";

const MODAL_PICKER_BTN_CLASS =
  "inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-800 active:scale-[0.98] cursor-pointer";

const CloseIcon = () => <X className="h-4 w-4" strokeWidth={2} />;

// --------------- Color Picker ------------------
const ColorPicker = ({ selectedColors, onChange }) => {
  const [colorName, setColorName] = useState("");
  const [colorHex, setColorHex] = useState("#000000");

  const addColor = () => {
    const trimmedName = colorName.trim();
    if (!trimmedName) return;

    const alreadyExists = selectedColors.find(
      (c) => c.name.toLowerCase() === trimmedName.toLowerCase(),
    );

    if (alreadyExists) {
      toast.error("Color already exists");
      return;
    }

    onChange([
      ...selectedColors,
      {
        name: trimmedName,
        hex: colorHex,
      },
    ]);

    setColorName("");
    setColorHex("#000000");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addColor();
    }
  };

  const removeColor = (colorName) => {
    onChange(selectedColors.filter((c) => c.name !== colorName));
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2.5">
        <input
          type="text"
          value={colorName}
          onChange={(e) => setColorName(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g. Midnight Black"
          className={`${MODAL_INPUT_CLASS} min-w-[140px] flex-1`}
        />
        <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white p-1.5 shadow-sm">
          <span
            className="h-8 w-8 shrink-0 rounded-lg border border-gray-200 shadow-inner"
            style={{ backgroundColor: colorHex }}
          />
          <input
            type="color"
            value={colorHex}
            onChange={(e) => setColorHex(e.target.value)}
            className="h-8 w-10 cursor-pointer rounded border-0 bg-transparent p-0"
            aria-label="Pick color"
          />
        </div>
        <button
          type="button"
          onClick={addColor}
          className={MODAL_PICKER_BTN_CLASS}
        >
          <Plus className="h-3.5 w-3.5" />
          Add
        </button>
      </div>

      {selectedColors.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedColors.map((color, index) => (
            <div
              key={index}
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white py-1.5 pr-1.5 pl-2.5 text-xs font-medium text-gray-800 shadow-sm"
            >
              <span
                className="h-4 w-4 rounded-full border border-gray-200 ring-2 ring-white"
                style={{ backgroundColor: color.hex }}
              />
              <span>{color.name}</span>
              <span className="font-mono text-[10px] uppercase text-gray-400">
                {color.hex}
              </span>
              <button
                type="button"
                onClick={() => removeColor(color.name)}
                className="flex h-6 w-6 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                aria-label={`Remove ${color.name}`}
              >
                <CloseIcon />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ------------- Size Picker Start ---------------------
const SizePicker = ({ selectedSizes, onChange }) => {
  const [inputValue, setInputValue] = useState("");

  const addSize = () => {
    const val = inputValue.trim();
    if (val && !selectedSizes.includes(val)) {
      onChange([...selectedSizes, val]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSize();
    }
  };

  const removeSize = (size) => {
    onChange(selectedSizes.filter((s) => s !== size));
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2.5">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g. 15.1 Inch, XL"
          className={`${MODAL_INPUT_CLASS} min-w-[140px] flex-1`}
        />
        <button
          type="button"
          onClick={addSize}
          className={MODAL_PICKER_BTN_CLASS}
        >
          <Plus className="h-3.5 w-3.5" />
          Add
        </button>
      </div>

      {selectedSizes.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedSizes.map((size) => (
            <div
              key={size}
              className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white py-1.5 pr-1.5 pl-3 text-xs font-medium text-gray-800 shadow-sm"
            >
              <span>{size}</span>
              <button
                type="button"
                onClick={() => removeSize(size)}
                className="flex h-6 w-6 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                aria-label={`Remove size ${size}`}
              >
                <CloseIcon />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
// ------------- Size Picker End ---------------------

// ------------- Tag Picker Start ---------------------
const TagPicker = ({ selectedTags, onChange }) => {
  const [inputValue, setInputValue] = useState("");
  const availableTags = ["New Arrivals", "Best Selling", "Top Trending"];

  const addTag = () => {
    const val = inputValue.trim();
    if (val && !selectedTags.includes(val)) {
      onChange([...selectedTags, val]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const removeTag = (tag) => {
    onChange(selectedTags.filter((t) => t !== tag));
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2.5">
        <select
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className={`${MODAL_INPUT_CLASS} min-w-[140px] flex-1 cursor-pointer`}
        >
          <option value="">Select a tag...</option>
          {availableTags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={addTag}
          className={MODAL_PICKER_BTN_CLASS}
        >
          <Plus className="h-3.5 w-3.5" />
          Add
        </button>
      </div>

      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedTags.map((tag) => (
            <div
              key={tag}
              className="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 py-1.5 pr-1.5 pl-3 text-xs font-semibold text-blue-800"
            >
              <span>{tag}</span>
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="flex h-6 w-6 items-center justify-center rounded-full text-blue-500 transition hover:bg-blue-100 hover:text-blue-700"
                aria-label={`Remove tag ${tag}`}
              >
                <CloseIcon />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
// ------------- Tag Picker End ---------------------

// ------------- Badge Picker Start ---------------------
const BADGE_OPTIONS = [
  { value: "Hot", label: "Hot🔥" },
  { value: "New", label: "New✨" },
  { value: "Limited", label: "Limited⏰" },
  { value: "Sale", label: "Sale💰" },
  { value: "Trending", label: "Trending📈" },
  { value: "Best", label: "Best⭐" },
];
const getBadgeLabel = (value) =>
  BADGE_OPTIONS.find((b) => b.value === value)?.label || value;

const BadgePicker = ({ selectedBadge, onChange }) => {
  const [inputValue, setInputValue] = useState("");

  const addBadge = () => {
    const val = inputValue.trim();
    if (!val) return;
    onChange(val);
    setInputValue("");
  };

  const removeBadge = () => onChange("");

  const badgeLabel = getBadgeLabel(selectedBadge);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2.5">
        <select
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className={`${MODAL_INPUT_CLASS} min-w-[140px] flex-1 cursor-pointer`}
        >
          <option value="">Select a badge...</option>
          {BADGE_OPTIONS.map((badge) => (
            <option key={badge.value} value={badge.value}>
              {badge.label}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={addBadge}
          className={MODAL_PICKER_BTN_CLASS}
        >
          <Plus className="h-3.5 w-3.5" />
          Add
        </button>
      </div>

      {selectedBadge && (
        <div className="flex flex-wrap gap-2">
          <div className="inline-flex items-center gap-1 rounded-full border border-purple-200 bg-purple-50 py-1.5 pr-1.5 pl-3 text-xs font-semibold text-purple-800">
            <span>{badgeLabel}</span>
            <button
              type="button"
              onClick={removeBadge}
              className="flex h-6 w-6 items-center justify-center rounded-full text-purple-500 transition hover:bg-purple-100 hover:text-purple-700"
              aria-label="Remove badge"
            >
              <CloseIcon />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
// ------------- Badge Picker End ---------------------

// -------------- Modal layout helpers ----------------
const SectionHeader = ({ step, label }) => (
  <div className="mb-4 flex items-center gap-3">
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-[11px] font-bold text-white shadow-sm">
      {step}
    </span>
    <div className="min-w-0">
      <p className="text-sm font-semibold text-gray-900">{label}</p>
    </div>
    <div className="h-px flex-1 bg-gradient-to-r from-gray-200 to-transparent" />
  </div>
);

const FormSection = ({ children }) => (
  <section className="rounded-2xl border border-gray-100 bg-gray-50/60 p-4 sm:p-5">
    {children}
  </section>
);

const FormField = ({ label, required, hint, children }) => (
  <div className="flex flex-col gap-1.5">
    {label && (
      <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
        {label}
        {required && <span className="ml-0.5 text-rose-500">*</span>}
      </label>
    )}
    {children}
    {hint && <p className="text-[11px] text-gray-400">{hint}</p>}
  </div>
);

// ------------- Media Upload Zone ----------------
const MediaUploadZone = ({ imagePreview, onImageChange, uploadLabel }) => (
  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
    <div className="relative mx-auto h-36 w-36 shrink-0 overflow-hidden rounded-2xl border-2 border-dashed border-gray-200 bg-white shadow-inner sm:mx-0">
      {imagePreview ? (
        <img
          src={imagePreview}
          alt="Product preview"
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-gray-300">
          <ImagePlus className="h-9 w-9" strokeWidth={1.25} />
          <span className="text-[10px] font-semibold uppercase tracking-wider">
            No image
          </span>
        </div>
      )}
    </div>
    <div className="flex flex-1 flex-col items-center gap-2 text-center sm:items-start sm:text-left">
      <p className="text-sm font-medium text-gray-800">Product image</p>
      <p className="max-w-xs text-xs leading-relaxed text-gray-500">
        Upload a clear square image. PNG or JPG recommended.
      </p>
      <label className="mt-1 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-800 active:scale-[0.98]">
        <Upload className="h-4 w-4" />
        {uploadLabel}
        <input
          type="file"
          accept="image/*"
          onChange={onImageChange}
          className="hidden"
        />
      </label>
    </div>
  </div>
);
//  ------------- Media Upload Zone End ----------------

// ------------- Modal Footer ----------------
const ModalFooter = ({
  onCancel,
  onSubmit,
  loading,
  submitLabel,
  loadingLabel,
}) => (
  <div className="sticky bottom-0 z-10 -mx-6 -mb-6 mt-2 border-t border-gray-100 bg-white/95 px-6 py-4 backdrop-blur-sm">
    <div className="flex gap-3">
      <button
        type="button"
        onClick={onCancel}
        className="flex-1 rounded-xl border border-gray-200 bg-white py-3 text-sm font-semibold text-gray-600 shadow-sm transition hover:bg-gray-50 cursor-pointer"
      >
        Cancel
      </button>
      <button
        type="button"
        onClick={onSubmit}
        disabled={loading}
        className="flex-1 rounded-xl bg-gray-900 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
      >
        {loading ? loadingLabel : submitLabel}
      </button>
    </div>
  </div>
);
// ------------- Modal Footer End ----------------

// ------------- Status Toggle ----------------
const StatusToggle = ({ status, onChange }) => (
  <div className="grid grid-cols-2 gap-3">
    <label
      className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 px-4 py-3.5 transition ${
        status === "active"
          ? "border-emerald-300 bg-emerald-50 shadow-sm"
          : "border-gray-200 bg-white hover:border-gray-300"
      }`}
    >
      <input
        type="radio"
        checked={status === "active"}
        onChange={() => onChange("active")}
        className="accent-emerald-600"
      />
      <div>
        <p className="text-sm font-semibold text-emerald-800">Active</p>
        <p className="text-[11px] text-emerald-600/80">Visible in store</p>
      </div>
    </label>
    <label
      className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 px-4 py-3.5 transition ${
        status === "inactive"
          ? "border-rose-300 bg-rose-50 shadow-sm"
          : "border-gray-200 bg-white hover:border-gray-300"
      }`}
    >
      <input
        type="radio"
        checked={status === "inactive"}
        onChange={() => onChange("inactive")}
        className="accent-rose-600"
      />
      <div>
        <p className="text-sm font-semibold text-rose-700">Inactive</p>
        <p className="text-[11px] text-rose-600/80">Hidden from store</p>
      </div>
    </label>
  </div>
);

// ================ Product Modal Start ===================
const ProductModal = ({ title, onClose, children, mode = "create" }) => {
  const isEdit = mode === "edit";

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-gray-900/50 p-0 backdrop-blur-[2px] sm:items-center sm:p-4">
      <div
        className="flex max-h-[94vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl border border-gray-200/80 bg-white shadow-2xl sm:rounded-3xl"
        style={{ animation: "modalIn .22s cubic-bezier(0.16, 1, 0.3, 1)" }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
      >
        <div className="relative shrink-0 overflow-hidden border-b border-gray-100 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-6 py-5 text-white">
          <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
          <div className="relative flex items-start justify-between gap-4">
            <div className="flex min-w-0 items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20">
                {isEdit ? (
                  <Sparkles className="h-5 w-5" />
                ) : (
                  <Package className="h-5 w-5" />
                )}
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
                  {isEdit ? "Edit listing" : "New listing"}
                </p>
                <h2
                  id="product-modal-title"
                  className="truncate text-xl font-semibold tracking-tight"
                >
                  {title}
                </h2>
                <p className="mt-1 text-xs text-white/70">
                  Fill in the details below. Required fields are marked.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white ring-1 ring-white/20 transition hover:bg-white/20 cursor-pointer"
              aria-label="Close modal"
            >
              <CloseIcon />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto bg-white px-6 py-6">
          {children}
        </div>
      </div>
    </div>
  );
};
// ================ Product Modal End =====================

// ================== Create Product Form Start ======================
const CreateProductForm = ({ onCancel, onSuccess }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [status, setStatus] = useState("active");
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [tags, setTags] = useState([]);
  const [badge, setBadge] = useState("");
  const [ram, setRam] = useState("");
  const [storage, setStorage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch All Categories
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/category/getallcategory")
      .then((res) => setCategories(res.data.categories || []))
      .catch(() => toast.error("Failed to load categories"));
  }, []);

  // Handle Image Selection and Preview
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  // Create Product Function
  const handleCreateProduct = async () => {
    if (!name.trim() || !category || price === "" || stock === "") {
      toast.error("Name, Category, Price, and Stock are required");
      return;
    }
    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("description", description.trim());
    formData.append("category", category);
    formData.append("price", Number(price));
    formData.append("stock", Number(stock));
    formData.append("status", status);
    formData.append("colors", JSON.stringify(colors));
    formData.append("sizes", JSON.stringify(sizes));
    formData.append("tags", tags.join(", "));
    formData.append("badge", badge);
    formData.append("ram", ram);
    formData.append("storage", storage);
    if (selectedFile) formData.append("image", selectedFile);

    try {
      setLoading(true);
      await axios.post(
        "http://localhost:3000/api/v1/product/createproduct",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } },
      );
      toast.success("Product created successfully!");
      onSuccess();
      onCancel();
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not create product");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-5">
      <FormSection>
        <SectionHeader step="1" label="Media" />
        <MediaUploadZone
          imagePreview={imagePreview}
          onImageChange={handleImageChange}
          uploadLabel="Upload image"
        />
      </FormSection>

      <FormSection>
        <SectionHeader step="2" label="Basic information" />
        <div className="flex flex-col gap-4">
          <FormField label="Product name" required>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={MODAL_INPUT_CLASS}
              placeholder="e.g. MacBook Pro 14"
            />
          </FormField>
          <FormField label="Description">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className={`${MODAL_INPUT_CLASS} resize-none`}
              placeholder="Short product description for customers"
            />
          </FormField>
          <FormField label="Category" required>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`${MODAL_INPUT_CLASS} cursor-pointer`}
            >
              <option value="">Select a category...</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </FormField>
        </div>
      </FormSection>

      <FormSection>
        <SectionHeader step="3" label="Pricing & inventory" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Price" required>
            <div className="relative">
              <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-400">
                $
              </span>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                className={`${MODAL_INPUT_CLASS} pl-7`}
              />
            </div>
          </FormField>
          <FormField label="Stock" required>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="Units available"
              className={MODAL_INPUT_CLASS}
            />
          </FormField>
        </div>
      </FormSection>

      <FormSection>
        <SectionHeader step="4" label="Variants" />
        <div className="flex flex-col gap-5">
          <FormField
            label="Colors"
            hint="Add name and swatch for each color option"
          >
            <ColorPicker selectedColors={colors} onChange={setColors} />
          </FormField>
          <FormField label="Sizes">
            <SizePicker selectedSizes={sizes} onChange={setSizes} />
          </FormField>
        </div>
      </FormSection>

      <FormSection>
        <SectionHeader step="5" label="Tags & badge" />
        <div className="flex flex-col gap-5 sm:flex-row sm:justify-between sm:items-start sm:gap-6">
          <div className="min-w-0 flex-1">
            <FormField label="Product tags">
              <TagPicker selectedTags={tags} onChange={setTags} />
            </FormField>
          </div>
          <div className="min-w-0 flex-1">
            <FormField
              label="Badge"
              hint="Optional highlight shown on the product card"
            >
              <BadgePicker selectedBadge={badge} onChange={setBadge} />
            </FormField>
          </div>
        </div>
      </FormSection>

      <FormSection>
        <SectionHeader step="6" label="Specifications" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="RAM">
            <select
              value={ram}
              onChange={(e) => setRam(e.target.value)}
              className={`${MODAL_INPUT_CLASS} cursor-pointer`}
            >
              <option value="">Select RAM...</option>
              {["2 GB", "4 GB", "8 GB", "12 GB", "16 GB", "32 GB", "64 GB"].map(
                (v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ),
              )}
            </select>
          </FormField>
          <FormField label="Storage">
            <select
              value={storage}
              onChange={(e) => setStorage(e.target.value)}
              className={`${MODAL_INPUT_CLASS} cursor-pointer`}
            >
              <option value="">Select storage...</option>
              {["128 GB", "256 GB", "512 GB", "1 TB", "2 TB", "4 TB"].map(
                (v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ),
              )}
            </select>
          </FormField>
        </div>
      </FormSection>

      <FormSection>
        <SectionHeader step="7" label="Status" />
        <StatusToggle status={status} onChange={setStatus} />
      </FormSection>

      <ModalFooter
        onCancel={onCancel}
        onSubmit={handleCreateProduct}
        loading={loading}
        submitLabel="Create product"
        loadingLabel="Creating..."
      />
    </div>
  );
};
// ================== Create Product Form End =======================

// ================== Update Product Form ====================
const UpdateProductForm = ({ onCancel, onSuccess, product }) => {
  const [name, setName] = useState(product?.name || "");
  const [description, setDescription] = useState(product?.description || "");
  const [category, setCategory] = useState(product?.category || "");
  const [price, setPrice] = useState(product?.price || "");
  const [stock, setStock] = useState(product?.stock || "");
  const [status, setStatus] = useState(product?.status || "active");
  const [colors, setColors] = useState(product?.colors || []);
  const [sizes, setSizes] = useState(product?.sizes || []);
  const [tags, setTags] = useState(product?.tags || []);
  const [badge, setBadge] = useState(product?.badge || "");
  const [ram, setRam] = useState(product?.ram || "");
  const [storage, setStorage] = useState(product?.storage || "");
  const [imagePreview, setImagePreview] = useState(product?.image || "");
  const [selectedFile, setSelectedFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  //fecth all category
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/category/getallcategory")
      .then((res) => setCategories(res.data.categories || []));
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  // Update product function
  const handleUpdateProduct = async () => {
    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("description", description.trim());
    formData.append("category", category);
    formData.append("price", Number(price));
    formData.append("stock", Number(stock));
    formData.append("status", status);
    formData.append("colors", JSON.stringify(colors));
    formData.append("sizes", JSON.stringify(sizes));
    formData.append("tags", tags.join(", "));
    formData.append("badge", badge);
    formData.append("ram", ram);
    formData.append("storage", storage);
    if (selectedFile) formData.append("image", selectedFile);

    try {
      setLoading(true);
      await axios.patch(
        `http://localhost:3000/api/v1/product/updateproduct/${product._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } },
      );
      toast.success("Product updated successfully!");
      onSuccess();
      onCancel();
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not update product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <FormSection>
        <SectionHeader step="1" label="Media" />
        <MediaUploadZone
          imagePreview={imagePreview}
          onImageChange={handleImageChange}
          uploadLabel="Change image"
        />
      </FormSection>

      <FormSection>
        <SectionHeader step="2" label="Basic information" />
        <div className="flex flex-col gap-4">
          <FormField label="Product name" required>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={MODAL_INPUT_CLASS}
              placeholder="Product name"
            />
          </FormField>
          <FormField label="Description">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className={`${MODAL_INPUT_CLASS} resize-none`}
              placeholder="Description"
            />
          </FormField>
          <FormField label="Category" required>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`${MODAL_INPUT_CLASS} cursor-pointer`}
            >
              {categories.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </FormField>
        </div>
      </FormSection>

      <FormSection>
        <SectionHeader step="3" label="Pricing & inventory" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Price" required>
            <div className="relative">
              <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-400">
                $
              </span>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                className={`${MODAL_INPUT_CLASS} pl-7`}
              />
            </div>
          </FormField>
          <FormField label="Stock" required>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="Stock"
              className={MODAL_INPUT_CLASS}
            />
          </FormField>
        </div>
      </FormSection>

      <FormSection>
        <SectionHeader step="4" label="Variants" />
        <div className="flex flex-col gap-5">
          <FormField label="Colors">
            <ColorPicker selectedColors={colors} onChange={setColors} />
          </FormField>
          <FormField label="Sizes">
            <SizePicker selectedSizes={sizes} onChange={setSizes} />
          </FormField>
        </div>
      </FormSection>

      <FormSection>
        <SectionHeader step="5" label="Tags & badge" />
        <div className="flex flex-col gap-5 sm:flex-row sm:justify-between sm:items-start sm:gap-6">
          <div className="min-w-0 flex-1">
            <FormField label="Product tags">
              <TagPicker selectedTags={tags} onChange={setTags} />
            </FormField>
          </div>
          <div className="min-w-0 flex-1">
            <FormField
              label="Badge"
              hint="Optional highlight shown on the product card"
            >
              <BadgePicker selectedBadge={badge} onChange={setBadge} />
            </FormField>
          </div>
        </div>
      </FormSection>

      <FormSection>
        <SectionHeader step="6" label="Specifications" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="RAM">
            <select
              value={ram}
              onChange={(e) => setRam(e.target.value)}
              className={`${MODAL_INPUT_CLASS} cursor-pointer`}
            >
              <option value="">Select RAM...</option>
              {["2 GB", "4 GB", "8 GB", "12 GB", "16 GB", "32 GB", "64 GB"].map(
                (v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ),
              )}
            </select>
          </FormField>
          <FormField label="Storage">
            <select
              value={storage}
              onChange={(e) => setStorage(e.target.value)}
              className={`${MODAL_INPUT_CLASS} cursor-pointer`}
            >
              <option value="">Select storage...</option>
              {[
                "32 GB",
                "64 GB",
                "128 GB",
                "256 GB",
                "512 GB",
                "1 TB",
                "2 TB",
                "4 TB",
              ].map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </FormField>
        </div>
      </FormSection>

      <FormSection>
        <SectionHeader step="7" label="Status" />
        <StatusToggle status={status} onChange={setStatus} />
      </FormSection>

      <ModalFooter
        onCancel={onCancel}
        onSubmit={handleUpdateProduct}
        loading={loading}
        submitLabel="Save changes"
        loadingLabel="Updating..."
      />
    </div>
  );
};

// ============== Main Products Section (Table) ===============
const Products = () => {
  const [modal, setModal] = useState(null);
  const [updateModal, setUpdateModal] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const [products, setProducts] = useState([]);
  const triggerRefresh = () => setRefresh((prev) => prev + 1);

  //=============== Get all products ===============
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/product/getallproducts")
      .then((res) => setProducts(res.data.products || []))
      .catch(() => toast.error("Failed to get products"));
  }, [refresh]);

  // ============== Delete product function ==============
  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await axios.delete(
        `http://localhost:3000/api/v1/product/deletesingleproduct/${id}`,
      );
      toast.success("Product deleted!");
      triggerRefresh();
    } catch {
      toast.error("Delete failed");
    }
  };

  const inventoryValue = products.reduce(
    (sum, p) => sum + (p.price || 0) * (p.stock || 0),
    0,
  );

  return (
    <>
      <div className=" pb-5">
        <div className="">
          {/* Header */}
          <div className="flex justify-between items-center sticky top-0 z-10 pb-2 mb-3">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Products</h1>
              <p className="text-xs font-bold uppercase text-gray-400">
                Manage your product listings
              </p>
            </div>
            <button
              onClick={() => setModal("add")}
              className="bg-gray-900 text-white text-sm font-semibold px-5 py-3.5 rounded-xl shadow-md transition cursor-pointer"
            >
              + Add Product
            </button>
          </div>

          {/* =============== Stats Cards ================= */}
          <div className="grid grid-cols-4 gap-5 mb-8">
            <div className="bg-white rounded-xl border p-6 shadow-sm">
              <p className="text-sm text-gray-500">Total</p>
              <p className="mt-3 text-3xl font-extrabold">{products.length}</p>
            </div>
            <div className="bg-white rounded-xl border p-6 shadow-sm">
              <p className="text-sm text-gray-500">Inventory Value</p>
              <p className="mt-3 text-3xl font-extrabold">
                ${inventoryValue.toLocaleString()}
              </p>
            </div>
          </div>

          {/* =============== Product Table ================= */}
          <div className="overflow-x-auto bg-white rounded-2xl border border-gray-100 shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  {[
                    "Image",
                    "Name",
                    "Category",
                    "Colors",
                    "RAM",
                    "Price",
                    "Stock",
                    "Tags",
                    "Badge",
                    "Status",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left px-5 py-4 text-xs font-bold uppercase text-neutral-500"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {products.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50 transition">
                    <td className="px-5 py-4">
                      <img
                        src={item.image}
                        className="w-10 h-10 rounded-lg object-cover"
                        alt=""
                      />
                    </td>
                    <td className="px-5 py-4 text-sm font-semibold text-neutral-700">
                      {item.name}
                    </td>
                    <td className="px-5 py-4 text-sm text-neutral-500">
                      {item.category}
                    </td>

                    {/* Colors */}
                    <td className="px-5 py-4 text-sm text-neutral-500">
                      {Array.isArray(item.colors)
                        ? item.colors.map((c) => c.name).join(", ")
                        : item.colors || "-"}
                    </td>
                    {/* RAM */}
                    <td className="px-5 py-4 text-sm text-neutral-500">
                      {item.ram || "-"}
                    </td>
                    {/* Price */}
                    <td className="px-5 py-4 text-sm font-mono">
                      ${item.price}
                    </td>
                    {/* Stock */}
                    <td className="px-5 py-4 text-sm">{item.stock}</td>
                    {/* Tags */}
                    <td className="px-5 py-4 text-sm">
                      {item.tags && item.tags.length > 0
                        ? item.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="inline-block mr-2 px-2 py-1 text-start  text-xs font-semibold "
                            >
                              {tag}
                            </span>
                          ))
                        : "-"}
                    </td>
                    {/* Badge */}
                    <td className="px-5 py-4">
                      {item.badge ? (
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold">
                          {getBadgeLabel(item.badge)}
                        </span>
                      ) : (
                        "-"
                      )}
                    </td>
                    {/* Status */}
                    <td className="px-5 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${item.status?.toLowerCase() === "active" ? "bg-green-50 text-green-600 border border-green-200" : "bg-red-50 text-rose-600 border border-rose-200"}`}
                      >
                        {item.status || "Inactive"}
                      </span>
                    </td>

                    <td className="px-5 py-4 flex gap-2">
                      {/* Edit Button */}
                      <button
                        onClick={() => setUpdateModal(item)}
                        className="px-3 py-1.5 rounded-lg bg-amber-50 text-amber-600 border border-amber-200 text-xs font-bold cursor-pointer"
                      >
                        Edit
                      </button>
                      {/* Delete Button */}
                      <button
                        onClick={() => deleteProduct(item._id)}
                        className="px-3 py-1.5 rounded-lg bg-red-50 text-rose-600 border border-rose-200 text-xs font-bold cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modals */}
      {modal === "add" && (
        <ProductModal
          title="Add new product"
          mode="create"
          onClose={() => setModal(null)}
        >
          <CreateProductForm
            onCancel={() => setModal(null)}
            onSuccess={triggerRefresh}
          />
        </ProductModal>
      )}

      {updateModal && (
        <ProductModal
          title="Edit product"
          mode="edit"
          onClose={() => setUpdateModal(null)}
        >
          <UpdateProductForm
            onCancel={() => setUpdateModal(null)}
            onSuccess={triggerRefresh}
            product={updateModal}
          />
        </ProductModal>
      )}

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: translateY(12px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </>
  );
};

export default Products;
