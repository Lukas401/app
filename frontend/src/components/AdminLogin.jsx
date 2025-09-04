import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Lock, University, Shield, AlertCircle } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [error, setError] = useState('');

  const { login, resetPassword } = useAuth();
  const { toast } = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      setIsLoading(false);
      return;
    }

    const result = await login(email, password);
    
    if (result.success) {
      toast({
        title: "Login realizado com sucesso",
        description: "Bem-vindo ao painel administrativo da MICROTECA",
      });
    } else {
      setError(result.error);
    }
    
    setIsLoading(false);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const result = await resetPassword(resetEmail);
    
    if (result.success) {
      toast({
        title: "Email enviado",
        description: result.message,
      });
      setShowResetPassword(false);
      setResetEmail('');
    } else {
      setError(result.error);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-white p-4 rounded-full w-20 h-20 mx-auto mb-4 shadow-lg flex items-center justify-center">
            <University className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            MICROTECA DE SAÚDE
          </h1>
          <p className="text-gray-600 font-medium">
            Universidade Federal da Bahia
          </p>
          <div className="mt-2 flex items-center justify-center text-sm text-gray-500">
            <Shield className="w-4 h-4 mr-1" />
            Área Administrativa
          </div>
        </div>

        <Card className="shadow-xl border-t-4 border-t-blue-600">
          <CardHeader className="text-center pb-3">
            <CardTitle className="flex items-center justify-center gap-2 text-xl">
              <Lock className="w-5 h-5" />
              Login Administrativo
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            {!showResetPassword ? (
              <form onSubmit={handleLogin} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email do Administrador</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="mateusalimenta@hotmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Digite sua senha"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700" 
                  disabled={isLoading}
                >
                  {isLoading ? 'Entrando...' : 'Entrar no Sistema'}
                </Button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setShowResetPassword(true)}
                    className="text-sm text-blue-600 hover:text-blue-800 underline"
                  >
                    Esqueceu a senha?
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Redefinir Senha
                  </h3>
                  <p className="text-sm text-gray-600">
                    Digite seu email para receber as instruções
                  </p>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="resetEmail">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="resetEmail"
                      type="email"
                      placeholder="mateusalimenta@hotmail.com"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      className="pl-10"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setShowResetPassword(false);
                      setError('');
                      setResetEmail('');
                    }}
                    disabled={isLoading}
                  >
                    Voltar
                  </Button>
                  <Button 
                    type="submit" 
                    className="flex-1 bg-blue-600 hover:bg-blue-700" 
                    disabled={isLoading}
                  >
                    {isLoading ? 'Enviando...' : 'Enviar'}
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Footer Info */}
        <div className="mt-6 text-center text-xs text-gray-500">
          <p>Sistema protegido por autenticação administrativa</p>
          <p className="mt-1">© 2024 Universidade Federal da Bahia</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;