import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ExternalLink, Terminal, Lock, Code, Globe, Github } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const Hero = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const expertise = [
    { icon: Lock, title: 'Certified Ethical Hacker', delay: 0.2 },
    { icon: Shield, title: 'Cybersecurity Professional', delay: 0.4 },
    { icon: Code, title: 'Full Stack Developer', delay: 0.6 },
    { icon: Terminal, title: 'Penetration Tester', delay: 0.8 },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      },
    },
  };

  return (
    <section className="min-h-screen relative overflow-hidden">
      {/* Animated background gradients */}
      <div className="hero-glow hero-glow-1" />
      <div className="hero-glow hero-glow-2" />
      <div className="hero-glow hero-glow-3" />
      
      <div className="container mx-auto px-6 pt-32 pb-16 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div 
            variants={itemVariants}
            className="flex items-center justify-center mb-6"
          >
            <Shield className="w-16 h-16 text-primary animate-pulse" />
          </motion.div>
          
          <motion.h1
            variants={itemVariants}
            className="font-display text-6xl md:text-8xl font-bold mb-6 bg-clip-text  bg-gradient-to-r from-primary via-secondary to-accent text-glow"
          >
            Nikhil Nagpure
          </motion.h1>
          
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
          >
            {expertise.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                  className="glass-card p-6 rounded-2xl relative group"
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Icon className="w-8 h-8 mx-auto mb-3 text-primary group-hover:scale-110 transition-transform" />
                  <p className="text-sm font-medium relative z-10">{item.title}</p>
                </motion.div>
              );
            })}
          </motion.div>
          
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-foreground/80 mb-12 font-light leading-relaxed"
          >
            Securing digital landscapes while crafting exceptional user experiences.
            <br />
            Specializing in cybersecurity, ethical hacking, and full-stack development.
          </motion.p>
          
          <motion.div
            variants={containerVariants}
            className="flex flex-col md:flex-row items-center justify-center gap-6"
          >
            <motion.a
              href="https://github.com/5h4d0wn1k"
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass-card px-8 py-4 rounded-full font-medium flex items-center gap-3 group w-full md:w-auto justify-center"
            >
              <Github className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              View GitHub
              <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/nikhilnagpure24"
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass-card px-8 py-4 rounded-full font-medium flex items-center gap-3 group w-full md:w-auto justify-center"
            >
              <Globe className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Connect on LinkedIn
              <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;