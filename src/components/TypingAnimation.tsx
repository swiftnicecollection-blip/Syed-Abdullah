import { useEffect, useRef, useState } from 'react';

const phrases = [
  'Crafting Intelligent Systems',
  'Python & AI Specialist',
  'LLM & Automation Expert',
  'Building the Future with AI',
];

export default function TypingAnimation() {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const isTypingRef = useRef(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText.length < currentPhrase.length) {
      // Typing
      isTypingRef.current = true;
      timeout = setTimeout(() => {
        setShowCursor(true);
        setDisplayText(currentPhrase.slice(0, displayText.length + 1));
      }, 80);
    } else if (!isDeleting && displayText.length === currentPhrase.length) {
      // Finished typing, pause before deleting
      isTypingRef.current = false;
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
    } else if (isDeleting && displayText.length > 0) {
      // Deleting
      isTypingRef.current = true;
      timeout = setTimeout(() => {
        setShowCursor(true);
        setDisplayText(currentPhrase.slice(0, displayText.length - 1));
      }, 40);
    } else if (isDeleting && displayText.length === 0) {
      // Finished deleting, move to next phrase
      isTypingRef.current = false;
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }, 500);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, phraseIndex]);

  // Cursor blink when idle
  useEffect(() => {
    if (isTypingRef.current) return;
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="text-[clamp(1.25rem,2.5vw,1.75rem)] font-light text-[#A0A0A0]">
      {displayText}
      <span
        className="text-[#00E5A0] transition-opacity duration-100"
        style={{ opacity: showCursor ? 1 : 0 }}
      >
        |
      </span>
    </span>
  );
}
