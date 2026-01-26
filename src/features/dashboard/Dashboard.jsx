import {
    WalletIcon,
    ClockIcon,
    PhoneIcon,
    ChartBarIcon,
    PlayIcon,
    PauseIcon,
    ArrowRightIcon
} from '@heroicons/react/24/outline'
import { Link, useParams } from 'react-router-dom'
import StatCard from '../../components/StatCard'
import { Card, CardHeader, CardTitle } from '../../components/Card'
import Badge from '../../components/Badge'
import Button from '../../components/Button'
import { mockAgents, mockCampaigns, mockCalls, mockBilling } from '../../lib/mockData'

export default function Dashboard() {
    const { workspaceId } = useParams()

    const stats = [
        {
            title: 'Wallet Balance',
            value: `₹${mockBilling.balance.toLocaleString()}`,
            icon: WalletIcon,
            trend: 'down',
            trendValue: '₹356',
            trendLabel: 'used today',
            colorClass: mockBilling.balance > 5000 ? 'from-emerald-500 to-teal-500' : 'from-amber-500 to-orange-500',
            valueColorClass: mockBilling.balance > 5000 ? 'text-emerald-400' : 'text-amber-400',
        },
        {
            title: 'Minutes This Month',
            value: mockBilling.minutesThisMonth.toLocaleString(),
            icon: ClockIcon,
            trend: 'up',
            trendValue: '+12%',
            trendLabel: 'vs last month',
            colorClass: 'from-blue-500 to-cyan-500',
        },
        {
            title: 'Total Calls',
            value: '3,847',
            icon: PhoneIcon,
            trend: 'up',
            trendValue: '+8%',
            trendLabel: 'vs last month',
            colorClass: 'from-primary-500 to-accent-500',
        },
        {
            title: 'Answer Rate',
            value: '78%',
            icon: ChartBarIcon,
            trend: 'up',
            trendValue: '+5%',
            trendLabel: 'improvement',
            colorClass: 'from-violet-500 to-purple-500',
        },
    ]

    const activeCampaigns = mockCampaigns.filter(c => c.status === 'running' || c.status === 'paused')
    const topAgents = mockAgents.filter(a => a.status === 'approved').slice(0, 3)
    const recentCalls = mockCalls.slice(0, 5)

    const getCampaignStatusBadge = (status) => {
        const variants = {
            running: { variant: 'success', label: 'Running' },
            paused: { variant: 'warning', label: 'Paused' },
            completed: { variant: 'info', label: 'Completed' },
            created: { variant: 'gray', label: 'Created' },
        }
        const { variant, label } = variants[status] || variants.created
        return <Badge variant={variant} dot>{label}</Badge>
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

    const getCallStatusBadge = (status) => {
        const variants = {
            completed: { variant: 'success', label: 'Completed' },
            failed: { variant: 'error', label: 'Failed' },
            no_answer: { variant: 'warning', label: 'No Answer' },
        }
        const { variant, label } = variants[status] || variants.completed
        return <Badge variant={variant}>{label}</Badge>
    }

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Page header */}
            <div>
                <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                <p className="text-surface-400 mt-1">Overview of your calling operations</p>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                    <div key={stat.title} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                        <StatCard {...stat} />
                    </div>
                ))}
            </div>

            {/* Middle row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Active Campaigns */}
                <Card>
                    <CardHeader>
                        <CardTitle>Active Campaigns</CardTitle>
                        <Link
                            to={`/app/${workspaceId}/campaigns`}
                            className="text-sm text-primary-400 hover:text-primary-300 flex items-center gap-1"
                        >
                            View all <ArrowRightIcon className="w-4 h-4" />
                        </Link>
                    </CardHeader>

                    <div className="space-y-3">
                        {activeCampaigns.length === 0 ? (
                            <p className="text-surface-500 text-center py-8">No active campaigns</p>
                        ) : (
                            activeCampaigns.map((campaign) => (
                                <div
                                    key={campaign.id}
                                    className="flex items-center justify-between p-4 rounded-xl bg-surface-800/30 border border-surface-700/50 hover:border-surface-600/50 transition-colors"
                                >
                                    <div className="flex items-center gap-4">
                                        <button className={`w-10 h-10 rounded-lg flex items-center justify-center ${campaign.status === 'running'
                                                ? 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30'
                                                : 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
                                            } transition-colors`}>
                                            {campaign.status === 'running' ? (
                                                <PauseIcon className="w-5 h-5" />
                                            ) : (
                                                <PlayIcon className="w-5 h-5" />
                                            )}
                                        </button>
                                        <div>
                                            <p className="font-medium text-white">{campaign.name}</p>
                                            <p className="text-sm text-surface-400">{campaign.agentName}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-white font-medium">{campaign.completedCalls}/{campaign.totalContacts}</p>
                                        <div className="flex items-center gap-2">
                                            {getCampaignStatusBadge(campaign.status)}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </Card>

                {/* Top Agents */}
                <Card>
                    <CardHeader>
                        <CardTitle>Top Agents</CardTitle>
                        <Link
                            to={`/app/${workspaceId}/agents`}
                            className="text-sm text-primary-400 hover:text-primary-300 flex items-center gap-1"
                        >
                            View all <ArrowRightIcon className="w-4 h-4" />
                        </Link>
                    </CardHeader>

                    <div className="space-y-3">
                        {topAgents.map((agent, index) => (
                            <div
                                key={agent.id}
                                className="flex items-center justify-between p-4 rounded-xl bg-surface-800/30 border border-surface-700/50"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white ${index === 0 ? 'bg-gradient-to-br from-amber-500 to-orange-500' :
                                            index === 1 ? 'bg-gradient-to-br from-surface-400 to-surface-500' :
                                                'bg-gradient-to-br from-amber-700 to-amber-800'
                                        }`}>
                                        {index + 1}
                                    </div>
                                    <div>
                                        <p className="font-medium text-white">{agent.name}</p>
                                        <Badge variant="purple" size="sm">{agent.languageName}</Badge>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-white font-medium">{agent.successRate}%</p>
                                    <p className="text-xs text-surface-500">success rate</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Recent Calls */}
            <Card>
                <CardHeader>
                    <CardTitle>Recent Calls</CardTitle>
                    <Link
                        to={`/app/${workspaceId}/calls`}
                        className="text-sm text-primary-400 hover:text-primary-300 flex items-center gap-1"
                    >
                        View all <ArrowRightIcon className="w-4 h-4" />
                    </Link>
                </CardHeader>

                <div className="table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Time</th>
                                <th>Agent</th>
                                <th>Caller</th>
                                <th>Duration</th>
                                <th>Sentiment</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentCalls.map((call) => (
                                <tr key={call.id} className="cursor-pointer">
                                    <td className="text-surface-300">
                                        {new Date(call.timestamp).toLocaleTimeString('en-IN', {
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </td>
                                    <td className="text-white">{call.agentName}</td>
                                    <td>
                                        <div>
                                            <p className="text-white">{call.callerName}</p>
                                            <p className="text-surface-500 text-xs">{call.callerNumber}</p>
                                        </div>
                                    </td>
                                    <td className="text-surface-300">{call.durationFormatted}</td>
                                    <td>{getSentimentBadge(call.sentiment)}</td>
                                    <td>{getCallStatusBadge(call.status)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    )
}
