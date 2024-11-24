import { type SearchParams } from 'next/dist/server/request/search-params';

import TableCourse from '@/app/_components/TableCourse/TableCourse';
import { api } from '@/trpc/server';

export default async function Page(props: {
    searchParams: Promise<SearchParams>;
}) {
    const { major, screenType, id } = await props.searchParams;

    if (!major || !screenType || !id) {
        return <div>Invalid request</div>;
    }

    const getCourseFromRedis = await api.download.getCourseFromRedis({ id: id.toString() });
    return (
        <div id='capture' className="flex flex-col p-3 min-w-[78rem]">
            {getCourseFromRedis && (
                <TableCourse scheduleData={getCourseFromRedis} />
            )}
            <div className="flex justify-between">
                <div>
                    Generate by:{" "}
                    <span className="font-semibold">kugetreg.teerut.com</span>
                </div>
                <div>
                    {major}
                </div>
            </div>
        </div>
    );
}
