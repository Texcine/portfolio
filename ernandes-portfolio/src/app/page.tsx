"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, useAnimation, useScroll, useMotionValueEvent, Variants } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import useEmblaCarousel from 'embla-carousel-react';
import { type EmblaCarouselType } from 'embla-carousel'; // A tipagem vem do pacote principal
import { ArrowRight, Code, Users, Award, Github, Linkedin } from 'lucide-react'; // Ícones para um toque extra

import Apresentacao from "./components/Apresentacao";
import GameBackground from "./components/GameBackGround"; // NOVO: Importa o fundo animado
import TetrisFooter from "./components/TetrisFooter";
import SnakeHeaderAnimation from "./components/SnakeHeaderAnimation";

/* ================= SKILLS (edite aqui) ================= */
type Skill = { name: string; level: number; bar: string; text: string };
const coreSkills: Skill[] = [
  { name: "Unity (2D / 3D)", level: 92, bar: "bg-cyan-400", text: "text-cyan-300" },
  { name: "Multiplayer (Mirror / Photon)", level: 80, bar: "bg-pink-400", text: "text-pink-300" },
  { name: "Unreal (Blueprints)", level: 68, bar: "bg-violet-500", text: "text-violet-400" },
  { name: "Game Design", level: 72, bar: "bg-yellow-400", text: "text-yellow-300" },
  { name: "Modelagem 3D", level: 65, bar: "bg-emerald-500", text: "text-emerald-400" },
];

const skillTags = [ "C#", "Unity", "URP", "Shader Graph", "Mirror", "Photon", "Netcode", "Unreal", "Blueprints", "TypeScript", "React", "Next.js", "Python", "Blender", "Substance", "Pixel Art", "Aseprite", "UI/UX", "Git", "GitHub"];

/* ================= PROJETOS (estrutura de dados ATUALIZADA) ================= */
type ProjectMedia = { type: 'image' | 'video'; src: string; };
type Project = { title: string; desc: string; href: string; badge?: string; carousel: ProjectMedia[]; contribution: string; teamSize?: string; awards?: string[]; };

const projects: Project[] = [
  {
    title: "Project: Neon Runner",
    desc: "Um ágil top-down shooter com progressão roguelite, focado em gameplay responsivo e um forte 'game feel'.",
    href: "#", badge: "Game • Unity • PC",
    carousel: [
      // Use um ID de vídeo real do YouTube aqui
      { type: 'video', src: 'Lsox2n7g6aE' },
      // ATUALIZADO: Usando sua foto de perfil como exemplo
      { type: 'image', src: '/pictures/profile.png' }, 
    ],
    contribution: "Liderei o desenvolvimento da arquitetura de sistemas, implementando a IA dos inimigos, o sistema procedural de power-ups e a lógica de progressão. Meu foco foi o polimento da experiência moment-to-moment.",
    teamSize: "Solo", awards: ["Melhor Gameplay - Indie Jam 2024"],
  },
  {
    title: "Multiplayer Card Game",
    desc: "Protótipo de um jogo de cartas que mistura mecânicas clássicas com multiplayer via Photon, incluindo salas, chat e sistema de reconexão.",
    href: "#", badge: "Multiplayer • Photon",
    carousel: [
      { type: 'image', src: '/projects/truno.jpg' },
      { type: 'image', src: '/projects/placeholder-3.jpg' },
    ],
    contribution: "Fui responsável por toda a infraestrutura de rede, garantindo a sincronização de estado em tempo real e uma experiência de usuário estável. Criei um sistema de regras flexível e modular.",
    teamSize: "2 Devs",
  },
];

/* =============== helpers de animação =============== */
const sectionAnimation: Variants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20, duration: 0.8 } },
};

function useReveal() {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        controls.start("show");
      } else {
        // ANIMAÇÃO CONTÍNUA: Reseta a animação quando sai da tela
        controls.start("hidden");
      }
    }, { threshold: 0.1 });
    observer.observe(element);
    return () => observer.disconnect();
  }, [controls]);
  return { ref, variants: sectionAnimation, initial: "hidden", animate: controls };
}

