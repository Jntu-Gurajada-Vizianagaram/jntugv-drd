import React from "react";
import HomeClient from "@/components/home/HomeClient";
import { getNotifications } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function Home() {
  const notifications = await getNotifications();

  return <HomeClient notifications={notifications} referenceTime={Date.now()} />;
}
