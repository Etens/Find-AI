"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

const Progress = React.forwardRef(({ className, value }, ref) => {
  const sparkleXPosition = value ? `${value}%` : '0%'; 

  return (
    <ProgressPrimitive.Root className={cn("relative w-full", className)} ref={ref}>
      <ProgressPrimitive.Indicator
        className="h-2 bg-gray-900 transition-all dark:bg-gray-50 mt-10 rounded-lg w-full relative"
        style={{ width: `${value}%`, background: 'linear-gradient(to right, #000, #555)' }}
      />
      <img
        src="/sparkle-emoji.png"
        alt="sparkle"
        className="absolute bottom-0"
        style={{
          left: `calc(${sparkleXPosition} - 13px)`,
          transform: `translateY(50%)`,
          zIndex: 50,
          top: '10%',
          width: '40px',
          transition: 'left 0.2s',
          filter: 'drop-shadow(0 0 10px white)',
        }}
      />
    </ProgressPrimitive.Root>
  );
});

Progress.displayName = "Progress";

export { Progress };
