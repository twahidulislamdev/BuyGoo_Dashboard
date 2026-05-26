import { useMemo, useState } from "react";
import {
  Search,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Plus,
  Edit3,
  X,
  Save,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Trash2,
} from "lucide-react";

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */

const AVATAR_PALETTES = [
  "from-violet-500 to-indigo-500",
  "from-emerald-500 to-teal-500",
  "from-amber-400 to-orange-500",
  "from-rose-500 to-pink-500",
  "from-sky-500 to-blue-500",
];

const avatarGradient = (name) =>
  AVATAR_PALETTES[
    name.split("").reduce((a, c) => a + c.charCodeAt(0), 0) %
      AVATAR_PALETTES.length
  ];

const STATUS = {
  delivered: {
    label: "Delivered",
    dot: "bg-emerald-400",
    pill: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
    icon: CheckCircle,
  },
  processing: {
    label: "Processing",
    dot: "bg-amber-400",
    pill: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
    icon: Clock,
  },
  shipped: {
    label: "Shipped",
    dot: "bg-indigo-400",
    pill: "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200",
    icon: Package,
  },
  cancelled: {
    label: "Cancelled",
    dot: "bg-rose-400",
    pill: "bg-rose-50 text-rose-700 ring-1 ring-rose-200",
    icon: XCircle,
  },
};

/* ─────────────────────────────────────────────
   SEED DATA
───────────────────────────────────────────── */

const SEED = [
  {
    id: "#ORD-2847",
    customer: "Sarah Mitchell",
    product: "Premium Bundle Pack",
    quantity: 3,
    total: 247.5,
    status: "delivered",
    date: "2026-05-24",
    time: "14:32",
  },
  {
    id: "#ORD-2846",
    customer: "James Rodriguez",
    product: "Wireless Headphones",
    quantity: 1,
    total: 89.99,
    status: "processing",
    date: "2026-05-24",
    time: "12:15",
  },
  {
    id: "#ORD-2845",
    customer: "Emily Chen",
    product: "Office Supplies Kit",
    quantity: 5,
    total: 532,
    status: "shipped",
    date: "2026-05-23",
    time: "16:45",
  },
  {
    id: "#ORD-2844",
    customer: "Michael Brown",
    product: "Fitness Equipment",
    quantity: 2,
    total: 156.75,
    status: "delivered",
    date: "2026-05-23",
    time: "09:20",
  },
];

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */

