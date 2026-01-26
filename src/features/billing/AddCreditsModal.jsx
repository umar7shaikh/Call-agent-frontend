import { useState } from 'react'
import Modal from '../../components/Modal'
import Button from '../../components/Button'
import FormField, { Input } from '../../components/FormField'

const presetAmounts = [1000, 2500, 5000, 10000, 25000, 50000]

export default function AddCreditsModal({ isOpen, onClose }) {
    const [amount, setAmount] = useState('')
    const [loading, setLoading] = useState(false)

    const handlePresetClick = (preset) => {
        setAmount(preset.toString())
    }

    const handleSubmit = async () => {
        setLoading(true)
        // Mock payment processing
        setTimeout(() => {
            setLoading(false)
            onClose()
            setAmount('')
        }, 1500)
    }

    const estimatedMinutes = amount ? Math.floor(parseInt(amount) / 4) : 0

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Add Credits"
            description="Top up your wallet to continue making calls"
            size="md"
        >
            <div className="space-y-6">
                {/* Preset amounts */}
                <div>
                    <label className="block text-sm font-medium text-surface-300 mb-3">
                        Quick Select
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                        {presetAmounts.map((preset) => (
                            <button
                                key={preset}
                                onClick={() => handlePresetClick(preset)}
                                className={`p-4 rounded-xl border-2 transition-all ${amount === preset.toString()
                                        ? 'border-primary-500 bg-primary-500/10'
                                        : 'border-surface-700 hover:border-surface-600 bg-surface-800/30'
                                    }`}
                            >
                                <p className="text-white font-semibold">₹{preset.toLocaleString()}</p>
                                <p className="text-surface-500 text-xs mt-1">
                                    ~{Math.floor(preset / 4)} mins
                                </p>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Custom amount */}
                <FormField label="Custom Amount (₹)">
                    <Input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter amount"
                        min="100"
                        step="100"
                    />
                </FormField>

                {/* Estimate */}
                {amount && (
                    <div className="glass-card">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-surface-400 text-sm">Estimated calling time</p>
                                <p className="text-white text-2xl font-bold mt-1">
                                    {estimatedMinutes} minutes
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-surface-400 text-sm">Rate</p>
                                <p className="text-white font-semibold">₹4.00/min</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Payment info */}
                <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
                    <p className="text-blue-400 text-sm">
                        <strong>Note:</strong> This is a demo. In production, this would integrate with Razorpay or Stripe for payment processing.
                    </p>
                </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-surface-700/50">
                <Button variant="secondary" onClick={onClose}>Cancel</Button>
                <Button
                    onClick={handleSubmit}
                    loading={loading}
                    disabled={!amount || parseInt(amount) < 100}
                >
                    Add ₹{amount ? parseInt(amount).toLocaleString() : '0'}
                </Button>
            </div>
        </Modal>
    )
}
