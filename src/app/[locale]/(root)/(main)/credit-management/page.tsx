"use client"
import CreditManagementForm from "./_components/CreditManagementForm/CreditManagementForm";
import { api } from "@/trpc/react";
import { type CreditManagementSchemaType } from "@/schemas/creditManagement/creditManagement.schema";
import { notifications } from "@mantine/notifications";
import { ErrorNotificationData, LoadingNotificationData, SuccessNotificationData } from "@/configs/common/NotificationData/NotificationData";
import { Alert, Box, LoadingOverlay, Title } from "@mantine/core";
import { IconBell } from "@tabler/icons-react";

export default function Page() {
    const getCreditManagement = api.creditManagement.getCreditManagement.useQuery();
    const saveCreditManagement = api.creditManagement.saveCreditManagement.useMutation();

    const handleSave = (data: CreditManagementSchemaType) => {
        const keyNoti = notifications.show(LoadingNotificationData)
        saveCreditManagement.mutate({
            payload: data
        }, {
            onSuccess: () => {
                notifications.update({ id: keyNoti, ...SuccessNotificationData, message: "บันทึกข้อมูลเรียบร้อยแล้ว", });
            },
            onError: (error) => {
                if (error instanceof Error) {
                    notifications.update({ id: keyNoti, ...ErrorNotificationData, message: error.message });
                }
            }
        });
    }

    return (
        <Box pos="relative">
            <Alert title={<Title order={4}>คําแนะนํา</Title>} color="blue" mb="md" icon={<IconBell size={30} />} radius="md">
                <p>คุณสามารถกรอกหมวดวิชาหรือรายวิชาตามเอกสารโครงสร้างหลักสูตร
                    {[
                        {
                            link: "https://cpe.ku.ac.th/wp-content/uploads/2024/01/cpe_summary_short.pdf",
                            name: "ตัวอย่างที่ 1"
                        },
                        {
                            link: "https://registrar.ku.ac.th/wp-content/uploads/2023/04/18.63.B.A.English.pdf.pdf#page=13",
                            name: "ตัวอย่างที่ 2 (หน้า 13)"
                        },
                        {
                            link: "https://envi.ku.ac.th/wp-content/uploads/2022/01/-7.pdf-7.pdf#page=3",
                            name: "ตัวอย่างที่ 3 (หน้า 3)"
                        },
                        {
                            link: "https://forest.ku.ac.th/wp-content/uploads/2024/09/2_%E0%B8%A3%E0%B8%B2%E0%B8%A2%E0%B8%A5%E0%B8%B0%E0%B9%80%E0%B8%AD%E0%B8%B5%E0%B8%A2%E0%B8%94%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B8%AB%E0%B8%A5%E0%B8%B1%E0%B8%81%E0%B8%AA%E0%B8%B9%E0%B8%95%E0%B8%A3-%E0%B8%A7%E0%B8%97.%E0%B8%9A.%E0%B8%A7%E0%B8%99%E0%B8%A8%E0%B8%B2%E0%B8%AA%E0%B8%95%E0%B8%A3%E0%B9%8C-%E0%B8%9E.%E0%B8%A8.2567.pdf#page=25",
                            name: "ตัวอย่างที่ 4 (หน้า 25)"
                        }
                    ].map((item, index) => (
                        <a key={index} className="underline text-blue-400 ml-3 font-bold"
                            href={item.link}
                            target="_blank"
                        >
                            {item.name}
                        </a>
                    ))}
                </p>
            </Alert>
            <Alert title={<Title order={4}>หมายเหตุ</Title>} color="red" mb="md" icon={<IconBell size={30} />} radius="md">
                <p>โปรดตรวจสอบกับทางมหาวิทยาลัยอีกครั้งเพื่อยื่นจบ</p>
            </Alert>
            <LoadingOverlay visible={getCreditManagement.isPending} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
            <CreditManagementForm type="edit" onFinish={handleSave} data={getCreditManagement.data ?? undefined} />
        </Box>
    )
}