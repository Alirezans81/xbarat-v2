import React from "react";
import LeftSide from "./TobBar/LeftSide";
import RightSide from "./TobBar/RightSide";
import { useDirectionState } from "../../../Providers/DirectionProvider";
import Middle from "./TobBar/Middle";

export default function TopBar() {
  const { one: direction } = useDirectionState();

  return (
    <div className={`flex items-center justify-between p${direction}-8 py-3`}>
      <LeftSide />
      <Middle />
      <RightSide />
    </div>
  );
}
