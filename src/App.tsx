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
  ChevronLeft,
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
    id: 5,
    title: "Revenue Data Automation",
    category: "Data Automation",
    description: "Python script that automates revenue data validation, error detection, and report generation. Reduces manual financial data processing from 2-3 hours to 30 seconds with zero errors.",
    image: "/revenue_automation_preview.png",
    tags: ["Python", "Data Analysis", "JSON", "CSV"],
    link: "https://github.com/lokiinloops/revenue-automation"
  },
  {
    id: 6,
    title: "Invoice Processing & Data Extraction",
    category: "Business Automation",
    description: "Automated system extracting data from text files, validating information, and generating professional reports. Processes invoices in seconds, eliminating data entry errors and flagging overdue payments automatically.",
    image: "/invoice_automation_preview.png",
    tags: ["Python", "JSON", "Text Parsing", "Automation"],
    link: "https://github.com/lokiinloops/invoice_automation"
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
    <nav className="fixed top-4 left-4 right-4 max-w-5xl mx-auto z-50 px-6 py-4 flex justify-between items-center bg-white/80 backdrop-blur-md border border-slate-200 shadow-sm rounded-full transition-all">
      <div className="text-xl font-bold tracking-tighter text-slate-900">
        <span>BILAL ANWAR</span>
      </div>
      
      <div className="hidden md:flex gap-8 text-sm font-medium uppercase tracking-widest text-slate-600">
        <a href="#work" className="hover:text-slate-900 transition-colors duration-300">Work</a>
        <a href="#services" className="hover:text-slate-900 transition-colors duration-300">Services</a>
        <a href="#about" className="hover:text-slate-900 transition-colors duration-300">About</a>
        <a href="#contact" className="hover:text-slate-900 transition-colors duration-300">Contact</a>
      </div>

      <button className="md:hidden text-slate-900" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X /> : <Menu />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="absolute top-full mt-4 left-0 w-full bg-white border border-slate-200 rounded-2xl shadow-xl p-6 flex flex-col gap-4 md:hidden"
          >
            <a href="#work" onClick={() => setIsOpen(false)} className="text-lg font-medium text-slate-700 hover:text-indigo-600 transition-colors">Work</a>
            <a href="#services" onClick={() => setIsOpen(false)} className="text-lg font-medium text-slate-700 hover:text-indigo-600 transition-colors">Services</a>
            <a href="#about" onClick={() => setIsOpen(false)} className="text-lg font-medium text-slate-700 hover:text-indigo-600 transition-colors">About</a>
            <a href="#contact" onClick={() => setIsOpen(false)} className="text-lg font-medium text-slate-700 hover:text-indigo-600 transition-colors">Contact</a>
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
        className="max-w-6xl mx-auto w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-indigo-600 mb-6 block">
          AI Automation Specialist
        </span>
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-slate-900 leading-[0.85] mb-8">
          I BUILD <br />
          AUTOMATED <br />
          SYSTEMS.
        </h1>
        <p className="max-w-xl text-lg md:text-xl text-slate-600 leading-relaxed mb-10">
          I help agencies and enterprises scale their operations by integrating cutting-edge 
          AI agents and automated workflows. Less manual work, more impact.
        </p>
        <div className="flex flex-wrap gap-4">
          <a 
            href="#work" 
            className="px-8 py-4 bg-indigo-600 text-white rounded-full font-medium flex items-center gap-2 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
          >
            View Projects <ArrowRight className="w-4 h-4" />
          </a>
          <a 
            href="/Bilal_Anwar_CV.pdf" 
            download
            className="px-8 py-4 bg-white border border-slate-200 text-slate-900 rounded-full font-medium hover:border-slate-300 hover:bg-slate-50 transition-all duration-300 flex items-center gap-2"
          >
            Download CV <ArrowRight className="w-4 h-4 rotate-90" />
          </a>
        </div>
      </motion.div>
    </section>
  );
};

