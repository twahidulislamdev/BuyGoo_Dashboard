import { useState, useMemo } from "react";

const AVATAR_COLORS = [
  "bg-blue-100 text-blue-800",
  "bg-teal-100 text-teal-800",
  "bg-orange-100 text-orange-800",
  "bg-purple-100 text-purple-800",
  "bg-amber-100 text-amber-800",
  "bg-pink-100 text-pink-800",
];

const INITIAL_CUSTOMERS = [
  {
    id: 1,
    name: "Sarah Mitchell",
    email: "s.mitchell@mail.com",
    status: "active",
    orders: 47,
    spent: 3820,
    joined: "Jan 12, 2023",
    location: "New York, US",
  },
  {
    id: 2,
    name: "James Okafor",
    email: "j.okafor@webmail.io",
    status: "active",
    orders: 12,
    spent: 640,
    joined: "Mar 3, 2023",
    location: "Lagos, NG",
  },
  {
    id: 3,
    name: "Yuki Tanaka",
    email: "y.tanaka@nexo.jp",
    status: "inactive",
    orders: 29,
    spent: 2100,
    joined: "Aug 19, 2022",
    location: "Tokyo, JP",
  },
  {
    id: 4,
    name: "Priya Sharma",
    email: "priya.s@inbox.in",
    status: "active",
    orders: 88,
    spent: 9540,
    joined: "Feb 7, 2022",
    location: "Mumbai, IN",
  },
  {
    id: 5,
    name: "Carlos Mendez",
    email: "c.mendez@correo.mx",
    status: "new",
    orders: 2,
    spent: 89,
    joined: "Apr 18, 2025",
    location: "Mexico City, MX",
  },
  {
    id: 6,
    name: "Emma Johansson",
    email: "emma.j@post.se",
    status: "active",
    orders: 61,
    spent: 5210,
    joined: "Oct 30, 2021",
    location: "Stockholm, SE",
  },
  {
    id: 7,
    name: "Liam O'Brien",
    email: "liam.ob@fastnet.ie",
    status: "blocked",
    orders: 3,
    spent: 210,
    joined: "Jun 14, 2023",
    location: "Dublin, IE",
  },
  {
    id: 8,
    name: "Fatima Al-Hassan",
    email: "f.alhassan@net.sa",
    status: "active",
    orders: 54,
    spent: 7320,
    joined: "Sep 5, 2022",
    location: "Riyadh, SA",
  },
  {
    id: 9,
    name: "Tom Bergmann",
    email: "t.bergmann@gmx.de",
    status: "inactive",
    orders: 8,
    spent: 415,
    joined: "Nov 22, 2023",
    location: "Berlin, DE",
  },
  {
    id: 10,
    name: "Ana Paula Costa",
    email: "anapaula@correio.br",
    status: "new",
    orders: 1,
    spent: 45,
    joined: "Apr 20, 2025",
    location: "São Paulo, BR",
  },
  {
    id: 11,
    name: "Kevin Zhao",
    email: "k.zhao@techmail.cn",
    status: "active",
    orders: 33,
    spent: 2980,
    joined: "May 11, 2022",
    location: "Shanghai, CN",
  },
  {
    id: 12,
    name: "Ingrid Larsson",
    email: "i.larsson@nordnet.no",
    status: "active",
    orders: 15,
    spent: 870,
    joined: "Jul 2, 2023",
    location: "Oslo, NO",
  },
  {
    id: 13,
    name: "Musa Diallo",
    email: "musa.d@africamail.sn",
    status: "inactive",
    orders: 5,
    spent: 220,
    joined: "Dec 1, 2023",
    location: "Dakar, SN",
  },
  {
    id: 14,
    name: "Sophie Blanc",
    email: "s.blanc@hexamail.fr",
    status: "active",
    orders: 42,
    spent: 3450,
    joined: "Mar 28, 2022",
    location: "Paris, FR",
  },
  {
    id: 15,
    name: "Ravi Nair",
    email: "ravi.n@mailbox.in",
    status: "blocked",
    orders: 1,
    spent: 60,
    joined: "Feb 14, 2024",
    location: "Chennai, IN",
  },
  {
    id: 16,
    name: "Olivia Turner",
    email: "o.turner@post.co.uk",
    status: "active",
    orders: 71,
    spent: 11200,
    joined: "Jan 3, 2022",
    location: "London, UK",
  },
  {
    id: 17,
    name: "Aleksei Petrov",
    email: "a.petrov@rmail.ru",
    status: "new",
    orders: 1,
    spent: 72,
    joined: "Apr 15, 2025",
    location: "Moscow, RU",
  },
  {
    id: 18,
    name: "Nour El-Din",
    email: "n.eldin@arabnet.eg",
    status: "active",
    orders: 19,
    spent: 1100,
    joined: "Aug 8, 2023",
    location: "Cairo, EG",
  },
  {
    id: 19,
    name: "Yuna Park",
    email: "yuna.p@koreaweb.kr",
    status: "active",
    orders: 38,
    spent: 3120,
    joined: "Apr 17, 2022",
    location: "Seoul, KR",
  },
  {
    id: 20,
    name: "Miguel Torres",
    email: "m.torres@mail.es",
    status: "inactive",
    orders: 7,
    spent: 380,
    joined: "Oct 5, 2023",
    location: "Madrid, ES",
  },
  {
    id: 21,
    name: "Aisha Conteh",
    email: "a.conteh@netpost.sl",
    status: "new",
    orders: 1,
    spent: 38,
    joined: "Apr 21, 2025",
    location: "Freetown, SL",
  },
  {
    id: 22,
    name: "David Hoffmann",
    email: "d.hoffmann@mailnet.at",
    status: "active",
    orders: 63,
    spent: 8750,
    joined: "Jun 20, 2021",
    location: "Vienna, AT",
  },
  {
    id: 23,
    name: "Lin Wei",
    email: "lin.w@chinapost.cn",
    status: "active",
    orders: 55,
    spent: 4630,
    joined: "Feb 2, 2022",
    location: "Beijing, CN",
  },
  {
    id: 24,
    name: "Isabella Rossi",
    email: "i.rossi@italymail.it",
    status: "active",
    orders: 22,
    spent: 1340,
    joined: "Nov 11, 2022",
    location: "Rome, IT",
  },
];

