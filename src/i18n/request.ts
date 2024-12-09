import { auth } from "@/server/auth";
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
  const session = await auth();
  const locale = session?.user.lang ?? "th";

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
