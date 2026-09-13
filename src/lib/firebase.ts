import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  getDocs, 
  deleteDoc, 
  query, 
  orderBy 
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { UserProfile, SavedCitationItem, VitalSignPaper, SavedChatSession, ClinicalPerspectiveId } from '../types';

// Initialize Firebase Application
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Firestore Database with provisioned database ID
export const db = firebaseConfig.firestoreDatabaseId 
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

// Human-friendly Firebase Auth error mapper
export function getFriendlyAuthErrorMessage(errorCode: string): string {
  switch (errorCode) {
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/user-disabled':
      return 'This account has been disabled by an administrator.';
    case 'auth/user-not-found':
      return 'No account registered with this email address. Please sign up.';
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Incorrect email or password. Please verify your credentials.';
    case 'auth/email-already-in-use':
      return 'An account with this email address already exists. Please sign in instead.';
    case 'auth/weak-password':
      return 'Password must be at least 6 characters long.';
    case 'auth/operation-not-allowed':
      return 'Email/Password sign-in is currently undergoing initialization.';
    case 'auth/too-many-requests':
      return 'Access temporarily locked due to multiple failed attempts. Please try again in a moment or reset your password.';
    case 'auth/network-request-failed':
      return 'Network connectivity issue. Please check your internet connection.';
    default:
      return 'Authentication could not be completed. Please try again.';
  }
}

// User Profile Operations
export async function createUserProfileInFirestore(
  uid: string, 
  data: Partial<UserProfile>
): Promise<UserProfile> {
  const profile: UserProfile = {
    uid,
    email: data.email || '',
    displayName: data.displayName || 'Academic Researcher',
    role: data.role || 'Academic Researcher',
    organization: data.organization || 'Academic & Research Institution',
    perspectiveId: data.perspectiveId || 'academic-scholar',
    perspectiveName: data.perspectiveName || 'General Academic Scholar & Literature Synthesis',
    perspectiveCustomInstructions: data.perspectiveCustomInstructions || '',
    preferredModalityFilter: data.preferredModalityFilter || 'all',
    retrievalStrategy: data.retrievalStrategy || 'hybrid',
    topK: data.topK ?? 5,
    similarityThreshold: data.similarityThreshold ?? 0.03,
    temperature: data.temperature ?? 0.2,
    createdAt: data.createdAt || new Date().toISOString(),
    lastActive: new Date().toISOString(),
  };

  try {
    const userRef = doc(db, 'users', uid);
    await setDoc(userRef, profile, { merge: true });
  } catch (err) {
    console.warn('Could not persist profile to Firestore, keeping locally:', err);
  }

  // Also cache locally for instant offline/re-render access
  localStorage.setItem(`vitalpulse_user_${uid}`, JSON.stringify(profile));
  return profile;
}

export async function fetchUserProfileFromFirestore(uid: string): Promise<UserProfile | null> {
  try {
    const userRef = doc(db, 'users', uid);
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      const data = snap.data() as UserProfile;
      localStorage.setItem(`vitalpulse_user_${uid}`, JSON.stringify(data));
      return data;
    }
  } catch (err) {
    console.warn('Firestore fetch failed, falling back to localStorage cache:', err);
  }

  const cached = localStorage.getItem(`vitalpulse_user_${uid}`);
  if (cached) {
    try {
      return JSON.parse(cached) as UserProfile;
    } catch {
      return null;
    }
  }
  return null;
}

export async function updateUserProfile(
  uid: string, 
  updates: Partial<UserProfile>
): Promise<void> {
  try {
    const userRef = doc(db, 'users', uid);
    await setDoc(userRef, { ...updates, lastActive: new Date().toISOString() }, { merge: true });
  } catch (err) {
    console.warn('Failed to update Firestore profile, updated locally:', err);
  }

  const cached = localStorage.getItem(`vitalpulse_user_${uid}`);
  if (cached) {
    try {
      const parsed = JSON.parse(cached);
      localStorage.setItem(`vitalpulse_user_${uid}`, JSON.stringify({ ...parsed, ...updates }));
    } catch {
      // ignore
    }
  }
}

