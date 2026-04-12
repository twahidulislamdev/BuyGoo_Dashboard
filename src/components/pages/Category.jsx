import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

// Create Category Modal Layout
const Modal = ({ title, onClose, children }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100">
          <h2 className="text-lg font-semibold text-gray-900 tracking-tight">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-100 text-neutral-900 hover:bg-neutral-200 transition cursor-pointer text-md font-semibold border border-neutral-300"
          >
            ✕
          </button>
        </div>
        <div className="px-6 py-6">{children}</div>
      </div>
    </div>
  );
};

//================== Create Category Form Start Here =======================
const CategoryModalForm = ({ onCancel, onSuccess }) => {
  const [categoryName, setCategoryName] = useState("");
  const [categorySlug, setCategorySlug] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [status, setStatus] = useState("Active");

  //  Create Category Start Here
  const handleCreateCategory = async () => {
    try {
      await axios.post(
        "http://localhost:3000/user/v1/category/createcategory",
        {
          name: categoryName,
          slug: categorySlug,
          description: categoryDescription,
          status: status.toLowerCase(),
        },
      );
      toast.success("Category Created Successfully!");
      onSuccess(); // ← trigger refresh
      onCancel();
    } catch (error) {
      console.error(error);
      toast.error("Failed To Create Category");
    }
  };

  const inputClass =
    "w-full border border-neutral-400 bg-gray-50 rounded-lg px-4 py-2.5 text-sm text-neutral-800 placeholder-neutral-400 outline-none focus:border-neutral-500 focus:bg-white transition";

  return (
    <div className="flex flex-col gap-3.5">
      <input
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        className={inputClass}
        placeholder="Category Name"
      />
      <input
        value={categorySlug}
        onChange={(e) => setCategorySlug(e.target.value)}
        className={inputClass}
        placeholder="Slug"
      />
      <textarea
        value={categoryDescription}
        onChange={(e) => setCategoryDescription(e.target.value)}
        rows={3}
        className={`${inputClass} resize-none`}
        placeholder="Description"
      />

      {/* Status Radio Buttons Start Here */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Status
        </label>
        <div className="flex gap-3">
          <label
            className={`flex-1 flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors border-2 ${
              status === "Active"
                ? "border-emerald-200 bg-emerald-50"
                : "border-gray-200 bg-white"
            }`}
          >
            <input
              type="radio"
              name="status"
              value="Active"
              checked={status === "Active"}
              onChange={(e) => setStatus(e.target.value)}
              className="accent-emerald-600"
            />
            <span className="text-sm font-semibold text-emerald-700">
              Active
            </span>
          </label>
          <label
            className={`flex-1 flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors border-2 ${
              status === "Inactive"
                ? "border-rose-200 bg-rose-100"
                : "border-gray-200 bg-white"
            }`}
          >
            <input
              type="radio"
              name="status"
              value="Inactive"
              checked={status === "Inactive"}
              onChange={(e) => setStatus(e.target.value)}
              className="accent-rose-600"
            />
            <span className="text-sm font-semibold text-rose-600">
              Inactive
            </span>
          </label>
        </div>
      </div>
      {/* Status Radio Buttons End Here */}

      <div className="flex gap-3 pt-2">
        <button
          onClick={onCancel}
          className="flex-1 py-2.5 rounded-xl border border-neutral-400 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={handleCreateCategory}
          className="flex-1 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition cursor-pointer"
        >
          Save Category
        </button>
      </div>
    </div>
  );
};
//================== Create Category Form End Here ====================

// Update Category Modal Layout
const UpdateCategoryModal = ({ title, onClose, children }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100">
          <h2 className="text-lg font-semibold text-gray-900 tracking-tight">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-100 text-neutral-900 hover:bg-neutral-200 transition cursor-pointer text-md font-semibold border border-neutral-300"
          >
            ✕
          </button>
        </div>
        <div className="px-6 py-6">{children}</div>
      </div>
    </div>
  );
};

