
import React, { useState } from 'react';
import { Mail, Lock, User, ArrowLeft, Loader2, Newspaper, ShieldCheck, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

interface AuthPageProps {
  onLogin: () => void;
  onBack: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onLogin, onBack }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        onLogin();
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: name },
          },
        });
        if (error) throw error;
        setSuccess('Conta criada! Verifique seu e-mail para confirmar o cadastro.');
      }
    } catch (err: any) {
      const msg = err?.message || 'Ocorreu um erro. Tente novamente.';
      if (msg.includes('Invalid login credentials')) {
        setError('E-mail ou senha incorretos.');
      } else if (msg.includes('User already registered')) {
        setError('Este e-mail já está cadastrado. Faça login.');
      } else if (msg.includes('Password should be at least')) {
        setError('A senha deve ter pelo menos 6 caracteres.');
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
        scopes: 'openid email profile',
      },
    });
    if (error) {
      setError(error.message);
      setGoogleLoading(false);
    }
    // Se não houver erro, o browser redireciona para o Google
  };


  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div
            onClick={onBack}
            className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 cursor-pointer font-bold text-sm mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Voltar para o início
          </div>

          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Newspaper className="text-white w-8 h-8" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-slate-900">
            {isLogin ? 'Bem-vindo de volta' : 'Começar a ler agora'}
          </h2>
          <p className="text-slate-500 mt-2">
            {isLogin ? 'Acesse sua conta para ver as notícias.' : 'Crie sua conta para receber a verdade.'}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl border border-slate-100">

          {/* Error / Success Messages */}
          {error && (
            <div className="mb-6 flex items-start gap-3 bg-red-50 border border-red-100 text-red-700 rounded-2xl p-4">
              <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}
          {success && (
            <div className="mb-6 flex items-start gap-3 bg-green-50 border border-green-100 text-green-700 rounded-2xl p-4">
              <ShieldCheck className="w-5 h-5 mt-0.5 shrink-0" />
              <p className="text-sm font-medium">{success}</p>
            </div>
          )}

          {/* Google Sign In Option */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading || googleLoading}
            className="w-full py-4 px-6 border-2 border-slate-100 rounded-2xl flex items-center justify-center gap-4 hover:bg-slate-50 hover:border-slate-200 transition-all mb-6 group"
          >
            {googleLoading ? (
              <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
            ) : (
              <>
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/smartlock/google.svg" alt="Google" className="w-6 h-6" />
                <span className="text-lg font-bold text-slate-700 group-hover:text-slate-900">Entrar com Google</span>
              </>
            )}
          </button>

          <div className="relative flex items-center gap-4 mb-6">
            <div className="flex-grow h-px bg-slate-100"></div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">ou use seu e-mail</span>
            <div className="flex-grow h-px bg-slate-100"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Seu Nome Completo</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Como quer ser chamado?"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-lg outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Seu E-mail</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="exemplo@email.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-lg outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Sua Senha</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-lg outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>
              {isLogin && (
                <button type="button" className="mt-2 text-xs font-bold text-indigo-600 hover:underline ml-1">Esqueceu a senha?</button>
              )}
            </div>

            <button
              disabled={loading || googleLoading}
              className="w-full py-4 bg-indigo-600 text-white rounded-2xl text-lg font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>{isLogin ? 'Entrar no Jornal' : 'Criar minha conta agora'}</>
              )}
            </button>
          </form>

          <div className="mt-8 text-center pt-6 border-t border-slate-50">
            <p className="text-slate-500 mb-2 font-medium">
              {isLogin ? 'Ainda não tem conta?' : 'Já possui uma conta?'}
            </p>
            <button
              onClick={() => { setIsLogin(!isLogin); setError(null); setSuccess(null); }}
              className="text-indigo-600 font-bold hover:underline"
            >
              {isLogin ? 'Criar uma conta nova' : 'Fazer login agora'}
            </button>
          </div>
        </div>

        {/* Security Message */}
        <div className="mt-8 flex items-center justify-center gap-3 text-slate-400">
          <ShieldCheck className="w-5 h-5" />
          <span className="text-sm font-medium">Seus dados estão protegidos com segurança máxima.</span>
        </div>
      </div>
    </div>
  );
};
