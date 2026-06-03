import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GlassCard from '@/components/GlassCard';

gsap.registerPlugin(ScrollTrigger);

const responsibilities = [
  'Gaining hands-on experience in developing and deploying production-ready, AI-driven solutions.',
  'Specializing in prompt engineering, natural language processing (NLP), and workflow automation projects.',
  'Actively architecting and applying foundational concepts of Machine Learning (ML).',
  'Collaborating within agile team environments to design, test, and optimize intelligent system architectures.',
  'Continuously expanding technical capabilities through deep, practical project involvement.',
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const nodeRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const triggers: ScrollTrigger[] = [];

      // Timeline track animation
      if (trackRef.current) {
        const trackTl = gsap.fromTo(
          trackRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
        if (trackTl.scrollTrigger) triggers.push(trackTl.scrollTrigger);
      }

      // Timeline node
      if (nodeRef.current) {
        const nodeTl = gsap.fromTo(
          nodeRef.current,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: 'back.out(1.7)',
            delay: 0.3,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
        if (nodeTl.scrollTrigger) triggers.push(nodeTl.scrollTrigger);
      }

      // Experience card
      if (cardRef.current) {
        const cardTl = gsap.fromTo(
          cardRef.current,
          { opacity: 0, x: 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: 0.3,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
        if (cardTl.scrollTrigger) triggers.push(cardTl.scrollTrigger);
      }

      return () => {
        triggers.forEach((t) => t.kill());
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-[60px] md:py-[100px]"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <span className="block mb-4 section-label">Professional Experience</span>
          <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold leading-[1.15] tracking-[-0.02em] text-white">
            Career Trajectory
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative flex flex-col gap-8 lg:flex-row lg:gap-0">
          {/* Timeline Track (Desktop: center, Mobile: left) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2">
            <div
              ref={trackRef}
              className="w-full h-full origin-top"
              style={{
                background: 'linear-gradient(to bottom, rgba(0, 229, 160, 0.4) 0%, rgba(0, 229, 160, 0.1) 100%)',
              }}
            />
          </div>

          {/* Mobile Timeline Track */}
          <div className="lg:hidden absolute left-6 top-0 bottom-0 w-0.5">
            <div
              className="w-full h-full"
              style={{
                background: 'linear-gradient(to bottom, rgba(0, 229, 160, 0.4) 0%, rgba(0, 229, 160, 0.1) 100%)',
              }}
            />
          </div>

          {/* Timeline Node (Desktop) */}
          <div className="absolute z-10 hidden -translate-x-1/2 lg:flex left-1/2 top-8">
            <div
              ref={nodeRef}
              className="w-4 h-4 rounded-full bg-[#00E5A0] animate-pulse-glow-fast"
              style={{
                boxShadow: '0 0 20px rgba(0, 229, 160, 0.5)',
              }}
            />
          </div>

          {/* Timeline Node (Mobile) */}
          <div className="absolute z-10 -translate-x-1/2 lg:hidden left-6 top-8">
            <div
              className="w-4 h-4 rounded-full bg-[#00E5A0]"
              style={{
                boxShadow: '0 0 20px rgba(0, 229, 160, 0.5)',
              }}
            />
          </div>

          {/* Experience Card */}
          <div className="lg:ml-[calc(50%+32px)] ml-16 flex-1 max-w-2xl">
            <div ref={cardRef} className="opacity-0">
              <GlassCard className="p-6 md:p-8">
                <h3 className="mb-1 text-xl font-semibold text-white">
                  AI Engineer
                </h3>
                <p className="text-sm font-medium text-[#00E5A0] mb-6">
                  AKTI — Lahore, Pakistan
                </p>

                <ul className="space-y-3">
                  {responsibilities.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span
                        className="mt-2 w-1.5 h-1.5 rounded-full bg-[#00E5A0] flex-shrink-0"
                        style={{ boxShadow: '0 0 4px rgba(0, 229, 160, 0.5)' }}
                      />
                      <span className="text-[#A0A0A0] leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
