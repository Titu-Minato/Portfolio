import { useState, useEffect } from "react";
import { navLinks, personalInfo } from "../constants";
import "./Navbar.css";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            // Determine active section
            const sections = navLinks.map((link) => document.getElementById(link.id));
            const scrollPos = window.scrollY + window.innerHeight / 3;

            for (let i = sections.length - 1; i >= 0; i--) {
                if (sections[i] && sections[i].offsetTop <= scrollPos) {
                    setActiveSection(navLinks[i].id);
                    break;
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleNavClick = (id) => {
        setMenuOpen(false);
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
            <div className="navbar__inner">
                <a href="#home" className="navbar__logo" onClick={() => handleNavClick("home")}>
                    <span className="navbar__logo-icon">◆</span>
                    <span className="navbar__logo-text">{personalInfo.name.split(" ")[0]}</span>
                </a>

                <div className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`}>
                    {navLinks.map((link) => (
                        <button
                            key={link.id}
                            className={`navbar__link ${activeSection === link.id ? "navbar__link--active" : ""}`}
                            onClick={() => handleNavClick(link.id)}
                        >
                            {link.label}
                            {activeSection === link.id && <span className="navbar__link-indicator" />}
                        </button>
                    ))}
                </div>

                <button
                    className={`navbar__burger ${menuOpen ? "navbar__burger--open" : ""}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span />
                    <span />
                    <span />
                </button>
            </div>
        </nav>
    );
}
