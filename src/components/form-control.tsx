import clsx from "clsx";
import { forwardRef } from "react";

export const FormControl = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return <div ref={ref} className={clsx("space-y-2", className)} {...props} />;
});
FormControl.displayName = "FormControl";
