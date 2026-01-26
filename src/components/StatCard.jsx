import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid'

export default function StatCard({
    title,
    value,
    icon: Icon,
    trend,
    trendValue,
    trendLabel,
    colorClass = 'from-primary-500 to-accent-500',
    valueColorClass = 'text-white'
}) {
    const isPositive = trend === 'up'
    const isNegative = trend === 'down'

    return (
        <div className="stat-card relative overflow-hidden group">
            {/* Background glow effect */}
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${colorClass} opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:opacity-20 transition-opacity`} />

            <div className="relative">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <p className="text-surface-400 text-sm font-medium">{title}</p>
                        <p className={`text-3xl font-bold mt-1 ${valueColorClass}`}>{value}</p>
                    </div>

                    {Icon && (
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClass} flex items-center justify-center shadow-lg`}>
                            <Icon className="w-6 h-6 text-white" />
                        </div>
                    )}
                </div>

                {(trend || trendLabel) && (
                    <div className="flex items-center gap-2">
                        {trend && (
                            <span className={`flex items-center gap-1 text-sm font-medium ${isPositive ? 'text-emerald-400' : isNegative ? 'text-red-400' : 'text-surface-400'
                                }`}>
                                {isPositive && <ArrowUpIcon className="w-4 h-4" />}
                                {isNegative && <ArrowDownIcon className="w-4 h-4" />}
                                {trendValue}
                            </span>
                        )}
                        {trendLabel && (
                            <span className="text-surface-500 text-sm">{trendLabel}</span>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
