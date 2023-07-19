import FrameWrapper from "@/components/FrameWrapper";
import { AppItem, ItemCard } from "@/components/ItemCard";
import { Chrome, Globe, Linkedin, ListOrdered } from "lucide-react";
import { CardFrame } from "ui";

const APPS: AppItem[] = [
  {
    title: "Chrome Extension Ranking",
    description:
      "View historical rankings and analytics for search terms and Chrome extensions. ",
    href: "/chrome-extension",
    icon: (
      <div className="w-full h-full flex items-center justify-center gap-1">
        <Chrome size={36} color="#0ea5e9" />
        <ListOrdered size={36} color="#0ea5e9" />
      </div>
    ),
    color: "bg-sky-100",
  },
  {
    title: "LinkedIn Alumni",
    description:
      "View historical rankings and analytics for search terms and Chrome extensions. ",
    href: "/chrome-extension",
    icon: (
      <div className="w-full h-full flex items-center justify-center gap-1">
        <Linkedin size={36} color="#3b82f6" />
        <Globe size={36} color="#3b82f6" />
      </div>
    ),
  },
];

export default function Page() {
  return (
    <FrameWrapper>
      <CardFrame className="w-full h-full">
        <div className="flex w-full flex-wrap">
          {APPS.map((app, idx) => (
            <div className="md:w-1/4 px-2 pb-2 inline-block w-full" key={idx}>
              <ItemCard item={app} />
            </div>
          ))}
        </div>
      </CardFrame>
    </FrameWrapper>
  );
}
