import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="footer-section" className="w-full bg-secondary text-white py-16 border-t border-secondary">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-extrabold text-sm tracking-tight shadow-lg shadow-orange-500/20 border border-white/20">
                GW
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-white to-orange-400 bg-clip-text text-transparent uppercase font-sans">
                  Gadiwalla
                </span>
                <span className="text-[10px] tracking-[0.25em] text-orange-400 uppercase font-bold -mt-0.5">
                  Automotive Group
                </span>
              </div>
            </div>
            <p className="text-body-sm text-white/60 max-w-sm font-normal leading-relaxed">
              Manage dealership inventory efficiently with Gadiwalla. Search, organize and maintain your vehicle catalog through a modern inventory management platform.
            </p>
          </div>

          {/* Social / Contact Links */}
          <div className="space-y-4">
            <h4 className="text-label text-primary uppercase tracking-widest font-bold">Contact & Social</h4>
            <ul className="space-y-2.5 text-body-sm text-white/70">
              <li>
                <a href="mailto:support@gadiwalla.com" className="hover:text-primary transition-colors flex items-center gap-1 group">
                  <span>support@gadiwalla.com</span>
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
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
            <h4 className="text-label text-primary uppercase tracking-widest font-bold">Legal</h4>
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
