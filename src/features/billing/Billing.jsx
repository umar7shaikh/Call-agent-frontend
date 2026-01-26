import { useState } from 'react'
import { PlusIcon, WalletIcon, ClockIcon, CurrencyRupeeIcon, ChartBarIcon } from '@heroicons/react/24/outline'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import StatCard from '../../components/StatCard'
import { Card, CardHeader, CardTitle } from '../../components/Card'
import Button from '../../components/Button'
import Badge from '../../components/Badge'
import AddCreditsModal from './AddCreditsModal'
import { mockBilling, mockUsageHistory, mockCreditHistory } from '../../lib/mockData'

export default function Billing() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const stats = [
        {
            title: 'Available Balance',
            value: `₹${mockBilling.balance.toLocaleString()}`,
            icon: WalletIcon,
            colorClass: mockBilling.balance > 5000 ? 'from-emerald-500 to-teal-500' : 'from-amber-500 to-orange-500',
            valueColorClass: mockBilling.balance > 5000 ? 'text-emerald-400' : 'text-amber-400',
        },
        {
            title: 'Total Purchased',
            value: `₹${mockBilling.totalPurchased.toLocaleString()}`,
            icon: CurrencyRupeeIcon,
            colorClass: 'from-blue-500 to-cyan-500',
        },
        {
            title: 'Used This Month',
            value: `₹${mockBilling.usedThisMonth.toLocaleString()}`,
            icon: ChartBarIcon,
            trend: 'up',
            trendValue: '+12%',
            trendLabel: 'vs last month',
            colorClass: 'from-primary-500 to-accent-500',
        },
        {
            title: 'Minutes This Month',
            value: mockBilling.minutesThisMonth.toLocaleString(),
            icon: ClockIcon,
            colorClass: 'from-violet-500 to-purple-500',
        },
    ]

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Billing & Wallet</h1>
                    <p className="text-surface-400 mt-1">Manage your credits and view usage</p>
                </div>
                <Button icon={PlusIcon} onClick={() => setIsModalOpen(true)}>
                    Add Credits
                </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                    <div key={stat.title} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                        <StatCard {...stat} />
                    </div>
                ))}
            </div>

            {/* Usage Chart */}
            <Card>
                <CardHeader>
                    <CardTitle>Usage Over Time</CardTitle>
                    <div className="flex gap-4 text-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-primary-500" />
                            <span className="text-surface-400">Minutes</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-accent-500" />
                            <span className="text-surface-400">Cost (₹)</span>
                        </div>
                    </div>
                </CardHeader>

                <div className="h-80 mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={mockUsageHistory}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                            <XAxis
                                dataKey="date"
                                stroke="#71717a"
                                tickFormatter={(value) => new Date(value).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                            />
                            <YAxis stroke="#71717a" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#18181b',
                                    border: '1px solid #3f3f46',
                                    borderRadius: '12px',
                                    color: '#fff'
                                }}
                                labelFormatter={(value) => new Date(value).toLocaleDateString('en-IN', {
                                    day: 'numeric',
                                    month: 'long'
                                })}
                            />
                            <Line
                                type="monotone"
                                dataKey="minutes"
                                stroke="#8b5cf6"
                                strokeWidth={2}
                                dot={{ fill: '#8b5cf6', r: 4 }}
                                activeDot={{ r: 6 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="cost"
                                stroke="#d946ef"
                                strokeWidth={2}
                                dot={{ fill: '#d946ef', r: 4 }}
                                activeDot={{ r: 6 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </Card>

            {/* Credit History */}
            <Card>
                <CardHeader>
                    <CardTitle>Credit Activity</CardTitle>
                </CardHeader>

                <div className="table-container mt-4">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Type</th>
                                <th>Description</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockCreditHistory.map((credit) => (
                                <tr key={credit.id}>
                                    <td className="text-surface-300">
                                        {new Date(credit.date).toLocaleDateString('en-IN', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric'
                                        })}
                                    </td>
                                    <td>
                                        <Badge variant={credit.type === 'topup' ? 'success' : 'gray'}>
                                            {credit.type === 'topup' ? 'Top-up' : 'Usage'}
                                        </Badge>
                                    </td>
                                    <td className="text-surface-300">{credit.description}</td>
                                    <td>
                                        <span className={`font-semibold ${credit.amount > 0 ? 'text-emerald-400' : 'text-red-400'
                                            }`}>
                                            {credit.amount > 0 ? '+' : ''}₹{Math.abs(credit.amount).toLocaleString()}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Add Credits Modal */}
            <AddCreditsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    )
}
