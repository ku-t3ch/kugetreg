"use client";
import { api } from "@/trpc/server";
import { auth } from "@/server/auth";
import TableCourse from "@/app/_components/TableCourse/TableCourse";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();

  const majorCode = searchParams.get("majorCode");
  const majorNameEn = searchParams.get("majorNameEn");
  const id = searchParams.get("id");

  return (
    <div className="flex flex-col p-3">
      {/* {apiRoute.results &&
        apiRoute.results.length > 0 &&
        apiRoute.results[0]?.course && (
          <TableCourse scheduleData={apiRoute.results[0]?.course} />
        )}
      <div className="flex justify-between">
        <div>
          Generate by:{" "}
          <span className="font-semibold">kugetreg.teerut.com</span>
        </div>
        <div>
          {session?.user.student.majorCode} -{" "}
          {session?.user.student.majorNameEn}
        </div>
      </div> */}
    </div>
  );
}
