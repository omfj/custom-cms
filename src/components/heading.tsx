import clsx from "clsx";
import { forwardRef } from "react";

export const Heading = forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  return (
    <h1 ref={ref} className={clsx("text-lg font-bold", className)} {...props} />
  );
});
Heading.displayName = "Heading";
