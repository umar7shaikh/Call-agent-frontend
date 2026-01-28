import { useState, useCallback } from 'react'
import Drawer from '../../components/Drawer'
import Button from '../../components/Button'
import FormField, { Input, Textarea, Toggle } from '../../components/FormField'
import Select from '../../components/Select'
import { languages, voices } from '../../lib/mockData'
import { XMarkIcon } from '@heroicons/react/24/outline'

export default function NewAgentDrawer({ isOpen, onClose }) {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        type: 'OUTBOUND',
        language: 'hi-IN',
        voice: 'female_1',
        maxDuration: 180,
        enableMaxDuration: true,
        allowInterruptions: true,
        autoGreeting: true,
        autoGoodbye: true,
        greeting: 'Namaste! Main CallFlux AI se bol raha hoon.',
        goodbye: 'Dhanyavaad! Aapka din shubh ho.',
        systemPrompt: '',
        variables: [],
    })
    const [newVariable, setNewVariable] = useState('')
    const [loading, setLoading] = useState(false)

    const languageOptions = languages.map(l => ({ value: l.code, label: l.name }))
    const voiceOptions = voices.map(v => ({ value: v.id, label: v.name }))
    const typeOptions = [
        { value: 'OUTBOUND', label: 'Outbound' },
        { value: 'INBOUND', label: 'Inbound' },
    ]

    const handleChange = useCallback((field) => (e) => {
        const value = e?.target ? e.target.value : e
        setFormData(prev => ({ ...prev, [field]: value }))
    }, [])

    const handleToggle = useCallback((field) => (value) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }, [])

    const addVariable = useCallback(() => {
        if (newVariable.trim() && !formData.variables.includes(newVariable.trim())) {
            setFormData(prev => ({
                ...prev,
                variables: [...prev.variables, newVariable.trim()]
            }))
            setNewVariable('')
        }
    }, [newVariable, formData.variables])

    const removeVariable = useCallback((variable) => {
        setFormData(prev => ({
            ...prev,
            variables: prev.variables.filter(v => v !== variable)
        }))
    }, [])

    const handleSubmit = async () => {
        setLoading(true)
        // Mock API call
        setTimeout(() => {
            setLoading(false)
            onClose()
        }, 1000)
    }

    return (
        <Drawer
            isOpen={isOpen}
            onClose={onClose}
            title="Create New Agent"
            description="Configure your AI calling agent"
            size="lg"
            footer={
                <>
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSubmit} loading={loading}>Create Agent</Button>
                </>
            }
        >
            <div className="space-y-6">
                {/* Basic Info */}
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-surface-300 uppercase tracking-wider">Basic Information</h3>

                    <FormField label="Agent Name" required>
                        <Input
                            value={formData.name}
                            onChange={handleChange('name')}
                            placeholder="e.g., Order Confirmation Bot"
                        />
                    </FormField>

                    <FormField label="Description">
                        <Textarea
                            value={formData.description}
                            onChange={handleChange('description')}
                            placeholder="What does this agent do?"
                            rows={2}
                        />
                    </FormField>

                    <div className="grid grid-cols-2 gap-4">
                        <FormField label="Type" required>
                            <Select
                                value={formData.type}
                                onChange={handleChange('type')}
                                options={typeOptions}
                            />
                        </FormField>

                        <FormField label="Language" required>
                            <Select
                                value={formData.language}
                                onChange={handleChange('language')}
                                options={languageOptions}
                            />
                        </FormField>
                    </div>

                    <FormField label="Voice">
                        <Select
                            value={formData.voice}
                            onChange={handleChange('voice')}
                            options={voiceOptions}
                        />
                    </FormField>
                </div>

                {/* Call Settings */}
                <div className="space-y-4 pt-6 border-t border-surface-700/50">
                    <h3 className="text-sm font-semibold text-surface-300 uppercase tracking-wider">Call Settings</h3>

                    <Toggle
                        label="Enable max call duration"
                        enabled={formData.enableMaxDuration}
                        onChange={handleToggle('enableMaxDuration')}
                    />

                    {formData.enableMaxDuration && (
                        <FormField label="Max Duration (seconds)">
                            <Input
                                type="number"
                                value={formData.maxDuration}
                                onChange={handleChange('maxDuration')}
                                min={30}
                                max={600}
                            />
                        </FormField>
                    )}

                    <Toggle
                        label="Allow interruptions"
                        enabled={formData.allowInterruptions}
                        onChange={handleToggle('allowInterruptions')}
                    />

                    <Toggle
                        label="Auto greeting"
                        enabled={formData.autoGreeting}
                        onChange={handleToggle('autoGreeting')}
                    />

                    {formData.autoGreeting && (
                        <FormField label="Greeting Message">
                            <Textarea
                                value={formData.greeting}
                                onChange={handleChange('greeting')}
                                rows={2}
                            />
                        </FormField>
                    )}

                    <Toggle
                        label="Auto goodbye"
                        enabled={formData.autoGoodbye}
                        onChange={handleToggle('autoGoodbye')}
                    />

                    {formData.autoGoodbye && (
                        <FormField label="Goodbye Message">
                            <Textarea
                                value={formData.goodbye}
                                onChange={handleChange('goodbye')}
                                rows={2}
                            />
                        </FormField>
                    )}
                </div>

                {/* System Prompt */}
                <div className="space-y-4 pt-6 border-t border-surface-700/50">
                    <h3 className="text-sm font-semibold text-surface-300 uppercase tracking-wider">System Prompt</h3>

                    <FormField
                        label="Prompt"
                        required
                        hint="Define the agent's behavior, personality, and objectives"
                    >
                        <Textarea
                            value={formData.systemPrompt}
                            onChange={handleChange('systemPrompt')}
                            placeholder="You are a friendly customer service agent for a restaurant. Your goal is to confirm COD orders..."
                            rows={6}
                        />
                    </FormField>

                    {/* Variables */}
                    <FormField label="Variables" hint="Dynamic values to inject into conversations">
                        <div className="flex gap-2 mb-3">
                            <Input
                                value={newVariable}
                                onChange={(e) => setNewVariable(e.target.value)}
                                placeholder="e.g., customer_name"
                                onKeyPress={(e) => e.key === 'Enter' && addVariable()}
                            />
                            <Button variant="secondary" onClick={addVariable}>Add</Button>
                        </div>

                        {formData.variables.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {formData.variables.map(variable => (
                                    <span
                                        key={variable}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-500/20 text-primary-400 text-sm border border-primary-500/30"
                                    >
                                        {`{{${variable}}}`}
                                        <button
                                            onClick={() => removeVariable(variable)}
                                            className="hover:text-primary-300"
                                        >
                                            <XMarkIcon className="w-4 h-4" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}
                    </FormField>
                </div>
            </div>
        </Drawer>
    )
}
