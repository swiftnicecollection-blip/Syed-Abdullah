import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SkillCard from '@/components/SkillCard';

gsap.registerPlugin(ScrollTrigger);

const skillsData = [
  {
    name: 'AI Solutions & Architecture',
    percentage: 95,
    icon: 'Brain',
    description: 'Architecting end-to-end AI solutions with cutting-edge technologies',
  },
  {
    name: 'Video Editing & Production',
    percentage: 92,
    icon: 'Clapperboard',
    description: 'Professional video editing and AI-powered video generation',
  },
  {
    name: 'Machine Learning',
    percentage: 90,
    icon: 'Cpu',
    description: 'Building and deploying ML models for real-world applications',
  },
  {
    name: 'AI Video Generation',
    percentage: 90,
    icon: 'Video',
    description: 'Creating stunning AI-generated video content',
  },
  {
    name: 'Prompt Engineering & LLM Optimization',
    percentage: 89,
    icon: 'MessageSquare',
    description: 'Crafting and optimizing prompts for large language models',
  },
  {
    name: 'Python Development',
    percentage: 95,
    icon: 'Code',
    description: 'Expert-level Python programming for AI and automation',
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const triggers: ScrollTrigger[] = [];

      // Header animation
      if (headerRef.current) {
        const headerTl = gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
        if (headerTl.scrollTrigger) triggers.push(headerTl.scrollTrigger);
      }

      return () => {
        triggers.forEach((t) => t.kill());
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-[60px] md:py-[100px]"
      style={{ background: 'var(--bg-secondary)' }}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="mb-12">
          <span className="block mb-4 opacity-0 section-label">Technical Skills</span>
          <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold leading-[1.15] tracking-[-0.02em] text-white opacity-0">
            My Expertise
          </h2>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2">
          {skillsData.map((skill, index) => (
            <SkillCard
              key={skill.name}
              name={skill.name}
              percentage={skill.percentage}
              icon={skill.icon}
              description={skill.description}
              index={index}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
