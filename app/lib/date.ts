import { format } from "date-fns";

export const formatedDate = (date: string | Date) => {
  const d = new Date(date);

  return format(d, "dd.MM.yyyy");
};
