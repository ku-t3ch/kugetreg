import HideCourseSection from './_components/HideCourseSection/HideCourseSection';
import ScheduleHeader from './_components/ScheduleHeader/ScheduleHeader';

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="flex flex-col gap-3">
            <ScheduleHeader />
            {children}
            <HideCourseSection />
        </div>
    );
}
