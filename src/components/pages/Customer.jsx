import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// ============================================================================
// HELPER FUNCTIONS PART START HERE
// ============================================================================

// PAGE SIZE FOR PAGINATION
const PAGE_SIZE = 10;

// AVATAR COLORS FOR DYNAMIC AVATAR BACKGROUNDS
const AVATAR_COLORS = [
  "bg-blue-100 text-blue-800",
  "bg-teal-100 text-teal-800",
  "bg-orange-100 text-orange-800",
  "bg-purple-100 text-purple-800",
  "bg-amber-100 text-amber-800",
  "bg-pink-100 text-pink-800",
];

// GET INITIALS FROM NAME FOR AVATAR
const getInitials = (name) => {
  if (!name || typeof name !== "string") return "?";
  const parts = name.trim().split(" ");
  return ((parts[0]?.[0] || "") + (parts[1]?.[0] || "")).toUpperCase();
};

// GET STATUS CLASS FOR BADGE COLORS SECTION
const getStatusClass = (status) => {
  const classes = {
    active: "bg-green-100 text-green-800",
    inactive: "bg-gray-100 text-gray-600",
    blocked: "bg-red-100 text-red-700",
    new: "bg-blue-100 text-blue-700",
  };
  return classes[status] || classes.active;
};
// ================================================================================
// HELPER FUNCTIONS PART END HERE
// ================================================================================

// ============================================
// UI MAKER COMPONENTS START HERE
// ============================================

// SINGLE STAT CARD COMPONENT
const StatCard = ({ label, value, change, isUp }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 flex flex-col gap-1">
      <span className="text-xs uppercase tracking-widest text-gray-400 font-medium">
        {label}
      </span>
      <span className="text-2xl font-semibold text-gray-900">{value}</span>
      <span
        className={`text-xs font-medium ${isUp ? "text-green-700" : "text-red-600"}`}
      >
        {change}
      </span>
    </div>
  );
};

