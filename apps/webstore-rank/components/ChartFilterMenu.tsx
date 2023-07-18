import { useDataContext } from "@/hooks/DataContext";
import { updatePropertyState } from "@/utils/misc";
import { Filter } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  Button,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "ui";

export function ChartFilterMenu() {
  const { filters, setFilters } = useDataContext();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Filter size={16} />
          <span className="ml-2">Filters</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>Chart Calculations</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={filters.cumulative_rating}
          onCheckedChange={(v) => {
            updatePropertyState(setFilters, "cumulative_rating", v);
          }}
        >
          Use cumulative rating
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
