import React from "react";
import { useFontState } from "../../../../Providers/FontProvider";
import SiteCard from "./Sites/SiteCard";

export default function Sites({
  sites,
  selectedSiteIndex,
  setSelectedSiteIndex,
}) {
  const font = useFontState();

  return (
    <div className="h-full flex flex-col gap-y-2">
      <span className={`font-${font}-bold text-2xl`}>Sites</span>
      <div className="flex-1 flex justify-start items-start flex-col gap-y-4 overflow-y-auto">
        {sites.map((e, index) => (
          <SiteCard
            key={index}
            data={e}
            onClick={() => setSelectedSiteIndex(index)}
            selected={selectedSiteIndex === index}
          />
        ))}
      </div>
    </div>
  );
}
