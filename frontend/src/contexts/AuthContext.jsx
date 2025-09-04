import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Credenciais pré-configuradas
  const ADMIN_CREDENTIALS = {
    email: 'mateusalimenta@hotmail.com',
    password: 'alimentaufba2025'
  };

  useEffect(() => {
    // Verificar se já está logado (localStorage)
    const token = localStorage.getItem('admin_token');
    const userData = localStorage.getItem('admin_user');
    
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
        const userData = {
          email: email,
          name: 'Administrador MICROTECA',
          role: 'admin'
        };
        
        // Simular token JWT
        const token = btoa(JSON.stringify({ ...userData, timestamp: Date.now() }));
        
        localStorage.setItem('admin_token', token);
        localStorage.setItem('admin_user', JSON.stringify(userData));
        
        setIsAuthenticated(true);
        setUser(userData);
        
        return { success: true };
      } else {
        return { 
          success: false, 
          error: 'Credenciais inválidas. Verifique o email e senha.' 
        };
      }
    } catch (error) {
      return { 
        success: false, 
        error: 'Erro interno do sistema. Tente novamente.' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    setIsAuthenticated(false);
    setUser(null);
  };

  const resetPassword = async (email) => {
    // Simular envio de email de redefinição
    if (email === ADMIN_CREDENTIALS.email) {
      return { 
        success: true, 
        message: 'Instruções de redefinição de senha enviadas para o email.' 
      };
    } else {
      return { 
        success: false, 
        error: 'Email não encontrado no sistema.' 
      };
    }
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};