"use client";

import "@/styles/print-landscape.css"
import TableTheme from '@/app/[locale]/_components/TableTheme';
import { useSearchParams } from 'next/navigation';
import { api } from '@/trpc/react';

export default function Page() {
    const searchParams = useSearchParams()

    const id = searchParams.get("id");
    const theme = searchParams.get("theme");
    const major = searchParams.get("major");

    const courseFromRedis = api.download.getCourseFromRedis.useQuery({ id: id?.toString() ?? "" })

    return (
        <TableTheme isExport={true} scheduleData={courseFromRedis.data ?? []} theme={theme?.toString()} major={major?.toString()} />
    );
}