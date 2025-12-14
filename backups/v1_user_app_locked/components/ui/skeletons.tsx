export function Skeleton({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={`animate-pulse rounded-md bg-gray-200 dark:bg-gray-800 ${className}`}
            {...props}
        />
    );
}

export function CardSkeleton() {
    return (
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-4">
            <div className="flex justify-between items-start">
                <div className="space-y-2 w-full">
                    <Skeleton className="h-4 w-[150px]" />
                    <Skeleton className="h-8 w-[200px]" />
                </div>
                <Skeleton className="h-10 w-10 rounded-full" />
            </div>
            <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[80%]" />
            </div>
        </div>
    );
}

export function TradeCardSkeleton() {
    return (
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
            <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between">
                <Skeleton className="h-6 w-[100px]" />
                <Skeleton className="h-6 w-[60px]" />
            </div>
            <div className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                </div>
                <Skeleton className="h-20 w-full" />
            </div>
        </div>
    );
}
