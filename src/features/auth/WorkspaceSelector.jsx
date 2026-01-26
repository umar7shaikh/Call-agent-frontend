import { useNavigate } from 'react-router-dom'
import { BuildingStorefrontIcon, HeartIcon, TruckIcon, PlusIcon } from '@heroicons/react/24/outline'
import { mockWorkspaces } from '../../lib/mockData'

const industryIcons = {
    Restaurant: BuildingStorefrontIcon,
    Healthcare: HeartIcon,
    Logistics: TruckIcon,
}

export default function WorkspaceSelector() {
    const navigate = useNavigate()

    const selectWorkspace = (workspace) => {
        navigate(`/app/${workspace.id}/dashboard`)
    }

    return (
        <div className="min-h-screen bg-surface-950 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl animate-fade-in">
                {/* Logo */}
                <div className="flex items-center justify-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                        <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                    </div>
                    <span className="text-2xl font-bold text-white">CallFlux AI</span>
                </div>

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Select a workspace</h1>
                    <p className="text-surface-400">Choose the business you want to manage</p>
                </div>

                <div className="grid gap-4">
                    {mockWorkspaces.map((workspace, index) => {
                        const Icon = industryIcons[workspace.industry] || BuildingStorefrontIcon
                        return (
                            <button
                                key={workspace.id}
                                onClick={() => selectWorkspace(workspace)}
                                className="glass-card flex items-center gap-4 text-left group animate-slide-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-600/20 to-accent-600/20 border border-primary-500/30 flex items-center justify-center group-hover:from-primary-600/30 group-hover:to-accent-600/30 transition-all">
                                    <Icon className="w-7 h-7 text-primary-400" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-white group-hover:text-primary-400 transition-colors">
                                        {workspace.name}
                                    </h3>
                                    <p className="text-surface-400 text-sm">{workspace.industry}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-surface-500 text-xs">Balance</p>
                                    <p className={`font-semibold ${workspace.balance > 5000 ? 'text-emerald-400' : 'text-amber-400'}`}>
                                        ₹{workspace.balance.toLocaleString()}
                                    </p>
                                </div>
                            </button>
                        )
                    })}

                    {/* Create new workspace */}
                    <button className="glass-card flex items-center gap-4 text-left border-dashed hover:border-primary-500/50 transition-colors group">
                        <div className="w-14 h-14 rounded-xl border-2 border-dashed border-surface-600 flex items-center justify-center group-hover:border-primary-500/50 transition-colors">
                            <PlusIcon className="w-6 h-6 text-surface-500 group-hover:text-primary-400 transition-colors" />
                        </div>
                        <div>
                            <h3 className="text-lg font-medium text-surface-400 group-hover:text-white transition-colors">
                                Create new workspace
                            </h3>
                            <p className="text-surface-500 text-sm">Add a new business account</p>
                        </div>
                    </button>
                </div>

                <p className="mt-8 text-center text-surface-500 text-sm">
                    Need help?{' '}
                    <a href="#" className="text-primary-400 hover:text-primary-300">
                        Contact support
                    </a>
                </p>
            </div>
        </div>
    )
}
