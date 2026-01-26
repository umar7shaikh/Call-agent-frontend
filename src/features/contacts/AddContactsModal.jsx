import { useState } from 'react'
import Modal from '../../components/Modal'
import Button from '../../components/Button'
import FormField, { Input, Textarea } from '../../components/FormField'
import { CloudArrowUpIcon } from '@heroicons/react/24/outline'

export default function AddContactsModal({ isOpen, onClose }) {
    const [activeTab, setActiveTab] = useState('manual')
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        tags: '',
        notes: '',
    })
    const [bulkContacts, setBulkContacts] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChange = (field) => (e) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value }))
    }

    const handleSubmit = async () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            onClose()
            setFormData({ name: '', phone: '', tags: '', notes: '' })
            setBulkContacts('')
        }, 1000)
    }

    const validContactCount = bulkContacts
        .split('\n')
        .filter(line => line.trim().match(/^\+?\d{10,}/))
        .length

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Add Contacts"
            description="Import contacts manually or in bulk"
            size="lg"
        >
            <div className="space-y-6">
                {/* Tabs */}
                <div className="flex gap-1 p-1 bg-surface-800/50 rounded-xl">
                    {['manual', 'bulk', 'csv'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${activeTab === tab
                                    ? 'bg-primary-500 text-white'
                                    : 'text-surface-400 hover:text-white'
                                }`}
                        >
                            {tab === 'manual' ? 'Single Contact' : tab === 'bulk' ? 'Bulk Paste' : 'CSV Upload'}
                        </button>
                    ))}
                </div>

                {/* Manual Tab */}
                {activeTab === 'manual' && (
                    <div className="space-y-4">
                        <FormField label="Name" required>
                            <Input
                                value={formData.name}
                                onChange={handleChange('name')}
                                placeholder="John Doe"
                            />
                        </FormField>

                        <FormField label="Phone Number" required>
                            <Input
                                value={formData.phone}
                                onChange={handleChange('phone')}
                                placeholder="+919812345678"
                            />
                        </FormField>

                        <FormField label="Tags" hint="Comma-separated tags">
                            <Input
                                value={formData.tags}
                                onChange={handleChange('tags')}
                                placeholder="COD, Repeat, VIP"
                            />
                        </FormField>

                        <FormField label="Notes">
                            <Textarea
                                value={formData.notes}
                                onChange={handleChange('notes')}
                                placeholder="Additional information..."
                                rows={3}
                            />
                        </FormField>
                    </div>
                )}

                {/* Bulk Tab */}
                {activeTab === 'bulk' && (
                    <div className="space-y-4">
                        <FormField
                            label="Phone Numbers"
                            hint={`${validContactCount} valid numbers detected`}
                        >
                            <Textarea
                                value={bulkContacts}
                                onChange={(e) => setBulkContacts(e.target.value)}
                                placeholder="+919812345678&#10;+919823456789&#10;+919834567890"
                                rows={10}
                            />
                        </FormField>
                        <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
                            <p className="text-blue-400 text-sm">
                                <strong>Format:</strong> One phone number per line. International format (+91...) recommended.
                            </p>
                        </div>
                    </div>
                )}

                {/* CSV Tab */}
                {activeTab === 'csv' && (
                    <div className="space-y-4">
                        <div className="border-2 border-dashed border-surface-700 rounded-xl p-12 text-center hover:border-primary-500/50 transition-colors cursor-pointer">
                            <CloudArrowUpIcon className="w-16 h-16 text-surface-500 mx-auto mb-4" />
                            <p className="text-surface-300 mb-2 text-lg font-medium">
                                Drop your CSV file here or click to browse
                            </p>
                            <p className="text-surface-500 text-sm">
                                Maximum file size: 5MB
                            </p>
                        </div>

                        <div className="glass-card">
                            <h4 className="font-semibold text-white mb-3">CSV Format Requirements</h4>
                            <div className="space-y-2 text-sm">
                                <p className="text-surface-300">
                                    <strong className="text-white">Required columns:</strong> phone_number
                                </p>
                                <p className="text-surface-300">
                                    <strong className="text-white">Optional columns:</strong> name, tags, notes
                                </p>
                                <p className="text-surface-400 text-xs mt-3">
                                    Example: phone_number,name,tags<br />
                                    +919812345678,Rajesh Kumar,COD;Repeat
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-surface-700/50">
                <Button variant="secondary" onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} loading={loading}>
                    {activeTab === 'manual' ? 'Add Contact' : `Import ${activeTab === 'bulk' ? validContactCount : ''} Contacts`}
                </Button>
            </div>
        </Modal>
    )
}
