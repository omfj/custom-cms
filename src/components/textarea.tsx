import React from "react";
import clsx from "clsx";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={clsx(
        "w-full bg-transparent border border-neutral-700",
        className
      )}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";
