import { format } from "date-fns";

export const formatDate = (date: string) => {
  try {
    return format(new Date(date), "HH:mm:ss dd/MM/yyy");
  } catch (error) {
    return date;
  }
};
