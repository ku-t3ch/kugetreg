import { type SearchParams } from 'next/dist/server/request/search-params';

import { api } from '@/trpc/server';
import TableTheme from '@/app/_components/TableTheme';

export default async function Page(props: {
    searchParams: Promise<SearchParams>;
}) {
    const { major, screenType, id, theme } = await props.searchParams;

    if (!major || !screenType || !id) {
        return <div>Invalid request</div>;
    }

    const getCourseFromRedis = await api.download.getCourseFromRedis({ id: id.toString() });
    return (
        <div className="min-w-fit p-3 flex flex-col gap-2" id="capture">
            <TableTheme scheduleData={getCourseFromRedis ?? []} theme={theme?.toString()} />
            <div>
                Generate by : <span className='font-bold'>kugetreg.teerut.com</span>
            </div>
        </div>
    );
}
