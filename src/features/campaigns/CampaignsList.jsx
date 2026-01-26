import { useState } from 'react'
import { PlusIcon, MagnifyingGlassIcon, PlayIcon, PauseIcon, EyeIcon } from '@heroicons/react/24/outline'
import Button from '../../components/Button'
import Badge from '../../components/Badge'
import NewCampaignModal from './NewCampaignModal'
import { mockCampaigns } from '../../lib/mockData'

const statusTabs = [
    { key: 'all', label: 'All' },
    { key: 'running', label: 'Running' },
    { key: 'paused', label: 'Paused' },
    { key: 'completed', label: 'Completed' },
    { key: 'created', label: 'Created' },
]

export default function CampaignsList() {
    const [activeTab, setActiveTab] = useState('all')
    const [searchQuery, setSearchQuery] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)

    const filteredCampaigns = mockCampaigns.filter(campaign => {
        if (activeTab !== 'all' && campaign.status !== activeTab) return false
        if (searchQuery && !campaign.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
        return true
    })

    const getStatusBadge = (status) => {
        const variants = {
            running: { variant: 'success', label: 'Running' },
            paused: { variant: 'warning', label: 'Paused' },
            completed: { variant: 'info', label: 'Completed' },
            created: { variant: 'gray', label: 'Created' },
        }
        const { variant, label } = variants[status] || variants.created
        return <Badge variant={variant} dot>{label}</Badge>
    }

    const getProgressPercent = (campaign) => {
        return Math.round((campaign.completedCalls / campaign.totalContacts) * 100)
    }

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Campaigns</h1>
                    <p className="text-surface-400 mt-1">Manage bulk calling campaigns</p>
                </div>
                <Button icon={PlusIcon} onClick={() => setIsModalOpen(true)}>
                    New Campaign
                </Button>
            </div>

            {/* Filters */}
            <div className="glass-card">
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Status Tabs */}
                    <div className="flex gap-1 p-1 bg-surface-800/50 rounded-xl overflow-x-auto">
                        {statusTabs.map(tab => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${activeTab === tab.key
                                        ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                                        : 'text-surface-400 hover:text-white hover:bg-surface-700/50'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="flex-1 relative">
                        <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-500" />
                        <input
                            type="text"
                            placeholder="Search campaigns..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="input-field pl-12"
                        />
                    </div>
                </div>
            </div>

            {/* Campaigns Table */}
            <div className="table-container glass">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Campaign</th>
                            <th>Agent</th>
                            <th>Progress</th>
                            <th>Success Rate</th>
                            <th>Status</th>
                            <th>Created</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCampaigns.map((campaign, index) => (
                            <tr
                                key={campaign.id}
                                className="animate-slide-up"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <td>
                                    <div>
                                        <p className="font-medium text-white">{campaign.name}</p>
                                        <p className="text-xs text-surface-500">{campaign.description}</p>
                                    </div>
                                </td>
                                <td className="text-surface-300">{campaign.agentName}</td>
                                <td>
                                    <div className="w-32">
                                        <div className="flex justify-between text-xs mb-1">
                                            <span className="text-surface-400">{campaign.completedCalls}/{campaign.totalContacts}</span>
                                            <span className="text-white">{getProgressPercent(campaign)}%</span>
                                        </div>
                                        <div className="h-2 bg-surface-700 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full transition-all duration-500"
                                                style={{ width: `${getProgressPercent(campaign)}%` }}
                                            />
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span className={`font-medium ${campaign.successRate >= 80 ? 'text-emerald-400' : campaign.successRate >= 60 ? 'text-amber-400' : 'text-red-400'}`}>
                                        {campaign.successRate}%
                                    </span>
                                </td>
                                <td>{getStatusBadge(campaign.status)}</td>
                                <td className="text-surface-400">
                                    {new Date(campaign.createdAt).toLocaleDateString('en-IN', {
                                        day: 'numeric',
                                        month: 'short'
                                    })}
                                </td>
                                <td>
                                    <div className="flex gap-1">
                                        {campaign.status === 'running' ? (
                                            <button className="p-2 rounded-lg text-amber-400 hover:bg-amber-500/20 transition-colors" title="Pause">
                                                <PauseIcon className="w-4 h-4" />
                                            </button>
                                        ) : campaign.status === 'paused' || campaign.status === 'created' ? (
                                            <button className="p-2 rounded-lg text-emerald-400 hover:bg-emerald-500/20 transition-colors" title="Start">
                                                <PlayIcon className="w-4 h-4" />
                                            </button>
                                        ) : null}
                                        <button className="p-2 rounded-lg text-surface-400 hover:text-white hover:bg-surface-800 transition-colors" title="View Details">
                                            <EyeIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {filteredCampaigns.length === 0 && (
                <div className="glass-card text-center py-12">
                    <p className="text-surface-400">No campaigns found</p>
                    <Button variant="secondary" className="mt-4" onClick={() => setIsModalOpen(true)}>
                        Create your first campaign
                    </Button>
                </div>
            )}

            {/* New Campaign Modal */}
            <NewCampaignModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    )
}
