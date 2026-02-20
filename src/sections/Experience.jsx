import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { experiences } from "../constants";
import "./Experience.css";

export default function Experience() {
    const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();

    return (
        <section className="section experience" id="experience">
            <div className="section-inner">
                <div
                    ref={headerRef}
                    className={`section-header animate-on-scroll ${headerVisible ? "visible" : ""}`}
                >
                    <span className="section-label">My Journey</span>
                    <h2 className="section-title">
                        Education & <span className="gradient-text">Growth</span>
                    </h2>
                    <p className="section-subtitle">
                        My academic path and milestones in data science.
                    </p>
                </div>

                <div className="experience__timeline">
                    {experiences.map((exp, index) => (
                        <ExperienceCard key={index} experience={exp} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ExperienceCard({ experience, index }) {
    const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

    return (
        <div
            ref={ref}
            className={`experience__item animate-on-scroll delay-${index + 1} ${isVisible ? "visible" : ""}`}
        >
            <div className="experience__dot-line">
                <div className="experience__dot" />
                {index < experiences.length - 1 && <div className="experience__line" />}
            </div>

            <div className="experience__card glass-card">
                <div className="experience__header">
                    <div>
                        <h3 className="experience__title">{experience.title}</h3>
                        <p className="experience__company">{experience.company}</p>
                    </div>
                    <span className="experience__period">{experience.period}</span>
                </div>

                <p className="experience__description">{experience.description}</p>

                <div className="experience__tech">
                    {experience.technologies.map((tech) => (
                        <span key={tech} className="experience__tech-tag">
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
