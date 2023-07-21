"use client";
import { AppFrame, CardFrame } from "ui";
import { CommandBarChrome } from "@/components/CommandBarChrome";
import SidebarItems from "@/components/SidebarItems";
import { Hourglass } from "lucide-react";

export default function Page() {
  return (
    <AppFrame
      sidebarChildren={<SidebarItems />}
      topbarChildren={<CommandBarChrome />}
    >
      <CardFrame className="w-full h-full">
        <div className="flex flex-col items-center justify-center gap-2 w-full h-full">
          <div className="bg-gray-200 w-12 h-12 rounded flex items-center justify-center">
            <Hourglass size={24} className="text-gray-500" />
          </div>
          <h2 className="font-medium text-xl leading-xl max-w-[480px] mt-4">
            Coming soon.
          </h2>
          <div className="max-w-[420px] text-textSecondary text-center">
            This feature is in the works. Thanks for being patient!
          </div>
        </div>
      </CardFrame>
    </AppFrame>
  );
}
