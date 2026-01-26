import { Outlet, Link } from 'react-router-dom'

export default function AuthLayout() {
    return (
        <div className="min-h-screen bg-surface-950 flex">
            {/* Left side - Branding */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-accent-900" />

                {/* Animated circles */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-pulse-slow" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-500/20 rounded-full blur-3xl animate-pulse-slow animation-delay-400" />

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-center px-12 lg:px-16">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-400 to-accent-500 flex items-center justify-center">
                            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        </div>
                        <span className="text-2xl font-bold text-white">CallFlux AI</span>
                    </div>

                    <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                        Automate your calls with{' '}
                        <span className="gradient-text">AI-powered</span> agents
                    </h1>

                    <p className="text-lg text-primary-100/80 mb-8 max-w-md">
                        Create intelligent voice agents, run campaigns at scale, and convert more leads with 24/7 automated calling.
                    </p>

                    <div className="flex gap-8">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white">₹4</div>
                            <div className="text-sm text-primary-200">per minute</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white">10+</div>
                            <div className="text-sm text-primary-200">Indian languages</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white">24/7</div>
                            <div className="text-sm text-primary-200">availability</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right side - Auth form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    {/* Mobile logo */}
                    <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-accent-500 flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold text-white">CallFlux AI</span>
                    </div>

                    <Outlet />
                </div>
            </div>
        </div>
    )
}
