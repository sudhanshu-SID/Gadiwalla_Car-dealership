import { useState, useEffect } from 'react';
import { User, LogOut, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { isAdmin } from '../../utils/permissions';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'INVENTORY', href: '#inventory' },
    { name: 'ABOUT', href: '#about' },
    { name: 'CONTACT', href: '#contact' },
  ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-surface/90 backdrop-blur-md border-b border-border shadow-sm py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-sm tracking-tight shadow-md group-hover:scale-105 transition-transform duration-300">
            GW
          </div>
          <div className="flex flex-col">
            <span className="text-heading-sm font-bold tracking-tight text-text uppercase font-sans">
              Gadiwalla
            </span>
            <span className="text-[10px] tracking-[0.2em] text-text-muted uppercase font-semibold -mt-1">
              Automotive Group
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-label text-text-secondary hover:text-primary transition-colors duration-200 uppercase tracking-widest relative py-1"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Action Menu */}
        <div className="flex items-center gap-4">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-3">
              {/* User Profile Badge */}
              <div className="flex items-center gap-2.5 px-4 py-2 rounded-button bg-surface border border-border shadow-sm">
                <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-body-sm font-semibold text-text leading-tight">
                    {user.name}
                  </span>
                  <span className="text-[10px] text-text-muted font-mono uppercase tracking-wider flex items-center gap-1">
                    {isAdmin(user) && <Shield size={10} className="text-primary" />}
                    {user.role}
                  </span>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={logout}
                title="Sign out"
                className="p-2.5 rounded-button text-text-secondary hover:text-error hover:bg-error/10 border border-border transition-all duration-200"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 px-5 py-2.5 rounded-button text-label font-semibold text-text hover:text-primary border border-border hover:border-primary/40 bg-surface/50 hover:bg-surface transition-all duration-200 shadow-sm"
            >
              <User size={16} />
              <span>SIGN IN</span>
            </Link>
          )}
        </div>
      </div>
    </motion.header>
  );
}
