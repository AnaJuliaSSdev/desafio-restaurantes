import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  accessToken: string | null;
  updateAccessToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(() => {
    return localStorage.getItem('restaurant:access_token') ?? null;
  });

  const updateAccessToken = (token: string | null) => {
    if (token) {
      localStorage.setItem('restaurant:access_token', token);
    } else {
      localStorage.removeItem('restaurant:access_token');
    }
    setAccessToken(token);
  };

  return (
    <AuthContext.Provider value={{ accessToken, updateAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
