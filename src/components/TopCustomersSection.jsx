import Avatar from "./Avatar";

function TopCustomersSection({ customers }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="px-6 py-5 border-b border-slate-200">
        <h3 className="text-xl font-semibold text-slate-900">Top Customers</h3>
        <p className="text-sm text-slate-500 mt-1">Most valuable customers this month</p>
      </div>
      <div className="divide-y divide-slate-200">
        {customers.map((customer, index) => (
          <div key={index} className="px-6 py-4 flex items-center gap-4 hover:bg-slate-50 transition-colors">
            <Avatar initials={customer.name.split(" ").map((part) => part[0]).join("")} idx={index} />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-slate-900">{customer.name}</p>
              <p className="text-sm text-slate-500 truncate">{customer.email}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-slate-900">{customer.spend}</p>
              <p className="text-sm text-slate-500">{customer.orders} orders</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopCustomersSection;