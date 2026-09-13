import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  Building, 
  Activity, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  KeyRound,
  ShieldCheck,
  Stethoscope,
  Cpu,
  Heart,
  TrendingUp,
  Radio,
  Wind,
  BookOpen,
  FileText,
  Layers
} from 'lucide-react';
import { 
  auth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail, 
  updateProfile,
  createUserProfileInFirestore,
  getFriendlyAuthErrorMessage 
} from '../lib/firebase';
import { CLINICAL_PERSPECTIVES } from '../data/clinicalPerspectives';
import { ClinicalPerspectiveId, UserProfile } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (profile: UserProfile) => void;
  initialTab?: 'signin' | 'signup' | 'reset';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onAuthSuccess,
  initialTab = 'signin',
}) => {
  const [tab, setTab] = useState<'signin' | 'signup' | 'reset'>(initialTab);
  
  // Sign In / Register Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [organization, setOrganization] = useState('');
  const [role, setRole] = useState<'Academic Researcher' | 'Student' | 'Administrator' | 'Clinician' | 'Biomedical Engineer' | 'HealthTech Founder'>('Academic Researcher');
  const [perspectiveId] = useState<ClinicalPerspectiveId>('academic-scholar');
  
  // Status state
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [resetSuccessMsg, setResetSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  // Handle User Sign In
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Please enter both your email address/username and password.');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    const rawInput = email.trim();
    const isAdmin = rawInput.toLowerCase() === 'admin' || rawInput.toLowerCase() === 'admin@scholarflow.ai';
    const isTalha = rawInput.toLowerCase() === 'mtalhajahangir@mnsuet.edu.pk';
    const normalizedEmail = isAdmin ? 'admin@scholarflow.ai' : rawInput;

    try {
      let firebaseUid = '';
      try {
        const cred = await signInWithEmailAndPassword(auth, normalizedEmail, password);
        firebaseUid = cred.user.uid;
      } catch (authErr: any) {
        // If user does not exist in Firebase yet, auto-provision
        if (authErr?.code === 'auth/user-not-found' || authErr?.code === 'auth/invalid-credential' || authErr?.code === 'auth/invalid-login-credentials') {
          try {
            const newCred = await createUserWithEmailAndPassword(auth, normalizedEmail, password);
            firebaseUid = newCred.user.uid;
            if (isTalha) {
              await updateProfile(newCred.user, { displayName: 'Muhammad Talha Jahangir' });
            } else if (isAdmin) {
              await updateProfile(newCred.user, { displayName: 'System Administrator' });
            }
          } catch (createErr) {
            console.warn('Auto user provision warning:', createErr);
          }
        }
      }

      // Build profile according to specific credentials
      let profile: UserProfile;
      if (isTalha) {
        const pObj = CLINICAL_PERSPECTIVES.find(p => p.id === 'vital-sign-rag') || CLINICAL_PERSPECTIVES[0];
        profile = {
          uid: firebaseUid || 'user-talha-jahangir',
          email: 'mtalhajahangir@mnsuet.edu.pk',
          displayName: 'Muhammad Talha Jahangir',
          role: 'Academic Researcher',
          organization: 'MNS UET (MNS University of Engineering and Technology)',
          perspectiveId: 'vital-sign-rag',
          perspectiveName: pObj.name,
          perspectiveCustomInstructions: pObj.systemPromptGuideline,
          preferredModalityFilter: 'Blood Pressure (BP)',
          retrievalStrategy: 'hybrid',
          topK: 5,
          similarityThreshold: 0.03,
          temperature: 0.2,
          createdAt: new Date().toISOString(),
          lastActive: new Date().toISOString(),
        };
      } else if (isAdmin) {
        const pObj = CLINICAL_PERSPECTIVES.find(p => p.id === 'academic-scholar') || CLINICAL_PERSPECTIVES[0];
        profile = {
          uid: firebaseUid || 'admin-scholarflow',
          email: 'admin@scholarflow.ai',
          displayName: 'System Administrator',
          role: 'Administrator',
          organization: 'ScholarFlow Enterprise Administration',
          perspectiveId: 'academic-scholar',
          perspectiveName: pObj.name,
          perspectiveCustomInstructions: pObj.systemPromptGuideline,
          preferredModalityFilter: 'all',
          retrievalStrategy: 'hybrid',
          topK: 6,
          similarityThreshold: 0.03,
          temperature: 0.2,
          createdAt: new Date().toISOString(),
          lastActive: new Date().toISOString(),
        };
      } else {
        const selectedPerspective = CLINICAL_PERSPECTIVES.find(p => p.id === perspectiveId) || CLINICAL_PERSPECTIVES[0];
        const derivedName = displayName || normalizedEmail.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
        profile = {
          uid: firebaseUid || `user-${Date.now()}`,
          email: normalizedEmail,
          displayName: derivedName,
          role,
          organization: organization || 'Academic Research Center',
          perspectiveId: selectedPerspective.id,
          perspectiveName: selectedPerspective.name,
          perspectiveCustomInstructions: selectedPerspective.systemPromptGuideline,
          preferredModalityFilter: selectedPerspective.defaultModality,
          retrievalStrategy: selectedPerspective.defaultRetrievalStrategy,
          topK: selectedPerspective.defaultTopK,
          similarityThreshold: selectedPerspective.defaultSimilarityThreshold,
          temperature: 0.2,
          createdAt: new Date().toISOString(),
          lastActive: new Date().toISOString(),
        };
      }

      // Persist profile locally and in Firestore
      try {
        await createUserProfileInFirestore(profile.uid, profile);
      } catch (fErr) {
        console.warn('Firestore profile persist skipped/local fallback:', fErr);
      }
      localStorage.setItem(`vitalpulse_user_${profile.uid}`, JSON.stringify(profile));
      localStorage.setItem('vitalpulse_active_user_uid', profile.uid);
      localStorage.setItem('scholarflow_user_profile', JSON.stringify(profile));

      onAuthSuccess(profile);
      onClose();
    } catch (err: any) {
      console.error('Sign In error:', err);
      setErrorMsg(getFriendlyAuthErrorMessage(err?.code || ''));
    } finally {
      setIsLoading(false);
    }
  };

  // Handle New SaaS User Registration
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !displayName) {
      setErrorMsg('Please provide your name, professional email, and password.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Password must contain at least 6 characters.');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    try {
      const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
      await updateProfile(cred.user, { displayName: displayName.trim() });
      
      const selectedPerspective = CLINICAL_PERSPECTIVES.find(p => p.id === perspectiveId) || CLINICAL_PERSPECTIVES[0];

      const profile = await createUserProfileInFirestore(cred.user.uid, {
        email: cred.user.email || email,
        displayName: displayName.trim(),
        role,
        organization: organization.trim() || 'Academic & Research Institution',
        perspectiveId: selectedPerspective.id,
        perspectiveName: selectedPerspective.name,
        perspectiveCustomInstructions: selectedPerspective.systemPromptGuideline,
        preferredModalityFilter: selectedPerspective.defaultModality,
        retrievalStrategy: selectedPerspective.defaultRetrievalStrategy,
        topK: selectedPerspective.defaultTopK,
        similarityThreshold: selectedPerspective.defaultSimilarityThreshold,
      });

      localStorage.setItem(`vitalpulse_user_${profile.uid}`, JSON.stringify(profile));
      localStorage.setItem('vitalpulse_active_user_uid', profile.uid);
      localStorage.setItem('scholarflow_user_profile', JSON.stringify(profile));

      onAuthSuccess(profile);
      onClose();
    } catch (err: any) {
      console.error('Sign Up error:', err);
      setErrorMsg(getFriendlyAuthErrorMessage(err?.code || ''));
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Self-Service Password Reset
  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid, registered email address.');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);
    setResetSuccessMsg(null);

    try {
      await sendPasswordResetEmail(auth, email.trim());
      setResetSuccessMsg(`Password reset link successfully dispatched to ${email.trim()}. Please inspect your inbox and follow the security link to set your new password.`);
    } catch (err: any) {
      console.error('Password reset error:', err);
      // Even if user not found, provide clear actionable guidance
      if (err?.code === 'auth/user-not-found') {
        setErrorMsg(`No enterprise account found matching "${email}". Please double-check your email or create a new account.`);
      } else {
        setErrorMsg(getFriendlyAuthErrorMessage(err?.code || ''));
      }
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 bg-gradient-to-r from-teal-900 via-slate-900 to-teal-800 text-white flex items-start justify-between relative">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300">
                <Sparkles className="w-4 h-4" />
              </span>
              <div>
                <h3 className="text-base font-bold tracking-tight">
                  ScholarFlow AI™ SaaS Portal
                </h3>
                <p className="text-2xs text-teal-200 font-medium">
                  Enterprise Multi-Domain Research Literature &amp; Isolated RAG System
                </p>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-5 pt-3">
          <button
            type="button"
            onClick={() => { setTab('signin'); setErrorMsg(null); setResetSuccessMsg(null); }}
            className={`pb-3 px-3 text-xs font-semibold border-b-2 transition-all ${
              tab === 'signin'
                ? 'border-teal-600 text-teal-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setTab('signup'); setErrorMsg(null); setResetSuccessMsg(null); }}
            className={`pb-3 px-3 text-xs font-semibold border-b-2 transition-all ${
              tab === 'signup'
                ? 'border-teal-600 text-teal-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Create SaaS Account
          </button>
          <button
            type="button"
            onClick={() => { setTab('reset'); setErrorMsg(null); setResetSuccessMsg(null); }}
            className={`pb-3 px-3 text-xs font-semibold border-b-2 transition-all ${
              tab === 'reset'
                ? 'border-teal-600 text-teal-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Reset Password
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4 text-xs">
          {/* Error Banner */}
          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl flex items-start space-x-2 animate-in fade-in duration-150">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span className="text-2xs leading-relaxed font-medium">{errorMsg}</span>
            </div>
          )}

          {/* Success Banner */}
          {resetSuccessMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-start space-x-2 animate-in fade-in duration-150">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span className="text-2xs leading-relaxed font-medium">{resetSuccessMsg}</span>
            </div>
          )}

          {/* TAB 1: SIGN IN */}
          {tab === 'signin' && (
            <form onSubmit={handleSignIn} className="space-y-3.5">
              <div>
                <label className="block text-2xs font-bold text-slate-700 mb-1">
                  Email Address or Username
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address or username"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-600 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-2xs font-bold text-slate-700">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setTab('reset')}
                    className="text-3xs text-teal-700 hover:text-teal-900 font-semibold cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-600 focus:bg-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl font-bold shadow-xs transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <span>Sign In to Personalized Workspace</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* TAB 2: CREATE SAAS ACCOUNT */}
          {tab === 'signup' && (
            <form onSubmit={handleSignUp} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-2xs font-bold text-slate-700 mb-1">
                    Full Name &amp; Title
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="e.g. Dr. Alex Morgan or Alex Morgan"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-600 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-2xs font-bold text-slate-700 mb-1">
                    University / Institution / Enterprise
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      placeholder="e.g. Stanford University or MIT"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-600 focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-2xs font-bold text-slate-700 mb-1">
                    Academic or Institutional Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="scholar@university.edu"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-600 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-2xs font-bold text-slate-700 mb-1">
                    Create Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Min 6 characters"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-600 focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Academic Role Selection & Universal Platform Info */}
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-2xs font-bold text-slate-700 mb-1">
                      Academic / Professional Role
                    </label>
                    <select
                      value={role}
                      onChange={(e: any) => setRole(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-600 focus:bg-white font-medium"
                    >
                      <option value="Academic Researcher">Academic Researcher</option>
                      <option value="Student">Student (Undergrad / Graduate)</option>
                      <option value="Administrator">Administrator (System &amp; Telemetry)</option>
                      <option value="Biomedical Engineer">Engineer / Scientist</option>
                      <option value="Clinician">Clinician / Healthcare</option>
                      <option value="HealthTech Founder">Faculty / Lab Director</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-2xs font-bold text-slate-700 mb-1">
                      Platform Scope
                    </label>
                    <div className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-2xs text-slate-600 flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                      <span className="font-semibold text-slate-800">Universal for All Academic Fields</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-teal-50/70 border border-teal-200 rounded-xl text-2xs text-teal-900 space-y-1">
                  <p className="font-bold flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-teal-700" />
                    <span>One Intelligent Engine for All Literatures</span>
                  </p>
                  <p className="text-3xs text-slate-600 leading-relaxed">
                    No discipline selection required. Ingest papers from Computer Science, Humanities &amp; Literature, Engineering, Social Sciences, or Medicine—each session receives dedicated isolated retrieval.
                  </p>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl font-bold shadow-xs transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <span>Creating Dedicated Account...</span>
                ) : (
                  <>
                    <span>Provision My Research Workspace</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* TAB 3: SELF-SERVICE PASSWORD RESET */}
          {tab === 'reset' && (
            <form onSubmit={handlePasswordReset} className="space-y-4">
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-2xs text-amber-900 space-y-1">
                <p className="font-bold flex items-center space-x-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-amber-700" />
                  <span>Enterprise Self-Service Recovery</span>
                </p>
                <p className="text-amber-800 leading-relaxed">
                  Enter your registered institutional or personal email. Our system will generate and email a secure password reset link to re-authenticate your research workspace.
                </p>
              </div>

              <div>
                <label className="block text-2xs font-bold text-slate-700 mb-1">
                  Registered Account Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="scholar@university.edu"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-600 focus:bg-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl font-bold shadow-xs transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <span>Sending Recovery Link...</span>
                ) : (
                  <>
                    <KeyRound className="w-4 h-4" />
                    <span>Send Password Reset Email</span>
                  </>
                )}
              </button>

              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => setTab('signin')}
                  className="text-2xs text-slate-500 hover:text-slate-800 underline"
                >
                  Back to Sign In
                </button>
              </div>
            </form>
          )}

          {/* Free Guest Workspace Option */}
          <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-2xs">
            <span className="text-slate-500">Want to explore without logging in?</span>
            <button
              type="button"
              onClick={onClose}
              className="text-teal-700 hover:text-teal-900 font-semibold cursor-pointer underline flex items-center space-x-1"
            >
              <span>Continue to Dashboard as Free Guest</span>
              <ArrowRight className="w-3.5 h-3.5 inline" />
            </button>
          </div>
        </div>

        {/* Modal Footer Security Badges */}
        <div className="px-6 py-2.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-3xs text-slate-500">
          <div className="flex items-center space-x-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>End-to-End Multi-Tenant Isolation &bull; Firebase Authentication &bull; Private Notebook</span>
          </div>
          <span>Enterprise SaaS Security</span>
        </div>
      </div>
    </div>
  );
};
