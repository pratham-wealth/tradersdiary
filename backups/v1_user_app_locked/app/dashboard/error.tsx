'use client'

import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] p-4 text-center">
            <h2 className="text-2xl font-bold text-red-500 mb-4">Something went wrong!</h2>
            <div className="bg-red-900/10 border border-red-900/20 p-4 rounded-lg mb-6 max-w-lg">
                <p className="font-mono text-sm text-red-400 break-all">{error.message}</p>
                <p className="text-xs text-red-400/50 mt-2">Digest: {error.digest}</p>
            </div>
            <button
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
                className="px-6 py-3 bg-gold-400 hover:bg-gold-500 text-midnight-950 rounded-xl font-bold transition-colors shadow-lg shadow-gold-400/20"
            >
                Try again
            </button>
        </div>
    )
}
