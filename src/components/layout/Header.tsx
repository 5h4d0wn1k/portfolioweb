import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Code, Brain, Terminal } from 'lucide-react';
import { ThemeToggle } from '../ui/ThemeToggle';

const Header = () => {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass-gradient"
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Shield className="w-8 h-8 text-primary" />
            <span className="font-display text-xl font-bold text-primary">
              Nikhil Nagpure
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/about" icon={<Brain className="w-4 h-4" />} text="About" />
            <NavLink to="/projects" icon={<Code className="w-4 h-4" />} text="Projects" />
            <NavLink to="/security" icon={<Shield className="w-4 h-4" />} text="Security" />
            <NavLink to="/contact" icon={<Terminal className="w-4 h-4" />} text="Contact" />
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </motion.header>
  );
};

const NavLink = ({ to, icon, text }: { to: string; icon: React.ReactNode; text: string }) => (
  <Link
    to={to}
    className="flex items-center space-x-1 text-foreground/80 hover:text-foreground transition-colors"
  >
    {icon}
    <span className="font-medium">{text}</span>
  </Link>
);

export default Header;