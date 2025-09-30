import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Briefcase,
  FileText,
  Calendar,
  MessageSquare,
  Zap,
  Bell,
  Settings,
} from 'lucide-react';

const navigation = [
  { name: 'Briefing', href: '/', icon: Home },
  { name: 'Portfolio', href: '/portfolio', icon: Briefcase },
  { name: 'Analysis', href: '/analysis', icon: FileText },
  { name: 'Calendar', href: '/calendar', icon: Calendar },
  { name: 'Assistant', href: '/assistant', icon: MessageSquare },
  { name: 'What If', href: '/what-if', icon: Zap },
  { name: 'Alerts', href: '/alerts', icon: Bell },
  { name: 'Settings', href: '/settings', icon: Settings },
];

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="lg:hidden">
      {/* Mobile header */}
      <div className="fixed top-0 left-0 right-0 z-40 flex h-16 items-center gap-x-4 border-b bg-card px-4 shadow-sm">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-foreground"
          onClick={() => setIsOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </button>
        <div className="flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold">Signal</span>
        </div>
      </div>

      {/* Mobile padding for fixed header */}
      <div className="h-16" />

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 20 }}
              className="fixed inset-y-0 left-0 z-50 w-64 bg-card border-r"
            >
              <div className="flex h-16 items-center justify-between px-6">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-6 w-6 text-primary" />
                  <span className="text-lg font-bold">Signal</span>
                </div>
                <button
                  type="button"
                  className="-m-2.5 p-2.5 text-foreground"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <nav className="px-6 py-4">
                <ul className="space-y-1">
                  {navigation.map((item) => {
                    const isActive = location.pathname === item.href;
                    return (
                      <li key={item.name}>
                        <Link
                          to={item.href}
                          onClick={() => setIsOpen(false)}
                          className={`group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold ${
                            isActive
                              ? 'bg-primary text-primary-foreground'
                              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                          }`}
                        >
                          <item.icon className="h-5 w-5 shrink-0" />
                          {item.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNav;
