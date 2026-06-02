import { useEffect, useRef, useState } from 'react';
import { Brain, Clapperboard, Cpu, Video, MessageSquare, Code } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ElementType> = {
  Brain,
  Clapperboard,
  Cpu,
  Video,
  MessageSquare,
  Code,
};

interface SkillCardProps {
  name: string;
  percentage: number;
  icon: string;
  description: string;
  index: number;
}

export default function SkillCard({ name, percentage, icon, description, index }: SkillCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [animatedPercent, setAnimatedPercent] = useState(0);
  const hasAnimated = useRef(false);

  const IconComponent = iconMap[icon] || Code;

  useEffect(() => {
    if (!cardRef.current) return;

    const triggers: ScrollTrigger[] = [];

    // Card entrance animation
    const cardTl = gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        delay: index * 0.15,
      }
    );
    if (cardTl.scrollTrigger) triggers.push(cardTl.scrollTrigger);

    // Progress bar animation
    if (progressRef.current) {
      const progressTl = gsap.fromTo(
        progressRef.current,
        { width: '0%' },
        {
          width: `${percentage}%`,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
            onEnter: () => {
              if (!hasAnimated.current) {
                hasAnimated.current = true;
                // Animate the percentage counter
                const obj = { val: 0 };
                gsap.to(obj, {
                  val: percentage,
                  duration: 1.2,
                  ease: 'power2.out',
                  onUpdate: () => setAnimatedPercent(Math.round(obj.val)),
                });
              }
            },
          },
        }
      );
      if (progressTl.scrollTrigger) triggers.push(progressTl.scrollTrigger);
    }

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [percentage, index]);

  return (
    <div
      ref={cardRef}
      className="glass-card p-6 md:p-8 opacity-0"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-lg bg-[rgba(0,229,160,0.1)] flex items-center justify-center">
          <IconComponent size={20} className="text-[#00E5A0]" />
        </div>
        <span className="font-mono text-2xl font-bold text-[#00E5A0]">
          {animatedPercent}%
        </span>
      </div>

      <h3 className="text-lg font-semibold text-white mb-2">{name}</h3>

      <div className="w-full h-1.5 bg-[rgba(255,255,255,0.08)] rounded-full overflow-hidden mb-3">
        <div
          ref={progressRef}
          className="h-full rounded-full"
          style={{
            width: '0%',
            background: 'linear-gradient(90deg, #00E5A0 0%, #00FFB0 100%)',
            boxShadow: '0 0 10px rgba(0, 229, 160, 0.3)',
          }}
        />
      </div>

      <p className="text-sm text-[#A0A0A0]">{description}</p>
    </div>
  );
}
