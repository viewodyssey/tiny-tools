"use client";
import { Github, LayoutList, Wrench } from "lucide-react";
import { AppFrame, Button } from "ui";

const FrameWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppFrame
      sidebarChildren={
        <div className="mt-16">
          <div className="flex flex-col gap-1">
            <Button variant="ghost" className="justify-start px-2">
              <Wrench size={24} className="mr-4" color="#6b7280" /> Home
            </Button>
            <Button variant="ghost" className="justify-start px-2">
              <LayoutList size={24} className="mr-4" color="#6b7280" />
              Other apps
            </Button>
            <Button variant="ghost" className="justify-start px-2">
              <Github size={24} className="mr-4" color="#6b7280" />
              Github
            </Button>
          </div>
        </div>
      }
    >
      {children}
    </AppFrame>
  );
};

export default FrameWrapper;
