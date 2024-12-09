import { redirect } from "@/i18n/routing";
import { getLocale } from "next-intl/server";

export default async function Page() {
    const locale = await getLocale();
    redirect({ href: "/schedule", locale: locale });
}