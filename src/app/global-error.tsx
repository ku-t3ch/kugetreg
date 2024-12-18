'use client' // Error boundaries must be Client Components

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <html>
            <body>
                <div className="flex min-h-screen flex-col items-center justify-center bg-white text-zinc-900">
                    <div className="flex flex-col gap-3">
                        <h2 className="text-xl font-bold">Something went wrong!</h2>
                        <p className="font-bold">Error: <span className="font-normal text-red-600">{error.message}</span></p>
                        <div className="flex gap-2">แจ้งปัญหามาที่ <a target="_blank" href="https://www.instagram.com/teerut_1t" className="font-bold text-blue-500 underline">teerut_1t</a></div>
                        <button onClick={() => reset()} className="rounded-xl bg-sky-400 p-2 text-white">Try again</button>
                    </div>
                </div>
            </body>
        </html>
    )
}