// AVATAR COMPONENT
const Avatar = ({ name, index }) => {
  return (
    <div
      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${AVATAR_COLORS[index % AVATAR_COLORS.length]}`}
    >
      {getInitials(name)}
    </div>
  );
};

// ------------------ Edit Modal Component Start Here -----------------------
const EditModal = ({ customer, onClose, onSave }) => {
  const [form, setForm] = useState({
    id: customer.id,
    firstName: customer.name.split(" ")[0] || "",
    lastName: customer.name.split(" ").slice(1).join(" ") || "",
    email: customer.email,
    status: customer.status,
    orders: customer.orders,
    spent: customer.spent,
    joinedAt: customer.joinedAt,
  });

  const [saving, setSaving] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    axios
      .post("http://localhost:3000/api/v1/auth/edituser", {
        email: form.email,
        firstName: form.firstName,
        lastName: form.lastName,
        status: form.status,
        joinedAt: form.joinedAt,
      })
      .then(() => {
        toast.success("Customer updated");
        onSave({ ...form, name: `${form.firstName} ${form.lastName}`.trim() });
      })
      .catch((err) =>
        toast.error(err.response?.data?.message || "Could not update customer"),
      )
      .finally(() => setSaving(false));
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl border border-gray-200 p-6 w-full max-w-md shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <Avatar name={customer.name} index={0} />
            <div>
              <h2 className="text-base font-semibold text-gray-900">
                Edit customer
              </h2>
              <p className="text-xs text-gray-400">{customer.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 border border-gray-400 text-xl -mt-2 w-9 h-9  text-center rounded-full  hover:bg-gray-100 cursor-pointer"
          >
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                First Name
              </label>
              <input
                required
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                value={form.firstName}
                onChange={(e) =>
                  setForm({ ...form, firstName: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Last Name
              </label>
              <input
                required
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Email Address
            </label>
            <input
              required
              type="email"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Status
            </label>
            <select
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 bg-white"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="new">New</option>
              <option value="blocked">Blocked</option>
            </select>
          </div>
          <div className="bg-gray-50 rounded-lg px-4 py-3 grid grid-cols-3 gap-2 text-xs border border-gray-100">
            <div>
              <span className="text-gray-400">Orders</span>
              <span className="font-semibold text-gray-700 block">
                {form.orders}
              </span>
            </div>
            <div>
              <span className="text-gray-400">Total Spent</span>
              <span className="font-semibold text-gray-700 block">
                ${(form.spent || 0).toLocaleString()}
              </span>
            </div>
            <div>
              <span className="text-gray-400">Joined</span>
              <span className="font-semibold text-gray-700 block">
                {form.joinedAt
                  ? new Date(form.joinedAt).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>
          </div>
          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-sm border border-gray-400 rounded-lg text-gray-600 hover:bg-gray-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 px-4 py-2 text-sm bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-700 disabled:opacity-50 cursor-pointer"
            >
              {saving ? "Saving..." : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
// ------------------ Edit Modal Component End Here -------------------------

//------------------- Add Customer By Admin Modal Component------------------------------------
const AddModal = ({ onClose, onAdd }) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    status: "new",
    joinedAt: new Date(),
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    axios
      .post("http://localhost:3000/api/v1/auth/addnewuser", {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
        status: form.status,
        joinedAt: form.joinedAt,
      })
      .then((res) => {
        // FIX: Use server response if available
        toast.success("Customer added");
        onAdd({
          ...form,
          id: res.data?.user?.id || res.data?.user?._id || Date.now(),
        });
      })
      .catch((err) =>
        toast.error(err.response?.data?.message || "Could not add customer"),
      )
      .finally(() => setSaving(false));
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl border border-gray-200 p-6 w-full max-w-md shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-semibold text-gray-900">
            Add new customer
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 text-xl border border-gray-400 w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer"
          >
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                First name
              </label>
              <input
                required
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                placeholder="Twahidul"
                value={form.firstName}
                onChange={(e) =>
                  setForm({ ...form, firstName: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Last name
              </label>
              <input
                required
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                placeholder="Islam"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Email address
            </label>
            <input
              required
              type="email"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
              placeholder="example123@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Password
            </label>
            <input
              required
              type="password"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
              placeholder="Enter Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Status
            </label>
            <select
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 bg-white"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option value="new">New</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="blocked">Blocked</option>
            </select>
          </div>
          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-sm border border-gray-200 rounded-lg
               text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 px-4 py-2 text-sm bg-gray-900 text-white rounded-lg 
              font-medium hover:bg-gray-700 disabled:opacity-50"
            >
              {saving ? "Adding..." : "Add customer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ============================================================================
// UI MAKER COMPONENTS END HERE
// ============================================================================

// ============================================================================
// MAIN COMPONENT(PAGE) STARTS HERE
// ============================================================================

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState([]);
  const [editCustomer, setEditCustomer] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Get all customers on component mount
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/auth/getallusers")
      .then((res) => {
        const formatted = (res.data.users || []).map((user) => ({
          ...user,
          id: user.id || user._id,
          name:
            user.name ||
            `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
            "Unknown",
          orders: user.orders || 0,
          spent: user.spent || 0,
          joinedAt: user.joinedAt
            ? new Date(user.joinedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : "",
        }));
        setCustomers(formatted);
      })
      .catch(() => toast.error("Failed to load users"))
      .finally(() => setLoading(false));
  }, []);

  // Filter customers by search and status
  const getFilteredCustomers = () => {
    return customers.filter((c) => {
      const matchesSearch =
        !searchText ||
        c.name.toLowerCase().includes(searchText.toLowerCase()) ||
        c.email.toLowerCase().includes(searchText.toLowerCase());
      const matchesStatus = !statusFilter || c.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  };

  // Get customers for current page
  const getPageCustomers = () => {
    const filtered = getFilteredCustomers();
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  };

  // Check if all rows on page are selected
  const isAllSelected = () => {
    const pageData = getPageCustomers();
    return (
      pageData.length > 0 && pageData.every((c) => selectedIds.includes(c.id))
    );
  };

  // Toggle single row selection
  const toggleRow = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((i) => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // Toggle all rows on page
  const toggleAll = () => {
    const pageData = getPageCustomers();
    if (isAllSelected()) {
      setSelectedIds(
        selectedIds.filter((id) => !pageData.find((c) => c.id === id)),
      );
    } else {
      const newIds = pageData
        .map((c) => c.id)
        .filter((id) => !selectedIds.includes(id));
      setSelectedIds([...selectedIds, ...newIds]);
    }
  };

  // ================= Delete Single Customer==================
  const handleDelete = (id) => {
    const customer = customers.find((c) => c.id === id);
    if (!customer) return;
    axios
      .post("http://localhost:3000/api/v1/auth/deleteuser", {
        email: customer.email,
      })
      .then(() => {
        setCustomers((prev) => prev.filter((c) => c.id !== id));
        setSelectedIds((prev) => prev.filter((i) => i !== id));
        toast.success("Customer deleted");
      })
      .catch((err) =>
        toast.error(err.response?.data?.message || "Delete failed"),
      );
  };

  //=============== Delete All Selected Customers ================
  const handleDeleteSelected = () => {
    axios
      .post("http://localhost:3000/api/v1/auth/deleteallusers", {
        emails: customers
          .filter((c) => selectedIds.includes(c.id))
          .map((c) => c.email),
      })
      .then(() => {
        setCustomers((prev) => prev.filter((c) => !selectedIds.includes(c.id)));
        setSelectedIds([]);
        toast.success("Selected customers deleted");
      })
      .catch((err) =>
        toast.error(err.response?.data?.message || "Bulk Delete Failed"),
      );
  };

  // Save edited customer locally
  const handleSave = (updated) => {
    setCustomers((prev) =>
      prev.map((c) => (c.id === updated.id ? { ...c, ...updated } : c)),
    );
    setEditCustomer(null);
  };

  // Add new customer locally after API success
  const handleAddNewCustomer = (form) => {
    const newCustomer = {
      id: form.id || Date.now(),
      name: `${form.firstName} ${form.lastName}`.trim(),
      email: form.email,
      status: form.status,
      orders: 0,
      spent: 0,
      joinedAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      location: "",
    };
    setCustomers((prev) => [...prev, newCustomer]);
    setShowAddModal(false);
  };

  const filteredCount = getFilteredCustomers().length;
  const totalPages = Math.max(1, Math.ceil(filteredCount / PAGE_SIZE));

  // FIX: Dynamic Stat Calculations
  const activeCount = customers.filter((c) => c.status === "active").length;
  const avgSpent = customers.length
    ? (
        customers.reduce((sum, c) => sum + (c.spent || 0), 0) / customers.length
      ).toFixed(2)
    : "0.00";

  return (
    <div className="min-h-screen bg-gray-50 px-5  font-sans text-gray-900">
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Customers</h1>
          <p className="text-sm text-gray-400 mt-0.5">
            Manage and monitor your customer base
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 cursor-pointer"
        >
          <span className="text-lg">+</span> Add Customer
        </button>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-400">Loading customers...</div>
        </div>
      ) : (
        <>
          {/* Stats */}
          <div className="grid grid-cols-4 gap-3 mb-6">
            <StatCard
              label="Total customers"
              value={customers.length.toLocaleString()}
              change="↑ 8.2% this month"
              isUp={true}
            />
            <StatCard
              label="Active"
              value={activeCount.toLocaleString()}
              change="↑ 3.1% vs last month"
              isUp={true}
            />
            <StatCard
              label="Avg. spent"
              value={`$${avgSpent}`}
              change="↓ 1.4% vs last month"
              isUp={false}
            />
            <StatCard
              label="New this month"
              value={customers.filter((c) => c.status === "new").length}
              change="↑ 12.6% vs last month"
              isUp={true}
            />
          </div>

          {/* Search & Filter */}
          <div className="flex items-center gap-3 mb-3">
            <div className="relative flex-1">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"
                fill="none"
                viewBox="0 0 16 16"
              >
                <circle
                  cx="7"
                  cy="7"
                  r="5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M11 11l3 3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <input
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-gray-400"
                placeholder="Search by name or email..."
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
            <select
              className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">All statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="blocked">Blocked</option>
              <option value="new">New</option>
            </select>
          </div>

          {/* Bulk Actions */}
          {selectedIds.length > 0 && (
            <div className="flex items-center justify-between px-4 py-2 mb-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
              <span>
                {selectedIds.length} customer{selectedIds.length > 1 ? "s" : ""}{" "}
                selected
              </span>
              <button
                onClick={handleDeleteSelected}
                className="px-3 py-2.5 border border-red-400 text-red-600 rounded-md text-xs hover:bg-red-50 font-medium cursor-pointer"
              >
                Delete selected
              </button>
            </div>
          )}

          {/*Customer Data Table */}
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <table className="w-full text-sm table-fixed">
              <colgroup>
                <col style={{ width: "4%" }} />
                <col style={{ width: "24%" }} />
                <col style={{ width: "12%" }} />
                <col style={{ width: "15%" }} />
                <col style={{ width: "15%" }} />
                <col style={{ width: "14%" }} />
                <col style={{ width: "16%" }} />
              </colgroup>
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-4 py-3 text-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 cursor-pointer accent-blue-600"
                      checked={isAllSelected()}
                      onChange={toggleAll}
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-xs uppercase tracking-wider text-gray-500 font-semibold">
                    Customer
                  </th>
                  <th className="px-4 py-3 text-center text-xs uppercase tracking-wider text-gray-500 font-semibold">
                    Orders
                  </th>
                  <th className="px-4 py-3 text-center text-xs uppercase tracking-wider text-gray-500 font-semibold">
                    Total spent
                  </th>
                  <th className="px-4 py-3 text-center text-xs uppercase tracking-wider text-gray-500 font-semibold">
                    Joined
                  </th>
                  <th className="px-4 py-3 text-center text-xs uppercase tracking-wider text-gray-500 font-semibold">
                    Status
                  </th>
                  <th className="px-4 py-3 text-center text-xs uppercase tracking-wider text-gray-500 font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {getPageCustomers().length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-12 text-center text-gray-400"
                    >
                      No customers found
                    </td>
                  </tr>
                ) : (
                  getPageCustomers().map((customer, idx) => (
                    <tr
                      key={customer.id}
                      className="border-b border-gray-50 hover:bg-gray-50"
                    >
                      <td className="px-4 py-4 text-center">
                        <input
                          type="checkbox"
                          className="w-4 h-4 cursor-pointer accent-blue-600"
                          checked={selectedIds.includes(customer.id)}
                          onChange={() => toggleRow(customer.id)}
                        />
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar name={customer.name} index={idx} />
                          <div className="min-w-0">
                            <div className="font-semibold text-gray-900 text-sm truncate">
                              {customer.name}
                            </div>
                            <div className="text-xs text-gray-400 truncate">
                              {customer.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center text-sm text-gray-700">
                        {customer.orders}
                      </td>
                      <td className="px-4 py-4 text-center text-sm font-semibold text-gray-900">
                        ${(customer.spent || 0).toLocaleString()}
                      </td>
                      <td className="px-4 py-4 text-center text-sm text-gray-500">
                        {customer.joinedAt}
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(customer.status)}`}
                        >
                          {customer.status?.charAt(0).toUpperCase() +
                            customer.status?.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-center gap-2 cursor-pointer">
                          <button
                            onClick={() => setEditCustomer(customer)}
                            className="px-3 py-1.5 text-xs font-medium rounded-lg border border-yellow-300 bg-yellow-50 text-yellow-700 hover:bg-yellow-100 cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(customer.id)}
                            className="px-3 py-1.5 text-xs font-medium rounded-lg border border-red-200 bg-red-50 text-red-500 hover:bg-red-100 
                            cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Edit Modal */}
          {editCustomer && (
            <EditModal
              customer={editCustomer}
              onClose={() => setEditCustomer(null)}
              onSave={handleSave}
            />
          )}

          {/* Add Modal */}
          {showAddModal && (
            <AddModal
              onClose={() => setShowAddModal(false)}
              onAdd={handleAddNewCustomer}
            />
          )}
        </>
      )}
    </div>
  );
};
export default CustomerList;
