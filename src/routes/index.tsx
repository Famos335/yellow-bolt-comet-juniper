import { createFileRoute } from "@tanstack/react-router";
import { ScheduleApp } from "@/components/schedule-app";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <ScheduleApp />;
}
