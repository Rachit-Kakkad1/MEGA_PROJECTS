
import React, { useState } from 'react';

interface AuthProps {
  onLogin: (user: any) => void;
}

type AuthMode = 'login' | '2fa' | 'reset' | 'reset-sent';

export const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [twoFactorCode, setTwoFactorCode] = useState(['', '', '', '', '', '']);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In an enterprise app, we'd check if 2FA is enabled for this user
    setMode('2fa');
  };

  const handle2FASubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate verification
    onLogin({
      id: 'u1',
      name: 'John Doe',
      email: email || 'john@enterprise.com',
      role: 'security_engineer'
    });
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMode('reset-sent');
  };

  const handle2FAInput = (value: string, index: number) => {
    if (value.length > 1) value = value[0];
    const newCode = [...twoFactorCode];
    newCode[index] = value;
    setTwoFactorCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`2fa-${index + 1}`);
      nextInput?.focus();
    }
  };

  const renderLogin = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-xl font-semibold text-white mb-2">Sign In</h2>
      <p className="text-slate-500 text-sm mb-8">Access your enterprise security dashboard</p>

      <form onSubmit={handleLoginSubmit} className="space-y-6">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Work Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-slate-200 outline-none focus:ring-1 focus:ring-blue-500 transition-all"
            placeholder="name@company.com"
          />
        </div>
        <div>
          <div className="flex justify-between mb-2">
            <label className="block text-xs font-bold text-slate-500 uppercase">Password</label>
            <button 
              type="button"
              onClick={() => setMode('reset')}
              className="text-[10px] font-bold text-blue-500 hover:text-blue-400 uppercase tracking-wider"
            >
              Forgot Password?
            </button>
          </div>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-slate-200 outline-none focus:ring-1 focus:ring-blue-500 transition-all"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg shadow-lg shadow-blue-900/20 transition-all"
        >
          Continue
        </button>
      </form>

      <div className="mt-8 pt-8 border-t border-slate-800/60 flex flex-col gap-4">
        <button className="w-full flex items-center justify-center gap-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium py-2.5 rounded-lg border border-slate-700/50 transition-all text-sm">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-2.21 5.39-7.84 5.39-4.84 0-8.74-4.01-8.74-8.91s3.9-8.91 8.74-8.91c2.75 0 4.59 1.17 5.64 2.18l2.58-2.49C18.91 1.01 15.93 0 12.48 0 5.58 0 0 5.58 0 12.48s5.58 12.48 12.48 12.48c7.2 0 12-5.06 12-12.21 0-.82-.09-1.44-.24-2.05H12.48z"/></svg>
          Sign in with Google
        </button>
        <button className="w-full flex items-center justify-center gap-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium py-2.5 rounded-lg border border-slate-700/50 transition-all text-sm">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
          Sign in with GitHub
        </button>
      </div>
    </div>
  );

  const render2FA = () => (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex items-center gap-2 mb-2">
        <button onClick={() => setMode('login')} className="text-slate-500 hover:text-white transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <h2 className="text-xl font-semibold text-white">Two-Factor Authentication</h2>
      </div>
      <p className="text-slate-500 text-sm mb-8">Enter the 6-digit code sent to your authenticated device.</p>

      <form onSubmit={handle2FASubmit} className="space-y-8">
        <div className="flex justify-between gap-2">
          {twoFactorCode.map((digit, i) => (
            <input
              key={i}
              id={`2fa-${i}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handle2FAInput(e.target.value, i)}
              className="w-12 h-14 bg-slate-900 border border-slate-800 rounded-lg text-center text-xl font-bold text-blue-400 focus:border-blue-500 outline-none transition-all"
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={twoFactorCode.some(d => !d)}
          className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 text-white font-bold py-3 rounded-lg shadow-lg shadow-blue-900/20 transition-all"
        >
          Verify & Sign In
        </button>

        <p className="text-center text-xs text-slate-600">
          Didn't receive a code? <button type="button" className="text-blue-500 hover:underline">Resend</button>
        </p>
      </form>
    </div>
  );

  const renderReset = () => (
    <div className="animate-in fade-in slide-in-from-left-4 duration-500">
      <div className="flex items-center gap-2 mb-2">
        <button onClick={() => setMode('login')} className="text-slate-500 hover:text-white transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <h2 className="text-xl font-semibold text-white">Reset Password</h2>
      </div>
      <p className="text-slate-500 text-sm mb-8">We'll send a recovery link to your work email address.</p>

      <form onSubmit={handleResetSubmit} className="space-y-6">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Email Address</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-slate-200 outline-none focus:ring-1 focus:ring-blue-500 transition-all"
            placeholder="name@company.com"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg shadow-lg shadow-blue-900/20 transition-all"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );

  const renderResetSent = () => (
    <div className="animate-in fade-in zoom-in-95 duration-500 text-center py-4">
      <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
      </div>
      <h2 className="text-xl font-semibold text-white mb-2">Email Sent</h2>
      <p className="text-slate-500 text-sm mb-8">If an account exists for <span className="text-slate-300 font-medium">{email}</span>, you will receive a password reset link shortly.</p>
      
      <button
        onClick={() => setMode('login')}
        className="text-sm font-bold text-blue-500 hover:text-blue-400 uppercase tracking-widest transition-colors"
      >
        Back to Login
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0f1115] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-3 mb-10 select-none">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-900/40">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Guardrail<span className="text-blue-500">AI</span></h1>
        </div>

        <div className="bg-[#1a1d23] border border-slate-800/60 rounded-2xl p-8 shadow-2xl overflow-hidden relative min-h-[460px] flex flex-col">
          {mode === 'login' && renderLogin()}
          {mode === '2fa' && render2FA()}
          {mode === 'reset' && renderReset()}
          {mode === 'reset-sent' && renderResetSent()}
        </div>
        
        <p className="mt-8 text-center text-xs text-slate-600 font-medium">
          &copy; 2025 Guardrail AI Security. Protected by enterprise-grade encryption.
        </p>
      </div>
    </div>
  );
};
