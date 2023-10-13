import { Event, Group } from "@/db/schemas";

type Item =
  | (Event & {
      __type: "event";
    })
  | (Group & {
      __type: "group";
    });

export async function create(item: Item) {
  if (item.__type === "event") {
    return null;
  }

  if (item.__type === "group") {
    return null;
  }
}
