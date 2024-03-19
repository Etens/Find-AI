"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

const Progress = React.forwardRef(({ className, value }, ref) => {
  // Calculez la position X du scintillement en fonction de la valeur de progression
  const sparkleXPosition = value ? `${value}%` : '0%'; // Cette valeur sera directement utilisée dans le style
  const sparkleSpeed = 1 - (value / 100); // Plus la valeur est élevée, plus la vitesse est rapide

  return (
    <ProgressPrimitive.Root className={cn("relative w-full", className)} ref={ref}>
      <ProgressPrimitive.Indicator
        className="h-2 bg-gray-900 transition-all dark:bg-gray-50 mt-10 rounded-lg w-full"
        style={{ width: `${value}%`, background: 'linear-gradient(to right, #000, #555)' }}
      />
      <img
        src="/sparkle-emoji.png"
        alt="sparkle"
        className="absolute bottom-0 transform -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `calc(${sparkleXPosition} - 13px)`,
          top: '-400%',
          transform: `translateY(50%)`,
          zIndex: 50,
          width: '35px',
          transition: 'left 0.2s',
          filter: 'drop-shadow(0 0 10px white)',
        }}
      />
    </ProgressPrimitive.Root>
  );
});

Progress.displayName = "Progress";

export { Progress };