// User Saved Citations Operations
export async function saveCitationToFirestore(
  uid: string, 
  citation: Omit<SavedCitationItem, 'id' | 'userId' | 'savedAt'>
): Promise<SavedCitationItem> {
  const item: SavedCitationItem = {
    ...citation,
    id: `cit-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    userId: uid,
    savedAt: new Date().toISOString(),
  };

  try {
    const ref = doc(db, 'users', uid, 'savedCitations', item.id);
    await setDoc(ref, item);
  } catch (err) {
    console.warn('Could not save citation to Firestore:', err);
  }

  // Update local cache
  const localKey = `vitalpulse_citations_${uid}`;
  const existing: SavedCitationItem[] = JSON.parse(localStorage.getItem(localKey) || '[]');
  localStorage.setItem(localKey, JSON.stringify([item, ...existing]));

  return item;
}

export async function fetchUserCitationsFromFirestore(uid: string): Promise<SavedCitationItem[]> {
  try {
    const colRef = collection(db, 'users', uid, 'savedCitations');
    const q = query(colRef, orderBy('savedAt', 'desc'));
    const snap = await getDocs(q);
    const list: SavedCitationItem[] = [];
    snap.forEach((d) => list.push(d.data() as SavedCitationItem));
    if (list.length > 0) {
      localStorage.setItem(`vitalpulse_citations_${uid}`, JSON.stringify(list));
      return list;
    }
  } catch (err) {
    console.warn('Could not load citations from Firestore, reading cache:', err);
  }

  const cached = localStorage.getItem(`vitalpulse_citations_${uid}`);
  return cached ? JSON.parse(cached) : [];
}

export async function deleteSavedCitationFromFirestore(uid: string, citationId: string): Promise<void> {
  try {
    const ref = doc(db, 'users', uid, 'savedCitations', citationId);
    await deleteDoc(ref);
  } catch (err) {
    console.warn('Could not delete citation from Firestore:', err);
  }

  const localKey = `vitalpulse_citations_${uid}`;
  const existing: SavedCitationItem[] = JSON.parse(localStorage.getItem(localKey) || '[]');
  localStorage.setItem(localKey, JSON.stringify(existing.filter(c => c.id !== citationId)));
}

// User Custom Papers Operations (Private Knowledge Base)
export async function saveUserCustomPaperToFirestore(
  uid: string, 
  paper: VitalSignPaper
): Promise<void> {
  try {
    const ref = doc(db, 'users', uid, 'customPapers', paper.id);
    await setDoc(ref, {
      ...paper,
      userId: uid,
      createdAt: new Date().toISOString(),
    });
  } catch (err) {
    console.warn('Could not save custom paper to Firestore:', err);
  }

  const localKey = `vitalpulse_custom_papers_${uid}`;
  const existing: VitalSignPaper[] = JSON.parse(localStorage.getItem(localKey) || '[]');
  localStorage.setItem(localKey, JSON.stringify([paper, ...existing.filter(p => p.id !== paper.id)]));
}

export async function fetchUserCustomPapersFromFirestore(uid: string): Promise<VitalSignPaper[]> {
  try {
    const colRef = collection(db, 'users', uid, 'customPapers');
    const snap = await getDocs(colRef);
    const list: VitalSignPaper[] = [];
    snap.forEach((d) => list.push(d.data() as VitalSignPaper));
    if (list.length > 0) {
      localStorage.setItem(`vitalpulse_custom_papers_${uid}`, JSON.stringify(list));
      return list;
    }
  } catch (err) {
    console.warn('Could not fetch custom papers from Firestore:', err);
  }

  const cached = localStorage.getItem(`vitalpulse_custom_papers_${uid}`);
  return cached ? JSON.parse(cached) : [];
}

export async function signOutUser(): Promise<void> {
  try {
    await signOut(auth);
  } catch (err) {
    console.warn('Sign out error:', err);
  }
}

export async function saveChatSessionToFirestore(
  uid: string, 
  session: { 
    id: string; 
    title: string; 
    perspectiveId: string; 
    messages: any[]; 
    createdAt: string; 
    updatedAt: string;
  }
): Promise<void> {
  try {
    const ref = doc(db, 'users', uid, 'chatSessions', session.id);
    await setDoc(ref, session, { merge: true });
  } catch (err) {
    console.warn('Could not save chat session to Firestore:', err);
  }
}

// Convenient Aliases
export const getUserProfileFromFirestore = fetchUserProfileFromFirestore;
export const updateUserProfileInFirestore = updateUserProfile;
export const loadUserCitationsFromFirestore = fetchUserCitationsFromFirestore;
export const deleteCitationFromFirestore = deleteSavedCitationFromFirestore;

export {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
  onAuthStateChanged
};
export type { FirebaseUser };
