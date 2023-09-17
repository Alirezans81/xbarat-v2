import React from "react";
import { useDirectionState } from "../../../../../../Providers/DirectionProvider";

export default function EditButton({ canEdit, setCanEdit, customFunction }) {
  const { endComplete: direction } = useDirectionState();

  if (canEdit) {
    return (
      <div className={`flex gap-1 absolute ${direction}-4 top-4`}>
        <button onClick={customFunction}>
          <img
            className="w-5 h-5"
            src={require("../../../../../../Images/check.png")}
          />
        </button>
        <button onClick={() => setCanEdit(false)}>
          <img
            className="w-5 h-5"
            src={require("../../../../../../Images/multiplication.png")}
          />
        </button>
      </div>
    );
  } else {
    return (
      <button
        onClick={() => setCanEdit(true)}
        className={`absolute ${direction}-4 top-4`}
      >
        <img
          className="w-4 h-4"
          src={require("../../../../../../Images/pages/layout/Profile/edit.png")}
        />
      </button>
    );
  }
}
