import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ParticleCanvas from '@/components/ParticleCanvas';
import TypingAnimation from '@/components/TypingAnimation';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      // Label typing reveal
      tl.fromTo(
        labelRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: 'power3.out' }
      );

      // Name fade in
      tl.fromTo(
        nameRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.2'
      );

      // Description fade in
      tl.fromTo(
        descRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.4'
      );

      // CTA buttons
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.3'
      );

      // Photo frame
      tl.fromTo(
        photoRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (href: string) => {
    const target = document.querySelector(href);
    if (target) {
      const navHeight = 64;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex items-center min-h-screen overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
    >
      <ParticleCanvas />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col-reverse items-center gap-12 lg:flex-row lg:gap-8">
          {/* Left Column - Text Content */}
          <div className="flex-1 lg:flex-[0.55] text-center lg:text-left">
            <div ref={labelRef} className="mb-4 opacity-0">
              <span className="font-mono text-xs font-medium tracking-[0.08em] uppercase text-[#00E5A0]">
                AI Engineer | Python Developer | AI/ML Specialist
              </span>
            </div>

            <h1
              ref={nameRef}
              className="opacity-0 text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[1.05] tracking-[-0.03em] mb-4"
            >
              <span className="text-gradient">Syed Abdullah</span>
            </h1>

            <div className="mb-6">
              <TypingAnimation />
            </div>

            <p
              ref={descRef}
              className="opacity-0 text-base text-[#A0A0A0] max-w-[480px] mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              Building AI-driven solutions with expertise in prompt engineering, NLP, and automation. 
              Passionate about leveraging Machine Learning to design intelligent, efficient systems.
            </p>

            <div ref={ctaRef} className="flex flex-wrap justify-center gap-4 opacity-0 lg:justify-start">
              <button
                onClick={() => scrollToSection('#skills')}
                className="btn-primary"
              >
                View Expertise
              </button>
              <button
                onClick={() => scrollToSection('#contact')}
                className="btn-secondary"
              >
                Contact Me
              </button>
            </div>
          </div>

          {/* Right Column - Profile Photo */}
          <div className="flex-1 lg:flex-[0.45] flex justify-center">
            <div ref={photoRef} className="relative opacity-0">
              {/* Orbital Ring */}
              <div
                className="absolute inset-0 animate-orbit"
                style={{
                  width: 'calc(100% + 40px)',
                  height: 'calc(100% + 40px)',
                  top: '-20px',
                  left: '-20px',
                  border: '2px dashed rgba(0, 229, 160, 0.2)',
                  borderRadius: '50%',
                }}
              >
                {/* Decorative dots */}
                {[0, 90, 180, 270].map((angle) => (
                  <div
                    key={angle}
                    className="absolute w-1.5 h-1.5 rounded-full bg-[#00E5A0]"
                    style={{
                      top: angle === 0 ? '-4px' : angle === 180 ? 'calc(100% - 4px)' : '50%',
                      left: angle === 270 ? '-4px' : angle === 90 ? 'calc(100% - 4px)' : '50%',
                      transform: 'translate(-50%, -50%)',
                      boxShadow: '0 0 6px rgba(0, 229, 160, 0.6)',
                    }}
                  />
                ))}
              </div>

              {/* Photo Container */}
              <div
                className="relative overflow-hidden rounded-full animate-pulse-glow"
                style={{
                  width: 'min(320px, 35vw)',
                  height: 'min(320px, 35vw)',
                  minWidth: '200px',
                  minHeight: '200px',
                  border: '3px solid #00E5A0',
                  boxShadow: '0 0 30px rgba(0, 229, 160, 0.3), 0 0 60px rgba(0, 229, 160, 0.1)',
                }}
              >
                <img
                  src="/assets/profile1.jpg"
                  alt="Syed Abdullah - AI Engineer"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
