import { useState } from 'react'
import { Outlet, NavLink, useParams, useNavigate } from 'react-router-dom'
import {
    HomeIcon,
    UserGroupIcon,
    MegaphoneIcon,
    PhoneIcon,
    CreditCardIcon,
    UsersIcon,
    Cog6ToothIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    BellIcon,
    ChevronDownIcon,
    ArrowRightOnRectangleIcon,
    Bars3Icon
} from '@heroicons/react/24/outline'
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'

const navigation = [
    { name: 'Dashboard', href: 'dashboard', icon: HomeIcon },
    { name: 'Agents', href: 'agents', icon: UserGroupIcon },
    { name: 'Campaigns', href: 'campaigns', icon: MegaphoneIcon },
    { name: 'Calls', href: 'calls', icon: PhoneIcon },
    { name: 'Contacts', href: 'contacts', icon: UsersIcon },
    { name: 'Billing', href: 'billing', icon: CreditCardIcon },
    { name: 'Settings', href: 'settings', icon: Cog6ToothIcon },
]

export default function AppLayout() {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const { workspaceId } = useParams()
    const navigate = useNavigate()

    const handleLogout = () => {
        navigate('/login')
    }

    return (
        <div className="min-h-screen bg-surface-950 flex">
            {/* Mobile menu overlay */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        ${sidebarCollapsed ? 'w-20' : 'w-64'}
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        bg-surface-900/50 backdrop-blur-xl border-r border-surface-700/50
        transition-all duration-300 flex flex-col
      `}>
                {/* Logo */}
                <div className="h-16 flex items-center justify-between px-4 border-b border-surface-700/50">
                    <div className={`flex items-center gap-3 ${sidebarCollapsed ? 'justify-center w-full' : ''}`}>
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        </div>
                        {!sidebarCollapsed && <span className="text-lg font-bold text-white">CallFlux</span>}
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
                    {navigation.map((item) => (
                        <NavLink
                            key={item.name}
                            to={`/app/${workspaceId}/${item.href}`}
                            onClick={() => setMobileMenuOpen(false)}
                            className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                ${sidebarCollapsed ? 'justify-center' : ''}
                ${isActive
                                    ? 'text-white bg-gradient-to-r from-primary-600/30 to-transparent border-l-2 border-primary-500'
                                    : 'text-surface-400 hover:text-white hover:bg-surface-800/50'
                                }
              `}
                        >
                            <item.icon className="w-5 h-5 flex-shrink-0" />
                            {!sidebarCollapsed && <span className="font-medium">{item.name}</span>}
                        </NavLink>
                    ))}
                </nav>

                {/* Collapse button */}
                <button
                    onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                    className="hidden lg:flex items-center justify-center h-12 border-t border-surface-700/50 text-surface-400 hover:text-white transition-colors"
                >
                    {sidebarCollapsed ? (
                        <ChevronRightIcon className="w-5 h-5" />
                    ) : (
                        <ChevronLeftIcon className="w-5 h-5" />
                    )}
                </button>
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top bar */}
                <header className="h-16 bg-surface-900/30 backdrop-blur-xl border-b border-surface-700/50 flex items-center justify-between px-4 lg:px-6">
                    {/* Left side */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setMobileMenuOpen(true)}
                            className="lg:hidden p-2 text-surface-400 hover:text-white"
                        >
                            <Bars3Icon className="w-6 h-6" />
                        </button>

                        <div className="hidden sm:block">
                            <h2 className="text-sm text-surface-400">Workspace</h2>
                            <p className="text-white font-medium">Mumbai Spice Kitchen</p>
                        </div>
                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-3">
                        {/* Wallet balance */}
                        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-surface-800/50 rounded-xl border border-surface-700/50">
                            <div className="w-2 h-2 rounded-full bg-emerald-500" />
                            <span className="text-surface-300 text-sm">Balance:</span>
                            <span className="text-white font-semibold">₹12,450</span>
                        </div>

                        {/* Notifications */}
                        <button className="relative p-2.5 rounded-xl bg-surface-800/50 border border-surface-700/50 text-surface-400 hover:text-white transition-colors">
                            <BellIcon className="w-5 h-5" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent-500 rounded-full" />
                        </button>

                        {/* User menu */}
                        <Menu as="div" className="relative">
                            <Menu.Button className="flex items-center gap-2 p-1.5 pr-3 rounded-xl bg-surface-800/50 border border-surface-700/50 hover:border-surface-600 transition-colors">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-medium text-sm">
                                    D
                                </div>
                                <ChevronDownIcon className="w-4 h-4 text-surface-400" />
                            </Menu.Button>

                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right glass rounded-xl shadow-lg focus:outline-none overflow-hidden">
                                    <div className="p-3 border-b border-surface-700/50">
                                        <p className="text-white font-medium">Demo User</p>
                                        <p className="text-surface-400 text-sm">demo@callflux.ai</p>
                                    </div>
                                    <div className="p-2">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    onClick={() => navigate(`/app/${workspaceId}/settings`)}
                                                    className={`${active ? 'bg-surface-800' : ''} flex items-center gap-3 w-full px-3 py-2 rounded-lg text-surface-300 hover:text-white transition-colors`}
                                                >
                                                    <Cog6ToothIcon className="w-5 h-5" />
                                                    Settings
                                                </button>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    onClick={() => navigate('/workspaces')}
                                                    className={`${active ? 'bg-surface-800' : ''} flex items-center gap-3 w-full px-3 py-2 rounded-lg text-surface-300 hover:text-white transition-colors`}
                                                >
                                                    <UserGroupIcon className="w-5 h-5" />
                                                    Switch Workspace
                                                </button>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    onClick={handleLogout}
                                                    className={`${active ? 'bg-surface-800' : ''} flex items-center gap-3 w-full px-3 py-2 rounded-lg text-red-400 hover:text-red-300 transition-colors`}
                                                >
                                                    <ArrowRightOnRectangleIcon className="w-5 h-5" />
                                                    Logout
                                                </button>
                                            )}
                                        </Menu.Item>
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 overflow-auto p-4 lg:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
