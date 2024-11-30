import { type SearchParams } from 'next/dist/server/request/search-params';

import { api } from '@/trpc/server';
import TableTheme from '@/app/_components/TableTheme';

export default async function Page(props: {
    searchParams: Promise<SearchParams>;
}) {
    const { major, screenType, id, theme } = await props.searchParams;

    if (!major || !screenType || !id || !theme) {
        return <div>Invalid request</div>;
    }

    const getCourseFromRedis = await api.download.getCourseFromRedis({ id: id.toString() });
    return (
        getCourseFromRedis && (
            <TableTheme scheduleData={getCourseFromRedis} theme={theme?.toString()} />
        )
    );
}
