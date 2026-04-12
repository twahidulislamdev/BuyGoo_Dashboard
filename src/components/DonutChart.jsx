function DonutChart({ data }) {
  const r = 44;
  const cx = 60;
  const cy = 60;
  const strokeW = 13;
  const circ = 2 * Math.PI * r;
  const total = data.reduce((sum, item) => sum + item.pct, 0);
  let cumulative = 0;

  return (
    <svg width="120" height="120" viewBox="0 0 120 120">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f1f5f9" strokeWidth={strokeW} />
      {data.map((item, index) => {
        const fraction = item.pct / total;
        const dashLength = fraction * circ;
        const offset = circ * (1 - cumulative / total);
        cumulative += item.pct;

        return (
          <circle
            key={index}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={item.color}
            strokeWidth={strokeW}
            strokeDasharray={`${dashLength} ${circ - dashLength}`}
            strokeDashoffset={offset}
            strokeLinecap="butt"
            style={{ transform: "rotate(-90deg)", transformOrigin: `${cx}px ${cy}px` }}
          />
        );
      })}
      <text x={cx} y={cy - 5} textAnchor="middle" fontSize="17" fontWeight="700" fill="#0f172a">
        {data[0]?.pct}%
      </text>
      <text x={cx} y={cy + 11} textAnchor="middle" fontSize="9" fill="#94a3b8" fontWeight="500">
        of sales
      </text>
    </svg>
  );
}

export default DonutChart;