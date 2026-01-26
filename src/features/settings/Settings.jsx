import { Card, CardHeader, CardTitle } from '../../components/Card'
import FormField, { Input } from '../../components/FormField'
import Button from '../../components/Button'

export default function Settings() {
    return (
        <div className="space-y-6 animate-fade-in max-w-4xl">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-white">Settings</h1>
                <p className="text-surface-400 mt-1">Manage workspace and account settings</p>
            </div>

            {/* Workspace Profile */}
            <Card>
                <CardHeader>
                    <CardTitle>Workspace Profile</CardTitle>
                </CardHeader>

                <div className="space-y-4 mt-4">
                    <FormField label="Business Name">
                        <Input defaultValue="Mumbai Spice Kitchen" />
                    </FormField>

                    <FormField label="Industry">
                        <Input defaultValue="Restaurant" />
                    </FormField>

                    <FormField label="Website">
                        <Input placeholder="https://example.com" />
                    </FormField>

                    <div className="flex justify-end pt-4">
                        <Button>Save Changes</Button>
                    </div>
                </div>
            </Card>

            {/* Telephony Settings */}
            <Card>
                <CardHeader>
                    <CardTitle>Telephony Settings</CardTitle>
                </CardHeader>

                <div className="space-y-4 mt-4">
                    <FormField label="Default From Number">
                        <Input defaultValue="+91 98765 43210" />
                    </FormField>

                    <FormField label="Country">
                        <Input defaultValue="India" />
                    </FormField>

                    <FormField label="Timezone">
                        <Input defaultValue="Asia/Kolkata (IST)" />
                    </FormField>

                    <div className="flex justify-end pt-4">
                        <Button>Save Changes</Button>
                    </div>
                </div>
            </Card>

            {/* Account Settings */}
            <Card>
                <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                </CardHeader>

                <div className="space-y-4 mt-4">
                    <FormField label="Email">
                        <Input type="email" defaultValue="demo@callflux.ai" />
                    </FormField>

                    <FormField label="Full Name">
                        <Input defaultValue="Demo User" />
                    </FormField>

                    <div className="flex justify-end pt-4">
                        <Button>Update Account</Button>
                    </div>
                </div>
            </Card>

            {/* Danger Zone */}
            <Card className="border-red-500/30">
                <CardHeader>
                    <CardTitle className="text-red-400">Danger Zone</CardTitle>
                </CardHeader>

                <div className="space-y-4 mt-4">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-red-500/10 border border-red-500/30">
                        <div>
                            <p className="text-white font-medium">Delete Workspace</p>
                            <p className="text-surface-400 text-sm">Permanently delete this workspace and all data</p>
                        </div>
                        <Button variant="danger">Delete</Button>
                    </div>
                </div>
            </Card>
        </div>
    )
}
