import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Linkedin, Github, Globe } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'nikhil.nagpure2024@vitbhopal.ac.in',
      link: 'mailto:nikhil.nagpure2024@vitbhopal.ac.in',
    },
    {
      icon: Linkedin,
      title: 'LinkedIn',
      value: 'nikhilnagpure24',
      link: 'https://linkedin.com/in/nikhilnagpure24',
    },
    {
      icon: Github,
      title: 'GitHub',
      value: '5h4d0wn1k',
      link: 'https://github.com/5h4d0wn1k',
    },
    {
      icon: Globe,
      title: 'Website',
      value: 'shadownik.online',
      link: 'https://shadownik.online',
    },
  ];

  return (
    <section id="contact" className="py-20 bg-secondary/5">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-display font-bold mb-12 text-center">Get in Touch</h2>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {contactInfo.map((item) => {
              const Icon = item.icon;
              return (
                <GlassCard key={item.title} className="p-6">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 hover:text-primary transition-colors"
                  >
                    <Icon className="w-8 h-8" />
                    <div>
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <p className="text-foreground/70">{item.value}</p>
                    </div>
                  </a>
                </GlassCard>
              );
            })}
          </div>

          <div className="mt-16 max-w-2xl mx-auto">
            <GlassCard className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">Send a Message</h3>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg bg-secondary/5 border border-secondary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 rounded-lg bg-secondary/5 border border-secondary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg bg-secondary/5 border border-secondary"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                >
                  Send Message
                </button>
              </form>
            </GlassCard>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;