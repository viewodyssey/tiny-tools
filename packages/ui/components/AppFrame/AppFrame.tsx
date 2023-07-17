import { Sidebar } from "../Sidebar/Sidebar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Command, CommandInput } from "../ui/command";

interface AppFrameProps {
  sidebarChildren?: React.ReactNode;
  topbarChildren?: React.ReactNode;
  children?: React.ReactNode;
}

export const AppFrame = ({
  children,
  sidebarChildren,
  topbarChildren,
}: AppFrameProps) => {
  return (
    <div className="w-full max-w-screen h-screen flex">
      <Sidebar>{sidebarChildren}</Sidebar>
      <div
        className="h-full w-full flex flex-col"
        style={{ maxWidth: "calc(100% - 240px)" }}
      >
        <div className="w-full bg-background h-[48px] border-b border-border border-solid flex items-center px-4">
          {topbarChildren}
        </div>
        <div className="h-full overflow-auto py-3 px-4">{children}</div>
      </div>
    </div>
  );
};
