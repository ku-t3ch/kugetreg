import { format } from 'date-fns';
import _ from 'lodash';
import { type SearchParams } from 'next/dist/server/request/search-params';

import { api } from '@/trpc/server';

export default async function Page(props: {
    searchParams: Promise<SearchParams>;
}) {
    const { major, screenType, id } = await props.searchParams;

    if (!major || !screenType || !id) {
        return <div>Invalid request</div>;
    }

    const getCourseFromRedis = await api.download.getCourseFromRedis({ id: id.toString() });
    console.log("getCourseFromRedis", getCourseFromRedis);

    const courseData = _.uniqBy(getCourseFromRedis, (x) => x.subject_code + x.max_credit);

    return (

        <div id="capture" className="receiptContainer flex w-[25rem] flex-col thermal-receipt">
            <div className="flex flex-col items-center">
                <div>*****************************************</div>
                <div className="text-2xl thermal-receipt">Receipt</div>
                <div>*****************************************</div>
            </div>
            <div className="thermal-receipt">ORDER #0001 FOR {major}</div>
            <div className="thermal-receipt">{format(new Date(), "EEEE, LLLL d, u")}</div>
            <div className="my-2 w-full border-b-2 border-dashed border-black"></div>
            <div className="flex justify-between">
                <div className="flex gap-3">
                    <div className="thermal-receipt">QTY</div>
                    <div className="thermal-receipt">Item</div>
                </div>
            </div>
            <div className="my-2 w-full border-b-2 border-dashed border-black"></div>
            <div className="my-3 flex flex-col">
                {courseData.map((course, index) => (
                    <div key={index} className="flex justify-between">
                        <div className="flex gap-2">
                            <div className="min-w-[35px] thermal-receipt">{String(index + 1).padStart(2, "0")}</div>
                            <div className="w-full">
                                <div className="flex flex-col">
                                    <div className="font-medium thermal-receipt">{course.subject_code}</div>
                                    <div className="thermal-receipt">{course.subject_name_en}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="my-2 w-full border-b-2 border-dashed border-black"></div>
            <div className="flex flex-col">
                <div className="flex justify-between">
                    <div className="thermal-receipt">Item Count</div>
                    <div className="thermal-receipt">{getCourseFromRedis.length}</div>
                </div>
            </div>
            <div className="my-2 w-full border-b-2 border-dashed border-black"></div>
            <div className="flex flex-col items-center justify-center whitespace-nowrap text-base-content">
                <div className="flex w-full flex-col items-center justify-center px-5">
                    <div className="uppercase thermal-receipt">Thank you for visiting!!</div>
                    <img src="/barcode.svg" />
                    <div>kugetreg.teerut.com</div>
                </div>
            </div>
        </div>
    );
}
