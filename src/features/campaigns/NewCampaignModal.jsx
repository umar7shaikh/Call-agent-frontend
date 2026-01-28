import { useState, useCallback } from 'react'
import Modal from '../../components/Modal'
import Button from '../../components/Button'
import FormField, { Input, Textarea, Toggle } from '../../components/FormField'
import Select from '../../components/Select'
import { mockAgents } from '../../lib/mockData'
import { CloudArrowUpIcon } from '@heroicons/react/24/outline'

export default function NewCampaignModal({ isOpen, onClose }) {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        agentId: '',
        fromNumber: '+919876543210',
        contactMethod: 'paste',
        contacts: '',
        scheduleNow: true,
        scheduleStart: '09:00',
        scheduleEnd: '18:00',
    })
    const [loading, setLoading] = useState(false)

    const agentOptions = mockAgents
        .filter(a => a.status === 'approved')
        .map(a => ({ value: a.id, label: a.name }))

    const fromNumberOptions = [
        { value: '+919876543210', label: '+91 98765 43210 (Primary)' },
        { value: '+919876543211', label: '+91 98765 43211 (Secondary)' },
    ]

    const handleChange = useCallback((field) => (e) => {
        const value = e?.target ? e.target.value : e
        setFormData(prev => ({ ...prev, [field]: value }))
    }, [])

    const handleToggle = useCallback((field) => (value) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }, [])

    const handleSubmit = async () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            onClose()
        }, 1000)
    }

    const contactCount = formData.contacts
        .split('\n')
        .filter(line => line.trim().match(/^\+?\d{10,}$/))
        .length

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Create New Campaign"
            description="Set up a bulk calling campaign"
            size="lg"
        >
            <div className="space-y-6">
                {/* Campaign Details */}
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-surface-300 uppercase tracking-wider">Campaign Details</h3>

                    <FormField label="Campaign Name" required>
                        <Input
                            value={formData.name}
                            onChange={handleChange('name')}
                            placeholder="e.g., January COD Confirmation"
                        />
                    </FormField>

                    <FormField label="Description">
                        <Textarea
                            value={formData.description}
                            onChange={handleChange('description')}
                            placeholder="What is this campaign for?"
                            rows={2}
                        />
                    </FormField>
                </div>

                {/* Agent & Number */}
                <div className="space-y-4 pt-4 border-t border-surface-700/50">
                    <h3 className="text-sm font-semibold text-surface-300 uppercase tracking-wider">Agent & Number</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField label="Select Agent" required>
                            <Select
                                value={formData.agentId}
                                onChange={handleChange('agentId')}
                                options={agentOptions}
                                placeholder="Choose an agent"
                            />
                        </FormField>

                        <FormField label="From Number">
                            <Select
                                value={formData.fromNumber}
                                onChange={handleChange('fromNumber')}
                                options={fromNumberOptions}
                            />
                        </FormField>
                    </div>
                </div>

                {/* Contacts */}
                <div className="space-y-4 pt-4 border-t border-surface-700/50">
                    <h3 className="text-sm font-semibold text-surface-300 uppercase tracking-wider">Contacts</h3>

                    <div className="flex gap-2 p-1 bg-surface-800/50 rounded-xl">
                        {['paste', 'upload', 'group'].map(method => (
                            <button
                                key={method}
                                onClick={() => setFormData(prev => ({ ...prev, contactMethod: method }))}
                                className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${formData.contactMethod === method
                                    ? 'bg-primary-500 text-white'
                                    : 'text-surface-400 hover:text-white'
                                    }`}
                            >
                                {method === 'paste' ? 'Paste Numbers' : method === 'upload' ? 'Upload CSV' : 'Contact Group'}
                            </button>
                        ))}
                    </div>

                    {formData.contactMethod === 'paste' && (
                        <FormField
                            label="Phone Numbers"
                            hint={`${contactCount} valid numbers detected`}
                        >
                            <Textarea
                                value={formData.contacts}
                                onChange={handleChange('contacts')}
                                placeholder="+919812345678&#10;+919823456789&#10;+919834567890"
                                rows={5}
                            />
                        </FormField>
                    )}

                    {formData.contactMethod === 'upload' && (
                        <div className="border-2 border-dashed border-surface-700 rounded-xl p-8 text-center hover:border-primary-500/50 transition-colors cursor-pointer">
                            <CloudArrowUpIcon className="w-12 h-12 text-surface-500 mx-auto mb-4" />
                            <p className="text-surface-300 mb-1">Drop your CSV file here or click to browse</p>
                            <p className="text-surface-500 text-sm">Required columns: phone_number, name (optional)</p>
                        </div>
                    )}

                    {formData.contactMethod === 'group' && (
                        <FormField label="Select Contact Group">
                            <Select
                                value=""
                                onChange={() => { }}
                                options={[
                                    { value: 'cod_orders', label: 'COD Orders (1,234 contacts)' },
                                    { value: 'repeat', label: 'Repeat Customers (567 contacts)' },
                                ]}
                                placeholder="Choose a group"
                            />
                        </FormField>
                    )}
                </div>

                {/* Schedule */}
                <div className="space-y-4 pt-4 border-t border-surface-700/50">
                    <h3 className="text-sm font-semibold text-surface-300 uppercase tracking-wider">Schedule</h3>

                    <Toggle
                        label="Start immediately"
                        enabled={formData.scheduleNow}
                        onChange={handleToggle('scheduleNow')}
                    />

                    {!formData.scheduleNow && (
                        <div className="grid grid-cols-2 gap-4">
                            <FormField label="Start Time">
                                <Input
                                    type="time"
                                    value={formData.scheduleStart}
                                    onChange={handleChange('scheduleStart')}
                                />
                            </FormField>
                            <FormField label="End Time">
                                <Input
                                    type="time"
                                    value={formData.scheduleEnd}
                                    onChange={handleChange('scheduleEnd')}
                                />
                            </FormField>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-surface-700/50">
                <Button variant="secondary" onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} loading={loading}>Create Campaign</Button>
            </div>
        </Modal>
    )
}
