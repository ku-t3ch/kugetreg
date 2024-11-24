import ScheduleHeader from "./_components/ScheduleHeader/ScheduleHeader";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="flex flex-col gap-3">
            <ScheduleHeader />
            {children}
        </div>
    );
}
