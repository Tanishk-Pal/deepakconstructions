"use client";

import { useRef } from "react";

export default function MagneticButton({
  children,
  className = "",
  as: Component = "span",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect || !ref.current) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const moveX = (x - rect.width / 2) / 8;
    const moveY = (y - rect.height / 2) / 8;

    ref.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
  };

  const reset = () => {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0px, 0px)";
  };

  return (
    <Component
      ref={ref as any}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      suppressHydrationWarning
      className={`inline-flex items-center justify-center transition-transform duration-200 cursor-pointer ${className}`}
    >
      {children}
    </Component>
  );
}