"use client"
import CreditManagementForm from "./_components/CreditManagementForm/CreditManagementForm";
import { api } from "@/trpc/react";
import { type CreditManagementSchemaType } from "@/schemas/creditManagement/creditManagement.schema";
import { notifications } from "@mantine/notifications";
import { ErrorNotificationData, LoadingNotificationData, SuccessNotificationData } from "@/configs/common/NotificationData/NotificationData";

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
        <>
            {getCreditManagement.data && <CreditManagementForm type="edit" onFinish={handleSave} data={getCreditManagement.data} />}
        </>
    )
}