import { useState } from 'react'
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline'
import Badge from '../../components/Badge'
import Select from '../../components/Select'
import CallDetailDrawer from './CallDetailDrawer'
import { mockCalls, mockAgents, mockCampaigns } from '../../lib/mockData'

export default function CallsLogs() {
    const [searchQuery, setSearchQuery] = useState('')
    const [agentFilter, setAgentFilter] = useState('')
    const [campaignFilter, setCampaignFilter] = useState('')
    const [statusFilter, setStatusFilter] = useState('')
    const [sentimentFilter, setSentimentFilter] = useState('')
    const [selectedCall, setSelectedCall] = useState(null)

    const agentOptions = [
        { value: '', label: 'All Agents' },
        ...mockAgents.map(a => ({ value: a.id, label: a.name }))
    ]

    const campaignOptions = [
        { value: '', label: 'All Campaigns' },
        ...mockCampaigns.map(c => ({ value: c.id, label: c.name }))
    ]

    const statusOptions = [
        { value: '', label: 'All Status' },
        { value: 'completed', label: 'Completed' },
        { value: 'failed', label: 'Failed' },
        { value: 'no_answer', label: 'No Answer' },
    ]

    const sentimentOptions = [
        { value: '', label: 'All Sentiments' },
        { value: 'positive', label: 'Positive' },
        { value: 'neutral', label: 'Neutral' },
        { value: 'negative', label: 'Negative' },
    ]

    const filteredCalls = mockCalls.filter(call => {
        if (searchQuery && !call.callerName.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !call.callerNumber.includes(searchQuery)) return false
        if (agentFilter && call.agentId !== agentFilter) return false
        if (campaignFilter && call.campaignId !== campaignFilter) return false
        if (statusFilter && call.status !== statusFilter) return false
        if (sentimentFilter && call.sentiment !== sentimentFilter) return false
        return true
    })

    const getStatusBadge = (status) => {
        const variants = {
            completed: { variant: 'success', label: 'Completed' },
            failed: { variant: 'error', label: 'Failed' },
            no_answer: { variant: 'warning', label: 'No Answer' },
        }
        const { variant, label } = variants[status] || variants.completed
        return <Badge variant={variant}>{label}</Badge>
    }

    const getSentimentBadge = (sentiment) => {
        const variants = {
            positive: 'success',
            neutral: 'gray',
            negative: 'error',
        }
        return sentiment ? (
            <Badge variant={variants[sentiment]}>{sentiment}</Badge>
        ) : (
            <span className="text-surface-500">—</span>
        )
    }

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-white">Call Logs</h1>
                <p className="text-surface-400 mt-1">View and analyze all call records</p>
            </div>

            {/* Filters */}
            <div className="glass-card">
                <div className="flex flex-col gap-4">
                    {/* Search */}
                    <div className="relative">
                        <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-500" />
                        <input
                            type="text"
                            placeholder="Search by caller name or number..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="input-field pl-12"
                        />
                    </div>

                    {/* Filter dropdowns */}
                    <div className="flex items-center gap-3 flex-wrap">
                        <FunnelIcon className="w-5 h-5 text-surface-400" />
                        <Select
                            value={agentFilter}
                            onChange={setAgentFilter}
                            options={agentOptions}
                            className="w-48"
                        />
                        <Select
                            value={campaignFilter}
                            onChange={setCampaignFilter}
                            options={campaignOptions}
                            className="w-48"
                        />
                        <Select
                            value={statusFilter}
                            onChange={setStatusFilter}
                            options={statusOptions}
                            className="w-40"
                        />
                        <Select
                            value={sentimentFilter}
                            onChange={setSentimentFilter}
                            options={sentimentOptions}
                            className="w-40"
                        />
                    </div>
                </div>
            </div>

            {/* Calls Table */}
            <div className="table-container glass">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Time</th>
                            <th>Agent</th>
                            <th>Campaign</th>
                            <th>Caller</th>
                            <th>Direction</th>
                            <th>Duration</th>
                            <th>Sentiment</th>
                            <th>Cost</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCalls.map((call, index) => (
                            <tr
                                key={call.id}
                                onClick={() => setSelectedCall(call)}
                                className="cursor-pointer animate-slide-up"
                                style={{ animationDelay: `${index * 30}ms` }}
                            >
                                <td className="text-surface-300">
                                    {new Date(call.timestamp).toLocaleString('en-IN', {
                                        day: 'numeric',
                                        month: 'short',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </td>
                                <td className="text-white">{call.agentName}</td>
                                <td className="text-surface-400 text-sm">{call.campaignName}</td>
                                <td>
                                    <div>
                                        <p className="text-white">{call.callerName}</p>
                                        <p className="text-surface-500 text-xs">{call.callerNumber}</p>
                                    </div>
                                </td>
                                <td>
                                    <Badge variant={call.direction === 'outbound' ? 'purple' : 'info'} size="sm">
                                        {call.direction}
                                    </Badge>
                                </td>
                                <td className="text-surface-300">{call.durationFormatted}</td>
                                <td>{getSentimentBadge(call.sentiment)}</td>
                                <td className="text-white font-medium">₹{call.cost.toFixed(2)}</td>
                                <td>{getStatusBadge(call.status)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {filteredCalls.length === 0 && (
                <div className="glass-card text-center py-12">
                    <p className="text-surface-400">No calls found matching your filters</p>
                </div>
            )}

            {/* Call Detail Drawer */}
            <CallDetailDrawer
                call={selectedCall}
                isOpen={!!selectedCall}
                onClose={() => setSelectedCall(null)}
            />
        </div>
    )
}
