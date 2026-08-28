'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Activity } from 'lucide-react';

export default function TopNav() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Overview', href: '/overview' },
    { name: 'Devices', href: '/devices' },
    { name: 'Simulation', href: '/simulation' }
  ];

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-neutral-950/80 border-b border-white/10">
      <div className="flex h-14 items-center justify-between px-6 max-w-[1600px] mx-auto">
        <div className="flex items-center gap-3">
          <div className="h-7 w-7 flex items-center justify-center bg-white text-black rounded-md">
            <Activity className="h-4 w-4" />
          </div>
          <span className="font-semibold tracking-wide text-sm text-white">DRISHTI</span>
        </div>
        
        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-white/10 text-white' 
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
        
        <div className="w-24" /> {/* Spacer */}
      </div>
    </nav>
  );
}
