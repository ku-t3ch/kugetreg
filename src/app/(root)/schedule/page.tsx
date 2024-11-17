import TableCourse from "@/app/_components/TableCourse/TableCourse";
import { api } from "@/trpc/server";

export default async function Page() {
  const apiRoute = await api.stdProfile.getGroupCourse();
  console.log(apiRoute);

  return (
    <div className="overflow-x-auto">
      {apiRoute.results &&
        apiRoute.results.length > 0 &&
        apiRoute.results[0]?.course && (
          <TableCourse scheduleData={apiRoute.results[0]?.course} />
        )}
    </div>
  );
}
