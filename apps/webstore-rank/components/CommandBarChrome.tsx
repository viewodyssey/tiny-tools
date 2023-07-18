import { useDataContext } from "@/hooks/DataContext";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { TextCursorInput, ShoppingBag, Menu } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
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

export const CommandBarChrome = () => {
  const { searchData } = useDataContext();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Menu className="h-4 w-4" />
        </Button>
        <div className="w-[360px]">
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
          onOpenChange={setOpen}
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
                    router.push(`/?${newParams}`);
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
                <span>{value || "Enter an extension URL..."}</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </div>
    </>
  );
};
