import Avatar from "./Avatar";
import { tabs, STATUS_STYLES } from "../data/dashboardData";

function OrderRow({ order, idx }) {
  const style = STATUS_STYLES[order.status];
  return (
    <tr className="hover:bg-slate-50 transition-colors">
      <td className="px-5 py-5 font-mono text-sm text-slate-600">#{order.id}</td>
      <td className="px-5 py-5 text-sm text-slate-600">
        <div className="flex items-center gap-3">
          <Avatar initials={order.avatar} idx={idx} size="sm" />
          <span className="font-medium text-slate-900 text-sm">{order.name}</span>
        </div>
      </td>
      <td className="px-5 py-5 text-sm text-slate-600 max-w-xs truncate">{order.product}</td>
      <td className="px-5 py-5 text-sm text-slate-500">{order.date}</td>
      <td className="px-5 py-5 text-sm font-semibold text-slate-900">
        ${order.amount.toLocaleString()}
      </td>
      <td className="px-5 py-3">
        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${style.bg}`}>
          <span className={`w-2 h-2 rounded-full ${style.dot}`} />
          {order.status}
        </span>
      </td>
    </tr>
  );
}

function OrdersTable({ activeTab, onTabChange, orders }) {
  const filteredOrders = activeTab === "All" ? orders : orders.filter((order) => order.status === activeTab);

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-slate-900">Recent Orders</h3>
        <div className="flex bg-slate-100 rounded-lg p-1 gap-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`px-4 py-2 rounded-md font-medium text-sm transition-all ${
                activeTab === tab
                  ? "bg-white shadow-sm text-slate-900"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              {["Order ID", "Customer", "Product", "Date", "Amount", "Status"].map((header) => (
                <th
                  key={header}
                  className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filteredOrders.map((order, index) => (
              <OrderRow key={order.id} order={order} idx={index} />
            ))}
          </tbody>
        </table>
        {filteredOrders.length === 0 && (
          <div className="text-center py-12 text-slate-500 text-sm">
            No orders found for this status.
          </div>
        )}
      </div>
    </div>
  );
}

export default OrdersTable;