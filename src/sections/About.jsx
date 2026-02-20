import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { personalInfo, skills } from "../constants";
import "./About.css";

export default function About() {
    const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
    const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation();
    const { ref: skillsRef, isVisible: skillsVisible } = useScrollAnimation();

    const categories = {
        programming: { label: "Programming", icon: "💻" },
        data: { label: "Data & Databases", icon: "🗄️" },
        ml: { label: "Machine Learning", icon: "🤖" },
        visualization: { label: "Visualization & Design", icon: "📊" },
    };

    const groupedSkills = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) acc[skill.category] = [];
        acc[skill.category].push(skill);
        return acc;
    }, {});

    return (
        <section className="section about" id="about">
            <div className="section-inner">
                <div
                    ref={headerRef}
                    className={`section-header animate-on-scroll ${headerVisible ? "visible" : ""}`}
                >
                    <span className="section-label">About Me</span>
                    <h2 className="section-title">
                        Turning data into <span className="gradient-text">actionable</span> insights
                    </h2>
                </div>

                <div className="about__grid">
                    <div
                        ref={contentRef}
                        className={`about__bio glass-card animate-on-scroll ${contentVisible ? "visible" : ""}`}
                    >
                        <p>
                            I'm a Data Science enthusiast with a strong foundation in statistics,
                            data analysis, and machine learning. Currently pursuing my Master's in
                            Big Data Analytics at Jai Hind College.
                        </p>
                        <p>
                            I love turning raw data into meaningful stories. From building AI chatbots
                            to creating interactive dashboards, I bring analytical thinking and
                            creative problem-solving to every project I tackle.
                        </p>

                        <div className="about__stats">
                            <div className="about__stat">
                                <span className="about__stat-number gradient-text">7.8</span>
                                <span className="about__stat-label">B.Sc. CGPA</span>
                            </div>
                            <div className="about__stat">
                                <span className="about__stat-number gradient-text">3+</span>
                                <span className="about__stat-label">Projects Built</span>
                            </div>
                            <div className="about__stat">
                                <span className="about__stat-number gradient-text">3</span>
                                <span className="about__stat-label">Languages</span>
                            </div>
                        </div>
                    </div>

                    <div
                        ref={skillsRef}
                        className={`about__skills animate-on-scroll ${skillsVisible ? "visible" : ""}`}
                    >
                        {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                            <div key={category} className="about__skill-group glass-card">
                                <h3 className="about__skill-category">
                                    <span>{categories[category]?.icon}</span>
                                    {categories[category]?.label}
                                </h3>
                                <div className="about__skill-list">
                                    {categorySkills.map((skill) => (
                                        <div key={skill.name} className="about__skill">
                                            <div className="about__skill-header">
                                                <span className="about__skill-name">{skill.name}</span>
                                                <span className="about__skill-percent">{skill.level}%</span>
                                            </div>
                                            <div className="about__skill-bar">
                                                <div
                                                    className="about__skill-fill"
                                                    style={{
                                                        width: skillsVisible ? `${skill.level}%` : "0%",
                                                        transitionDelay: `${Math.random() * 0.3}s`,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
