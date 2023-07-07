import AppCard from "@/components/AppCard";
import CategoryFilter from "@/components/CategoryFilter";
import RoadmapCounter from "@/components/RoadmapCounter";
import { ICategory } from "@/types";
import React from "react";

import IconClose from "@/../public/icons/mobile/icon-close.svg";
import IconHamburger from "@/../public/icons/mobile/icon-hamburger.svg";
import { cn } from "@/lib/utils";

type Props = {
  activeCategory: ICategory;
  setActiveCategory: React.Dispatch<ICategory>;
  roadmapCounts: {
    title: string;
    count: number;
  }[];
};

export default function NavBar({
  roadmapCounts,
  activeCategory,
  setActiveCategory,
}: Props) {
  const [mobileSideNavOpen, setMobileSideNavOpen] =
    React.useState<boolean>(false);

  return (
    <aside className="destkop:gap-6 fixed z-10 flex w-full tablet:relative tablet:gap-4 desktop:w-1/4  desktop:flex-col">
      <div className="absolute right-6 z-10 flex h-full items-center tablet:hidden">
        <button
          className=""
          onClick={() => setMobileSideNavOpen((prev) => !prev)}
        >
          {mobileSideNavOpen === false ? <IconHamburger /> : <IconClose />}
        </button>
      </div>
      <AppCard />
      {mobileSideNavOpen && (
        <div className="fixed -z-10 h-full w-full bg-[black]/30 tablet:hidden" />
      )}
      <div
        className={cn(
          "fixed basis-2/3 right-0 top-[80px] z-10 flex h-[calc(100%-80px)] w-3/4 flex-col gap-6 bg-lighter-grey p-6 tablet:relative tablet:top-0 tablet:h-auto tablet:w-full tablet:translate-x-0 tablet:flex-row tablet:gap-4 tablet:bg-transparent tablet:p-0 desktop:flex-col",
          mobileSideNavOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <CategoryFilter
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        <RoadmapCounter counts={roadmapCounts} className="" />
      </div>
    </aside>
  );
}
