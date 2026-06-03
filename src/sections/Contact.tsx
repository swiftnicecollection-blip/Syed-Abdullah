import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'abdullahsaeedraza407@gmail.com',
    href: 'mailto:abdullahsaeedraza407@gmail.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+92-3074378307',
    href: 'tel:+923074378307',
  },
  {
    icon: linkedin,
    label: 'linkedIn',
    value: 'Connect on LinkedIn',
    href: 'https://www.linkedin.com/in/syed-abdullah-8baa41306/',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Lahore, Pakistan',
    href: '#',
  },
  
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const triggers: ScrollTrigger[] = [];

      // Left column
      if (leftRef.current) {
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
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
        if (leftTl.scrollTrigger) triggers.push(leftTl.scrollTrigger);
      }

      return () => {
        triggers.forEach((t) => t.kill());
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-[60px] md:py-[100px]"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-12">
          {/* Contact Content */}
          <div ref={leftRef} className="w-full opacity-0">
            <span className="block mb-4 section-label">Get In Touch</span>
            <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold leading-[1.15] tracking-[-0.02em] text-white mb-4">
              Let&apos;s Work
              <br />
              Together
            </h2>
            <p className="text-base text-[#A0A0A0] mb-8 leading-relaxed">
              Have a project in mind or want to discuss AI solutions? I&apos;m always open to new 
              opportunities and collaborations.
            </p>

            {/* Contact Info */}
            <div className="space-y-4">
              {contactInfo.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-4 group"
                  onClick={(e) => {
                    if (item.href === '#') e.preventDefault();
                  }}
                >
                  <div className="w-10 h-10 rounded-lg bg-[rgba(0,229,160,0.1)] flex items-center justify-center flex-shrink-0">
                    <item.icon size={20} className="text-[#00E5A0]" />
                  </div>
                  <div>
                    <span className="block text-xs text-[#666666]">{item.label}</span>
                    <span className="block text-sm font-medium text-white group-hover:text-[#00E5A0] transition-colors">
                      {item.value}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
