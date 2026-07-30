import { useState } from 'react';
import { Mail, Lock, EyeOff, Zap, Globe, Share2 } from 'lucide-react';
import Input from '../common/Input';
import AuthTabs from './AuthSwitcher';

export default function LoginForm() {
  const [activeTab, setActiveTab] = useState<'signin' | 'join'>('signin');

  return (
    <div className="w-full max-w-[440px] bg-surface-container-lowest/80 backdrop-blur-2xl rounded-[32px] p-8 md:p-10 shadow-[0_30px_60px_rgba(0,0,0,0.12)] opacity-0 translate-y-8 animate-fade-up animate-fill-forwards" id="auth-panel">
      <AuthTabs activeTab={activeTab} onTabChange={setActiveTab} />
      
      <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
        <div className="animate-fade-up animate-fill-forwards opacity-0 translate-y-4" style={{ animationDelay: '100ms' }}>
          <Input 
            type="email" 
            placeholder="Email Address" 
            icon={Mail} 
            required 
          />
        </div>

        <div className="animate-fade-up animate-fill-forwards opacity-0 translate-y-4" style={{ animationDelay: '200ms' }}>
          <Input 
            type="password" 
            placeholder="Passcode" 
            icon={Lock}
            rightElement={
              <button type="button" className="text-on-surface-variant/50 hover:text-on-surface transition-colors">
                <EyeOff className="w-4 h-4" />
              </button>
            }
            required 
          />
        </div>

        <div className="flex items-center justify-between mt-2 animate-fade-up animate-fill-forwards opacity-0 translate-y-4" style={{ animationDelay: '300ms' }}>
          <label className="flex items-center gap-2 cursor-pointer group">
            <div className="w-4 h-4 rounded-sm bg-surface-variant flex items-center justify-center transition-colors group-hover:bg-outline-variant">
            </div>
            <span className="font-caption text-caption text-on-surface-variant">Keep me signed in</span>
          </label>
          <a className="font-caption text-caption text-on-surface-variant hover:text-primary-container transition-colors" href="#">Forgot access?</a>
        </div>

        <button 
          type="submit"
          className="mt-6 w-full py-4 rounded-full bg-primary-container text-on-primary-container font-label-md text-label-md flex items-center justify-center gap-2 hover:shadow-[0_8px_16px_rgba(255,122,0,0.25)] hover:scale-[1.02] transition-all duration-300 animate-fade-up animate-fill-forwards opacity-0 translate-y-4" 
          style={{ animationDelay: '400ms' }}
        >
          <Zap className="w-5 h-5 fill-current" />
          SIGN IN
        </button>

        <div className="mt-8 flex flex-col gap-6 animate-fade-up animate-fill-forwards opacity-0 translate-y-4" style={{ animationDelay: '500ms' }}>
          <div className="flex items-center gap-4">
            <div className="flex-grow h-[1px] bg-surface-variant"></div>
            <span className="font-caption text-caption text-on-surface-variant tracking-widest uppercase text-[10px]">Or connect via</span>
            <div className="flex-grow h-[1px] bg-surface-variant"></div>
          </div>
          <div className="flex items-center justify-center gap-4">
            <button type="button" className="w-12 h-12 rounded-full bg-surface-container-highest hover:bg-surface-variant flex items-center justify-center transition-colors group">
              <Globe className="w-5 h-5 text-on-surface group-hover:text-primary-container transition-colors" />
            </button>
            <button type="button" className="w-12 h-12 rounded-full bg-surface-container-highest hover:bg-surface-variant flex items-center justify-center transition-colors group">
              <Share2 className="w-5 h-5 text-on-surface group-hover:text-primary-container transition-colors" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
