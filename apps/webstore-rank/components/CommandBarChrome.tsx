import { useDataContext } from "@/hooks/DataContext";
import { TextCursorInput, ShoppingBag } from "lucide-react";
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
  return (
    <>
      <div className="w-[360px]">
        <Button
          variant="outline"
          className="text-gray-400 font-normal"
          onClick={() => setOpen(true)}
        >
          {searchData.keyword ? (
            <>
              <Badge className="mr-1">{`keyword`}</Badge>
              {`${searchData.keyword}`}
            </>
          ) : (
            "Type a command or search..."
          )}
          <Badge
            variant={"outline"}
            className="ml-2 text-gray-400"
          >{`⌘]`}</Badge>
        </Button>
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <TextCursorInput className="mr-2 h-4 w-4" />
              <span>Keyword</span>
            </CommandItem>
            <CommandItem>
              <ShoppingBag className="mr-2 h-4 w-4" />
              <span>Extension</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};
