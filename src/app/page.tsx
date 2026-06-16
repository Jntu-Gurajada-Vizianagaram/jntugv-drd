import React from "react";
import HomeClient from "@/components/home/HomeClient";
import { getNotifications } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function Home() {
  let notifications: Awaited<ReturnType<typeof getNotifications>> = [];

  try {
    notifications = await getNotifications();
  } catch (error) {
    console.error('Failed to load home notifications:', error);
  }

  return <HomeClient notifications={notifications} referenceTime={Date.now()} />;
}
