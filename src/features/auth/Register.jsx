import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import FormField, { Input } from '../../components/FormField'
import { EnvelopeIcon, LockClosedIcon, UserIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

export default function Register() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleChange = (field) => (e) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match')
            return
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters')
            return
        }

        setLoading(true)

        // Mock registration
        setTimeout(() => {
            navigate('/workspaces')
            setLoading(false)
        }, 1000)
    }

    return (
        <div className="animate-fade-in">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Create account</h2>
                <p className="text-surface-400">Start your 14-day free trial</p>
            </div>

            {error && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                <FormField label="Full name">
                    <div className="relative">
                        <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-500" />
                        <Input
                            type="text"
                            value={formData.name}
                            onChange={handleChange('name')}
                            placeholder="John Doe"
                            className="pl-12"
                        />
                    </div>
                </FormField>

                <FormField label="Email address">
                    <div className="relative">
                        <EnvelopeIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-500" />
                        <Input
                            type="email"
                            value={formData.email}
                            onChange={handleChange('email')}
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
                            value={formData.password}
                            onChange={handleChange('password')}
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

                <FormField label="Confirm password">
                    <div className="relative">
                        <LockClosedIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-500" />
                        <Input
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange('confirmPassword')}
                            placeholder="••••••••"
                            className="pl-12"
                        />
                    </div>
                </FormField>

                <Button type="submit" className="w-full" loading={loading}>
                    Create account
                </Button>
            </form>

            <div className="mt-6 text-center">
                <p className="text-surface-400 text-sm">
                    Already have an account?{' '}
                    <Link to="/login" className="text-primary-400 hover:text-primary-300 font-medium">
                        Sign in
                    </Link>
                </p>
            </div>

            <p className="mt-6 text-xs text-surface-500 text-center">
                By creating an account, you agree to our{' '}
                <a href="#" className="text-surface-400 hover:text-white">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-surface-400 hover:text-white">Privacy Policy</a>
            </p>
        </div>
    )
}
