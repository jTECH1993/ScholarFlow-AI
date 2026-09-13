import React, { useState } from 'react';
import { ShieldAlert, ArrowLeft, Key, Lock, CheckCircle2 } from 'lucide-react';
import { UserProfile } from '../types';
import { AdminSecurityModal } from './AdminSecurityModal';

interface AdminGatekeeperProps {
  currentUser: UserProfile | null;
  onReturnToUserWorkspace: () => void;
  onAdminAuthenticated: () => void;
}

export const AdminGatekeeper: React.FC<AdminGatekeeperProps> = ({
  currentUser,
  onReturnToUserWorkspace,
  onAdminAuthenticated,
}) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950 p-4 sm:p-8 flex items-center justify-center">
      <div className="max-w-lg w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 mx-auto flex items-center justify-center shadow-xs">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Administrator Portal Restricted
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-md mx-auto">
            You are currently in the <strong>Researcher Workspace</strong>. Access to the system administrative dashboard, tenant telemetry, and global vector controls is restricted to authorized platform administrators.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-left text-xs space-y-2 text-slate-700 dark:text-slate-300">
          <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center space-x-1.5">
            <Lock className="w-3.5 h-3.5 text-teal-600" />
            <span>Active Session Profile:</span>
          </div>
          <div className="text-2xs font-mono bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <div><strong>User:</strong> {currentUser?.displayName || 'Guest Scholar (Researcher)'}</div>
            <div><strong>Role:</strong> {currentUser?.role || 'Academic Researcher'}</div>
            <div><strong>Account Email:</strong> {currentUser?.email || 'Public Researcher Session'}</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={onReturnToUserWorkspace}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold transition-colors shadow-xs flex items-center justify-center space-x-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Researcher Workspace</span>
          </button>

          <button
            type="button"
            onClick={() => setIsAuthModalOpen(true)}
            className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-bold transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            <Key className="w-4 h-4 text-teal-600" />
            <span>Authenticate Admin Key</span>
          </button>
        </div>
      </div>

      <AdminSecurityModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => {
          setIsAuthModalOpen(false);
          onAdminAuthenticated();
        }}
        currentUser={currentUser}
      />
    </div>
  );
};
