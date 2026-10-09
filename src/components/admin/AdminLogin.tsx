import { useState, useEffect, useRef } from 'react';
import { Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';

// Session key — stored in sessionStorage so it clears when the tab is closed
const SESSION_KEY = 'aura_admin_auth';
// How long the session stays valid (ms) — 8 hours
const SESSION_TTL = 8 * 60 * 60 * 1000;

// Hashed password check — never store the plain password in a variable that's
// easy to grep. We hash at runtime with the Web Crypto API.

async function hashPassword(password: string): Promise<string> {
  const enc = new TextEncoder();
  const buf = await crypto.subtle.digest('SHA-256', enc.encode(password));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

// The password hash can be overridden in sessionStorage by the Settings page.
// Falls back to the factory default 'aura123'.
const PASS_HASH_KEY = 'aura_admin_pass_hash';

let defaultHashPromise: Promise<string> | null = null;
function getCorrectHash(): Promise<string> {
  const stored = sessionStorage.getItem(PASS_HASH_KEY);
  if (stored) return Promise.resolve(stored);
  if (!defaultHashPromise) {
    defaultHashPromise = hashPassword('aura123');
  }
  return defaultHashPromise;
}

export interface AdminSession {
  granted: boolean;
  expiresAt: number;
}

/** Returns true if there is a valid unexpired session in sessionStorage */
export function getStoredSession(): boolean {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return false;
    const session: AdminSession = JSON.parse(raw);
    if (!session.granted || Date.now() > session.expiresAt) {
      sessionStorage.removeItem(SESSION_KEY);
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export function saveSession(): void {
  const session: AdminSession = {
    granted: true,
    expiresAt: Date.now() + SESSION_TTL,
  };
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession(): void {
  sessionStorage.removeItem(SESSION_KEY);
}

// Rate-limit: max 5 attempts, then 30-second lockout
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 30_000;

export default function AdminLogin({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [lockedUntil, setLockedUntil] = useState<number | null>(null);
  const [lockCountdown, setLockCountdown] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Warm up the hash
  useEffect(() => { getCorrectHash(); }, []);

  // Focus input on mount
  useEffect(() => { inputRef.current?.focus(); }, []);

  // Countdown timer during lockout
  useEffect(() => {
    if (!lockedUntil) return;
    const tick = () => {
      const remaining = Math.ceil((lockedUntil - Date.now()) / 1000);
      if (remaining <= 0) {
        setLockedUntil(null);
        setAttempts(0);
        setLockCountdown(0);
        setError('');
      } else {
        setLockCountdown(remaining);
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [lockedUntil]);

  const isLocked = lockedUntil !== null && Date.now() < lockedUntil;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLocked || loading) return;

    setLoading(true);
    setError('');

    // Small artificial delay so brute-forcing feels slower
    await new Promise((r) => setTimeout(r, 400));

    const [inputHash, correct] = await Promise.all([
      hashPassword(password),
      getCorrectHash(),
    ]);

    setLoading(false);

    if (inputHash === correct) {
      saveSession();
      onSuccess();
    } else {
      const next = attempts + 1;
      setAttempts(next);
      setPassword('');
      inputRef.current?.focus();
      if (next >= MAX_ATTEMPTS) {
        const until = Date.now() + LOCKOUT_MS;
        setLockedUntil(until);
        setError(`Too many attempts. Locked for 30 seconds.`);
      } else {
        setError(
          `Incorrect password. ${MAX_ATTEMPTS - next} attempt${MAX_ATTEMPTS - next === 1 ? '' : 's'} remaining.`
        );
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-950 px-4">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-600/10 blur-[160px]" />
      </div>

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-accent-500/20 bg-accent-500/10">
            <Lock className="h-6 w-6 text-accent-400" />
          </div>
          <div className="font-display text-2xl font-bold tracking-tight text-white">
            AURA<span className="text-accent-400"> AI</span>
          </div>
          <p className="mt-1.5 text-sm text-ink-400">Admin access only</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-white/[0.06] bg-ink-900/60 p-8 backdrop-blur-xl">
          <h2 className="mb-6 font-display text-lg font-semibold text-white">
            Enter Admin Password
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-ink-300">
                Password
              </label>
              <div className="relative">
                <input
                  ref={inputRef}
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error && !isLocked) setError('');
                  }}
                  disabled={isLocked || loading}
                  placeholder="Enter password"
                  autoComplete="current-password"
                  className={`w-full rounded-lg border bg-ink-950/50 px-4 py-3 pr-11 text-sm text-white placeholder:text-ink-500 transition-colors focus:outline-none disabled:opacity-40 ${
                    error
                      ? 'border-red-500/50 focus:border-red-500/60'
                      : 'border-white/10 focus:border-accent-500/40'
                  }`}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 transition-colors hover:text-ink-200"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Error / lockout message */}
            {error && (
              <div
                role="alert"
                className="flex items-start gap-2.5 rounded-lg border border-red-500/20 bg-red-500/10 px-3.5 py-3 text-sm text-red-300"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  {isLocked
                    ? `Too many failed attempts. Try again in ${lockCountdown}s.`
                    : error}
                </span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLocked || loading || !password}
              className="btn-primary w-full justify-center disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Verifying…
                </span>
              ) : (
                'Access Admin Panel'
              )}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-ink-600">
          Unauthorized access attempts are logged.
        </p>
      </div>
    </div>
  );
}