const HorizontalGallery = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const slide = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -420 : 420;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="work" className="py-24 bg-slate-50 overflow-hidden">
      <div className="px-6 md:px-24 mb-12 max-w-6xl mx-auto flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 mb-2">Selected Work</h2>
          <p className="text-slate-500 uppercase text-xs font-bold tracking-widest">Case Studies & Experiments</p>
        </div>
        <div className="hidden md:flex gap-3">
          <button 
            onClick={() => slide('left')}
            className="w-12 h-12 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 hover:-translate-y-1 hover:shadow-md transition-all duration-300"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={() => slide('right')}
            className="w-12 h-12 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 hover:-translate-y-1 hover:shadow-md transition-all duration-300"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto gap-8 px-6 md:px-24 pb-12 no-scrollbar snap-x snap-mandatory scroll-smooth"
      >
        {PROJECTS.map((project) => (
          <motion.div 
            key={project.id}
            whileHover={{ y: -8 }}
            className="flex-shrink-0 w-[85vw] md:w-[450px] snap-center transition-all duration-300"
          >
            <div className="aspect-[4/5] bg-white rounded-3xl overflow-hidden border border-slate-200/50 shadow-sm group relative">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 text-white">
                <span className="text-xs font-bold uppercase tracking-widest mb-2 text-indigo-400">{project.category}</span>
                <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] px-2 py-1 bg-white/10 rounded-full backdrop-blur-md border border-white/20">{tag}</span>
                  ))}
                </div>
                <a href={project.link} className="flex items-center gap-2 text-sm font-medium hover:text-indigo-300 transition-colors">
                  Case Study <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-xl font-bold text-slate-900 mb-2">{project.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{project.description}</p>
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
        <div className="md:col-span-1">
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 mb-6">How I help <br />agencies grow.</h2>
          <p className="text-slate-600 leading-relaxed">
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
              className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shadow-sm mb-6">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 px-6 md:px-24 bg-slate-900 text-white rounded-[2.5rem] md:rounded-[4rem] mx-4 md:mx-auto max-w-7xl overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
      <div className="max-w-4xl mx-auto relative z-10">
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-indigo-400 mb-8 block">About Me</span>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight mb-12">
          I bridge the gap between <span className="text-indigo-300 italic">raw technology</span> and <span className="text-indigo-300 italic">business reality</span>.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-lg text-slate-300 leading-relaxed">
          <p>
            With a profound passion for AI and LLMs, I've spent the last 3 years mastering the AI landscape. I specialize in turning complex LLM capabilities into simple, reliable tools for non-technical teams.
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
      <div className="max-w-2xl mx-auto">
        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-slate-900 mb-8">Ready to automate?</h2>
        <p className="text-xl text-slate-600 mb-12">
          I'm currently open to new projects and agency partnerships. Let's build something that scales.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <a 
            href="mailto:bilaalautomates@gmail.com" 
            className="w-full sm:w-auto px-12 py-5 bg-indigo-600 text-white rounded-full font-bold text-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
          >
            <Mail className="w-5 h-5" /> Say Hello
          </a>
          <div className="flex gap-4">
            <a href="https://github.com/lokiinloops" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full bg-white border border-slate-200 text-slate-600 flex items-center justify-center hover:bg-slate-50 hover:text-indigo-600 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://www.linkedin.com/in/bilalanwar2003/" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full bg-white border border-slate-200 text-slate-600 flex items-center justify-center hover:bg-slate-50 hover:text-indigo-600 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
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
    <footer className="py-12 px-6 md:px-24 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-sm font-medium text-slate-500">
          © {new Date().getFullYear()} BILAL ANWAR — Built with precision.
        </div>
        <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-slate-500">
          <a href="https://github.com/lokiinloops" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors duration-300">GitHub</a>
          <a href="https://www.linkedin.com/in/bilalanwar2003/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors duration-300">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-slate-900 selection:bg-indigo-600 selection:text-white">
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
