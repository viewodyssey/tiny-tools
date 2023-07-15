import Sidebar from "../Sidebar/Sidebar";
import { Command, CommandInput } from "../ui/command";

interface AppFrameProps {
  children?: React.ReactNode;
}

const AppFrame = ({ children }: AppFrameProps) => {
  return (
    <div className="w-full h-screen flex">
      <Sidebar />
      <div className="h-full w-full flex flex-col">
        <div className="w-full bg-background h-[48px] border-b border-border border-solid flex items-center px-4">
          <div className="w-[360px]">
            <Command className="rounded-lg border border-b-0 h-auto">
              <CommandInput
                className="py-2 h-8 border-0 placeholder:text-gray-400"
                placeholder="Type a command or search..."
              />
            </Command>
          </div>
        </div>
        <div className="h-full overflow-auto py-3 px-4">{children}</div>
      </div>
    </div>
  );
};

export default AppFrame;
