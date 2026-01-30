"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useMotionValue, useTransform } from "framer-motion";
import { 
  Github, Linkedin, Instagram, Facebook, ExternalLink, 
  Mail, CheckCircle2, Award, X, Code2, Sparkles, Sun, Moon 
} from "lucide-react";

export default function Home() {
  const [selectedCert, setSelectedCert] = useState<null | { title: string; img: string; issuer: string }>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  
  const RICH_BLACK = "#101314";
  const OFF_WHITE = "#FFFFFA";

  const heroImages = ["/P1.jpg", "/P2.jpg", "/P3.jpg", "/P7.jpg", "/profile.jpg"];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const background = useTransform(
    [mouseX, mouseY],
    ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, ${isDarkMode ? 'rgba(0,255,255,0.08)' : 'rgba(54,69,79,0.06)'}, transparent 80%)`
  );

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const scrollToSection = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
  };

 const floatingAnimation = {
    y: ["0%", "-3%", "0%"],
    transition: { 
      duration: 3, 
      repeat: Infinity, 
      ease: "easeInOut" as const // <--- Add 'as const' here
    }
  };

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Certs", href: "#certs" },
    { name: "Contact", href: "#contact" }
  ];

  const skills = [
    { name: "Next.js ", level: "80%", icon: <Sparkles size={14}/> },
    { name: "React Native ", level: "70%", icon: <Sparkles size={14}/> },
    { name: "Java Script", level: "85%", icon: <Code2 size={14}/> },
    { name: "C++", level: "89%", icon: <Sparkles size={14}/> },
    { name: "SQL", level: "89%", icon: <Sparkles size={14}/> },
    { name: "C#", level: "90%", icon: <Sparkles size={14}/> },
  ];

  const projects = [
    { title: "CROSSWAY", category: "Youth Conference Website", img: "/CROSSWAYWEB.jpg", link: "https://crossway.vercel.app/" },
    { title: "GREAT-STORIES", category: "Bible Great Stories", img: "/GSWEB.jpg", link: "https://great-stories.vercel.app/" },
    { title: "PODIUM", category: "The Podium is a web application for managing and tracking seminars for HCDC's VPAA. Tracks attendance, evaluate attended seminars, generates certificates and sent to email, and a seminar evaluation analytics for the admin with a certificate template editor. Built for WS101 during my 3rd year of college.", img: "/PODIUMWEB.jpg", link: "https://hcdc-podium.vercel.app/home" },
    { title: "WE CARE", category: "We Care is a mobile app designed to uplift and inspire. With a collection of motivational quotes and Bible verses, it helps you shift your mood and gain a fresh perspective whenever you need it. More than just words on a screen, We Care empowers you to boost your confidence, find encouragement, and meet your personal needs—whether you’re seeking inspiration, comfort, or a daily reminder of hope.", img: "/WECARE.jpg", link: "" },
    { title: "SUPER K POS", category: "To support its growing operations, Super K Marketing Inc. utilizes a Point of Sale (POS) with Inventory Management System, designed to streamline sales transactions, track product stock in real-time, and improve overall efficiency. This system ensures that the business can provide excellent customer service while maintaining accurate records of sales and inventory.", img: "/SUPERK.jpg", link: "" },
    { title: "WANDER", category: "WANDER is a tour guide company built for people who crave adventure, stories, and unforgettable moments. More than just bringing travelers from point A to point B, WANDER creates experiences that connect you to culture, nature, and the heart of every destination. We’re all about making your journey smooth, safe, and hella exciting — whether it’s a chill city stroll, a nature escape, or a full-on adventure vibe.", img: "/wander.png", link: "" },
  ];

  const certificates = [
    { title: "C++ Development", issuer: "SKILLUP", img: "/C++.png" },
    { title: "FULL STACK JAVA DEVELOPMENT", issuer: "SKILLUP", img: "/CERTIFICATE5.jpg" },
    { title: "INFORMATION MANAGEMENT", issuer: "CODECHUM", img: "/IM.png" },
    { title: "JavaScript", issuer: "BITDEGREE", img: "/JST.png" },
  ];

  return (
    <div 
      style={{ backgroundColor: isDarkMode ? RICH_BLACK : OFF_WHITE, color: isDarkMode ? OFF_WHITE : RICH_BLACK }}
      className="relative min-h-screen transition-colors duration-700 font-sans selection:bg-cyan-500/30 overflow-x-hidden"
    >
      <motion.div className="fixed inset-0 pointer-events-none z-0" style={{ background }} />
      <motion.div className="fixed top-0 left-0 right-0 h-1 z-[100] origin-left bg-cyan-400 shadow-[0_0_10px_#00FFFF]" style={{ scaleX }} />

      {/* NAVBAR */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center w-full max-w-[95%] md:max-w-max px-4">
        <div style={{ borderColor: isDarkMode ? 'rgba(0,255,255,0.1)' : 'rgba(54,69,79,0.1)' }} className={`flex items-center gap-1 md:gap-2 p-1 md:p-2 backdrop-blur-2xl border rounded-full shadow-2xl transition-colors ${isDarkMode ? "bg-white/5" : "bg-black/5"}`}>
          <div className="px-3 md:px-4 py-2 rounded-full text-[10px] md:text-xs font-black tracking-widest uppercase bg-cyan-500 text-black">SYSTEM ONLINE</div>
          <div className="flex items-center gap-1">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} onClick={(e) => scrollToSection(e, link.href)} className="px-2 md:px-3 py-2 text-[10px] md:text-xs font-medium opacity-50 hover:opacity-100 hover:text-cyan-400 transition-all uppercase tracking-widest">{link.name}</a>
            ))}
            <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2 rounded-full transition-colors hover:text-cyan-400 ${isDarkMode ? "hover:bg-white/10" : "hover:bg-black/10"}`}>
              {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 relative z-10">
        {/* HERO SECTION */}
        <section className="relative flex flex-col lg:flex-row min-h-screen items-center justify-center gap-16 pt-32 lg:pt-20">
          <div className="flex-1 text-center lg:text-left z-10 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 text-[10px] uppercase tracking-widest mb-6 bg-cyan-500/5 text-cyan-400">
              <Sparkles size={12} /> INITIALIZING FUTURE .....
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-[100px] font-black tracking-tighter leading-[0.9] mb-8">
              JL MONLEON<br /> <span className="text-cyan-500">FULL STACK DEVELOPER </span>
            </h1>
            <p className="text-base md:text-lg max-w-lg mb-10 mx-auto lg:mx-0 font-light opacity-60">
              I’m a BSIT graduate passionate about technology and innovation. Through projects and hands-on experience, I’ve honed my skills and explored how IT can solve real-world problems and create new opportunities.
            </p>
            <motion.button 
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} 
              onClick={(e) => scrollToSection(e, '#contact')}
              className="px-10 py-4 bg-white text-black border-2 border-white rounded-full font-black text-xs tracking-[0.2em] uppercase shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:bg-transparent hover:text-white transition-all duration-300"
            >
              CONTACT ME
            </motion.button>
          </div>

          <motion.div animate={floatingAnimation} className="flex-1 relative w-full max-w-[320px] md:max-w-[450px] aspect-square lg:aspect-[4/5] order-1 lg:order-2">
            <div style={{ borderColor: isDarkMode ? 'rgba(0,255,255,0.2)' : 'rgba(54,69,79,0.2)' }} className="relative w-full h-full overflow-hidden rounded-[3.5rem] border shadow-2xl shadow-cyan-500/10">
              <AnimatePresence mode="wait">
                <motion.div key={currentImage} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} className="absolute inset-0 w-full h-full">
                  <Image src={heroImages[currentImage]} alt="Portrait" fill className="object-cover" priority />
                </motion.div>
              </AnimatePresence>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {heroImages.map((_, i) => (
                  <div key={i} className={`h-1 rounded-full transition-all duration-500 ${currentImage === i ? "w-6 bg-cyan-400" : "w-1 bg-white/30"}`} />
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* ABOUT */}
        <section id="about" className="py-40 border-t border-white/10 scroll-mt-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-10">
              <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-4">ABOUT ME</h2>
              <p className="text-xl md:text-2xl leading-relaxed font-light opacity-70">
                Driven, detail-oriented, and highly adaptable, I value collaboration, clear communication, and continuous growth. I am a Full Stack Developer and BSIT graduate who crafts modern, reliable, and scalable digital solutions grounded in creativity and precision. I focus on stripping away complexity to reveal the essence of interaction, balancing functionality and aesthetics to deliver intuitive, purposeful, and impactful user-centered digital experiences.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {['FULL STACK DEVELOPER', 'BACK END', 'FRONT END', 'DESIGNER'].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] font-bold text-cyan-500 bg-cyan-500/5 p-4 border border-cyan-500/10 rounded-2xl">
                    <CheckCircle2 size={18} /> {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-8 p-10 rounded-[3rem] border border-white/10 bg-white/5 backdrop-blur-md">
              <h3 className="text-xs uppercase tracking-[0.5em] font-black opacity-30">Core System Stack</h3>
              {skills.map((skill, i) => (
                <div key={i} className="space-y-3">
                  <div className="flex justify-between text-xs font-mono uppercase tracking-widest">
                    <span className="flex items-center gap-2">{skill.icon} {skill.name}</span>
                    <span className="text-cyan-400">{skill.level}</span>
                  </div>
                  <div className="h-[2px] w-full bg-white/10 overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: skill.level }} transition={{ duration: 1.5 }} className="h-full bg-cyan-400 shadow-[0_0_10px_#00FFFF]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION - UPDATED TO SHOW CATEGORY DESCRIPTION */}
        <section id="projects" className="py-32 border-t border-white/10 scroll-mt-32">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-16 uppercase">Deployments</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {projects.map((project, i) => (
              <motion.a key={i} href={project.link} target="_blank" whileHover={{ y: -10 }} className="group block relative aspect-[16/10] border border-white/10 rounded-[2.5rem] overflow-hidden backdrop-blur-sm transition-all">
                <Image src={project.img} alt={project.title} fill className="object-cover brightness-50 group-hover:brightness-75 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="space-y-2">
                    <h4 className="text-3xl font-bold text-white uppercase tracking-tighter">{project.title}</h4>
                    <p className="text-white/60 text-xs leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-500 font-light max-w-md">
                      {project.category}
                    </p>
                  </div>
                  <div className="mt-6 flex justify-between items-center">
                    
                    <div className="p-3 rounded-full bg-cyan-500/20 border border-cyan-500/30 group-hover:bg-cyan-500 transition-all">
                      <ExternalLink size={18} className="text-cyan-400 group-hover:text-black" />
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </section>

        {/* CERTS */}
        <section id="certs" className="py-32 border-t border-white/10 scroll-mt-32">
          <h2 className="text-center text-4xl md:text-5xl font-black tracking-tighter mb-20 uppercase">Validation</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {certificates.map((cert, i) => (
              <motion.div key={i} whileHover={{ y: -10 }} onClick={() => setSelectedCert(cert)} className="group cursor-pointer border border-white/10 p-5 rounded-[2rem] bg-white/5 backdrop-blur-sm hover:border-cyan-500/40 transition-all">
                <div className="relative aspect-video rounded-2xl overflow-hidden mb-6">
                  <Image src={cert.img} alt={cert.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-cyan-500/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Award className="text-cyan-400 w-10 h-10" />
                  </div>
                </div>
                <h4 className="font-bold text-lg">{cert.title}</h4>
                <p className="text-cyan-500/60 text-xs mt-1 uppercase tracking-widest">{cert.issuer}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="min-h-screen flex items-center justify-center py-20 border-t border-white/10 relative overflow-hidden scroll-mt-32">
          <div className="w-full max-w-6xl text-center space-y-16">
            <h2 className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-none">READY TO <br /> <span className="text-cyan-500">CONNECT?</span></h2>
            
            <div className="flex flex-col items-center gap-12">
              <motion.a href="mailto:monleonjohnlawrence@gmail.com" whileHover={{ scale: 1.05 }} className="px-16 py-8 rounded-2xl font-black uppercase text-sm tracking-[0.3em] bg-cyan-500 text-black flex items-center gap-4">
                <Mail size={20} /> Send Pulse
              </motion.a>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                {[
                  { icon: <Github size={24}/>, label: 'Github', url: 'https://github.com/monleonjohnlawrence-dev' }, 
                  { icon: <Linkedin size={24}/>, label: 'LinkedIn', url: 'https://www.linkedin.com/in/john-lawrence-monleon-349397393/' }, 
                  { icon: <Instagram size={24}/>, label: 'Instagram', url: 'https://www.instagram.com/law_renceee?igsh=Mmt3Z29tMThiM2Q3' }, 
                  { icon: <Facebook size={24}/>, label: 'Facebook', url: 'https://www.facebook.com/jlmonleon18' }
                ].map((social, i) => (
                  <motion.a 
                    key={i} href={social.url} target="_blank" rel="noopener noreferrer"
                    whileHover={{ y: -8, borderColor: '#00FFFF' }} 
                    className="flex flex-col items-center p-8 rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-md transition-all group"
                  >
                    <div className="mb-4 opacity-50 group-hover:opacity-100 text-cyan-400">{social.icon}</div>
                    <span className="text-[10px] uppercase tracking-widest font-bold opacity-30 group-hover:opacity-100">{social.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>
            <footer className="pt-20 opacity-20 text-[10px] uppercase tracking-[0.5em]">EXODUS 14:14 • THE LORD GOD WILL FIGHT FOR YOU JUST STAY CALM</footer>
          </div>
        </section>
      </main>

      <AnimatePresence>
        {selectedCert && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl" onClick={() => setSelectedCert(null)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="relative max-w-5xl w-full aspect-video rounded-[2.5rem] overflow-hidden border border-cyan-500/20 bg-[#101314]" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setSelectedCert(null)} className="absolute top-6 right-6 z-10 p-3 bg-white/10 rounded-full text-white hover:bg-cyan-500 hover:text-black transition-colors"><X size={20} /></button>
              <Image src={selectedCert.img} alt={selectedCert.title} fill className="object-contain p-10" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}