import React from "react";

export default function Referral() {
  return (
    <>
      <div className="grid grid-cols-12 grid-row-2 md:gap-x-10 gap-y-7 w-full h-full text-light ">
        <div className="bg-dark rounded-2xl col-start-1 col-end-4 py-5 pl-5">
          <h1>Referral Code</h1>
        </div>

        <div className="bg-dark rounded-2xl col-start-4 col-end-8 py-5 px-6">
          <h3>Receive</h3>
        </div>

        <div className="bg-dark rounded-2xl col-start-8 col-end-13 row-start-1 row-end-3 w-full py-5 px-6">
          <button>
            <h3>Events</h3>
          </button>
          <h3>Exchanges</h3>
          <h3>Registered</h3>
        </div>

        <div className="bg-dark rounded-2xl col-start-1 col-end-8 row-start-2 row-end-2 py-5 px-6">
          <h2>person code</h2>
        </div>
      </div>
    </>
  );
}
