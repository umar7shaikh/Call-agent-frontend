import { useState } from 'react'
import { PlusIcon, MagnifyingGlassIcon, PencilIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline'
import Button from '../../components/Button'
import Badge from '../../components/Badge'
import Select from '../../components/Select'
import NewAgentDrawer from './NewAgentDrawer'
import { mockAgents, languages } from '../../lib/mockData'

export default function AgentsList() {
    const [searchQuery, setSearchQuery] = useState('')
    const [languageFilter, setLanguageFilter] = useState('')
    const [typeFilter, setTypeFilter] = useState('')
    const [statusFilter, setStatusFilter] = useState('')
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    const languageOptions = [
        { value: '', label: 'All Languages' },
        ...languages.map(l => ({ value: l.code, label: l.name }))
    ]

    const typeOptions = [
        { value: '', label: 'All Types' },
        { value: 'INBOUND', label: 'Inbound' },
        { value: 'OUTBOUND', label: 'Outbound' },
    ]

    const statusOptions = [
        { value: '', label: 'All Status' },
        { value: 'approved', label: 'Approved' },
        { value: 'pending', label: 'Pending' },
    ]

    const filteredAgents = mockAgents.filter(agent => {
        if (searchQuery && !agent.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
        if (languageFilter && agent.language !== languageFilter) return false
        if (typeFilter && agent.type !== typeFilter) return false
        if (statusFilter && agent.status !== statusFilter) return false
        return true
    })

    const getStatusBadge = (status) => {
        return status === 'approved'
            ? <Badge variant="success" dot>Approved</Badge>
            : <Badge variant="warning" dot>Pending</Badge>
    }

    const getTypeBadge = (type) => {
        return type === 'INBOUND'
            ? <Badge variant="info">Inbound</Badge>
            : <Badge variant="purple">Outbound</Badge>
    }

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Agents</h1>
                    <p className="text-surface-400 mt-1">Create and manage AI calling agents</p>
                </div>
                <Button icon={PlusIcon} onClick={() => setIsDrawerOpen(true)}>
                    New Agent
                </Button>
            </div>

            {/* Filters */}
            <div className="glass-card">
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1 relative">
                        <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-500" />
                        <input
                            type="text"
                            placeholder="Search agents..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="input-field pl-12"
                        />
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <Select
                            value={languageFilter}
                            onChange={setLanguageFilter}
                            options={languageOptions}
                            placeholder="Language"
                            className="w-40"
                        />
                        <Select
                            value={typeFilter}
                            onChange={setTypeFilter}
                            options={typeOptions}
                            placeholder="Type"
                            className="w-36"
                        />
                        <Select
                            value={statusFilter}
                            onChange={setStatusFilter}
                            options={statusOptions}
                            placeholder="Status"
                            className="w-36"
                        />
                    </div>
                </div>
            </div>

            {/* Agents Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredAgents.map((agent, index) => (
                    <div
                        key={agent.id}
                        className="glass-card group animate-slide-up"
                        style={{ animationDelay: `${index * 50}ms` }}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h3 className="font-semibold text-white group-hover:text-primary-400 transition-colors">
                                    {agent.name}
                                </h3>
                                <p className="text-sm text-surface-400 mt-1">{agent.description}</p>
                            </div>
                            <div className="flex gap-1">
                                <button className="p-2 rounded-lg text-surface-400 hover:text-white hover:bg-surface-800 transition-colors">
                                    <PencilIcon className="w-4 h-4" />
                                </button>
                                <button className="p-2 rounded-lg text-surface-400 hover:text-white hover:bg-surface-800 transition-colors">
                                    <DocumentDuplicateIcon className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                            {getTypeBadge(agent.type)}
                            <Badge variant="gray">{agent.languageName}</Badge>
                            {getStatusBadge(agent.status)}
                        </div>

                        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-surface-700/50">
                            <div>
                                <p className="text-xs text-surface-500">Calls Today</p>
                                <p className="text-lg font-semibold text-white">{agent.callsToday}</p>
                            </div>
                            <div>
                                <p className="text-xs text-surface-500">Success</p>
                                <p className="text-lg font-semibold text-emerald-400">{agent.successRate}%</p>
                            </div>
                            <div>
                                <p className="text-xs text-surface-500">Avg Duration</p>
                                <p className="text-lg font-semibold text-white">{agent.avgDuration}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredAgents.length === 0 && (
                <div className="glass-card text-center py-12">
                    <p className="text-surface-400">No agents found matching your filters</p>
                    <Button variant="secondary" className="mt-4" onClick={() => {
                        setSearchQuery('')
                        setLanguageFilter('')
                        setTypeFilter('')
                        setStatusFilter('')
                    }}>
                        Clear Filters
                    </Button>
                </div>
            )}

            {/* New Agent Drawer */}
            <NewAgentDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
            />
        </div>
    )
}
