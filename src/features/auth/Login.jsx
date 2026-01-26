import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import FormField, { Input } from '../../components/FormField'
import { EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

export default function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        // Mock login - in real app, would call API
        setTimeout(() => {
            if (email && password) {
                navigate('/workspaces')
            } else {
                setError('Please enter email and password')
            }
            setLoading(false)
        }, 1000)
    }

    return (
        <div className="animate-fade-in">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Welcome back</h2>
                <p className="text-surface-400">Sign in to your CallFlux AI account</p>
            </div>

            {error && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                <FormField label="Email address">
                    <div className="relative">
                        <EnvelopeIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-500" />
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@company.com"
                            className="pl-12"
                        />
                    </div>
                </FormField>

                <FormField label="Password">
                    <div className="relative">
                        <LockClosedIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-500" />
                        <Input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="pl-12 pr-12"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-surface-500 hover:text-surface-300"
                        >
                            {showPassword ? (
                                <EyeSlashIcon className="w-5 h-5" />
                            ) : (
                                <EyeIcon className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                </FormField>

                <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded border-surface-600 bg-surface-800 text-primary-500 focus:ring-primary-500" />
                        <span className="text-sm text-surface-400">Remember me</span>
                    </label>
                    <a href="#" className="text-sm text-primary-400 hover:text-primary-300">
                        Forgot password?
                    </a>
                </div>

                <Button type="submit" className="w-full" loading={loading}>
                    Sign in
                </Button>
            </form>

            <div className="mt-6 text-center">
                <p className="text-surface-400 text-sm">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-primary-400 hover:text-primary-300 font-medium">
                        Create account
                    </Link>
                </p>
            </div>

            {/* Demo credentials */}
            <div className="mt-8 p-4 rounded-xl bg-surface-800/50 border border-surface-700/50">
                <p className="text-xs text-surface-500 text-center mb-2">Demo credentials</p>
                <p className="text-sm text-surface-300 text-center">
                    Email: <span className="text-white">demo@callflux.ai</span>
                </p>
                <p className="text-sm text-surface-300 text-center">
                    Password: <span className="text-white">demo123</span>
                </p>
            </div>
        </div>
    )
}
