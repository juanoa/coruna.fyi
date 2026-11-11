import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Check, Copy } from 'lucide-react';

/** The Astro button owns clipboard access; this island animates successful copies. */
export default function CopyFeedback() {
  const [copied, setCopied] = useState(false);
  const container = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const button = container.current?.closest('button');
    let timeout: ReturnType<typeof setTimeout>;
    const confirmCopy = () => {
      clearTimeout(timeout);
      setCopied(true);
      timeout = setTimeout(() => setCopied(false), 2000);
    };
    button?.addEventListener('color-copied', confirmCopy);
    return () => {
      button?.removeEventListener('color-copied', confirmCopy);
      clearTimeout(timeout);
    };
  }, []);

  const Glyph = copied ? Check : Copy;
  return (
    <span ref={container} className="copy-feedback" aria-hidden="true" data-copy-state={copied ? 'copied' : 'idle'}>
      <AnimatePresence initial={false} mode="wait">
        <motion.span
          key={copied ? 'check' : 'copy'}
          className="copy-feedback-glyph"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 3, scale: reduceMotion ? 1 : 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: reduceMotion ? 0 : -3, scale: reduceMotion ? 1 : 0.85 }}
          transition={{ duration: 0.12, ease: 'easeOut' }}
        >
          <Glyph className="icon" size={16} strokeWidth={1} nonScalingStroke focusable="false" />
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
