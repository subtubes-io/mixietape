"use client";
import React, { useState, useEffect } from "react";
import { UserEventRepository } from "@/repositories/userEventRepository";
import { CountStat } from "@/components/custom/CountStat";
import { Color } from "@/components/custom/CountStat";

export const StatsBar: React.FC = () => {
  const userRepository = new UserEventRepository();
  const [abdanonedCount, setAbanondedCount] = useState<number>(0);
  const [accountCreatedCount, setAccountCreatedCount] = useState<number>(0);

  useEffect(() => {
    const fetch = async () => {
      const numHoursPast = 2;
      const sixHoursAgo = Date.now() - numHoursPast * 60 * 60 * 1000;
      const epochTime = Math.floor(sixHoursAgo / 1000);

      try {
        const abandonedData = await userRepository.getCount({
          customerId: "512e7d47-9055-427c-a379-2faecd37302f",
          eventDate: epochTime,
          eventName: "abandoned_cart",
        });
        setAbanondedCount(abandonedData.count);

        const accountCreatedData = await userRepository.getCount({
          customerId: "512e7d47-9055-427c-a379-2faecd37302f",
          eventDate: epochTime,
          eventName: "account_created",
        });
        setAccountCreatedCount(accountCreatedData.count);
      } catch (e) {
        console.error(e);
      }
    };
    fetch();
  });

  return (
    <>
      <div className="flex justify-between">
        <div className="flex-1">
          <CountStat
            count={abdanonedCount}
            color={Color.lime}
            eventType="Abandoned Cart"
          />
        </div>
        <div className="flex-1">
          <CountStat
            count={accountCreatedCount}
            color={Color.pink}
            eventType="Account Created"
          />
        </div>
      </div>
    </>
  );
};