//================== Update Category Form Start Here ====================
const UpdateCategoryModalForm = ({ onCancel, onSuccess, category }) => {
  const [formData, setFormData] = useState({
    name: category?.name || "",
    slug: category?.slug || "",
    description: category?.description || "",
    status: (() => {
      const s = category?.status?.toString().toLowerCase();
      if (s === "active") return "Active";
      if (s === "inactive") return "Inactive";
      return "Active";
    })(),
  });

  // Handle form input changes
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  //  Update Category Start Here
  const handleUpdateCategory = async () => {
    try {
      await axios.put(
        `http://localhost:3000/user/v1/category/updatecategory/${category._id}`,
        {
          name: formData.name,
          slug: formData.slug,
          description: formData.description,
          status: formData.status.toLowerCase(),
        },
      );
      toast.success("Category Updated Successfully!");
      onSuccess(); // ← trigger refresh
      onCancel();
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed To Update Category");
    }
  };

  const inputClass =
    "w-full border border-neutral-400 bg-gray-50 rounded-lg px-4 py-2.5 text-sm text-neutral-800 placeholder-neutral-400 outline-none focus:border-neutral-500 focus:bg-white transition";

  return (
    <div className="flex flex-col gap-3.5">
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        className={inputClass}
        placeholder="Category Name"
      />
      <input
        name="slug"
        value={formData.slug}
        onChange={handleChange}
        className={inputClass}
        placeholder="Slug"
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        rows={3}
        className={`${inputClass} resize-none`}
        placeholder="Description"
      />

      {/* Status Radio Buttons Start Here */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Status
        </label>
        <div className="flex gap-3">
          <label
            className={`flex-1 flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors border-2 ${
              formData.status === "Active"
                ? "border-emerald-200 bg-emerald-50"
                : "border-gray-200 bg-white"
            }`}
          >
            <input
              type="radio"
              name="status"
              value="Active"
              checked={formData.status === "Active"}
              onChange={handleChange}
              className="accent-emerald-600"
            />
            <span className="text-sm font-semibold">Active</span>
          </label>
          <label
            className={`flex-1 flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors border-2 ${
              formData.status === "Inactive"
                ? "border-rose-200 bg-rose-100"
                : "border-gray-200 bg-white"
            }`}
          >
            <input
              type="radio"
              name="status"
              value="Inactive"
              checked={formData.status === "Inactive"}
              onChange={handleChange}
              className="accent-rose-600"
            />
            <span className="text-sm font-semibold ">Inactive</span>
          </label>
        </div>
      </div>
      {/* Status Radio Buttons End Here */}

      <div className="flex gap-3 pt-2">
        <button
          onClick={onCancel}
          className="flex-1 py-2.5 rounded-xl border border-neutral-400 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={handleUpdateCategory}
          className="flex-1 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition cursor-pointer"
        >
          Update Category
        </button>
      </div>
    </div>
  );
};
//=================== Update Category Form End Here ====================

// ────────────────────────────────────────────────
// Main Category Component
// ────────────────────────────────────────────────
const Category = () => {
  const [modal, setModal] = useState(null);
  const [updateModal, setUpdateModal] = useState(null);
  const [categories, setCategories] = useState([]);
  const [refresh, setRefresh] = useState(0); // ← refresh counter
  const triggerRefresh = () => setRefresh((prev) => prev + 1);

  // ================ Get All Categories Start Here ==============
  useEffect(() => {
    axios
      .get("http://localhost:3000/user/v1/category/getallcategory")
      .then((res) => setCategories(res.data.categories || []))
      .catch((err) => {
        console.error(err);
        toast.error("Failed To Get Categories");
      });
  }, [refresh]); // ← re-fetch whenever refresh changes
  // ================ Get All Categories End Here ==============

  // ================ Delete Category Start Here ==============
  const deleteCategory = async (id) => {
    try {
      await axios.delete(
        `http://localhost:3000/user/v1/category/deletecategory/${id}`,
      );
      toast.success("Category Deleted Successfully!");
      triggerRefresh(); // ← refresh after delete
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed To Delete Category");
    }
  };
  // ================ Delete Category End Here ==============

  // =========== Delete All Categories start Here ===========
  const deleteAllCategory = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/user/v1/category/deleteallcategory`,
      );
      toast.success("All Categories Deleted Successfully!");
      triggerRefresh(); // ← refresh after delete all
    } catch (error) {
      console.error("Delete All error:", error);
      toast.error("Failed To Delete All Categories");
    }
  };
  // ================ Delete All Categories End Here ==============
  return (
    <>
      <div className="min-h-screen bg-neutral-50">
        <div className="px-5 mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10  pb-2 mb-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                Dashboard
              </p>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                Categories
              </h1>
              <p className="text-sm text-gray-400 mt-1">
                Manage your product categories
              </p>
            </div>
            <button
              onClick={() => setModal("add")}
              className="flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold px-5 py-3.5 rounded-xl shadow-md transition cursor-pointer"
            >
              <span className="text-lg leading-none">+</span> Add Category
            </button>
          </div>

          {/* Toolbar */}
          <div className="flex justify-between items-center bg-white border border-gray-100 rounded-2xl px-4 py-3 mb-5  gap-3 shadow-sm">
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                placeholder="Search By Category Name..."
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
              onClick={deleteAllCategory}
              className="px-5 py-2.5 rounded-xl bg-rose-100 border border-rose-300 text-rose-600 text-sm font-semibold hover:bg-rose-200 transition cursor-pointer whitespace-nowrap"
            >
              Delete All
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto max-w-full bg-white rounded-2xl border border-gray-100 shadow-sm">
            <table className="w-full table-fixed">
              <colgroup>
                <col className="w-1/5" />
                <col className="w-1/5" />
                <col className="w-2/5" />
                <col className="w-1/5" />
                <col className="w-1/5" />
              </colgroup>
              <thead>
                <tr className="border-b  border-gray-100 bg-gray-50 ">
                  {["Category", "Slug", "Description", "Status", "Actions"].map(
                    (h) => (
                      <th
                        key={h}
                        className="text-left px-6 py-4 text-xs font-bold uppercase tracking-widest text-neutral-600"
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 ">
                {categories.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-gray-50 transition duration-150"
                  >
                    <td className="px-6 py-4 text-neutral-600 font-mono text-lg font-semibold">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 text-neutral-500 font-mono text-sm">
                      {item.slug}
                    </td>
                    <td className="px-6 py-4 text-neutral-500 font-mono truncate text-sm">
                      {item.description}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                          item.status?.toLowerCase() === "active"
                            ? "bg-green-50 text-green-600 border border-green-200"
                            : "bg-red-50 text-rose-600 border border-rose-200"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            item.status?.toLowerCase() === "active"
                              ? "bg-green-600"
                              : "bg-rose-600"
                          }`}
                        />
                        {item.status
                          ? item.status.charAt(0).toUpperCase() +
                            item.status.slice(1).toLowerCase()
                          : ""}
                      </span>
                    </td>
                    <td className="px-6 py-4 min-w-[160px]">
                      <div className="flex justify-between items-center gap-2">
                        <button
                          onClick={() => setUpdateModal(item)}
                          className="px-4 py-2 rounded-lg bg-amber-50 border border-amber-300 text-amber-600 text-xs font-semibold hover:bg-amber-100 transition cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteCategory(item._id)}
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

            {categories.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-neutral-300">
                <span className="text-4xl mb-3">📂</span>
                <p className="text-sm font-medium">No categories yet</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create Modal */}
      {modal === "add" && (
        <Modal title="Add Category" onClose={() => setModal(null)}>
          <CategoryModalForm
            onCancel={() => setModal(null)}
            onSuccess={triggerRefresh}
          />
        </Modal>
      )}

      {/* Update Modal */}
      {updateModal && (
        <UpdateCategoryModal
          title="Update Category"
          onClose={() => setUpdateModal(null)}
        >
          <UpdateCategoryModalForm
            onCancel={() => setUpdateModal(null)}
            onSuccess={triggerRefresh}
            category={updateModal}
          />
        </UpdateCategoryModal>
      )}
    </>
  );
};

export default Category;
