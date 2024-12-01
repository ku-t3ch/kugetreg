import { type SearchParams } from 'next/dist/server/request/search-params';

import { api } from '@/trpc/server';
import TableTheme from '@/app/_components/TableTheme';

export default async function Page(props: {
    searchParams: Promise<SearchParams>;
}) {
    const { major, id, theme } = await props.searchParams;

    if (!major || !id || !theme) {
        return <div>Invalid request</div>;
    }

    const getCourseFromRedis = await api.download.getCourseFromRedis({ id: id.toString() });
    return (
        <TableTheme isExport={true} scheduleData={getCourseFromRedis ?? []} theme={theme?.toString()} />
    );
}