export default function Orders() {
  const emptyForm = {
    customer: "",
    product: "",
    quantity: 1,
    total: "",
    status: "processing",
  };

  const [orders, setOrders] = useState(SEED);

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const [showCreate, setShowCreate] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);

  const [selected, setSelected] = useState(null);

  const [form, setForm] = useState(emptyForm);

  /* RESET FORM */
  const resetForm = () => {
    setForm(emptyForm);
  };

  /* STATS */
  const stats = useMemo(() => {
    const revenue = orders.reduce((acc, order) => acc + Number(order.total), 0);

    return [
      {
        label: "Total Orders",
        value: orders.length,
        change: "+12.5%",
        up: true,
        icon: ShoppingBag,
        iconBg: "bg-violet-100",
        iconColor: "text-violet-600",
      },
      {
        label: "Revenue",
        value: `$${revenue.toFixed(2)}`,
        change: "+8.2%",
        up: true,
        icon: DollarSign,
        iconBg: "bg-emerald-100",
        iconColor: "text-emerald-600",
      },
      {
        label: "Delivered",
        value: orders.filter((o) => o.status === "delivered").length,
        change: "+3.1%",
        up: true,
        icon: TrendingUp,
        iconBg: "bg-amber-100",
        iconColor: "text-amber-600",
      },
      {
        label: "Pending",
        value: orders.filter(
          (o) => o.status === "processing" || o.status === "shipped",
        ).length,
        change: "-5.4%",
        up: false,
        icon: Clock,
        iconBg: "bg-rose-100",
        iconColor: "text-rose-600",
      },
    ];
  }, [orders]);

  /* FILTERED ORDERS */
  const rows = useMemo(() => {
    return orders.filter((o) => {
      const matchFilter = filter === "all" || o.status === filter;

      const q = search.toLowerCase();

      const matchSearch =
        o.customer.toLowerCase().includes(q) ||
        o.id.toLowerCase().includes(q) ||
        o.product.toLowerCase().includes(q);

      return matchFilter && matchSearch;
    });
  }, [orders, filter, search]);

  const FILTERS = ["all", "processing", "shipped", "delivered", "cancelled"];

  const counts = FILTERS.reduce(
    (acc, f) => ({
      ...acc,
      [f]:
        f === "all"
          ? orders.length
          : orders.filter((o) => o.status === f).length,
    }),
    {},
  );

  /* VALIDATION */
  const validateForm = () => {
    if (
      !form.customer.trim() ||
      !form.product.trim() ||
      !form.total ||
      Number(form.quantity) < 1
    ) {
      alert("Please fill all fields correctly");
      return false;
    }

    return true;
  };

  /* CREATE ORDER */
  const handleCreate = () => {
    if (!validateForm()) return;

    const newOrder = {
      id: `#ORD-${Date.now().toString().slice(-6)}`,
      customer: form.customer,
      product: form.product,
      quantity: Number(form.quantity),
      total: Number(form.total),
      status: form.status,
      date: new Date().toISOString().split("T")[0],
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setOrders((prev) => [newOrder, ...prev]);

    resetForm();
    setShowCreate(false);
  };

  /* OPEN EDIT */
  const openEdit = (order) => {
    setSelected(order);

    setForm({
      customer: order.customer,
      product: order.product,
      quantity: order.quantity,
      total: order.total,
      status: order.status,
    });

    setShowUpdate(true);
  };

  /* UPDATE ORDER */
  const handleUpdate = () => {
    if (!validateForm()) return;

    setOrders((prev) =>
      prev.map((o) =>
        o.id === selected.id
          ? {
              ...o,
              customer: form.customer,
              product: form.product,
              quantity: Number(form.quantity),
              total: Number(form.total),
              status: form.status,
            }
          : o,
      ),
    );

    resetForm();
    setSelected(null);
    setShowUpdate(false);
  };

  /* DELETE ORDER */
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?",
    );

    if (!confirmDelete) return;

    setOrders((prev) => prev.filter((o) => o.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 px-3 -mt-5">
      {/* FONT */}

      <div className="space-y-5">
        {/* HEADER */}
        <div className="flex flex-row justify-between items-center gap-3">
          <div>
            <span className="text-xs font-bold tracking-widest text-violet-500 uppercase">
              Operations
            </span>

            <h1 className="text-4xl font-extrabold text-slate-900 ">
              Orders
            </h1>
          </div>

          <button
            type="button"
            onClick={() => setShowCreate(true)}
            className="flex items-center gap-2 h-12 px-5 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-700 transition-colors shadow-lg shadow-slate-900/20"
          >
            <Plus size={15} />
            New Order
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {stats.map((s, i) => {
            const Icon = s.icon;

            return (
              <div
                key={i}
                className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-11 h-11 rounded-xl ${s.iconBg} flex items-center justify-center`}
                  >
                    <Icon size={20} className={s.iconColor} />
                  </div>

                  <span
                    className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-lg ${
                      s.up
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-rose-50 text-rose-500"
                    }`}
                  >
                    {s.up ? (
                      <ArrowUpRight size={11} />
                    ) : (
                      <ArrowDownRight size={11} />
                    )}

                    {s.change}
                  </span>
                </div>

                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {s.label}
                </p>

                <p className="text-3xl font-extrabold text-slate-900 mt-1">
                  {s.value}
                </p>
              </div>
            );
          })}
        </div>

        {/* FILTER BAR */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
            {/* FILTERS */}
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    filter === f
                      ? "bg-slate-900 text-white shadow-md"
                      : "bg-slate-50 text-slate-500 border border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}

                  <span
                    className={`text-xs font-bold px-1.5 py-0.5 rounded-md ${
                      filter === f
                        ? "bg-white/20 text-white"
                        : "bg-slate-200 text-slate-500"
                    }`}
                  >
                    {counts[f]}
                  </span>
                </button>
              ))}
            </div>

            {/* SEARCH */}
            <div className="flex gap-2">
              <div className="relative">
                <Search
                  size={14}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  placeholder="Search orders..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-10 pl-10 pr-4 w-72 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400"
                />
              </div>

              <button
                type="button"
                className="flex items-center gap-2 h-10 px-4 rounded-xl border border-slate-200 bg-white text-slate-500 text-sm font-semibold hover:bg-slate-50"
              >
                <Filter size={14} />
                Filter
              </button>
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70">
                  {[
                    "Order ID",
                    "Customer",
                    "Product",
                    "Date & Time",
                    "Qty",
                    "Total",
                    "Status",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left px-5 py-3.5 text-xs font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {rows.length === 0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="text-center py-16 text-slate-400 text-sm"
                    >
                      No orders found.
                    </td>
                  </tr>
                ) : (
                  rows.map((order, idx) => {
                    const initials = order.customer
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2);

                    const cfg = STATUS[order.status];

                    return (
                      <tr
                        key={order.id}
                        className={`hover:bg-slate-50/60 transition-colors ${
                          idx < rows.length - 1
                            ? "border-b border-slate-50"
                            : ""
                        }`}
                      >
                        {/* ID */}
                        <td className="px-5 py-4">
                          <span className="mono text-[13px] font-semibold text-slate-700">
                            {order.id}
                          </span>
                        </td>

                        {/* CUSTOMER */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-9 h-9 rounded-xl bg-gradient-to-br ${avatarGradient(
                                order.customer,
                              )} flex items-center justify-center text-white text-xs font-black`}
                            >
                              {initials}
                            </div>

                            <span className="text-sm font-semibold text-slate-800">
                              {order.customer}
                            </span>
                          </div>
                        </td>

                        {/* PRODUCT */}
                        <td className="px-5 py-4 text-sm text-slate-600">
                          {order.product}
                        </td>

                        {/* DATE */}
                        <td className="px-5 py-4">
                          <p className="text-sm font-semibold text-slate-700">
                            {order.date}
                          </p>

                          <p className="text-xs text-slate-400 mt-0.5">
                            {order.time}
                          </p>
                        </td>

                        {/* QUANTITY */}
                        <td className="px-5 py-4">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 text-slate-700 text-sm font-bold">
                            {order.quantity}
                          </span>
                        </td>

                        {/* TOTAL */}
                        <td className="px-5 py-4">
                          <span className="text-base font-extrabold text-slate-900">
                            ${Number(order.total).toFixed(2)}
                          </span>
                        </td>

                        {/* STATUS */}
                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold ${cfg.pill}`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`}
                            />

                            {cfg.label}
                          </span>
                        </td>

                        {/* ACTIONS */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => openEdit(order)}
                              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
                            >
                              <Edit3 size={14} />
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDelete(order.id)}
                              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* FOOTER */}
          <div className="px-5 py-3.5 border-t border-slate-50 bg-slate-50/50 flex items-center justify-between">
            <p className="text-sm text-slate-400">
              Showing{" "}
              <span className="font-bold text-slate-700">{rows.length}</span> of{" "}
              <span className="font-bold text-slate-700">{orders.length}</span>{" "}
              orders
            </p>

            <div className="flex gap-2">
              <button
                type="button"
                className="h-9 px-4 rounded-xl border border-slate-200 bg-white text-slate-500 text-sm font-semibold hover:bg-slate-50"
              >
                Previous
              </button>

              <button
                type="button"
                className="h-9 px-4 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-700"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CREATE MODAL */}
      {showCreate && (
        <Modal
          title="New Order"
          onClose={() => {
            resetForm();
            setShowCreate(false);
          }}
        >
          <OrderForm
            form={form}
            setForm={setForm}
            onSubmit={handleCreate}
            onCancel={() => {
              resetForm();
              setShowCreate(false);
            }}
            label="Create Order"
          />
        </Modal>
      )}

      {/* UPDATE MODAL */}
      {showUpdate && (
        <Modal
          title="Edit Order"
          onClose={() => {
            resetForm();
            setSelected(null);
            setShowUpdate(false);
          }}
        >
          <OrderForm
            form={form}
            setForm={setForm}
            onSubmit={handleUpdate}
            onCancel={() => {
              resetForm();
              setSelected(null);
              setShowUpdate(false);
            }}
            label="Save Changes"
          />
        </Modal>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   MODAL
───────────────────────────────────────────── */

function Modal({ title, onClose, children }) {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-900/40 backdrop-blur-sm animate-[fadeIn_.2s_ease]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl shadow-slate-900/20 overflow-hidden animate-[slideUp_.22s_cubic-bezier(.34,1.56,.64,1)]"
      >
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(20px) scale(.97);
            }

            to {
              opacity: 1;
              transform: none;
            }
          }
        `}</style>

        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-lg font-extrabold text-slate-900">{title}</h2>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200"
          >
            <X size={14} />
          </button>
        </div>

        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   ORDER FORM
───────────────────────────────────────────── */

function OrderForm({ form, setForm, onSubmit, onCancel, label }) {
  const inputCls =
    "w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-white text-sm ftext-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400 transition";

  const field = (label, node) => (
    <div>
      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
        {label}
      </label>

      {node}
    </div>
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="space-y-4"
    >
      {/* CUSTOMER */}
      {field(
        "Customer Name",
        <input
          type="text"
          placeholder="Full name"
          value={form.customer}
          onChange={(e) =>
            setForm({
              ...form,
              customer: e.target.value,
            })
          }
          className={inputCls}
        />,
      )}

      {/* PRODUCT */}
      {field(
        "Product",
        <input
          type="text"
          placeholder="Product name"
          value={form.product}
          onChange={(e) =>
            setForm({
              ...form,
              product: e.target.value,
            })
          }
          className={inputCls}
        />,
      )}

      {/* GRID */}
      <div className="grid grid-cols-2 gap-3">
        {/* QUANTITY */}
        {field(
          "Quantity",
          <input
            type="number"
            min="1"
            value={form.quantity}
            onChange={(e) =>
              setForm({
                ...form,
                quantity: Number(e.target.value),
              })
            }
            className={inputCls}
          />,
        )}

        {/* TOTAL */}
        {field(
          "Total ($)",
          <input
            type="number"
            placeholder="0.00"
            value={form.total}
            onChange={(e) =>
              setForm({
                ...form,
                total: Number(e.target.value),
              })
            }
            className={inputCls}
          />,
        )}
      </div>

      {/* STATUS */}
      {field(
        "Status",
        <select
          value={form.status}
          onChange={(e) =>
            setForm({
              ...form,
              status: e.target.value,
            })
          }
          className={inputCls + " cursor-pointer appearance-none"}
        >
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>,
      )}

      {/* BUTTONS */}
      <div className="flex justify-end gap-2.5 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="h-12 px-5 rounded-xl border border-slate-200 bg-white text-slate-600
           text-sm font-semibold hover:bg-slate-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="flex items-center gap-2 h-12 px-5 rounded-xl bg-slate-900
           text-white text-sm font-bold hover:bg-slate-700 shadow-md shadow-slate-900/20"
        >
          <Save size={13} />
          {label}
        </button>
      </div>
    </form>
  );
}
