import PropTypes from "prop-types"; // Import PropTypes

const ProgressCircle = ({ percentage, color, label }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <svg width="100" height="100" viewBox="0 0 100 100">
      {/* Background Circle */}
      <circle cx="50" cy="50" r={radius} strokeWidth="8" fill="none" className="stroke-gray-200" />
      {/* Progress Circle */}
      <circle
        cx="50"
        cy="50"
        r={radius}
        strokeWidth="8"
        fill="none"
        stroke={color}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        className="transition-all duration-500"
      />
      {/* Label */}
      <text x="50" y="50" textAnchor="middle" dy="0.3em" className="text-lg font-bold fill-gray-900">
        {label}
      </text>
    </svg>
  );
};

// ✅ Add PropTypes Validation
ProgressCircle.propTypes = {
  percentage: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default ProgressCircle;
