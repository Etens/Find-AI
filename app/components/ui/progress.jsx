"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

const Progress = React.forwardRef(({ className, value }, ref) => {
  // Calculez la position X du scintillement en fonction de la valeur de progression
  const sparkleXPosition = value ? `${value}%` : '0%'; // Cette valeur sera directement utilisée dans le style

  return (
    <ProgressPrimitive.Root className={cn("relative w-full", className)} ref={ref}>
      <ProgressPrimitive.Indicator
        className="h-2 bg-gray-900 transition-all dark:bg-gray-50 mt-6 rounded-lg"
        style={{ width: `${value}%` }}
      />
      <img
        src="/sparkle-emoji.png"
        alt="sparkle"
        className="absolute bottom-0"
        style={{
          left: `calc(${sparkleXPosition} - 1px)`, // Déplacez le scintillement avec la barre de progression
          transform: 'translateY(50%)', // Centre verticalement l'étoile
          zIndex: 50, // Assurez-vous que l'étoile est au-dessus de la barre de progression
          width: '40px',
          transition: 'left 0.2s', // Ajoutez une transition pour un effet de scintillement fluide
        }}
      />
    </ProgressPrimitive.Root>
  );
});

Progress.displayName = "Progress";

export { Progress };
