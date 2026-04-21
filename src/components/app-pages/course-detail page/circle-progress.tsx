interface CircleProgressProps {
  value: number; // 0–100
  size?: number;
  strokeWidth?: number;
}

export function CircleProgress({
  value,
  size = 30,
  strokeWidth = 2.5,
}: CircleProgressProps) {
  const center = size / 2;
  const radius = center - strokeWidth - 0.5;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, value));
  const offset = circumference * (1 - clamped / 100);
  const fontSize = Math.round(size * 0.26);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-label={`${clamped}% complete`}
      style={{ flexShrink: 0 }}
    >
      {/* Track */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        opacity={0.2}
      />
      {/* Progress arc */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${center} ${center})`}
        style={{ transition: "stroke-dashoffset 0.4s ease" }}
      />
      {/* Percentage label */}
      <text
        x={center}
        y={center}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={fontSize}
        fontWeight={600}
        fill="currentColor"
      >
        {clamped}%
      </text>
    </svg>
  );
}
