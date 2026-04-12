function TopProductsSection({ products }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-slate-900">Top Products</h3>
          <p className="text-sm text-slate-500 mt-1">Best performing items this month</p>
        </div>
        <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium transition-colors">
          View all →
        </button>
      </div>
      <div className="divide-y divide-slate-200">
        {products.map((product, index) => (
          <div key={index} className="px-6 py-4 flex items-center gap-4 hover:bg-slate-50 transition-colors">
            <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-2xl">
              {product.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-slate-900 truncate">{product.name}</p>
              <p className="text-sm text-slate-500">{product.category}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-slate-900">{product.revenue}</p>
              <p className="text-sm text-slate-500">{product.units} sold</p>
            </div>
            <div className={`text-sm font-semibold px-3 py-1 rounded-full ${
              product.up ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}>
              {product.trend}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopProductsSection;