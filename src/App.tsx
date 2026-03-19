/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  ArrowRight, 
  Bot, 
  Cpu, 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  ChevronRight,
  Menu,
  X,
  Layers,
  Code2,
  Workflow
} from 'lucide-react';

// --- Types ---
interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
}

// --- Mock Data ---
const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Autonomous Customer Support",
    category: "LLM Integration",
    description: "Built a multi-agent system using LangChain that handles 80% of routine support tickets with 95% accuracy.",
    image: "https://picsum.photos/seed/ai1/800/600",
    tags: ["OpenAI", "Python", "LangChain", "Redis"],
    link: "#"
  },
  {
    id: 2,
    title: "Supply Chain Optimizer",
    category: "Workflow Automation",
    description: "Automated inventory tracking and predictive ordering for a mid-sized logistics firm, reducing waste by 22%.",
    image: "https://picsum.photos/seed/ai2/800/600",
    tags: ["Make.com", "Airtable", "GPT-4o", "Stripe"],
    link: "#"
  },
  {
    id: 3,
    title: "Content Engine v2",
    category: "Generative AI",
    description: "A custom pipeline that transforms raw research into multi-channel marketing assets in seconds.",
    image: "https://picsum.photos/seed/ai3/800/600",
    tags: ["Anthropic", "Node.js", "Vercel", "Tailwind"],
    link: "#"
  },
  {
    id: 4,
    title: "Lead Gen Automator",
    category: "Sales Tech",
    description: "End-to-end lead enrichment and personalized outreach system scaling from 0 to 10k leads monthly.",
    image: "https://picsum.photos/seed/ai4/800/600",
    tags: ["n8n", "Clay", "Apollo", "Instantly"],
    link: "#"
  }
];

const SERVICES = [
  {
    icon: <Bot className="w-6 h-6" />,
    title: "LLM Solutions",
    description: "Custom RAG pipelines and agentic workflows tailored to your business data."
  },
  {
    icon: <Workflow className="w-6 h-6" />,
    title: "Workflow Design",
    description: "Connecting your stack (Make, n8n, Zapier) to eliminate manual data entry."
  },
  {
    icon: <Cpu className="w-6 h-6" />,
    title: "AI Strategy",
    description: "Consulting on how to integrate AI into existing operations for maximum ROI."
  }
];

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-white/80 backdrop-blur-md border-b border-black/5">
      <div className="text-xl font-bold tracking-tighter">
        <span>BILAL</span>
      </div>
      
      <div className="hidden md:flex gap-8 text-sm font-medium uppercase tracking-widest text-black/60">
        <a href="#work" className="hover:text-black transition-colors">Work</a>
        <a href="#services" className="hover:text-black transition-colors">Services</a>
        <a href="#about" className="hover:text-black transition-colors">About</a>
        <a href="#contact" className="hover:text-black transition-colors">Contact</a>
      </div>

      <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X /> : <Menu />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white border-b border-black/5 p-6 flex flex-col gap-4 md:hidden"
          >
            <a href="#work" onClick={() => setIsOpen(false)} className="text-lg font-medium">Work</a>
            <a href="#services" onClick={() => setIsOpen(false)} className="text-lg font-medium">Services</a>
            <a href="#about" onClick={() => setIsOpen(false)} className="text-lg font-medium">About</a>
            <a href="#contact" onClick={() => setIsOpen(false)} className="text-lg font-medium">Contact</a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 md:px-24 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-black/40 mb-6 block">
          AI Automation Specialist
        </span>
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.85] mb-8">
          I BUILD <br />
          AUTOMATED <br />
          SYSTEMS.
        </h1>
        <p className="max-w-xl text-lg md:text-xl text-black/60 leading-relaxed mb-10">
          I help agencies and enterprises scale their operations by integrating cutting-edge 
          AI agents and automated workflows. Less manual work, more impact.
        </p>
        <div className="flex flex-wrap gap-4">
          <a 
            href="#work" 
            className="px-8 py-4 bg-black text-white rounded-full font-medium flex items-center gap-2 hover:scale-105 transition-transform"
          >
            View Projects <ArrowRight className="w-4 h-4" />
          </a>
          <a 
            href="#" 
            className="px-8 py-4 border border-black/10 rounded-full font-medium hover:bg-black/5 transition-colors flex items-center gap-2"
          >
            Download CV <ArrowRight className="w-4 h-4 rotate-90" />
          </a>
        </div>
      </motion.div>
    </section>
  );
};

const HorizontalGallery = () => {
  return (
    <section id="work" className="py-24 bg-zinc-50 overflow-hidden">
      <div className="px-6 md:px-24 mb-12">
        <h2 className="text-4xl font-bold tracking-tight mb-2">Selected Work</h2>
        <p className="text-black/40 uppercase text-xs font-bold tracking-widest">Case Studies & Experiments</p>
      </div>
      
      <div className="flex overflow-x-auto gap-8 px-6 md:px-24 pb-12 no-scrollbar snap-x snap-mandatory">
        {PROJECTS.map((project) => (
          <motion.div 
            key={project.id}
            whileHover={{ y: -10 }}
            className="flex-shrink-0 w-[85vw] md:w-[450px] snap-center"
          >
            <div className="aspect-[4/5] bg-white rounded-3xl overflow-hidden border border-black/5 shadow-sm group relative">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 text-white">
                <span className="text-xs font-bold uppercase tracking-widest mb-2 text-white/60">{project.category}</span>
                <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] px-2 py-1 bg-white/20 rounded-full backdrop-blur-sm">{tag}</span>
                  ))}
                </div>
                <a href={project.link} className="flex items-center gap-2 text-sm font-medium hover:underline">
                  Case Study <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-black/60 text-sm leading-relaxed line-clamp-2">{project.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Services = () => {
  return (
    <section id="services" className="py-24 px-6 md:px-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-1">
          <h2 className="text-4xl font-bold tracking-tight mb-6">How I help <br />agencies grow.</h2>
          <p className="text-black/60 leading-relaxed">
            I don't just build bots. I build systems that integrate deeply with your existing business processes to drive measurable results.
          </p>
        </div>
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
          {SERVICES.map((service, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 bg-zinc-50 rounded-3xl border border-black/5 hover:border-black/20 transition-colors"
            >
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-black/60 text-sm leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 px-6 md:px-24 bg-black text-white">
      <div className="max-w-4xl">
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/40 mb-8 block">About Me</span>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight mb-12">
          I bridge the gap between <span className="text-white/40 italic">raw technology</span> and <span className="text-white/40 italic">business reality</span>.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-lg text-white/60 leading-relaxed">
          <p>
            With a background in software engineering and a passion for operational efficiency, I've spent the last 3 years mastering the AI landscape. I specialize in turning complex LLM capabilities into simple, reliable tools for non-technical teams.
          </p>
          <p>
            My approach is simple: identify the bottleneck, automate the repetitive, and empower the human. I believe AI shouldn't replace people, but give them superpowers to focus on what truly matters.
          </p>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 px-6 md:px-24 flex flex-col items-center text-center">
      <div className="max-w-2xl">
        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">Ready to automate?</h2>
        <p className="text-xl text-black/60 mb-12">
          I'm currently open to new projects and agency partnerships. Let's build something that scales.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <a 
            href="mailto:hello@example.com" 
            className="w-full sm:w-auto px-12 py-5 bg-black text-white rounded-full font-bold text-lg hover:scale-105 transition-transform flex items-center justify-center gap-3"
          >
            <Mail className="w-5 h-5" /> Say Hello
          </a>
          <div className="flex gap-4">
            <a href="#" className="w-14 h-14 rounded-full border border-black/10 flex items-center justify-center hover:bg-zinc-50 transition-colors">
              <Github className="w-6 h-6" />
            </a>
            <a href="#" className="w-14 h-14 rounded-full border border-black/10 flex items-center justify-center hover:bg-zinc-50 transition-colors">
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 px-6 md:px-24 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="text-sm font-medium text-black/40">
        © 2026 BILAL — Built with precision.
      </div>
      <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-black/40">
        <a href="#" className="hover:text-black transition-colors">Twitter</a>
        <a href="#" className="hover:text-black transition-colors">GitHub</a>
        <a href="#" className="hover:text-black transition-colors">LinkedIn</a>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-black selection:bg-black selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <HorizontalGallery />
        <Services />
        <About />
        <Contact />
      </main>
      <Footer />
      
      {/* Custom Scrollbar Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}
