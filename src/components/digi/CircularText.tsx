import { motion } from "framer-motion";

export function CircularText({
  text,
  radius,
  size,
  duration,
  reverse,
  className,
  reduced,
}: {
  text: string;
  radius: number;
  size: number;
  duration: number;
  reverse?: boolean;
  className?: string;
  reduced?: boolean | null;
}) {
  const id = `ring-${radius}`;
  return (
    <motion.svg
      viewBox="0 0 200 200"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className ?? ""}`}
      aria-hidden
      animate={reduced ? undefined : { rotate: reverse ? -360 : 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      <defs>
        <path
          id={id}
          d={`M 100,100 m -${radius},0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`}
          fill="none"
        />
      </defs>
      <text
        fill="currentColor"
        fontSize={size}
        letterSpacing="1.6"
        style={{ fontFamily: "var(--font-mono, monospace)", textTransform: "uppercase" }}
      >
        <textPath href={`#${id}`}>{text}</textPath>
      </text>
    </motion.svg>
  );
}
