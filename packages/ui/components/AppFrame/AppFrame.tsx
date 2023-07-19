import { useEffect, useState } from "react";
import { Sidebar } from "../Sidebar/Sidebar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Command, CommandInput } from "../ui/command";
import { Menu } from "lucide-react";

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
  const [isVisible, setVisible] = useState(true);

  const resize = () => {
    let currentShowNav = window.innerWidth > 640;
    setVisible(currentShowNav);
  };

  useEffect(() => {
    window.addEventListener("resize", resize);
    resize();

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div className="w-full max-w-screen h-screen flex">
      {isVisible && <Sidebar>{sidebarChildren}</Sidebar>}
      <div className="h-full w-full flex flex-col md:max-w-[calc(100%-240px)]">
        <div className="w-full bg-background h-[48px] border-b border-border border-solid flex items-center px-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setVisible((prev) => !prev)}
            >
              <Menu size={16} />
            </Button>
            {topbarChildren}
          </div>
        </div>
        <div className="h-full overflow-auto py-4 pb-8 px-4 md:px-8">
          {children}
        </div>
      </div>
    </div>
  );
};
