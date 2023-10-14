import clsx from "clsx";
import React from "react";

export const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, ...props }, ref) => {
  return (
    <select
      ref={ref}
      className={clsx(
        "w-full bg-transparent border border-neutral-700",
        className
      )}
      {...props}
    />
  );
});
Select.displayName = "Select";
