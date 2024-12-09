import SchedulePlannerLayout from "./_layouts/SchedulePlannerLayout";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return <SchedulePlannerLayout>{children}</SchedulePlannerLayout>
}
