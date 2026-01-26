const variants = {
    success: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
    warning: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
    error: 'bg-red-500/20 text-red-400 border border-red-500/30',
    info: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
    purple: 'bg-primary-500/20 text-primary-400 border border-primary-500/30',
    gray: 'bg-surface-700/50 text-surface-300 border border-surface-600/50',
}

const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm',
}

export default function Badge({
    children,
    variant = 'gray',
    size = 'md',
    dot = false,
    className = ''
}) {
    return (
        <span className={`
      inline-flex items-center gap-1.5 rounded-full font-medium
      ${variants[variant]}
      ${sizes[size]}
      ${className}
    `}>
            {dot && (
                <span className={`w-1.5 h-1.5 rounded-full ${variant === 'success' ? 'bg-emerald-400' :
                        variant === 'warning' ? 'bg-amber-400' :
                            variant === 'error' ? 'bg-red-400' :
                                variant === 'info' ? 'bg-blue-400' :
                                    variant === 'purple' ? 'bg-primary-400' :
                                        'bg-surface-400'
                    }`} />
            )}
            {children}
        </span>
    )
}
