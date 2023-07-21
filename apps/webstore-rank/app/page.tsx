"use client";
import { useDataContext } from "../hooks/DataContext";
import { AppFrame, Badge, Button, buttonVariants, CardFrame } from "ui";
import { CommandBarChrome } from "@/components/CommandBarChrome";
import SidebarItems from "@/components/SidebarItems";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Chrome, ShoppingBag, TextCursorInput } from "lucide-react";

export default function Page() {
  const { setOpen } = useDataContext();

  return (
    <AppFrame
      sidebarChildren={<SidebarItems />}
      topbarChildren={<CommandBarChrome />}
    >
      <CardFrame className="w-full h-full">
        <div className="flex gap-8 flex-col items-center justify-center gap-4 w-full h-full">
          <div className="flex gap-2">
            <div className="p-3 rounded-md border border-gray-200 shadow">
              <Chrome size={24} className="text-gray-300" />
            </div>
            <div className="p-3 rounded-md border border-gray-200 shadow">
              <ShoppingBag size={24} className="text-gray-300" />
            </div>
          </div>
          <h2 className="font-medium text-[40px] leading-[40px] text-center max-w-[480px]">
            View search trends for the Chrome Web Store.
          </h2>
          <div className="w-full md:w-[420px]">
            <Button
              variant="outline"
              className="text-gray-400 font-normal w-full justify-start pl-2"
              onClick={() => setOpen(true)}
            >
              <MagnifyingGlassIcon className="mr-2 h-6 w-6" />
              Type something to search...
            </Button>
          </div>
          <div className="max-w-[600px] mt-4">
            {/* <h4 className="text-textSecondary text-sm px-4">Examples</h4> */}
            <Badge variant="secondary" className="ml-2">
              Examples
            </Badge>
            <div className="flex flex-col mt-2 w-full ">
              <Link
                className={`${buttonVariants({
                  variant: "ghost",
                })} !justify-start items-center !px-4 !py-2 h-auto`}
                href={`/search?keyword=${encodeURIComponent(
                  "youtube summary"
                )}`}
              >
                <div className="flex items-center gap-2">
                  <TextCursorInput size={16} />
                  <span className="font-normal">
                    View Chrome Web Store trends for the{" "}
                    <Badge className="font-normal rounded-md px-2">
                      youtube summary
                    </Badge>{" "}
                    keyword.{" "}
                  </span>
                </div>
              </Link>{" "}
              <Link
                className={`${buttonVariants({
                  variant: "ghost",
                })} !justify-start items-center !px-4 !py-2 h-auto`}
                href={`/search?keyword=${encodeURIComponent(
                  "youtube summary"
                )}`}
              >
                <div className="flex items-center gap-2">
                  <ShoppingBag size={16} />
                  <span className="font-normal">
                    View search trends for the extension with URL{" "}
                    <Badge className="font-normal rounded-md px-2 max-w-[200px] truncate">
                      youtube summary
                    </Badge>
                    .
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </CardFrame>
    </AppFrame>
  );
}
