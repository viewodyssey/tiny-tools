interface SidebarProps {
  children?: React.ReactNode;
}

const Sidebar = ({ children }: SidebarProps) => {
  return (
    <div className="basis-[240px] flex-shrink-0 bg-background border-r border-border border-solid">
      {children}
    </div>
  );
};

export default Sidebar;
