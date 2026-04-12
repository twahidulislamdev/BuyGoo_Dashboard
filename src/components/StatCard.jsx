function StatCard({ stat }) {
  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-slate-50 rounded-lg">
          <span className="text-2xl">{stat.icon}</span>
        </div>
        <div className={`px-3 py-1 text-xs font-semibold rounded-full ${
          stat.up ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
        }`}>
          {stat.change}
        </div>
      </div>
      <div className="space-y-1">
        <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
        <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
        <div className="text-xs text-slate-500">{stat.desc}</div>
      </div>
    </div>
  );
}

export default StatCard;