import { Button } from "@/../../packages/ui";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export interface AppCardItem {
  title: string;
  image: any;
  description?: string;
  href: string;
}

export const AppCard = ({ item }: { item: AppCardItem }) => {
  return (
    <Link
      href={item.href}
      target="_blank"
      rel="noopener nofollow noreferrer"
      className="w-full md:w-[calc(50%-4px)] flex mt-2 hover:mt-0 hover:mb-2 cursor-pointer relative transition-margin duration-300 ease-in-out"
    >
      <div
        className={`w-full rounded-lg flex flex-col gap-2 cursor-pointer relative border-border border bg-white h-[360px] overflow-hidden `}
      >
        <div className="mt-1 py-4 px-8 z-10 w-full">
          <h4 className="text-lg font-medium">{item.title}</h4>
          <div className="text-textSecondary leading-tight mt-1">
            {item.description && item.description}
          </div>
        </div>
        <div className="w-full h-full overflow-hidden relative">
          <img
            className="border border-border rounded-md absolute top-4 left-8 w-full"
            src={item.image}
            alt=""
          />
        </div>
        <Button
          size="icon"
          variant="outline"
          className="absolute top-4 right-4 rounded-full"
        >
          <ArrowUpRight size={16} />
        </Button>
      </div>
    </Link>
  );
};
