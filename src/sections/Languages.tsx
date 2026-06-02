import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProgressRing from '@/components/ProgressRing';
import GlassCard from '@/components/GlassCard';

gsap.registerPlugin(ScrollTrigger);

const languages = [
  {
    name: 'English',
    code: 'EN',
    proficiency: 'Professional Proficiency',
    percentage: 95,
  },
  {
    name: 'Urdu',
    code: 'UR',
    proficiency: 'Native / Bilingual',
    percentage: 100,
  },
];

export default function Languages() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const triggers: ScrollTrigger[] = [];

      if (cardsRef.current) {
        const cards = cardsRef.current.children;
        const cardsTl = gsap.fromTo(
          cards,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
        if (cardsTl.scrollTrigger) triggers.push(cardsTl.scrollTrigger);
      }

      return () => {
        triggers.forEach((t) => t.kill());
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="pb-[60px] md:pb-[100px]"
      style={{ background: 'var(--bg-secondary)' }}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-xl font-semibold text-white mb-6">Languages</h3>

        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {languages.map((lang) => (
            <GlassCard key={lang.code} className="p-6 flex items-center gap-4">
              {/* Language Code Circle */}
              <div className="w-10 h-10 rounded-full bg-[rgba(0,229,160,0.1)] flex items-center justify-center flex-shrink-0">
                <span className="font-mono text-sm font-semibold text-[#00E5A0]">
                  {lang.code}
                </span>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <span className="block text-base font-semibold text-white">
                  {lang.name}
                </span>
                <span className="block text-sm text-[#A0A0A0]">
                  {lang.proficiency}
                </span>
              </div>

              {/* Progress Ring */}
              <ProgressRing percentage={lang.percentage} />
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
