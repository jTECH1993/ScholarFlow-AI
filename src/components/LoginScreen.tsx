import React, { useState } from 'react';
import { 
  Mail, 
  Lock, 
  User, 
  Building, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  ArrowLeft,
  KeyRound,
  Eye,
  EyeOff,
  BookOpen,
  GraduationCap
} from 'lucide-react';
import { 
  auth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail, 
  updateProfile,
  createUserProfileInFirestore,
  getFriendlyAuthErrorMessage 
} from '../lib/firebase';
import { UserProfile } from '../types';

interface LoginScreenProps {
  onLoginSuccess: (profile: UserProfile) => void;
  onBackToSplash: () => void;
  initialMode?: 'signin' | 'signup' | 'reset';
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onLoginSuccess,
  onBackToSplash,
  initialMode = 'signin',
}) => {
  const [mode, setMode] = useState<'signin' | 'signup' | 'reset'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [organization, setOrganization] = useState('');
  const [role, setRole] = useState<'Academic Researcher' | 'Student' | 'Administrator'>('Academic Researcher');
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [resetSuccessMsg, setResetSuccessMsg] = useState<string | null>(null);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Please enter your institutional email and password.');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    const cleanEmail = email.trim();

    try {
      let firebaseUid = '';
      let userDisplayName = '';
      try {
        const cred = await signInWithEmailAndPassword(auth, cleanEmail, password);
        firebaseUid = cred.user.uid;
        userDisplayName = cred.user.displayName || '';
      } catch (authErr: any) {
        if (
          authErr?.code === 'auth/user-not-found' || 
          authErr?.code === 'auth/invalid-credential' || 
          authErr?.code === 'auth/invalid-login-credentials'
        ) {
          throw new Error('Account not found or password incorrect. If you are registering for the first time, please use the "Register Account" tab.');
        } else {
          throw authErr;
        }
      }

      const derivedName = userDisplayName || cleanEmail.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
      const orgDomain = cleanEmail.includes('@') ? cleanEmail.split('@')[1].split('.')[0].toUpperCase() : 'Academic';

      const profile = await createUserProfileInFirestore(firebaseUid || `user-${Date.now()}`, {
        email: cleanEmail,
        displayName: derivedName,
        role: 'Academic Researcher',
        organization: `${orgDomain} Research Lab`,
        perspectiveId: 'academic-scholar',
        perspectiveName: 'General Academic Scholar & Literature Synthesis',
      });

      localStorage.setItem('scholarflow_user_profile', JSON.stringify(profile));
      localStorage.setItem('vitalpulse_active_user_uid', profile.uid);
      localStorage.setItem(`vitalpulse_user_${profile.uid}`, JSON.stringify(profile));

      if (profile.role === 'Administrator') {
        localStorage.setItem('scholarflow_admin_auth', 'true');
      } else {
        localStorage.removeItem('scholarflow_admin_auth');
      }

      onLoginSuccess(profile);
    } catch (err: any) {
      setErrorMsg(getFriendlyAuthErrorMessage(err?.code || err?.message || 'Authentication failed. Please verify credentials.'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !displayName) {
      setErrorMsg('Please provide your full name, institutional email, and password.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    try {
      const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
      await updateProfile(cred.user, { displayName });

      const profile = await createUserProfileInFirestore(cred.user.uid, {
        email: email.trim(),
        displayName,
        role,
        organization: organization || 'Academic Institution',
        perspectiveId: 'academic-scholar',
        perspectiveName: 'General Academic Scholar & Literature Synthesis',
      });

      localStorage.setItem('scholarflow_user_profile', JSON.stringify(profile));
      localStorage.setItem('vitalpulse_active_user_uid', profile.uid);
      localStorage.setItem(`vitalpulse_user_${profile.uid}`, JSON.stringify(profile));

      if (role === 'Administrator') {
        localStorage.setItem('scholarflow_admin_auth', 'true');
      } else {
        localStorage.removeItem('scholarflow_admin_auth');
      }

      onLoginSuccess(profile);
    } catch (err: any) {
      setErrorMsg(getFriendlyAuthErrorMessage(err?.code || err?.message || 'Registration failed.'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMsg('Please enter your institutional email to receive reset instructions.');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);
    setResetSuccessMsg(null);

    try {
      await sendPasswordResetEmail(auth, email.trim());
      setResetSuccessMsg(`Password reset instructions sent to ${email.trim()}. Please check your inbox.`);
    } catch (err: any) {
      setErrorMsg(getFriendlyAuthErrorMessage(err?.code || err?.message || 'Could not send reset email.'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-900 flex flex-col justify-between relative overflow-hidden font-sans text-slate-100">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -ml-32 -mb-32" />

      {/* Top Academic Header */}
      <header className="relative z-10 border-b border-slate-800 bg-slate-950/60 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-md">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-base font-extrabold tracking-tight text-white">ScholarFlow AI</span>
              <span className="px-2 py-0.5 rounded-full text-3xs font-black bg-teal-500/20 text-teal-300 border border-teal-500/30 uppercase tracking-wider">
                Turnitin-Grade
              </span>
            </div>
            <p className="text-3xs text-slate-400">Universal Academic Research &bull; Evidence-Grounded Literature Intelligence</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onBackToSplash}
          className="px-3.5 py-1.5 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-slate-300 hover:text-white transition-all flex items-center space-x-1.5 cursor-pointer shadow-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Platform Overview</span>
        </button>
      </header>

      {/* Main Authentication Card */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6 my-auto">
        <div className="max-w-md w-full bg-slate-950/90 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-md">
          
          {/* Header Strip inside card */}
          <div className="p-6 bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-3xs font-bold uppercase tracking-wider text-teal-400">
                Institutional Access Portal
              </span>
              <h2 className="text-lg font-bold text-white">
                {mode === 'signin' && 'Sign in to ScholarFlow'}
                {mode === 'signup' && 'Create Academic Account'}
                {mode === 'reset' && 'Password Recovery'}
              </h2>
              <p className="text-2xs text-slate-400">
                Zero-leakage isolated single-LLM sessions
              </p>
            </div>
            <div className="p-2.5 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="grid grid-cols-2 p-1.5 m-6 mb-0 bg-slate-900 rounded-2xl border border-slate-800">
            <button
              type="button"
              onClick={() => {
                setMode('signin');
                setErrorMsg(null);
                setResetSuccessMsg(null);
              }}
              className={`py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                mode === 'signin'
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In to Account
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('signup');
                setErrorMsg(null);
                setResetSuccessMsg(null);
              }}
              className={`py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                mode === 'signup'
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Register Account
            </button>
          </div>

          <div className="p-6 space-y-4">
            {/* Error Message */}
            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800/80 text-rose-200 text-xs flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Success Message */}
            {resetSuccessMsg && (
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/80 text-emerald-200 text-xs flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{resetSuccessMsg}</span>
              </div>
            )}

            {/* Mode: Sign In */}
            {mode === 'signin' && (
              <form onSubmit={handleSignIn} className="space-y-3.5">
                <div>
                  <label className="block text-2xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Institutional Email / Academic ID
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. scholar@university.edu"
                      className="w-full pl-10 pr-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-2xs font-bold uppercase tracking-wider text-slate-300">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setMode('reset')}
                      className="text-3xs text-teal-400 hover:text-teal-300 underline cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full pl-10 pr-10 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
                >
                  <span>{isLoading ? 'Verifying Credentials...' : 'Sign In to Research Interface'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* Mode: Sign Up */}
            {mode === 'signup' && (
              <form onSubmit={handleSignUp} className="space-y-3">
                <div>
                  <label className="block text-2xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Full Scholar Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="e.g. Dr. Jane Doe"
                      className="w-full pl-10 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-2xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Institutional Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="researcher@university.edu"
                      className="w-full pl-10 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-2xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                      Academic Role
                    </label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value as any)}
                      className="w-full p-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-teal-500"
                    >
                      <option value="Academic Researcher">Faculty Researcher</option>
                      <option value="Student">Graduate Student</option>
                      <option value="Administrator">Administrator</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-2xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                      University / Institution
                    </label>
                    <div className="relative">
                      <Building className="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                        placeholder="e.g. Stanford University"
                        className="w-full pl-8 pr-2 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-2xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Create Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="At least 6 characters"
                      className="w-full pl-10 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer mt-2"
                >
                  <span>{isLoading ? 'Creating Academic Profile...' : 'Complete Registration'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* Mode: Reset */}
            {mode === 'reset' && (
              <form onSubmit={handleResetPassword} className="space-y-3">
                <p className="text-2xs text-slate-400">
                  Enter your academic email address and we will dispatch a verified password reset token.
                </p>
                <div>
                  <label className="block text-2xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Account Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. scholar@university.edu"
                      className="w-full pl-10 pr-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
                >
                  <span>{isLoading ? 'Sending Token...' : 'Dispatch Reset Email'}</span>
                  <KeyRound className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setMode('signin')}
                  className="w-full py-2 text-2xs text-slate-400 hover:text-white text-center cursor-pointer"
                >
                  &larr; Back to Sign In
                </button>
              </form>
            )}

            {/* Enterprise Security Architecture Badge (Replacing Demo Logins) */}
            <div className="pt-3 border-t border-slate-800 space-y-2">
              <div className="p-3 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-1.5">
                <div className="flex items-center space-x-2 text-teal-400 text-3xs font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Institutional Multi-Tenant Architecture</span>
                </div>
                <p className="text-3xs text-slate-400 leading-relaxed">
                  Individual accounts are authenticated and cryptographically isolated. Document chunks, custom embeddings, and RAG session memories remain strictly partition-locked to your user account.
                </p>
                <div className="flex items-center space-x-2 pt-1 text-4xs font-mono text-slate-500">
                  <span>SSL 256-BIT</span>
                  <span>&bull;</span>
                  <span>ZERO-CROSS-LEAKAGE</span>
                  <span>&bull;</span>
                  <span>SOC2 TYPE II ALIGNED</span>
                </div>
              </div>
            </div>

          </div>

          {/* Card Footer */}
          <div className="p-4 bg-slate-900/80 border-t border-slate-800 text-center text-3xs text-slate-400">
            Protected by ScholarFlow Multi-Tenant Isolation &bull; Turnitin-Grade Session Security
          </div>

        </div>
      </main>

      {/* Bottom Footer */}
      <footer className="relative z-10 px-6 py-3 border-t border-slate-800/80 bg-slate-950/40 text-center text-3xs text-slate-500">
        ScholarFlow AI Research Intelligence &bull; Strictly Gated Academic Access
      </footer>
    </div>
  );
};
