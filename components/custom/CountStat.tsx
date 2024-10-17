"use client";
import React from "react";
import { Badge } from "@/components/catalyst/badge";
import { Divider } from "@/components/catalyst/divider";
export enum Color {
  pink = "pink",
  lime = "lime",
}

interface UserPageProps {
  eventType: string;
  count: number;
  color: Color;
}

export const CountStat: React.FC<UserPageProps> = ({
  count,
  eventType,
  color,
}) => {
  // value, change

  return (
    <div>
      <Divider />
      <div className="mt-3 text-3xl/8 font-semibold sm:text-2xl/8">
        {eventType}
      </div>
      {/* <div className="mt-6 text-lg/6 font-medium sm:text-sm/6">Count</div> */}

      <div className="mt-3 text-sm/6 sm:text-xs/6">
        <Badge color={color}>{count || 0}</Badge>{" "}
        {/* <span className="text-zinc-500">...</span> */}
      </div>
    </div>
  );
};
