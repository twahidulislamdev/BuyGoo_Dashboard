// src/pages/admin/Products.jsx
import axios from "axios";
import { Delete } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

// ── Icons ──
const CloseIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const ImageIcon = () => (
  <svg
    className="w-8 h-8 text-gray-300"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M14 8h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

const UploadIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
    />
  </svg>
);

// --------------- Color Picker
const COLOR_PRESETS = [
  { label: "Purple", hex: "#A855F7" },
  { label: "Silver", hex: "#C0C0C0" },
  { label: "Red", hex: "#EF4444" },
  { label: "Black", hex: "#111111" },
  { label: "Blue", hex: "#3B82F6" },
  { label: "White", hex: "#FFFFFF" },
  { label: "Gold", hex: "#D4AF37" },
  { label: "Green", hex: "#22C55E" },
];
const ColorPicker = ({ selectedColors, onChange }) => {
  const toggle = (label) => {
    if (selectedColors.includes(label)) {
      onChange(selectedColors.filter((c) => c !== label));
    } else {
      onChange([...selectedColors, label]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {COLOR_PRESETS.map(({ label, hex }) => {
        const selected = selectedColors.includes(label);
        return (
          <button
            key={label}
            type="button"
            title={label}
            onClick={() => toggle(label)}
            className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 focus:outline-none ${
              selected
                ? "border-indigo-500 scale-110 ring-2 ring-indigo-300"
                : "border-gray-300 hover:border-gray-400"
            }`}
            style={{ backgroundColor: hex }}
          >
            {selected && (
              <span className="flex items-center justify-center w-full h-full">
                <svg
                  className={`w-3.5 h-3.5 ${hex === "#FFFFFF" || hex === "#C0C0C0" ? "text-gray-800" : "text-white"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            )}
          </button>
        );
      })}
      {selectedColors.length > 0 && (
        <span className="text-xs text-gray-400 ml-1">
          {selectedColors.join(", ")}
        </span>
      )}
    </div>
  );
};

// ------------- Size Picker
const SIZE_OPTIONS = ["XS", "S", "M", "L", "XL", "XXL", "One Size"];
const SizePicker = ({ selectedSizes, onChange }) => {
  const toggle = (size) => {
    if (selectedSizes.includes(size)) {
      onChange(selectedSizes.filter((s) => s !== size));
    } else {
      onChange([...selectedSizes, size]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {SIZE_OPTIONS.map((s) => {
        const selected = selectedSizes.includes(s);
        return (
          <button
            key={s}
            type="button"
            onClick={() => toggle(s)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              selected
                ? "bg-gray-900 border-gray-900 text-white"
                : "bg-white border-gray-200 text-gray-600 hover:border-gray-400"
            }`}
          >
            {s}
          </button>
        );
      })}
    </div>
  );
};

// --------------Section Header
const SectionHeader = ({ step, label }) => (
  <div className="flex items-center gap-2.5 mb-4">
    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-gray-900 text-white text-[10px] font-bold shrink-0">
      {step}
    </span>
    <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">
      {label}
    </span>
    <div className="flex-1 h-px bg-gray-100" />
  </div>
);

// -------------- Modal Wrapper
const ProductModal = ({ title, onClose, children }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div
        className="w-full max-w-2xl max-h-[92vh] flex flex-col rounded-2xl bg-white shadow-2xl overflow-hidden"
        style={{ animation: "modalIn .2s ease-out" }}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">
              Product Management
            </p>
            <h2 className="text-lg font-semibold text-gray-900 tracking-tight">
              {title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-neutral-100 text-neutral-900 hover:bg-neutral-200 transition cursor-pointer border border-neutral-300"
          >
            <CloseIcon />
          </button>
        </div>
        <div className="overflow-y-auto flex-1 px-6 py-6">{children}</div>
      </div>
    </div>
  );
};

// ================== Create Product Form Start Here ======================
const CreateProductForm = ({ onCancel, onSuccess }) => {
  // Form states
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [status, setStatus] = useState("active");
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [ram, setRam] = useState("");
  const [storage, setStorage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load categories from API
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/category/getallcategory")
      .then((res) => setCategories(res.data.categories || []))
      .catch(() => toast.error("Failed to load categories"));
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  //--------- Create Product Logic Start Here ---------
  const handleCreateProduct = async () => {
    if (
      !name.trim() ||
      !description.trim() ||
      !category ||
      price === "" ||
      stock === ""
    ) {
      toast.error("Name, Description, Category, Price, and Stock are required");
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
    formData.append("ram", ram);
    formData.append("storage", storage);
    if (selectedFile) formData.append("image", selectedFile);

    // Create Product Api
    try {
      setLoading(true);
      await axios.post(
        "http://localhost:3000/api/v1/product/createproduct",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      toast.success("Product created successfully!");
      onSuccess();
      onCancel();
    } catch (err) {
      const msg = err.response?.data?.message || "Could not create product";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full border border-neutral-300 bg-gray-50 rounded-lg px-3.5 py-2.5 text-sm text-neutral-800 placeholder-neutral-400 outline-none focus:border-neutral-500 focus:bg-white transition";

  return (
    <div className="flex flex-col gap-6">
      {/* 1. Media */}
      <div>
        <SectionHeader step="1" label="Media" />
        <div className="flex items-center gap-5">
          <div className="shrink-0 w-24 h-24 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <ImageIcon />
            )}
          </div>
          <div>
            <label className="inline-flex items-center gap-2 cursor-pointer px-4 py-2.5 bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold rounded-lg transition">
              <UploadIcon /> Upload Image
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            <p className="text-xs text-gray-400 mt-2 leading-relaxed">
              PNG or JPG · 800x800 px · Max 5 MB
            </p>
          </div>
        </div>
      </div>

      {/* 2. Basic Info */}
      <div>
        <SectionHeader step="2" label="Basic Information" />
        <div className="flex flex-col gap-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
            placeholder="Product Name *"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className={`${inputClass} resize-none`}
            placeholder="Description"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={inputClass}
          >
            <option value="">Select a category...</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 3. Pricing & Inventory */}
      <div>
        <SectionHeader step="3" label="Pricing & Inventory" />
        <div className="grid grid-cols-2 gap-3">
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
              $
            </span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price *"
              className={`${inputClass} pl-8`}
            />
          </div>
          <input
            type="number"
            min="0"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="Stock *"
            className={inputClass}
          />
        </div>
      </div>

      {/* 4. Variants */}
      <div>
        <SectionHeader step="4" label="Variants" />
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Colors
            </label>
            <ColorPicker selectedColors={colors} onChange={setColors} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Sizes
            </label>
            <SizePicker selectedSizes={sizes} onChange={setSizes} />
          </div>
        </div>
      </div>

      {/* 5. Specifications */}
      <div>
        <SectionHeader step="5" label="Specifications" />
        <div className="grid grid-cols-2 gap-3">
          <select
            value={ram}
            onChange={(e) => setRam(e.target.value)}
            className={inputClass}
          >
            <option value="">Select RAM...</option>
            {[
              "2 GB",
              "4 GB",
              "6 GB",
              "8 GB",
              "12 GB",
              "16 GB",
              "32 GB",
              "64 GB",
            ].map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
          <select
            value={storage}
            onChange={(e) => setStorage(e.target.value)}
            className={inputClass}
          >
            <option value="">Select Storage...</option>
            {[
              "16 GB",
              "32 GB",
              "64 GB",
              "128 GB",
              "256 GB",
              "512 GB",
              "1 TB",
              "2 TB",
            ].map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 6. Status */}
      <div>
        <SectionHeader step="6" label="Status" />
        <div className="flex gap-3">
          <label
            className={`flex-1 flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition border-2 ${status === "active" ? "border-emerald-200 bg-emerald-50" : "border-gray-200 bg-white"}`}
          >
            <input
              type="radio"
              name="create_status"
              value="active"
              checked={status === "active"}
              onChange={(e) => setStatus(e.target.value)}
              className="accent-emerald-600"
            />
            <div>
              <p className="text-sm font-semibold text-emerald-700">Active</p>
              <p className="text-xs text-gray-400">Visible to customers</p>
            </div>
          </label>
          <label
            className={`flex-1 flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition border-2 ${status === "inactive" ? "border-rose-200 bg-rose-50" : "border-gray-200 bg-white"}`}
          >
            <input
              type="radio"
              name="create_status"
              value="inactive"
              checked={status === "inactive"}
              onChange={(e) => setStatus(e.target.value)}
              className="accent-rose-600"
            />
            <div>
              <p className="text-sm font-semibold text-rose-600">Inactive</p>
              <p className="text-xs text-gray-400">Hidden from store</p>
            </div>
          </label>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-1">
        <button
          onClick={onCancel}
          className="flex-1 py-2.5 rounded-xl border border-neutral-300 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={handleCreateProduct}
          disabled={loading}
          className="flex-1 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 disabled:opacity-60 transition cursor-pointer"
        >
          {loading ? "Saving..." : "Create Product"}
        </button>
      </div>
    </div>
  );
};
// ================== Create Product Form End Here ======================

// ================== Update Product Form Start Here ====================
const UpdateProductForm = ({ onCancel, onSuccess, product }) => {
  // Form states - get initial values from product prop
  const [name, setName] = useState(product?.name || "");
  const [description, setDescription] = useState(product?.description || "");
  const [category, setCategory] = useState(product?.category || "");
  const [price, setPrice] = useState(product?.price || "");
  const [stock, setStock] = useState(product?.stock || "");
  const [status, setStatus] = useState(product?.status || "active");
  const [colors, setColors] = useState(product?.colors || []);
  const [sizes, setSizes] = useState(product?.sizes || []);
  const [ram, setRam] = useState(product?.ram || "");
  const [storage, setStorage] = useState(product?.storage || "");
  const [imagePreview, setImagePreview] = useState(product?.image || "");
  const [selectedFile, setSelectedFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load categories from API
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/category/getallcategory")
      .then((res) => setCategories(res.data.categories || []))
      .catch(() => toast.error("Failed to load categories"));
  }, []);

  // Handle Image Change
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleUpdateProduct = async () => {
    if (!name.trim() || !category || price === "" || stock === "") {
      toast.error("Name, Category, Price and Stock are required");
      return;
    }

    // Form Data For Update Product
    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("description", description.trim());
    formData.append("category", category);
    formData.append("price", Number(price));
    formData.append("stock", Number(stock));
    formData.append("status", status);
    formData.append("colors", JSON.stringify(colors));
    formData.append("sizes", JSON.stringify(sizes));
    formData.append("ram", ram);
    formData.append("storage", storage);
    if (selectedFile) formData.append("image", selectedFile);

    // Update Product Logic
    try {
      setLoading(true);
      await axios.patch(
        `http://localhost:3000/api/v1/product/updateproduct/${product._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      toast.success("Product updated successfully!");
      onSuccess();
      onCancel();
    } catch (err) {
      const msg = err.response?.data?.message || "Could not update product";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full border border-neutral-300 bg-gray-50 rounded-lg px-3.5 py-2.5 text-sm text-neutral-800 placeholder-neutral-400 outline-none focus:border-neutral-500 focus:bg-white transition";

  return (
    <div className="flex flex-col gap-6">
      {/* 1. Media */}
      <div>
        <SectionHeader step="1" label="Media" />
        <div className="flex items-center gap-5">
          <div className="shrink-0 w-24 h-24 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <ImageIcon />
            )}
          </div>
          <div>
            <label className="inline-flex items-center gap-2 cursor-pointer px-4 py-2.5 bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold rounded-lg transition">
              <UploadIcon /> Change Image
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            <p className="text-xs text-gray-400 mt-2 leading-relaxed">
              PNG or JPG · 800x800 px · Max 5 MB
            </p>
          </div>
        </div>
      </div>

      {/* 2. Basic Information */}
      <div>
        <SectionHeader step="2" label="Basic Information" />
        <div className="flex flex-col gap-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
            placeholder="Product Name *"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className={`${inputClass} resize-none`}
            placeholder="Description"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={inputClass}
          >
            <option value="">Select a category...</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 3. Pricing & Inventory */}
      <div>
        <SectionHeader step="3" label="Pricing & Inventory" />
        <div className="grid grid-cols-2 gap-3">
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
              $
            </span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price *"
              className={`${inputClass} pl-8`}
            />
          </div>
          <input
            type="number"
            min="0"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="Stock *"
            className={inputClass}
          />
        </div>
      </div>

      {/* 4. Variants */}
      <div>
        <SectionHeader step="4" label="Variants" />
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Colors
            </label>
            <ColorPicker selectedColors={colors} onChange={setColors} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Sizes
            </label>
            <SizePicker selectedSizes={sizes} onChange={setSizes} />
          </div>
        </div>
      </div>

      {/* 5. Specifications */}
      <div>
        <SectionHeader step="5" label="Specifications" />
        <div className="grid grid-cols-2 gap-3">
          <select
            value={ram}
            onChange={(e) => setRam(e.target.value)}
            className={inputClass}
          >
            <option value="">Select RAM...</option>
            {[
              "2 GB",
              "4 GB",
              "6 GB",
              "8 GB",
              "12 GB",
              "16 GB",
              "32 GB",
              "64 GB",
            ].map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
          <select
            value={storage}
            onChange={(e) => setStorage(e.target.value)}
            className={inputClass}
          >
            <option value="">Select Storage...</option>
            {[
              "16 GB",
              "32 GB",
              "64 GB",
              "128 GB",
              "256 GB",
              "512 GB",
              "1 TB",
              "2 TB",
            ].map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 6. Status */}
      <div>
        <SectionHeader step="6" label="Status" />
        <div className="flex gap-3">
          <label
            className={`flex-1 flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition border-2 ${status === "active" ? "border-emerald-200 bg-emerald-50" : "border-gray-200 bg-white"}`}
          >
            <input
              type="radio"
              name="update_status"
              value="active"
              checked={status === "active"}
              onChange={(e) => setStatus(e.target.value)}
              className="accent-emerald-600"
            />
            <div>
              <p className="text-sm font-semibold text-emerald-700">Active</p>
              <p className="text-xs text-gray-400">Visible to customers</p>
            </div>
          </label>
          <label
            className={`flex-1 flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition border-2 ${status === "inactive" ? "border-rose-200 bg-rose-50" : "border-gray-200 bg-white"}`}
          >
            <input
              type="radio"
              name="update_status"
              value="inactive"
              checked={status === "inactive"}
              onChange={(e) => setStatus(e.target.value)}
              className="accent-rose-600"
            />
            <div>
              <p className="text-sm font-semibold text-rose-600">Inactive</p>
              <p className="text-xs text-gray-400">Hidden from store</p>
            </div>
          </label>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-1">
        <button
          onClick={onCancel}
          className="flex-1 py-2.5 rounded-xl border border-neutral-300 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={handleUpdateProduct}
          disabled={loading}
          className="flex-1 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 disabled:opacity-60 transition cursor-pointer"
        >
          {loading ? "Saving..." : "Update Product"}
        </button>
      </div>
    </div>
  );
};
// ================== Update Product Form End Here ====================

// ---------- Main Products section Component Start Here ------------------
const Products = () => {
  // Modal states
  const [modal, setModal] = useState(null);
  const [updateModal, setUpdateModal] = useState(null);
  const [refresh, setRefresh] = useState(0);

  // Refresh function to reload products
  const triggerRefresh = () => setRefresh((prev) => prev + 1);

  // Products state
  const [products, setProducts] = useState([]);

  // Load all products from API
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/product/getallproducts")
      .then((res) => setProducts(res.data.products || []))
      .catch((err) => {
        console.error(err);
        toast.error("Failed to get products");
      });
  }, [refresh]);

  // Delete single product
  const deleteProduct = async (id) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/v1/product/deletesingleproduct/${id}`,
      );
      toast.success("Product deleted successfully!");
      triggerRefresh();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete product");
    }
  };

  // Delete all products
  const deleteAllProducts = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/api/v1/product/deleteallproducts`,
      );
      toast.success("All Products Deleted Successfully!");
      triggerRefresh();
    } catch (error) {
      console.error("Delete All error:", error);
      toast.error("Failed To Delete All Products");
    }
  };

  // Calculate stats
  const totalProducts = products.length;
  const activeProducts = products.filter(
    (p) => (p.status || "").toLowerCase() === "active",
  ).length;
  const outOfStock = products.filter((p) => (p.stock || 0) === 0).length;
  const inventoryValue = products.reduce(
    (sum, p) => sum + (p.price || 0) * (p.stock || 0),
    0,
  );

  return (
    <>
      <div className="min-h-screen bg-neutral-50 pb-12">
        <div className="px-5 mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center bg-white border-b border-gray-200 sticky top-0 z-10 pb-2 mb-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                Dashboard
              </p>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                Products
              </h1>
              <p className="text-sm text-gray-400 mt-1">
                Manage your product listings, pricing, and inventory.
              </p>
            </div>
            <button
              onClick={() => setModal("add")}
              className="flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold px-5 py-3.5 rounded-xl shadow-md transition cursor-pointer"
            >
              <span className="text-lg leading-none">+</span> Add Product
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <p className="text-sm font-medium text-gray-500">
                Total Products
              </p>
              <p className="mt-3 text-3xl font-extrabold text-gray-900">
                {totalProducts}
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <p className="text-sm font-medium text-gray-500">
                Active Products
              </p>
              <p className="mt-3 text-3xl font-extrabold text-emerald-600">
                {activeProducts}
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <p className="text-sm font-medium text-gray-500">Out of Stock</p>
              <p className="mt-3 text-3xl font-extrabold text-rose-600">
                {outOfStock}
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <p className="text-sm font-medium text-gray-500">
                Inventory Value
              </p>
              <p className="mt-3 text-3xl font-extrabold text-gray-900">
                ${inventoryValue.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center bg-white border border-gray-100 rounded-2xl px-4 py-3 mb-5  gap-3 shadow-sm">
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                placeholder="Search By Product Name..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <button
              onClick={deleteAllProducts}
              className="px-5 py-2.5 rounded-xl bg-rose-100 border border-rose-300 text-rose-600 text-sm font-semibold hover:bg-rose-200 transition cursor-pointer whitespace-nowrap"
            >
              Delete All
            </button>
          </div>

          {/* Table For Show All Data */}
          <div className="overflow-x-auto bg-white rounded-2xl border border-gray-100 shadow-sm">
            <table className="w-full table-fixed">
              <colgroup>
                <col className="w-16" />
                <col className="w-1/4" />
                <col className="w-1/6" />
                <col className="w-1/8" />
                <col className="w-1/8" />
                <col className="w-1/8" />
                <col className="w-1/8" />
                <col className="w-1/8" />
                <col className="w-1/8" />
                <col className="w-1/5" />
              </colgroup>
              {/* Table Header Start */}
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  {[
                    "Image",
                    "Name",
                    "Category",
                    "Color",
                    "RAM",
                    "Storage",
                    "Price",
                    "Stock",
                    "Status",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left px-5 py-4 text-xs font-bold uppercase tracking-widest text-neutral-500"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              {/* Table Header End */}
              <tbody className="divide-y divide-gray-50">
                {products.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-gray-50 transition duration-150"
                  >
                    <td className="px-5 py-4">
                      <div className="w-10 h-10 rounded-lg border border-gray-100 overflow-hidden bg-gray-50 flex items-center justify-center">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-gray-300 text-xs">-</span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-neutral-700 font-semibold text-sm">
                      {item.name}
                    </td>
                    <td className="px-5 py-4 text-neutral-500 text-sm">
                      {item.category}
                    </td>
                    <td className="px-5 py-4 text-neutral-500 text-sm">
                      {Array.isArray(item.colors)
                        ? item.colors.join(", ")
                        : item.colors || "-"}
                    </td>
                    <td className="px-5 py-4 text-neutral-500 text-sm">
                      {item.ram || "-"}
                    </td>
                    <td className="px-5 py-4 text-neutral-500 text-sm">
                      {item.storage || "-"}
                    </td>
                    <td className="px-5 py-4 text-neutral-700 font-mono text-sm">
                      ${item.price}
                    </td>
                    <td className="px-5 py-4 text-neutral-500 text-sm">
                      {item.stock != null ? item.stock : "-"}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                          item.status?.toLowerCase() === "active"
                            ? "bg-green-50 text-green-600 border border-green-200"
                            : "bg-red-50 text-rose-600 border border-rose-200"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${item.status?.toLowerCase() === "active" ? "bg-green-500" : "bg-rose-500"}`}
                        />
                        {item.status
                          ? item.status.charAt(0).toUpperCase() +
                            item.status.slice(1).toLowerCase()
                          : ""}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setUpdateModal(item)}
                          className="px-4 py-2 rounded-lg bg-amber-50 border border-amber-300 text-amber-600 text-xs font-semibold hover:bg-amber-100 transition cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteProduct(item._id)}
                          className="px-4 py-2 rounded-lg bg-red-50 border border-rose-300 text-rose-600 text-xs font-semibold hover:bg-rose-100 transition cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {products.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-neutral-300">
                <span className="text-4xl mb-3">📦</span>
                <p className="text-sm font-medium">No products yet</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create Modal */}
      {modal === "add" && (
        <ProductModal title="Add New Product" onClose={() => setModal(null)}>
          <CreateProductForm
            onCancel={() => setModal(null)}
            onSuccess={triggerRefresh}
          />
        </ProductModal>
      )}

      {/* Update Modal */}
      {updateModal && (
        <ProductModal title="Edit Product" onClose={() => setUpdateModal(null)}>
          <UpdateProductForm
            onCancel={() => setUpdateModal(null)}
            onSuccess={triggerRefresh}
            product={updateModal}
          />
        </ProductModal>
      )}

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.97) translateY(8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </>
  );
};

export default Products;