/* =============== Componente de Carrossel (CÓDIGO CORRIGIDO) =============== */
function ProjectCarousel({ media }: { media: ProjectMedia[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = (api: EmblaCarouselType) => setSelectedIndex(api.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    // Limpa o evento ao desmontar o componente
    return () => { emblaApi.off('select', onSelect) };
  }, [emblaApi]);

  return (
    <div className="relative group">
      <div className="overflow-hidden rounded-xl ring-1 ring-violet-500/30" ref={emblaRef}>
        <div className="flex">
          {media.map((item, index) => (
            <div className="flex-grow-0 flex-shrink-0 basis-full min-w-0" key={index}>
              <div className="aspect-video bg-black">
                {item.type === 'video' ? (
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${item.src}?autoplay=0&mute=1&loop=1&playlist=${item.src}`}
                    title="Project Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                ) : (
                  <Image src={item.src} alt="Project image" width={1280} height={720} className="w-full h-full object-cover" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
       
      {/* Botões de Navegação */}
      {media.length > 1 && (
        <>
          <button onClick={scrollPrev} className="absolute top-1/2 left-3 -translate-y-1/2 bg-black/30 text-white rounded-full p-2 hover:bg-black/60 transition-all opacity-0 group-hover:opacity-100 z-10">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button onClick={scrollNext} className="absolute top-1/2 right-3 -translate-y-1/2 bg-black/30 text-white rounded-full p-2 hover:bg-black/60 transition-all opacity-0 group-hover:opacity-100 z-10">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
          
          {/* Pontos de Navegação */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {media.map((_, index) => (
              <button key={index} onClick={() => emblaApi?.scrollTo(index)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${index === selectedIndex ? 'bg-cyan-400' : 'bg-white/40 hover:bg-white/70'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* =============== ATUALIZADO: Componente de Projeto =============== */
function ProjectShowcaseItem({ p }: { p: Project }) {
  const motionProps = useReveal();
  return (
    <motion.article {...motionProps} className="rounded-2xl border border-violet-500/30 bg-gray-900/50 backdrop-blur-sm p-5 sm:p-8 shadow-2xl shadow-violet-500/10">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6">
        <h3 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-pink-500">{p.title}</h3>
        {p.badge && <span className="px-3 py-1 rounded-full text-xs font-medium bg-cyan-900/50 border border-cyan-500/30 text-cyan-300">{p.badge}</span>}
      </div>
      <div className="mb-8">
        <ProjectCarousel media={p.carousel} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <p className="text-gray-300 leading-relaxed mb-6 italic border-l-4 border-violet-500 pl-4">{p.desc}</p>
          <div className="p-4 rounded-lg bg-gray-950/50 border border-gray-800">
            <h4 className="font-semibold text-cyan-300 mb-2 flex items-center gap-2"><Code size={18}/> Minha Contribuição</h4>
            <p className="text-gray-400 leading-relaxed text-sm">{p.contribution}</p>
          </div>
        </div>
        <div className="lg:col-span-1 space-y-5">
          {p.teamSize && (
            <div className="p-3 rounded-md bg-gray-900/50">
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-2"><Users size={16}/> Equipe</h4>
              <p className="text-gray-200 font-medium">{p.teamSize}</p>
            </div>
          )}
          {p.awards && p.awards.length > 0 && (
            <div className="p-3 rounded-md bg-gray-900/50">
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-2"><Award size={16}/> Prêmios</h4>
              <ul className="text-cyan-400">
                {p.awards.map(award => <li key={award} className="text-gray-200 font-medium">{award}</li>)}
              </ul>
            </div>
          )}
          <a href={p.href} className="w-full mt-4 !block">
             <ShinyButton text="Ver Projeto" icon={<ArrowRight size={18} />} />
          </a>
        </div>
      </div>
    </motion.article>
  );
}
/* =============== NOVO: Componente de Botão com Efeito =============== */
const ShinyButton = ({ text, icon }: { text: string; icon?: React.ReactNode }) => (
    <button className="w-full relative inline-flex items-center justify-center px-6 py-3 rounded-lg overflow-hidden font-bold text-white transition-all duration-300 bg-gradient-to-r from-violet-600 to-cyan-500 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50 group">
        <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-pink-500 to-purple-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
        <span className="absolute top-0 left-0 w-4 h-full bg-white/20 transform -skew-x-12 -translate-x-full transition-transform duration-500 group-hover:translate-x-full"></span>
        <span className="relative flex items-center gap-2">{text} {icon}</span>
    </button>
);


/* =========================== PÁGINA =========================== */
export default function Home() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) setHidden(true); else setHidden(false);
  });
  
  const heroReveal = useReveal();
  const skillsReveal = useReveal();
  const contactReveal = useReveal();

  return (
    <>
      <GameBackground />
      <main className="min-h-screen text-white relative z-10">
        <motion.header
          variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
          animate={hidden ? "hidden" : "visible"}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="sticky top-0 z-50 backdrop-blur-lg bg-gray-900/60 border-b border-violet-500/30"
        >
          <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
            <Link href="#sobre" className="flex items-center gap-3 group">
                {/* NOVO: Espaço para sua logo. Crie um /public/logo.svg */}
                <Image src="/logo.svg" alt="Logo" width={40} height={40} className="group-hover:animate-spin"/>
                <span className="font-extrabold tracking-wide text-xl bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-pink-500">
                    Ernandes Dias
                </span>
            </Link>
            <nav className="hidden sm:flex items-center gap-2">
              <a href="#skills" className="px-3 py-2 rounded-md hover:bg-violet-500/20 transition-colors">Skills</a>
              <a href="#projetos" className="px-3 py-2 rounded-md hover:bg-violet-500/20 transition-colors">Projetos</a>
              <a href="#contato" className="px-3 py-2 rounded-md hover:bg-violet-500/20 transition-colors">Contato</a>
              <a href="/cv.pdf" className="px-4 py-2 rounded-md bg-cyan-500 text-black font-semibold hover:bg-cyan-400 transition-colors">
                Currículo
              </a>
            </nav>
          </div>
          <SnakeHeaderAnimation />
        </motion.header>

        <section id="sobre" className="max-w-4xl mx-auto px-6 py-20 md:py-28 text-center md:text-left">
          <motion.div {...heroReveal} className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
            <div className="relative flex-shrink-0">
              {/*<Image src="/pictures/profile.png" alt="Foto de Ernandes Dias" width={240} height={240} className="rounded-full border-4 border-cyan-500 shadow-2xl shadow-cyan-500/40 object-cover" priority/>*/}
            </div>
            <div className="max-w-lg">
              <Apresentacao nome="Ernandes Dias" titulo="Game Dev Full‑Stack • Professor" />
              <p className="text-gray-300 mt-4 leading-relaxed">Programador e educador focado em experiências interativas: Unity 2D/3D, multiplayer, Unreal com Blueprints, pipeline de arte/3D e web.</p>
              <div className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start">
                  <a href="https://www.linkedin.com/in/ernandesdias/" target="_blank">
                      <ShinyButton text="LinkedIn" icon={<Linkedin size={18}/>} />
                  </a>
                  <a href="https://github.com/" target="_blank" className="w-full sm:w-auto">
                     <button className="w-full relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold text-white transition-all duration-300 bg-gray-800 hover:bg-gray-700 hover:scale-105 hover:shadow-lg hover:shadow-violet-500/50">
                        <Github size={18}/> GitHub
                     </button>
                  </a>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="skills" className="max-w-6xl mx-auto px-6 pb-14 md:pb-20">
          <motion.div {...skillsReveal} className="rounded-2xl border border-violet-500/30 bg-gray-900/50 backdrop-blur-sm p-6 md:p-10 shadow-2xl shadow-violet-500/10">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-cyan-400 uppercase tracking-widest">Core Skills</h3>
                <div className="space-y-4">
                  {coreSkills.map((s) => (
                    <div key={s.name}>
                      <div className="flex items-center justify-between mb-1.5"><p className={`font-semibold ${s.text}`}>{s.name}</p><span className="text-gray-400 text-sm">{s.level}%</span></div>
                      <div className="w-full bg-gray-800 rounded-full h-3"><motion.div className={`${s.bar} h-3 rounded-full`} initial={{ width: 0 }} whileInView={{ width: `${s.level}%` }} viewport={{ amount: 0.5 }} transition={{ type: 'spring', stiffness: 50 }}/></div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-6 text-cyan-400 uppercase tracking-widest">Stack & Tools</h3>
                <div className="flex flex-wrap gap-2">
                  {skillTags.map((t) => ( <span key={t} className="px-3 py-1 rounded-full bg-violet-900/50 text-violet-300 border border-violet-500/30 hover:bg-violet-800/50 transition-colors cursor-default">{t}</span> ))}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="projetos" className="max-w-6xl mx-auto px-6 py-10 md:py-14">
          <h2 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-pink-500 uppercase tracking-widest">
            Projetos em Destaque
          </h2>
          <div className="flex flex-col gap-16">{projects.map((p) => (<ProjectShowcaseItem key={p.title} p={p} />))}</div>
        </section>

        <section id="contato" className="max-w-4xl mx-auto px-6 pt-6 pb-20">
          <motion.div {...contactReveal} className="rounded-2xl border border-violet-500/30 bg-gray-900/50 backdrop-blur-sm p-8 text-center shadow-2xl shadow-violet-500/10">
            <h3 className="text-3xl font-bold text-cyan-400 mb-3">Vamos Criar Algo Incrível?</h3>
            <p className="text-gray-300 max-w-md mx-auto mb-8">Aberto a colaborações, aulas, mentorias e novos desafios.</p>
            <div className="flex items-center justify-center">
               <a href="https://www.linkedin.com/in/ernandesdias/" target="_blank">
                  <ShinyButton text="Fale Comigo no LinkedIn" icon={<Linkedin size={18}/>} />
               </a>
            </div>
          </motion.div>
        </section>
<TetrisFooter />
        
      </main>
    </>
  );
}