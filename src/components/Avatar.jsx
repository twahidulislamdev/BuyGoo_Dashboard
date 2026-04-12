import { AVATAR_COLORS } from '../data/dashboardData';

function Avatar({ initials, idx = 0, size = "md" }) {
  const sizeClasses = size === "sm" ? "w-8 h-8 text-xs" : "w-9 h-9 text-sm";
  return (
    <div className={`${sizeClasses} rounded-full flex items-center justify-center text-white font-semibold shrink-0 ${AVATAR_COLORS[idx % AVATAR_COLORS.length]}`}>
      {initials}
    </div>
  );
}

export default Avatar;