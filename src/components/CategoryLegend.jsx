function CategoryLegend({ categories }) {
  return (
    <div className="space-y-3">
      {categories.map((cat, index) => (
        <div key={index} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: cat.color }}
            />
            <span className="text-sm font-medium text-slate-700">{cat.name}</span>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold text-slate-900">{cat.pct}%</div>
            <div className="text-xs text-slate-500">{cat.count} items</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CategoryLegend;