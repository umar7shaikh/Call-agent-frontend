import { ChevronUpDownIcon } from '@heroicons/react/24/outline'

export default function Table({
    columns,
    data,
    onRowClick,
    emptyMessage = 'No data available',
    loading = false
}) {
    if (loading) {
        return (
            <div className="table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            {columns.map((col) => (
                                <th key={col.key}>{col.label}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {[...Array(5)].map((_, i) => (
                            <tr key={i}>
                                {columns.map((col) => (
                                    <td key={col.key}>
                                        <div className="h-4 w-24 shimmer rounded" />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }

    if (!data || data.length === 0) {
        return (
            <div className="glass-card text-center py-12">
                <p className="text-surface-400">{emptyMessage}</p>
            </div>
        )
    }

    return (
        <div className="table-container">
            <table className="data-table">
                <thead>
                    <tr>
                        {columns.map((col) => (
                            <th key={col.key}>
                                <div className="flex items-center gap-2">
                                    {col.label}
                                    {col.sortable && (
                                        <ChevronUpDownIcon className="w-4 h-4 text-surface-500" />
                                    )}
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr
                            key={row.id || rowIndex}
                            onClick={() => onRowClick?.(row)}
                            className={onRowClick ? 'cursor-pointer' : ''}
                        >
                            {columns.map((col) => (
                                <td key={col.key}>
                                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
