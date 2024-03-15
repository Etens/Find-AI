"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}>
    <div>
      <img src="/sparkle-emoji.png" alt="sparkle" className="absolute bottom-0 right-0 translate-x-[-50%] translate-y-[-50%] animate-spin z-50" />
    </div>
    <div className={cn(
      "relative h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-black mt-4",
      className
    )}>
      <ProgressPrimitive.Indicator
        className="h-full w-full bg-gray-900 transition-all dark:bg-gray-50 relative"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      >
      </ProgressPrimitive.Indicator>
    </div>
  </ProgressPrimitive.Root>
));
Progress.displayName = "Progress";

export { Progress };