const PAGE_SIZE = 10;

function initials(name) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

const STATUS_STYLES = {
  active: "bg-green-100 text-green-800",
  inactive: "bg-gray-100 text-gray-600",
  blocked: "bg-red-100 text-red-700",
  new: "bg-blue-100 text-blue-700",
};

function StatCard({ label, value, change, up }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 flex flex-col gap-1">
      <span className="text-xs uppercase tracking-widest text-gray-400 font-medium">
        {label}
      </span>
      <span className="text-2xl font-semibold text-gray-900">{value}</span>
      <span
        className={`text-xs font-medium ${up ? "text-green-700" : "text-red-600"}`}
      >
        {change}
      </span>
    </div>
  );
}

function Avatar({ name, index }) {
  return (
    <div
      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${AVATAR_COLORS[index % AVATAR_COLORS.length]}`}
    >
      {initials(name)}
    </div>
  );
}

// ── Edit Modal ──────────────────────────────────────────────────────────────
function EditModal({ customer, onClose, onSave }) {
  const [form, setForm] = useState({ ...customer });

  function handleSubmit(e) {
    e.preventDefault();
    onSave(form);
  }

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
            <Avatar name={customer.name} index={customer.id - 1} />
            <div>
              <h2 className="text-base font-semibold text-gray-900">
                Edit customer
              </h2>
              <p className="text-xs text-gray-400">{customer.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 text-xl leading-none w-7 h-7 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors"
          >
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Full name
            </label>
            <input
              required
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 text-gray-800"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Email address
            </label>
            <input
              required
              type="email"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 text-gray-800"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Status
              </label>
              <select
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 bg-white text-gray-800"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="new">New</option>
                <option value="blocked">Blocked</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Location
              </label>
              <input
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 text-gray-800"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg px-4 py-3 grid grid-cols-3 gap-2 text-xs border border-gray-100">
            <div className="flex flex-col gap-0.5">
              <span className="text-gray-400">Orders</span>
              <span className="font-semibold text-gray-700">{form.orders}</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-gray-400">Total spent</span>
              <span className="font-semibold text-gray-700">
                ${form.spent.toLocaleString()}
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-gray-400">Joined</span>
              <span className="font-semibold text-gray-700">{form.joined}</span>
            </div>
          </div>
          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-sm border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 text-sm bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Add Modal ───────────────────────────────────────────────────────────────
function AddModal({ onClose, onAdd }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    status: "active",
    location: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    onAdd(form);
  }

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
            className="text-gray-400 hover:text-gray-700 text-xl leading-none w-7 h-7 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors"
          >
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Full name
            </label>
            <input
              required
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 text-gray-800"
              placeholder="Sarah Mitchell"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Email address
            </label>
            <input
              required
              type="email"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 text-gray-800"
              placeholder="sarah@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Status
              </label>
              <select
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 bg-white text-gray-800"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="new">New</option>
                <option value="blocked">Blocked</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Location
              </label>
              <input
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 text-gray-800"
                placeholder="New York, US"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />
            </div>
          </div>
          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-sm border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 text-sm bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
            >
              Add customer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Main Page ───────────────────────────────────────────────────────────────
export default function CustomerList() {
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState(1);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(new Set());
  const [editCustomer, setEditCustomer] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const filtered = useMemo(() => {
    let list = customers.filter((c) => {
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q);
      const matchesStatus = !statusFilter || c.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
    if (sortKey) {
      list = [...list].sort((a, b) => {
        let va = a[sortKey],
          vb = b[sortKey];
        if (typeof va === "string") {
          va = va.toLowerCase();
          vb = vb.toLowerCase();
        }
        return va < vb ? -sortDir : va > vb ? sortDir : 0;
      });
    }
    return list;
  }, [customers, search, statusFilter, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageRows = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  function handleSort(key) {
    if (sortKey === key) setSortDir((d) => d * -1);
    else {
      setSortKey(key);
      setSortDir(1);
    }
  }

  function sortIcon(key) {
    if (sortKey !== key) return <span className="ml-1 text-gray-300">↕</span>;
    return (
      <span className="ml-1 text-blue-500">{sortDir === 1 ? "↑" : "↓"}</span>
    );
  }

  function toggleAll(checked) {
    const ids = pageRows.map((c) => c.id);
    setSelected((prev) => {
      const next = new Set(prev);
      ids.forEach((id) => (checked ? next.add(id) : next.delete(id)));
      return next;
    });
  }

  function toggleRow(id, checked) {
    setSelected((prev) => {
      const next = new Set(prev);
      checked ? next.add(id) : next.delete(id);
      return next;
    });
  }

  const allPageSelected =
    pageRows.length > 0 && pageRows.every((c) => selected.has(c.id));

  function deleteCustomer(id) {
    setCustomers((prev) => prev.filter((c) => c.id !== id));
    setSelected((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }

  function deleteSelected() {
    setCustomers((prev) => prev.filter((c) => !selected.has(c.id)));
    setSelected(new Set());
  }

  function handleSaveEdit(updated) {
    setCustomers((prev) =>
      prev.map((c) => (c.id === updated.id ? { ...c, ...updated } : c)),
    );
    setEditCustomer(null);
  }

  function handleAdd(form) {
    const newId =
      customers.length > 0 ? Math.max(...customers.map((c) => c.id)) + 1 : 1;
    const today = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    setCustomers((prev) => [
      { id: newId, orders: 0, spent: 0, joined: today, ...form },
      ...prev,
    ]);
    setShowAddModal(false);
    setPage(1);
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans text-gray-900">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Customers</h1>
          <p className="text-sm text-gray-400 mt-0.5">
            Manage and monitor your customer base
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors"
        >
          <span className="text-lg leading-none">+</span> Add customer
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        <StatCard
          label="Total customers"
          value={customers.length.toLocaleString()}
          change="↑ 8.2% this month"
          up
        />
        <StatCard
          label="Active (30d)"
          value="4,203"
          change="↑ 3.1% vs last month"
          up
        />
        <StatCard
          label="Avg. order value"
          value="$84.50"
          change="↓ 1.4% vs last month"
          up={false}
        />
        <StatCard
          label="New this month"
          value="631"
          change="↑ 12.6% vs last month"
          up
        />
      </div>

      {/* Toolbar */}
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
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-gray-400 text-gray-800 placeholder-gray-400"
            placeholder="Search by name, email or location..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <select
          className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-700 focus:outline-none focus:border-gray-400 cursor-pointer"
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="blocked">Blocked</option>
          <option value="new">New</option>
        </select>
      </div>

      {/* Bulk selection bar */}
      {selected.size > 0 && (
        <div className="flex items-center justify-between px-4 py-2 mb-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
          <span>
            {selected.size} customer{selected.size > 1 ? "s" : ""} selected
          </span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-blue-400 rounded-md text-xs hover:bg-blue-100 transition-colors">
              Export
            </button>
            <button className="px-3 py-1 border border-blue-400 rounded-md text-xs hover:bg-blue-100 transition-colors">
              Send email
            </button>
            <button
              onClick={deleteSelected}
              className="px-3 py-1 border border-red-400 text-red-600 rounded-md text-xs hover:bg-red-50 transition-colors font-medium"
            >
              Delete selected
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        {/*
          FIX: table-fixed + explicit column widths prevent the Customer column
          from expanding freely and pushing Status far to the right.
        */}
        <table className="w-full text-sm table-fixed">
          <colgroup>
            <col className="w-10" />
            <col className="w-56" />
            <col className="w-28" />
            <col className="w-24" />
            <col className="w-32" />
            <col className="w-32" />
            <col className="w-36" />
          </colgroup>
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-4 py-3 text-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 cursor-pointer accent-blue-600"
                  checked={allPageSelected}
                  onChange={(e) => toggleAll(e.target.checked)}
                />
              </th>
              <th
                className="px-4 py-3 text-left text-sm uppercase tracking-wider text-gray-500 font-semibold cursor-pointer hover:text-gray-700"
                onClick={() => handleSort("name")}
              >
                Customer {sortIcon("name")}
              </th>
              <th className="px-4 py-3 text-left text-sm uppercase tracking-wider text-gray-500 font-semibold">
                Status
              </th>
              <th
                className="px-4 py-3 text-center text-sm uppercase tracking-wider text-gray-500 font-semibold cursor-pointer hover:text-gray-700"
                onClick={() => handleSort("orders")}
              >
                Orders {sortIcon("orders")}
              </th>
              <th
                className="px-4 py-3 text-right text-sm uppercase tracking-wider text-gray-500 font-semibold cursor-pointer hover:text-gray-700"
                onClick={() => handleSort("spent")}
              >
                Total spent {sortIcon("spent")}
              </th>
              <th className="px-4 py-3 text-left text-sm uppercase tracking-wider text-gray-500 font-semibold">
                Joined
              </th>
              <th className="px-4 py-3 text-center text-sm uppercase tracking-wider text-gray-500 font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {pageRows.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-12 text-center text-gray-400 text-base"
                >
                  No customers found
                </td>
              </tr>
            ) : (
              pageRows.map((c) => (
                <tr
                  key={c.id}
                  className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-4 text-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 cursor-pointer accent-blue-600"
                      checked={selected.has(c.id)}
                      onChange={(e) => toggleRow(c.id, e.target.checked)}
                    />
                  </td>
                  <td className="px-4 py-4 overflow-hidden">
                    <div className="flex items-center gap-3">
                      <Avatar name={c.name} index={c.id - 1} />
                      <div className="min-w-0">
                        <div className="font-semibold text-gray-900 text-sm truncate">
                          {c.name}
                        </div>
                        <div className="text-sm text-gray-400 truncate">
                          {c.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${STATUS_STYLES[c.status]}`}
                    >
                      {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center text-sm text-gray-700 tabular-nums">
                    {c.orders}
                  </td>
                  <td className="px-4 py-4 text-right text-sm font-semibold text-gray-900 tabular-nums">
                    ${c.spent.toLocaleString()}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    {c.joined}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => setEditCustomer(c)}
                        className="px-4 py-1.5 text-sm font-medium rounded-lg border border-yellow-300 bg-yellow-50 text-yellow-700 hover:bg-yellow-100 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteCustomer(c.id)}
                        className="px-4 py-1.5 text-sm font-medium rounded-lg border border-red-200 bg-red-50 text-red-400 hover:bg-red-100 transition-colors"
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

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
          <span className="text-xs text-gray-400">
            {filtered.length > 0
              ? `Showing ${(safePage - 1) * PAGE_SIZE + 1}–${Math.min(safePage * PAGE_SIZE, filtered.length)} of ${filtered.length} customers`
              : "No customers found"}
          </span>
          <div className="flex gap-1">
            <button
              className="w-7 h-7 flex items-center justify-center rounded-md border border-gray-200 text-gray-400 text-xs hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={safePage === 1}
            >
              ‹
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(
                (p) =>
                  p === 1 || p === totalPages || Math.abs(p - safePage) <= 1,
              )
              .map((p, index, array) => {
                const prev = array[index - 1];
                const showEllipsis = prev && p - prev > 1;
                return (
                  <div key={p} className="flex gap-1">
                    {showEllipsis && (
                      <span className="w-7 h-7 flex items-center justify-center text-gray-400 text-xs">
                        …
                      </span>
                    )}
                    <button
                      onClick={() => setPage(p)}
                      className={`w-7 h-7 flex items-center justify-center rounded-md border text-xs transition-colors ${
                        p === safePage
                          ? "bg-gray-900 text-white border-gray-900"
                          : "border-gray-200 text-gray-500 hover:bg-gray-100"
                      }`}
                    >
                      {p}
                    </button>
                  </div>
                );
              })}
            <button
              className="w-7 h-7 flex items-center justify-center rounded-md border border-gray-200 text-gray-400 text-xs hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage === totalPages}
            >
              ›
            </button>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editCustomer && (
        <EditModal
          customer={editCustomer}
          onClose={() => setEditCustomer(null)}
          onSave={handleSaveEdit}
        />
      )}

      {/* Add Modal */}
      {showAddModal && (
        <AddModal onClose={() => setShowAddModal(false)} onAdd={handleAdd} />
      )}
    </div>
  );
}
