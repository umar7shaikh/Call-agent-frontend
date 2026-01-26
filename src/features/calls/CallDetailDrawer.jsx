import Drawer from '../../components/Drawer'
import Badge from '../../components/Badge'
import { PhoneIcon, ClockIcon, CurrencyRupeeIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'

export default function CallDetailDrawer({ call, isOpen, onClose }) {
    if (!call) return null

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
        ) : null
    }

    return (
        <Drawer
            isOpen={isOpen}
            onClose={onClose}
            title="Call Details"
            description={`Call with ${call.callerName}`}
            size="lg"
        >
            <div className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="glass-card">
                        <div className="flex items-center gap-3 mb-2">
                            <PhoneIcon className="w-5 h-5 text-primary-400" />
                            <span className="text-surface-400 text-sm">Caller</span>
                        </div>
                        <p className="text-white font-medium">{call.callerName}</p>
                        <p className="text-surface-500 text-sm">{call.callerNumber}</p>
                    </div>

                    <div className="glass-card">
                        <div className="flex items-center gap-3 mb-2">
                            <ClockIcon className="w-5 h-5 text-primary-400" />
                            <span className="text-surface-400 text-sm">Duration</span>
                        </div>
                        <p className="text-white font-medium text-2xl">{call.durationFormatted}</p>
                        <p className="text-surface-500 text-sm">{call.duration} seconds</p>
                    </div>

                    <div className="glass-card">
                        <div className="flex items-center gap-3 mb-2">
                            <CurrencyRupeeIcon className="w-5 h-5 text-primary-400" />
                            <span className="text-surface-400 text-sm">Cost</span>
                        </div>
                        <p className="text-white font-medium text-2xl">₹{call.cost.toFixed(2)}</p>
                        <p className="text-surface-500 text-sm">₹4.00/min</p>
                    </div>

                    <div className="glass-card">
                        <div className="flex items-center gap-3 mb-2">
                            <ChatBubbleLeftRightIcon className="w-5 h-5 text-primary-400" />
                            <span className="text-surface-400 text-sm">Sentiment</span>
                        </div>
                        <div className="mt-2">
                            {getSentimentBadge(call.sentiment) || <span className="text-surface-500">Not analyzed</span>}
                        </div>
                    </div>
                </div>

                {/* Metadata */}
                <div className="glass-card space-y-3">
                    <h3 className="font-semibold text-white">Call Information</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="text-surface-400">Agent</p>
                            <p className="text-white">{call.agentName}</p>
                        </div>
                        <div>
                            <p className="text-surface-400">Campaign</p>
                            <p className="text-white">{call.campaignName}</p>
                        </div>
                        <div>
                            <p className="text-surface-400">Direction</p>
                            <Badge variant={call.direction === 'outbound' ? 'purple' : 'info'}>
                                {call.direction}
                            </Badge>
                        </div>
                        <div>
                            <p className="text-surface-400">Status</p>
                            {getStatusBadge(call.status)}
                        </div>
                        <div>
                            <p className="text-surface-400">Time</p>
                            <p className="text-white">
                                {new Date(call.timestamp).toLocaleString('en-IN', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Summary */}
                {call.summary && (
                    <div className="glass-card">
                        <h3 className="font-semibold text-white mb-3">Summary</h3>
                        <p className="text-surface-300 leading-relaxed">{call.summary}</p>
                    </div>
                )}

                {/* Transcript */}
                {call.transcript && (
                    <div className="glass-card">
                        <h3 className="font-semibold text-white mb-3">Transcript</h3>
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                            {call.transcript.split('\n').map((line, index) => {
                                const isAgent = line.startsWith('Agent:')
                                const isCustomer = line.startsWith('Customer:')

                                if (!isAgent && !isCustomer) return null

                                const text = line.replace(/^(Agent:|Customer:)\s*/, '')

                                return (
                                    <div
                                        key={index}
                                        className={`flex ${isAgent ? 'justify-start' : 'justify-end'}`}
                                    >
                                        <div className={`max-w-[80%] rounded-xl px-4 py-3 ${isAgent
                                                ? 'bg-primary-500/20 border border-primary-500/30'
                                                : 'bg-surface-800 border border-surface-700'
                                            }`}>
                                            <p className="text-xs text-surface-400 mb-1">
                                                {isAgent ? 'Agent' : 'Customer'}
                                            </p>
                                            <p className="text-white">{text}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}

                {!call.transcript && call.status === 'no_answer' && (
                    <div className="glass-card text-center py-8">
                        <p className="text-surface-400">No transcript available - call was not answered</p>
                    </div>
                )}
            </div>
        </Drawer>
    )
}
