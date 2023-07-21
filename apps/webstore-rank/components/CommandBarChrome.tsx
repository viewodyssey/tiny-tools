"use-client";
import { useDataContext } from "@/hooks/DataContext";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { TextCursorInput, ShoppingBag } from "lucide-react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  Badge,
  Button,
} from "ui";
import { BASEPATH } from "../utils/misc";

export const CommandBarChrome = () => {
  const { searchData, searchTerm, open, setOpen } = useDataContext();
  const [value, setValue] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (searchTerm.length <= 2 && pathname !== BASEPATH) {
      window.location.href = BASEPATH;
    }
  }, [searchTerm]);

  return (
    <>
      <div className="flex items-center gap-4">
        <div className="w-full md:w-[360px]">
          <Button
            variant="outline"
            className="text-gray-400 font-normal w-full justify-start pl-2"
            onClick={() => setOpen(true)}
          >
            <MagnifyingGlassIcon className="mr-2 h-6 w-6" />
            {searchData.keyword ? (
              <div className="flex items-center">
                <Badge className="mr-2 px-2 font-medium">{`keyword`}</Badge>
                <span className="text-primary">{`${searchData.keyword}`}</span>
              </div>
            ) : (
              "Type a command or search..."
            )}
            {/* <Badge
            variant={"outline"}
            className="ml-2 text-gray-400"
          >{`⌘]`}</Badge> */}
          </Button>
        </div>
        <CommandDialog
          open={open}
          onOpenChange={(op) => {
            if (op) {
              setOpen(op);
            } else {
              if (searchTerm.length > 2) {
                setOpen(op);
              }
            }
          }}
          commandProps={{
            filter: (value, search) => {
              if (
                search.includes("chrome.google.com/webstore/detail/") &&
                value === "keyword"
              )
                return 0;
              return 1;
            },
          }}
        >
          <CommandInput
            placeholder="Type a command or search..."
            value={value}
            onValueChange={setValue}
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem
                value="keyword"
                onSelect={() => {
                  if (value.length > 2) {
                    const params = new URLSearchParams(searchParams);
                    params.set("keyword", value);
                    const newParams = params.toString();
                    window.location.href = `/chrome-extension/?${newParams}`;
                    setOpen(false);
                  }
                }}
              >
                <TextCursorInput className="mr-2 h-4 w-4" />
                <Badge className="mr-2 font-normal">Keyword</Badge>
                <span>{value || "Enter any search term..."}</span>
              </CommandItem>
              <CommandItem value="extension">
                <ShoppingBag className="mr-2 h-4 w-4" />
                <Badge className="mr-2 font-normal">Extension</Badge>
                <span>{value || "Enter an Chrome extension URL..."}</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </div>
    </>
  );
};
