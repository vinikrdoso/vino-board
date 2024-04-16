import { List } from "./list";
import { NewButton } from "./new-button";

export function Sidebar() {
  return (
    <aside className="fixed z-[1] left-0 bg-blue-600
    h-full w-[60px] flex flex-col p-3 gap-4
    ">
      <List />
      <NewButton />
    </aside>
  );
}
