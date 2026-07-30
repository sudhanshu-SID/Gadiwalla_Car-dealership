import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Loader2, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

// ─── Validation Schemas ───────────────────────────────────────────

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().min(1, 'Email is required').email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

// ─── Background Image ────────────────────────────────────────────

const BG_IMAGE =
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop';

// ─── Page Component ──────────────────────────────────────────────

export default function Login() {
  const [activeTab, setActiveTab] = useState<'signin' | 'register'>('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { login, register } = useAuth();
  const navigate = useNavigate();

  // Login form
  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  // Register form
  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '' },
  });

  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      await login({ email: data.email, password: data.password });
      toast.success('Welcome back! Signed in successfully.');
      navigate('/');
    } catch (err: unknown) {
      let msg = 'Login failed. Please check your credentials.';
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        msg = err.response.data.message;
      } else if (err instanceof Error) {
        msg = err.message;
      }
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      await register({ name: data.name, email: data.email, password: data.password });
      toast.success('Account created successfully!');
      navigate('/');
    } catch (err: unknown) {
      let msg = 'Registration failed. Please try again.';
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        msg = err.response.data.message;
      } else if (err instanceof Error) {
        msg = err.message;
      }
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const switchTab = (tab: 'signin' | 'register') => {
    if (tab === activeTab) return;
    setActiveTab(tab);
    setShowPassword(false);
    loginForm.reset();
    registerForm.reset();
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* ── Full-Screen Background ── */}
      <div className="absolute inset-0 z-0">
        <img
          src={BG_IMAGE}
          alt=""
          className="w-full h-full object-cover animate-slow-zoom"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />
        {/* Bottom gradient fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
      </div>

      {/* ── Branding & Back Link: top-left ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="absolute top-8 left-8 md:left-12 z-20 flex items-center gap-6"
      >
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-primary-container flex items-center justify-center group-hover:scale-105 transition-transform">
            <span className="text-white text-xs font-bold tracking-tight">GW</span>
          </div>
          <span className="text-white/90 text-sm font-semibold tracking-[0.15em] uppercase group-hover:text-white transition-colors">
            Gadiwalla
          </span>
        </Link>
        
        <div className="h-4 w-px bg-white/20 hidden sm:block" />

        <Link
          to="/"
          className="hidden sm:flex items-center gap-2 text-white/50 hover:text-white text-xs font-medium uppercase tracking-wider transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to Home</span>
        </Link>
      </motion.div>

      {/* ── Status Badge: bottom-right ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="absolute bottom-6 right-8 md:right-12 z-20 flex items-center gap-2 text-white/40 text-[11px] tracking-wider font-mono bg-white/5 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10"
      >
        <div className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse" />
        SYSTEMS ONLINE
      </motion.div>

      {/* ── Glass Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-[420px] mx-4"
      >
        <div className="bg-white/[0.08] backdrop-blur-2xl rounded-3xl p-8 md:p-10 border border-white/[0.12] shadow-[0_32px_64px_rgba(0,0,0,0.4)]">
          {/* ── Tab Switcher ── */}
          <div className="flex items-center gap-1 mb-10 relative">
            <button
              onClick={() => switchTab('signin')}
              className={`relative z-10 px-4 py-2 text-[13px] font-semibold tracking-[0.12em] uppercase transition-colors duration-300 ${
                activeTab === 'signin' ? 'text-white' : 'text-white/40 hover:text-white/60'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => switchTab('register')}
              className={`relative z-10 px-4 py-2 text-[13px] font-semibold tracking-[0.12em] uppercase transition-colors duration-300 ${
                activeTab === 'register' ? 'text-white' : 'text-white/40 hover:text-white/60'
              }`}
            >
              Register
            </button>
            {/* Animated underline */}
            <motion.div
              className="absolute bottom-0 h-[2px] bg-primary-container rounded-full"
              layout
              initial={false}
              animate={{
                left: activeTab === 'signin' ? '16px' : '110px',
                width: activeTab === 'signin' ? '52px' : '68px',
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          </div>

          {/* ── Form Content ── */}
          <AnimatePresence mode="wait">
            {activeTab === 'signin' ? (
              <motion.form
                key="signin"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                onSubmit={loginForm.handleSubmit(handleLogin)}
                className="flex flex-col gap-6"
              >
                {/* Email */}
                <InputField
                  label="Email Address"
                  type="email"
                  error={loginForm.formState.errors.email?.message}
                  {...loginForm.register('email')}
                />

                {/* Password */}
                <InputField
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  error={loginForm.formState.errors.password?.message}
                  {...loginForm.register('password')}
                  rightElement={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-white/30 hover:text-white/60 transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  }
                />

                {/* Submit */}
                <SubmitButton isLoading={isLoading} label="Initialize Engine" />
              </motion.form>
            ) : (
              <motion.form
                key="register"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                onSubmit={registerForm.handleSubmit(handleRegister)}
                className="flex flex-col gap-6"
              >
                {/* Name */}
                <InputField
                  label="Full Name"
                  type="text"
                  error={registerForm.formState.errors.name?.message}
                  {...registerForm.register('name')}
                />

                {/* Email */}
                <InputField
                  label="Email Address"
                  type="email"
                  error={registerForm.formState.errors.email?.message}
                  {...registerForm.register('email')}
                />

                {/* Password */}
                <InputField
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  error={registerForm.formState.errors.password?.message}
                  {...registerForm.register('password')}
                  rightElement={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-white/30 hover:text-white/60 transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  }
                />

                {/* Submit */}
                <SubmitButton isLoading={isLoading} label="Create Account" />
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* ── Footer Links ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="absolute bottom-6 left-8 md:left-12 z-20 flex items-center gap-6 text-white/30 text-[11px] tracking-wider"
      >
        <a href="#" className="hover:text-white/60 transition-colors uppercase">Privacy</a>
        <a href="#" className="hover:text-white/60 transition-colors uppercase">Terms</a>
      </motion.div>
    </div>
  );
}

// ─── Reusable Input Field ──────────────────────────────────────────

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  rightElement?: React.ReactNode;
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, rightElement, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        <div className="relative group">
          <div className="flex items-center gap-3">
            <input
              ref={ref}
              placeholder={label}
              className={`w-full bg-transparent text-white text-[15px] py-3 placeholder:text-white/25 outline-none peer ${className}`}
              {...props}
            />
            {rightElement}
          </div>
          {/* Underline */}
          <div className="absolute bottom-0 left-0 w-full h-px bg-white/10 transition-colors duration-300 group-focus-within:bg-primary-container" />
        </div>
        {/* Error message */}
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="text-[12px] text-red-400/80 mt-0.5"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);
InputField.displayName = 'InputField';

// ─── Submit Button ─────────────────────────────────────────────────

function SubmitButton({ isLoading, label }: { isLoading: boolean; label: string }) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="group relative mt-4 w-full py-4 rounded-full bg-primary-container text-white text-[13px] font-semibold tracking-[0.1em] uppercase flex items-center justify-center gap-2 overflow-hidden transition-all duration-300 hover:shadow-[0_8px_32px_rgba(255,122,0,0.35)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
    >
      {/* Shimmer effect */}
      {!isLoading && (
        <div className="absolute inset-0 overflow-hidden rounded-full">
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-shimmer" />
        </div>
      )}

      {isLoading ? (
        <Loader2 size={18} className="animate-spin" />
      ) : (
        <>
          <span>{label}</span>
          <ArrowRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </>
      )}
    </button>
  );
}
