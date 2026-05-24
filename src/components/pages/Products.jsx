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
      <div className="flex items-center gap-3">
        <input
          type="text"
          value={colorName}
          onChange={(e) => setColorName(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g. Midnight Black"
          className="flex-1 border border-neutral-300 bg-gray-50 rounded-lg px-3.5 py-2.5 text-sm text-neutral-800 placeholder-neutral-400 outline-none focus:border-neutral-500 focus:bg-white transition"
        />
        <input
          type="color"
          value={colorHex}
          onChange={(e) => setColorHex(e.target.value)}
          className="w-14 h-11 rounded-lg border border-neutral-300 bg-white cursor-pointer p-1"
        />
        <button
          type="button"
          onClick={addColor}
          className="px-4 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition shadow-sm whitespace-nowrap"
        >
          Add Color
        </button>
      </div>

      {selectedColors.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-1">
          {selectedColors.map((color, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-800 rounded-full text-xs font-medium border border-gray-200 shadow-sm"
            >
              <span
                className="w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: color.hex }}
              />
              <span>{color.name}</span>
              <span className="text-gray-500 uppercase">{color.hex}</span>
              <button
                type="button"
                onClick={() => removeColor(color.name)}
                className="w-4 h-4 rounded-full hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
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
      <div className="flex items-center gap-3">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g. 15.1 Inch, XL"
          className="flex-1 border border-neutral-300 bg-gray-50 rounded-lg px-3.5 py-2.5 text-sm text-neutral-800 placeholder-neutral-400 outline-none focus:border-neutral-500 focus:bg-white transition"
        />
        <button
          type="button"
          onClick={addSize}
          className="px-4 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition shadow-sm whitespace-nowrap"
        >
          Add Size
        </button>
      </div>

      {selectedSizes.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-1">
          {selectedSizes.map((size) => (
            <div
              key={size}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-800 rounded-full text-xs font-medium border border-gray-200 shadow-sm"
            >
              <span>{size}</span>
              <button
                type="button"
                onClick={() => removeSize(size)}
                className="w-4 h-4 rounded-full hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
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
      <div className="flex items-center gap-3">
        <select
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1 border border-neutral-300 bg-gray-50 rounded-lg px-3.5 py-2.5 text-sm text-neutral-800 outline-none focus:border-neutral-500 focus:bg-white transition"
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
          className="px-4 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition shadow-sm whitespace-nowrap"
        >
          Add Tag
        </button>
      </div>

      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-1">
          {selectedTags.map((tag) => (
            <div
              key={tag}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full text-xs font-medium border border-blue-200 shadow-sm"
            >
              <span>{tag}</span>
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="w-4 h-4 rounded-full hover:bg-blue-200 flex items-center justify-center text-blue-600 hover:text-blue-700 transition-colors"
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

// --------------Section Header Start ----------------
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
// --------------Section Header End ----------------

// -------------- Product Modal Start -------------------
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

// ================== Create Product Form ======================
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
  const [ram, setRam] = useState("");
  const [storage, setStorage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch All Categories
  useEffect(() => {
    axios
      .get("https://buygoo-backend.onrender.com/api/v1/category/getallcategory")
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
    formData.append("ram", ram);
    formData.append("storage", storage);
    if (selectedFile) formData.append("image", selectedFile);

    try {
      setLoading(true);
      await axios.post(
        "https://buygoo-backend.onrender.com/api/v1/product/createproduct",
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

  const inputClass =
    "w-full border border-neutral-300 bg-gray-50 rounded-lg px-3.5 py-2.5 text-sm text-neutral-800 outline-none focus:border-neutral-500 focus:bg-white transition";

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
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price *"
            className={inputClass}
          />
          <input
            type="number"
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
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">
              Colors
            </label>
            <ColorPicker selectedColors={colors} onChange={setColors} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">
              Sizes
            </label>
            <SizePicker selectedSizes={sizes} onChange={setSizes} />
          </div>
        </div>
      </div>

      {/* 5. Tags */}
      <div>
        <SectionHeader step="5" label="Tags" />
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">
            Product Tags
          </label>
          <TagPicker selectedTags={tags} onChange={setTags} />
        </div>
      </div>

      {/* 6. Specifications */}
      <div>
        <SectionHeader step="6" label="Specifications" />
        <div className="grid grid-cols-2 gap-3">
          <select
            value={ram}
            onChange={(e) => setRam(e.target.value)}
            className={inputClass}
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
          <select
            value={storage}
            onChange={(e) => setStorage(e.target.value)}
            className={inputClass}
          >
            <option value="">Select Storage...</option>
            {["128 GB", "256 GB", "512 GB", "1 TB", "2 TB", "4 TB"].map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 7. Status */}
      <div>
        <SectionHeader step="7" label="Status" />
        <div className="flex gap-3">
          <label
            className={`flex-1 flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer border-2 ${status === "active" ? "border-emerald-200 bg-emerald-50" : "border-gray-200 bg-white"}`}
          >
            <input
              type="radio"
              checked={status === "active"}
              onChange={() => setStatus("active")}
              className="accent-emerald-600"
            />
            <p className="text-sm font-semibold text-emerald-700">Active</p>
          </label>
          <label
            className={`flex-1 flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer border-2 ${status === "inactive" ? "border-rose-200 bg-rose-50" : "border-gray-200 bg-white"}`}
          >
            <input
              type="radio"
              checked={status === "inactive"}
              onChange={() => setStatus("inactive")}
              className="accent-rose-600"
            />
            <p className="text-sm font-semibold text-rose-600">Inactive</p>
          </label>
        </div>
      </div>

      <div className="flex gap-3 pt-1">
        <button
          onClick={onCancel}
          className="flex-1 py-2.5 rounded-xl border border-neutral-300 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleCreateProduct}
          disabled={loading}
          className="flex-1 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 disabled:opacity-60 transition"
        >
          {loading ? "Saving..." : "Create Product"}
        </button>
      </div>
    </div>
  );
};

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
  const [ram, setRam] = useState(product?.ram || "");
  const [storage, setStorage] = useState(product?.storage || "");
  const [imagePreview, setImagePreview] = useState(product?.image || "");
  const [selectedFile, setSelectedFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  //fecth all category
  useEffect(() => {
    axios
      .get("https://buygoo-backend.onrender.com/api/v1/category/getallcategory")
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
    formData.append("ram", ram);
    formData.append("storage", storage);
    if (selectedFile) formData.append("image", selectedFile);

    try {
      setLoading(true);
      await axios.patch(
        `https://buygoo-backend.onrender.com/api/v1/product/updateproduct/${product._id}`,
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

  const inputClass =
    "w-full border border-neutral-300 bg-gray-50 rounded-lg px-3.5 py-2.5 text-sm text-neutral-800 outline-none focus:border-neutral-500 transition";

  return (
    <div className="flex flex-col gap-5">
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
          <label className="cursor-pointer px-4 py-2.5 bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold rounded-lg transition">
            Change Image
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
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
            placeholder="Name"
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
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            className={inputClass}
          />
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="Stock"
            className={inputClass}
          />
        </div>
      </div>

      {/* 4. Variants */}
      <div>
        <SectionHeader step="4" label="Variants" />
        <div className="flex flex-col gap-4">
          <ColorPicker selectedColors={colors} onChange={setColors} />
          <SizePicker selectedSizes={sizes} onChange={setSizes} />
        </div>
      </div>

      {/* 5. Tags */}
      <div>
        <SectionHeader step="5" label="Tags" />
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">
            Product Tags
          </label>
          <TagPicker selectedTags={tags} onChange={setTags} />
        </div>
      </div>

      {/* 6. Specifications */}
      <div>
        <SectionHeader step="6" label="Specifications" />
        <div className="grid grid-cols-2 gap-3">
          <select
            value={ram}
            onChange={(e) => setRam(e.target.value)}
            className={inputClass}
          >
            <option value="">RAM...</option>
            {["2 GB", "4 GB", "8 GB", "12 GB", "16 GB", "32 GB", "64 GB"].map(
              (v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ),
            )}
          </select>
          <select
            value={storage}
            onChange={(e) => setStorage(e.target.value)}
            className={inputClass}
          >
            <option value="">Storage...</option>
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
        </div>
      </div>

      {/* 6. Status */}
      <div>
        <SectionHeader step="7" label="Status" />
        <div className="flex gap-3">
          <label
            className={`flex-1 flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer border-2 ${status === "active" ? "border-emerald-200 bg-emerald-50" : "border-gray-200 bg-white"}`}
          >
            <input
              type="radio"
              checked={status === "active"}
              onChange={() => setStatus("active")}
              className="accent-emerald-600"
            />
            <p className="text-sm font-semibold text-emerald-700">Active</p>
          </label>
          <label
            className={`flex-1 flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer border-2 ${status === "inactive" ? "border-rose-200 bg-rose-50" : "border-gray-200 bg-white"}`}
          >
            <input
              type="radio"
              checked={status === "inactive"}
              onChange={() => setStatus("inactive")}
              className="accent-rose-600"
            />
            <p className="text-sm font-semibold text-rose-600">Inactive</p>
          </label>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 py-2.5 rounded-xl border border-neutral-300 text-sm font-semibold text-gray-500 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={handleUpdateProduct}
          disabled={loading}
          className="flex-1 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 disabled:opacity-60"
        >
          {loading ? "Updating..." : "Update Product"}
        </button>
      </div>
    </div>
  );
};

// ---------- Main Products Section ----------
const Products = () => {
  const [modal, setModal] = useState(null);
  const [updateModal, setUpdateModal] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const [products, setProducts] = useState([]);

  const triggerRefresh = () => setRefresh((prev) => prev + 1);

  useEffect(() => {
    axios
      .get("https://buygoo-backend.onrender.com/api/v1/product/getallproducts")
      .then((res) => setProducts(res.data.products || []))
      .catch(() => toast.error("Failed to get products"));
  }, [refresh]);

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await axios.delete(
        `https://buygoo-backend.onrender.com/api/v1/product/deletesingleproduct/${id}`,
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

          {/* Stats Cards */}
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

          {/* Table */}
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
                    <td className="px-5 py-4 text-sm text-neutral-500">
                      {/* FIX: Map the color objects to display names */}
                      {Array.isArray(item.colors)
                        ? item.colors.map((c) => c.name).join(", ")
                        : item.colors || "-"}
                    </td>
                    <td className="px-5 py-4 text-sm text-neutral-500">
                      {item.ram || "-"}
                    </td>
                    <td className="px-5 py-4 text-sm font-mono">
                      ${item.price}
                    </td>
                    <td className="px-5 py-4 text-sm">{item.stock}</td>
                    <td className="px-5 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${item.status?.toLowerCase() === "active" ? "bg-green-50 text-green-600" : "bg-red-50 text-rose-600"}`}
                      >
                        {item.status || "Inactive"}
                      </span>
                    </td>
                    <td className="px-5 py-4 flex gap-2">
                      <button
                        onClick={() => setUpdateModal(item)}
                        className="px-3 py-1.5 rounded-lg bg-amber-50 text-amber-600 border border-amber-200 text-xs font-bold"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteProduct(item._id)}
                        className="px-3 py-1.5 rounded-lg bg-red-50 text-rose-600 border border-rose-200 text-xs font-bold"
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
        <ProductModal title="Add New Product" onClose={() => setModal(null)}>
          <CreateProductForm
            onCancel={() => setModal(null)}
            onSuccess={triggerRefresh}
          />
        </ProductModal>
      )}

      {updateModal && (
        <ProductModal title="Edit Product" onClose={() => setUpdateModal(null)}>
          <UpdateProductForm
            onCancel={() => setUpdateModal(null)}
            onSuccess={triggerRefresh}
            product={updateModal}
          />
        </ProductModal>
      )}

      <style>{`@keyframes modalIn { from { opacity: 0; transform: scale(0.97); } to { opacity: 1; transform: scale(1); } }`}</style>
    </>
  );
};

export default Products;
