export function Card({ children, className = '', hover = true, ...props }) {
    return (
        <div
            className={`
        glass-card
        ${hover ? 'hover:border-primary-500/30 hover:shadow-glow' : ''}
        ${className}
      `}
            {...props}
        >
            {children}
        </div>
    )
}

export function CardHeader({ children, className = '' }) {
    return (
        <div className={`flex items-center justify-between mb-4 ${className}`}>
            {children}
        </div>
    )
}

export function CardTitle({ children, className = '' }) {
    return (
        <h3 className={`text-lg font-semibold text-white ${className}`}>
            {children}
        </h3>
    )
}

export function CardDescription({ children, className = '' }) {
    return (
        <p className={`text-sm text-surface-400 ${className}`}>
            {children}
        </p>
    )
}

export function CardContent({ children, className = '' }) {
    return (
        <div className={className}>
            {children}
        </div>
    )
}
