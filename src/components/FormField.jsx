export default function FormField({
    label,
    error,
    hint,
    required = false,
    children,
    className = ''
}) {
    return (
        <div className={`space-y-2 ${className}`}>
            {label && (
                <label className="block text-sm font-medium text-surface-300">
                    {label}
                    {required && <span className="text-red-400 ml-1">*</span>}
                </label>
            )}
            {children}
            {hint && !error && (
                <p className="text-xs text-surface-500">{hint}</p>
            )}
            {error && (
                <p className="text-xs text-red-400">{error}</p>
            )}
        </div>
    )
}

export function Input({ className = '', ...props }) {
    return (
        <input
            className={`input-field ${className}`}
            {...props}
        />
    )
}

export function Textarea({ className = '', rows = 4, ...props }) {
    return (
        <textarea
            className={`input-field resize-none ${className}`}
            rows={rows}
            {...props}
        />
    )
}

export function Checkbox({ label, checked, onChange, className = '' }) {
    return (
        <label className={`flex items-center gap-3 cursor-pointer ${className}`}>
            <div className="relative">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    className="sr-only"
                />
                <div className={`
          w-5 h-5 rounded-md border-2 transition-all duration-200
          ${checked
                        ? 'bg-primary-500 border-primary-500'
                        : 'bg-transparent border-surface-600 hover:border-surface-500'
                    }
        `}>
                    {checked && (
                        <svg className="w-full h-full text-white p-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    )}
                </div>
            </div>
            {label && <span className="text-surface-300 text-sm">{label}</span>}
        </label>
    )
}

export function Toggle({ label, enabled, onChange, className = '' }) {
    return (
        <label className={`flex items-center justify-between cursor-pointer ${className}`}>
            {label && <span className="text-surface-300 text-sm">{label}</span>}
            <button
                type="button"
                onClick={() => onChange(!enabled)}
                className={`
          relative inline-flex h-6 w-11 items-center rounded-full transition-colors
          ${enabled ? 'bg-primary-500' : 'bg-surface-700'}
        `}
            >
                <span className={`
          inline-block h-4 w-4 transform rounded-full bg-white transition-transform
          ${enabled ? 'translate-x-6' : 'translate-x-1'}
        `} />
            </button>
        </label>
    )
}
