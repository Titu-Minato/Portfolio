import { useState, useRef } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { projects } from "../constants";
import "./Projects.css";

export default function Projects() {
    const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();

    return (
        <section className="section projects" id="projects">
            <div className="section-inner">
                <div
                    ref={headerRef}
                    className={`section-header animate-on-scroll ${headerVisible ? "visible" : ""}`}
                >
                    <span className="section-label">Projects</span>
                    <h2 className="section-title">
                        Things I've <span className="gradient-text">built</span>
                    </h2>
                    <p className="section-subtitle">
                        A selection of projects that showcase my skills and creativity.
                    </p>
                </div>

                <div className="projects__grid">
                    {projects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ProjectCard({ project, index }) {
    const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
    const cardRef = useRef(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setTilt({ x: y * -8, y: x * 8 });
    };

    const handleMouseLeave = () => {
        setTilt({ x: 0, y: 0 });
    };

    return (
        <div
            ref={ref}
            className={`animate-on-scroll delay-${(index % 4) + 1} ${isVisible ? "visible" : ""}`}
        >
            <div
                ref={cardRef}
                className="project-card glass-card"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                }}
            >
                <div
                    className="project-card__accent"
                    style={{ background: `linear-gradient(135deg, ${project.color}33, transparent)` }}
                />

                <div className="project-card__header">
                    <div
                        className="project-card__icon"
                        style={{ background: `${project.color}15`, color: project.color }}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                        </svg>
                    </div>
                    <div className="project-card__links">
                        <a href={project.github} target="_blank" rel="noreferrer" className="project-card__link" title="Source Code">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                        </a>
                        <a href={project.live} target="_blank" rel="noreferrer" className="project-card__link" title="Live Demo">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                <polyline points="15 3 21 3 21 9" />
                                <line x1="10" y1="14" x2="21" y2="3" />
                            </svg>
                        </a>
                    </div>
                </div>

                <h3 className="project-card__title">{project.title}</h3>
                <p className="project-card__description">{project.description}</p>

                <div className="project-card__tech">
                    {project.technologies.map((tech) => (
                        <span key={tech} className="project-card__tech-tag">
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
