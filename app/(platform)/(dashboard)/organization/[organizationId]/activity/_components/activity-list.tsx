import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { ActivityItem } from "@/components/activity-item";
import { Skeleton } from "@/components/ui/skeleton";

export const ActivityList = async () => {
  const { orgId } = auth();

  if (!orgId) {
    redirect("/select-org");
  }

  const auditLogs = await db.auditLog.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  console.log('🚀 ~ ActivityList ~ auditLogs:', auditLogs)

  return (
    <ol className="space-y-4 mt-4">
      {(auditLogs && auditLogs.length > 0) ? (
        auditLogs.map((log) => (
          <ActivityItem key={log.id} data={log} />
        ))
      ) : (
        <p className="hidden last:block text-xs text-center text-muted-foreground">
          No activity found inside this organization
        </p>
      )}
    </ol>
  );
};

ActivityList.Skeleton = function ActivityListSkeleton() {
  return (
    <ol className="space-y-4 mt-4">
      <Skeleton className="w-[80%] h-14" />
      <Skeleton className="w-[50%] h-14" />
      <Skeleton className="w-[70%] h-14" />
      <Skeleton className="w-[80%] h-14" />
      <Skeleton className="w-[75%] h-14" />
    </ol>
  );
};
