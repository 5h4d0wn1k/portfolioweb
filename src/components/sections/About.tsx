import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Award, FileCode, Trophy, FileText } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-display font-bold mb-12 text-center">About Me</h2>
          
          <div className="grid gap-8">
            <GlassCard className="p-8">
              <div className="flex items-start gap-4">
                <FileText className="w-8 h-8 text-primary flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-4">Publications & Patents</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold">Patent Filing</h4>
                      <p className="text-foreground/70">
                        "A SELF-CLEANING GLASSES CASE SYSTEM"<br />
                        Application No: 202421032123
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-8">
              <div className="flex items-start gap-4">
                <Trophy className="w-8 h-8 text-primary flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-4">Achievements & Activities</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold">Hackathons & Competitions</h4>
                      <ul className="space-y-2 text-foreground/70">
                        <li>• Ranked 36th in CyVIT CTF competition at VIT Bhopal</li>
                        <li>• Participated in DSA Dash</li>
                        <li>• Participated in Smart India Hackathon</li>
                        <li>• Participated in Kavach (March 2023)</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold">Global Recognition</h4>
                      <ul className="space-y-2 text-foreground/70">
                        <li>• Top 12% on TryHackMe Globally</li>
                        <li>• Under world's top 600 in Bug Base</li>
                        <li>• Active contributor on Leetcode and Hack The Box platforms</li>
                        <li>• Former core member of Health O Tech Club, VIT Bhopal (July 2021)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-8">
              <div className="flex items-start gap-4">
                <GraduationCap className="w-8 h-8 text-primary flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-4">Education</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold">VIT Bhopal University</h4>
                      <p className="text-sm text-foreground/70">B.Tech in Computer Science (Cybersecurity)</p>
                      <p className="text-sm text-foreground/70">2021 - 2025 • CGPA: 8.26/10</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Keshav English School</h4>
                      <p className="text-sm text-foreground/70">B.Tech in Computer Science (Cybersecurity)</p>
                      <p className="text-sm text-foreground/70">2020 - 2021 • 82.4%</p>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-8">
              <div className="flex items-start gap-4">
                <Award className="w-8 h-8 text-primary flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-4">Certifications</h3>
                  <ul className="space-y-2">
                    <li>• Certified Ethical Hacker (CEH) - EC-Council</li>
                    <li>• Certified Network Security Practitioner (CNSP)</li>
                    <li>• Practical Ethical Hacking - TCM Security</li>
                    <li>• Python Specialization - Michigan University</li>
                  </ul>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-8">
              <div className="flex items-start gap-4">
                <FileCode className="w-8 h-8 text-primary flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-4">Skills</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">Security Skills</h4>
                      <ul className="space-y-1 text-foreground/70">
                        <li>• GRC</li>
                        <li>• NIST</li>
                        <li>• Vulnerability Assessment</li>
                        <li>• Penetration Testing</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Technical Skills</h4>
                      <ul className="space-y-1 text-foreground/70">
                        <li>• Linux Administration</li>
                        <li>• APIs & Networking</li>
                        <li>• Python, Java, DSA</li>
                        <li>• UI/UX & Full Stack Development</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;