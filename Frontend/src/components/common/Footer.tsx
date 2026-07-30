import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-secondary text-white py-16 border-t border-secondary">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-sm tracking-tight shadow-md">
                GW
              </div>
              <span className="text-heading-sm font-bold tracking-tight text-white uppercase font-sans">
                Gadiwalla
              </span>
            </div>
            <p className="text-body-sm text-white/60 max-w-sm font-normal leading-relaxed">
              Manage dealership inventory efficiently with Gadiwalla. Search, organize and maintain your vehicle catalog through a modern inventory management platform.
            </p>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="text-label text-primary uppercase tracking-widest">Connect</h4>
            <ul className="space-y-2.5 text-body-sm text-white/70">
              <li>
                <a href="#" className="hover:text-primary transition-colors flex items-center gap-1 group">
                  <span>Instagram</span>
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors flex items-center gap-1 group">
                  <span>LinkedIn</span>
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors flex items-center gap-1 group">
                  <span>Twitter / X</span>
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h4 className="text-label text-primary uppercase tracking-widest">Legal</h4>
            <ul className="space-y-2.5 text-body-sm text-white/70">
              <li>
                <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">Cookie Preferences</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-caption text-white/40">
          <p>© {new Date().getFullYear()} Gadiwalla Automotive Group. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="font-mono text-[11px] tracking-wider uppercase">Precision Mobility Platform</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
