import { Routes, Route, Navigate } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import AppLayout from './layouts/AppLayout'
import Login from './features/auth/Login'
import Register from './features/auth/Register'
import WorkspaceSelector from './features/auth/WorkspaceSelector'
import Dashboard from './features/dashboard/Dashboard'
import AgentsList from './features/agents/AgentsList'
import CampaignsList from './features/campaigns/CampaignsList'
import CallsLogs from './features/calls/CallsLogs'
import Billing from './features/billing/Billing'
import ContactsList from './features/contacts/ContactsList'
import Settings from './features/settings/Settings'

function App() {
    return (
        <Routes>
            {/* Auth routes */}
            <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Route>

            {/* Workspace selector */}
            <Route path="/workspaces" element={<WorkspaceSelector />} />

            {/* App routes */}
            <Route path="/app/:workspaceId" element={<AppLayout />}>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="agents" element={<AgentsList />} />
                <Route path="campaigns" element={<CampaignsList />} />
                <Route path="calls" element={<CallsLogs />} />
                <Route path="billing" element={<Billing />} />
                <Route path="contacts" element={<ContactsList />} />
                <Route path="settings" element={<Settings />} />
            </Route>

            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    )
}

export default App
