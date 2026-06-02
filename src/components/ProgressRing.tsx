import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ProgressRingProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
}

export default function ProgressRing({ percentage, size = 56, strokeWidth = 4 }: ProgressRingProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);
  const [animatedPercent, setAnimatedPercent] = useState(0);
  const hasAnimated = useRef(false);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    if (!circleRef.current || !svgRef.current) return;

    const targetOffset = circumference - (percentage / 100) * circumference;

    const trigger = ScrollTrigger.create({
      trigger: svgRef.current,
      start: 'top 85%',
      onEnter: () => {
        if (!hasAnimated.current) {
          hasAnimated.current = true;
          gsap.to(circleRef.current, {
            strokeDashoffset: targetOffset,
            duration: 1,
            ease: 'power2.out',
          });

          const obj = { val: 0 };
          gsap.to(obj, {
            val: percentage,
            duration: 1,
            ease: 'power2.out',
            onUpdate: () => setAnimatedPercent(Math.round(obj.val)),
          });
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, [percentage, circumference]);

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        ref={svgRef}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth={strokeWidth}
        />
        {/* Fill */}
        <circle
          ref={circleRef}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#00E5A0"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <span className="absolute font-mono text-xs font-semibold text-[#00E5A0]">
        {animatedPercent}%
      </span>
    </div>
  );
}
