"use client"

import * as React from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";

const HoverBox = HoverCardPrimitive.Root;

const HoverBoxTrigger = HoverCardPrimitive.Trigger;

const HoverBoxContent = React.forwardRef(
  ({ className, align = "center", sideOffset = 4, portalled = true, ...props }, ref) => (
    <HoverCardPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      portalled={portalled}
      className={
        "z-40 w-64 rounded-md p-4 text-gray-950 shadow-md outline-none" +
        " data-[state=open]:animate-in data-[state=closed]:animate-out" +
        " data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" +
        " data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95" +
        " data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2" +
        " data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2" +
        " dark:border-gray-800 dark:bg-dark-500 dark:text-gray-50" +
        (className ? ` ${className}` : "")
      }
      side="top"
      {...props}
    />
  )
);

HoverBoxContent.displayName = "HoverBoxContent";

export { HoverBox, HoverBoxTrigger, HoverBoxContent };

