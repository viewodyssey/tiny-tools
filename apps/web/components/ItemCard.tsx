import Link from "next/link";

export interface AppItem {
  title: string;
  icon: React.ReactNode;
  description?: string;
  href: string;
  color?: string;
}

export const ItemCard = ({ item }: { item: AppItem }) => {
  return (
    <Link href={item.href} className="flex h-full">
      <div
        className={`w-full p-4 rounded-lg flex flex-col gap-2 cursor-pointer relative after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full md:after:bg-hover after:bg-transparent after:rounded-xl after:opacity-0 after:scale-95 after:transition-scale after:duration-300 after:ease-in-out hover:after:opacity-100 hover:after:scale-100`}
      >
        <div
          className={`z-10 w-full h-[140px] rounded-md ${
            item.color || `bg-blue-100`
          }`}
        >
          {item.icon}
        </div>
        <div className="mt-1 px-1 z-10">
          <h4 className="text-sm">{item.title}</h4>
          <div className="text-textSecondary text-xs leading-tight mt-1">
            {item.description && item.description}
          </div>
        </div>
      </div>
    </Link>
  );
};
