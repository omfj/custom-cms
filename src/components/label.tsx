import clsx from "clsx";
import { forwardRef } from "react";

export const Label = forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => {
  return <label ref={ref} className={clsx("", className)} {...props} />;
});
Label.displayName = "Label";
