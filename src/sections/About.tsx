import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Briefcase, GraduationCap } from 'lucide-react';
import GlassCard from '@/components/GlassCard';

gsap.registerPlugin(ScrollTrigger);

const infoCards = [
  {
    icon: MapPin,
    label: 'Location',
    value: 'Lahore, Pakistan',
  },
  {
    icon: Briefcase,
    label: 'Experience',
    value: 'AI Engineer',
  },
  {
    icon: GraduationCap,
    label: 'Education',
    value: 'Intermediate',
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const triggers: ScrollTrigger[] = [];

      // Left column
      const leftTl = gsap.fromTo(
        leftRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
      if (leftTl.scrollTrigger) triggers.push(leftTl.scrollTrigger);

      // Right column
      const rightTl = gsap.fromTo(
        rightRef.current,
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
      if (rightTl.scrollTrigger) triggers.push(rightTl.scrollTrigger);

      // Info cards
      if (cardsRef.current) {
        const cards = cardsRef.current.children;
        const cardsTl = gsap.fromTo(
          cards,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            delay: 0.4,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
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
      id="about"
      ref={sectionRef}
      className="py-[100px] md:py-[100px]"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
          {/* Left Column */}
          <div ref={leftRef} className="lg:w-[40%] opacity-0">
            <span className="block mb-4 section-label">About Me</span>
            <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold leading-[1.15] tracking-[-0.02em] text-white">
              Driven by AI,
              <br />
              Powered by Python
            </h2>
          </div>

          {/* Right Column */}
          <div ref={rightRef} className="lg:w-[60%] opacity-0">
            <div className="mb-8 space-y-4">
              <p className="text-base text-[#A0A0A0] leading-relaxed">
                I am an AI Engineer with proven experience in developing and deploying AI-driven solutions. 
                Skilled in prompt engineering, natural language processing, and automation, with strong 
                expertise in optimizing large language models. Currently expanding my deep tech stack in 
                Machine Learning (ML) and Deep Learning (DL) while continuously pursuing professional growth.
              </p>
              <p className="text-base text-[#A0A0A0] leading-relaxed">
                I am passionate about leveraging artificial intelligence to design intelligent, efficient, 
                and impactful systems that solve real-world problems.
              </p>
            </div>

            {/* Info Cards */}
            <div ref={cardsRef} className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {infoCards.map((card) => (
                <GlassCard key={card.label} className="p-5">
                  <card.icon size={20} className="text-[#00E5A0] mb-3" />
                  <span className="block text-xs text-[#666666] mb-1">{card.label}</span>
                  <span className="block text-sm font-semibold text-white">{card.value}</span>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
