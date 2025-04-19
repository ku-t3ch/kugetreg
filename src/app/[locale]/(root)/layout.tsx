import { jwtDecode } from 'jwt-decode';
import { getLocale } from 'next-intl/server';

import { redirect } from '@/i18n/routing';
import { auth, signOut } from '@/server/auth';
import { type IMYKUToken } from '@/types/IMYKUToken.type';

export default async function Layout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const session = await auth();
    const locale = await getLocale();

    if (!session || !session.user || !session.user.access_token) {
        return redirect({ href: "/sign-in", locale: locale });
    }

    const payload = jwtDecode<IMYKUToken>(session.user.access_token);

    if (payload.exp * 1000 < Date.now()) {
        void signOut();
        return redirect({ href: "/sign-in", locale: locale });
    }

    return children;
}

export const dynamic = "force-dynamic";
