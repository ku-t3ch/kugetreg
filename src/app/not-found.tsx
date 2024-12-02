import { Button } from "@mantine/core";
import Link from "next/link";

export default async function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-bold text-center">
                    404 - Page Not Found
                </h1>
                <p className="text-center">
                    The page you are looking for does not exist.
                </p>
                <div className="flex justify-center">
                    <Link href="/">
                        <Button variant="light">Back to Home</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}