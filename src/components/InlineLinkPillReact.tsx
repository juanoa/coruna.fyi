import { useState } from 'react';
import { ArrowUpRight, Utensils } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'motion/react';

interface Props {
  href: string;
  label: string;
}

interface IconAnimation {
  direction: number;
  reduceMotion: boolean;
}

const iconVariants: Variants = {
  initial: ({ direction, reduceMotion }: IconAnimation) => ({
    opacity: 0,
    transform: `translateY(${reduceMotion ? 0 : direction * 150}%)`,
  }),
  visible: { opacity: 1, transform: 'translateY(0%)' },
  exit: ({ direction, reduceMotion }: IconAnimation) => ({
    opacity: 0,
    transform: `translateY(${reduceMotion ? 0 : direction * -150}%)`,
  }),
};

export default function InlineLinkPillReact({ href, label }: Props) {
  const [hovered, setHovered] = useState(false);
  const [keyboardFocused, setKeyboardFocused] = useState(false);
  const reduceMotion = useReducedMotion();
  const showArrow = hovered || keyboardFocused;
  const animation: IconAnimation = {
    direction: showArrow ? 1 : -1,
    reduceMotion: Boolean(reduceMotion) || keyboardFocused,
  };

  return (
    <motion.a
      href={href}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onFocus={(event) => setKeyboardFocused(event.currentTarget.matches(':focus-visible'))}
      onBlur={() => setKeyboardFocused(false)}
      className="not-prose relative -top-0.5 inline-flex h-6 items-center gap-1.5 whitespace-nowrap rounded-pill bg-sea py-0.5 pr-2 pl-0.5 align-middle text-md leading-none text-on-accent no-underline focus-visible:outline-2 focus-visible:outline-sea focus-visible:outline-offset-4"
    >
      <span className="relative flex size-5 shrink-0 items-center justify-center overflow-hidden rounded-pill bg-paper text-sea" aria-hidden="true">
        <AnimatePresence initial={false} custom={animation}>
          <motion.span
            key={showArrow ? 'arrow' : 'utensils'}
            custom={animation}
            variants={iconVariants}
            initial="initial"
            animate="visible"
            exit="exit"
            transition={{ duration: keyboardFocused ? 0 : 0.2, ease: [0.19, 1, 0.22, 1] }}
            className="absolute flex size-3.5 items-center justify-center"
          >
            {showArrow ? (
              <ArrowUpRight size={14} strokeWidth={2.5} />
            ) : (
              <Utensils size={12} strokeWidth={2} />
            )}
          </motion.span>
        </AnimatePresence>
      </span>
      <span>{label}</span>
    </motion.a>
  );
}
