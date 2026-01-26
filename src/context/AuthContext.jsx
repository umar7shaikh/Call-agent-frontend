import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [user, setUser] = useState({
        id: '1',
        name: 'Demo User',
        email: 'demo@callflux.ai',
        avatar: null,
    })

    const [currentWorkspace, setCurrentWorkspace] = useState({
        id: 'ws_demo',
        name: 'Demo Restaurant',
        industry: 'Restaurant',
        logo: null,
    })

    const login = async (email, password) => {
        // Mock login
        setUser({
            id: '1',
            name: 'Demo User',
            email: email,
            avatar: null,
        })
        return true
    }

    const logout = () => {
        setUser(null)
        setCurrentWorkspace(null)
    }

    const selectWorkspace = (workspace) => {
        setCurrentWorkspace(workspace)
    }

    return (
        <AuthContext.Provider value={{
            user,
            currentWorkspace,
            login,
            logout,
            selectWorkspace,
            isAuthenticated: !!user
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
