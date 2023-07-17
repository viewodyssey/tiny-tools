import { TinyToolsWordmark } from "../random";

interface SidebarProps {
  children?: React.ReactNode;
}

export const Sidebar = ({ children }: SidebarProps) => {
  return (
    <div className="basis-[240px] flex-shrink-0 bg-background border-r border-border border-solid py-4 px-4">
      <div className="w-full">
        <TinyToolsWordmark />
      </div>
      {children}
    </div>
  );
};
