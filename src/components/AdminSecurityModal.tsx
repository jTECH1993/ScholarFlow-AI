import React, { useState } from 'react';
import { ShieldCheck, Lock, AlertCircle, X, Key, CheckCircle2, ArrowRight } from 'lucide-react';
import { UserProfile } from '../types';

interface AdminSecurityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  currentUser: UserProfile | null;
}

export const AdminSecurityModal: React.FC<AdminSecurityModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  currentUser,
}) => {
  const [passkey, setPasskey] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  if (!isOpen) return null;

  // Recognized admin role from profile
  const isAuthorizedEmail = currentUser?.role === 'Administrator';

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsVerifying(true);

    setTimeout(() => {
      // Valid passkeys: 'scholarflow-admin-2026' or 'admin123' or if logged in as authorized admin email
      if (passkey.trim() === 'scholarflow-admin-2026' || passkey.trim() === 'admin' || isAuthorizedEmail) {
        localStorage.setItem('scholarflow_admin_auth', 'true');
        setIsVerifying(false);
        onSuccess();
      } else {
        setIsVerifying(false);
        setError('Invalid Administrator Access Key. Normal researchers do not have access to the administrative console.');
      }
    }, 400);
  };

  const handleOneClickAdminVerify = () => {
    if (isAuthorizedEmail) {
      localStorage.setItem('scholarflow_admin_auth', 'true');
      onSuccess();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl w-full max-w-md p-6 space-y-5 text-slate-900 dark:text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 flex items-center justify-center text-rose-600 dark:text-rose-400 shadow-2xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                Administrator Authorization
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Restricted access &bull; System Administration Only
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-xl"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
          <strong>Notice for Researchers:</strong> The Admin Portal contains system tenant logs, telemetry, and vector index configurations. Normal research users and literature reviewers do not require admin access and should use the <strong>Researcher Workspace</strong>.
        </div>

        {isAuthorizedEmail && (
          <div className="p-3.5 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-xs space-y-2">
            <div className="flex items-center space-x-1.5 text-teal-800 dark:text-teal-300 font-bold">
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
              <span>Recognized Administrator Account</span>
            </div>
            <p className="text-3xs text-slate-600 dark:text-slate-300">
              Logged in as <code className="font-mono font-bold text-teal-700 dark:text-teal-400">{currentUser?.email}</code>. You can bypass the key prompt with your verified identity.
            </p>
            <button
              type="button"
              onClick={handleOneClickAdminVerify}
              className="w-full py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              Verify Administrator Role
            </button>
          </div>
        )}

        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="block text-2xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              Administrator Master Key
            </label>
            <div className="relative">
              <Key className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="password"
                value={passkey}
                onChange={(e) => {
                  setPasskey(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="Enter Administrator Key..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-900 dark:text-slate-100"
              />
            </div>
            <div className="text-3xs text-slate-400 dark:text-slate-500 mt-1">
              Authorized key: <span className="font-mono font-bold">scholarflow-admin-2026</span>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs text-rose-700 dark:text-rose-300 flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex items-center space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              Return to Researcher App
            </button>
            <button
              type="submit"
              disabled={isVerifying || (!passkey.trim() && !isAuthorizedEmail)}
              className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-teal-700 dark:hover:bg-teal-600 text-white rounded-xl text-xs font-bold transition-colors shadow-2xs flex items-center justify-center space-x-1.5 cursor-pointer disabled:opacity-50"
            >
              {isVerifying ? (
                <span>Verifying...</span>
              ) : (
                <>
                  <span>Authenticate Admin</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
