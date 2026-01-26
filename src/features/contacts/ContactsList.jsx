import { useState } from 'react'
import { PlusIcon, MagnifyingGlassIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import Button from '../../components/Button'
import Badge from '../../components/Badge'
import Select from '../../components/Select'
import AddContactsModal from './AddContactsModal'
import { mockContacts } from '../../lib/mockData'

export default function ContactsList() {
    const [searchQuery, setSearchQuery] = useState('')
    const [groupFilter, setGroupFilter] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)

    const groupOptions = [
        { value: '', label: 'All Groups' },
        { value: 'COD', label: 'COD Orders' },
        { value: 'Repeat', label: 'Repeat Customers' },
        { value: 'Patient', label: 'Patients' },
        { value: 'VIP', label: 'VIP' },
    ]

    const filteredContacts = mockContacts.filter(contact => {
        if (searchQuery && !contact.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !contact.phone.includes(searchQuery)) return false
        if (groupFilter && !contact.tags.includes(groupFilter)) return false
        return true
    })

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Contacts</h1>
                    <p className="text-surface-400 mt-1">Manage your contact database</p>
                </div>
                <Button icon={PlusIcon} onClick={() => setIsModalOpen(true)}>
                    Add Contacts
                </Button>
            </div>

            {/* Filters */}
            <div className="glass-card">
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1 relative">
                        <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-500" />
                        <input
                            type="text"
                            placeholder="Search by name or phone number..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="input-field pl-12"
                        />
                    </div>
                    <Select
                        value={groupFilter}
                        onChange={setGroupFilter}
                        options={groupOptions}
                        className="w-48"
                    />
                </div>
            </div>

            {/* Contacts Table */}
            <div className="table-container glass">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Phone Number</th>
                            <th>Tags</th>
                            <th>Last Contacted</th>
                            <th>Source</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredContacts.map((contact, index) => (
                            <tr
                                key={contact.id}
                                className="animate-slide-up"
                                style={{ animationDelay: `${index * 30}ms` }}
                            >
                                <td className="text-white font-medium">{contact.name}</td>
                                <td className="text-surface-300">{contact.phone}</td>
                                <td>
                                    <div className="flex flex-wrap gap-1">
                                        {contact.tags.map(tag => (
                                            <Badge key={tag} variant="purple" size="sm">{tag}</Badge>
                                        ))}
                                    </div>
                                </td>
                                <td className="text-surface-400">
                                    {contact.lastContacted ? new Date(contact.lastContacted).toLocaleDateString('en-IN', {
                                        day: 'numeric',
                                        month: 'short'
                                    }) : '—'}
                                </td>
                                <td>
                                    <Badge variant="gray" size="sm">{contact.source}</Badge>
                                </td>
                                <td>
                                    <div className="flex gap-1">
                                        <button className="p-2 rounded-lg text-surface-400 hover:text-white hover:bg-surface-800 transition-colors">
                                            <PencilIcon className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/20 transition-colors">
                                            <TrashIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {filteredContacts.length === 0 && (
                <div className="glass-card text-center py-12">
                    <p className="text-surface-400">No contacts found</p>
                    <Button variant="secondary" className="mt-4" onClick={() => setIsModalOpen(true)}>
                        Add your first contact
                    </Button>
                </div>
            )}

            {/* Add Contacts Modal */}
            <AddContactsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    )
}
