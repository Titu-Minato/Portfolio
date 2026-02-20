import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { personalInfo } from "../constants";
import "./Contact.css";

export default function Contact() {
    const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
    const { ref: formRef, isVisible: formVisible } = useScrollAnimation();
    const formElement = useRef(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [status, setStatus] = useState(null); // 'sending', 'success', 'error'
    const [errorMsg, setErrorMsg] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("sending");
        setErrorMsg("");

        try {
            await emailjs.sendForm(
                "service_ja6xrcj",
                "template_vvj3l6i",
                formElement.current,
                {
                    publicKey: "Zk8aCkeRZpLxya9yT",
                }
            );
            setStatus("success");
            setFormData({ name: "", email: "", message: "" });
            setTimeout(() => setStatus(null), 4000);
        } catch (error) {
            setErrorMsg(error?.text || "Something went wrong. Please try again.");
            setStatus("error");
            setTimeout(() => setStatus(null), 6000);
        }
    };

    return (
        <section className="section contact" id="contact">
            <div className="section-inner">
                <div
                    ref={headerRef}
                    className={`section-header animate-on-scroll ${headerVisible ? "visible" : ""}`}
                >
                    <span className="section-label">Get In Touch</span>
                    <h2 className="section-title">
                        Let's build something <span className="gradient-text">amazing</span> together
                    </h2>
                    <p className="section-subtitle">
                        Have a project in mind or just want to say hello? I'd love to hear from you.
                    </p>
                </div>

                <div className="contact__grid">
                    <div
                        ref={formRef}
                        className={`contact__form-wrapper glass-card animate-on-scroll ${formVisible ? "visible" : ""}`}
                    >
                        <form ref={formElement} onSubmit={handleSubmit} className="contact__form">
                            <input type="hidden" name="title" value={`Portfolio Contact from ${formData.name}`} />
                            <div className="contact__field">
                                <label htmlFor="contact-name" className="contact__label">Name</label>
                                <input
                                    id="contact-name"
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Your name"
                                    className="contact__input"
                                />
                            </div>

                            <div className="contact__field">
                                <label htmlFor="contact-email" className="contact__label">Email</label>
                                <input
                                    id="contact-email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="your@email.com"
                                    className="contact__input"
                                />
                            </div>

                            <div className="contact__field">
                                <label htmlFor="contact-message" className="contact__label">Message</label>
                                <textarea
                                    id="contact-message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    placeholder="Tell me about your project..."
                                    rows={5}
                                    className="contact__input contact__textarea"
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary contact__submit"
                                disabled={status === "sending"}
                            >
                                {status === "sending" ? (
                                    <>
                                        <span className="contact__spinner" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        Send Message
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="22" y1="2" x2="11" y2="13" />
                                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                        </svg>
                                    </>
                                )}
                            </button>

                            {status === "success" && (
                                <div className="contact__toast contact__toast--success">
                                    ✓ Message sent successfully! I'll get back to you soon.
                                </div>
                            )}

                            {status === "error" && (
                                <div className="contact__toast contact__toast--error">
                                    ✕ {errorMsg || "Something went wrong. Please try again."}
                                </div>
                            )}
                        </form>
                    </div>

                    <div className="contact__info animate-on-scroll delay-2" style={{ opacity: formVisible ? 1 : 0, transform: formVisible ? "translateY(0)" : "translateY(40px)", transition: "all 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.2s" }}>
                        <div className="contact__info-item glass-card">
                            <div className="contact__info-icon">📧</div>
                            <div>
                                <h4 className="contact__info-title">Email</h4>
                                <a href={`mailto:${personalInfo.email}`} className="contact__info-value">
                                    {personalInfo.email}
                                </a>
                            </div>
                        </div>

                        <div className="contact__info-item glass-card">
                            <div className="contact__info-icon">📍</div>
                            <div>
                                <h4 className="contact__info-title">Location</h4>
                                <p className="contact__info-value">{personalInfo.location}</p>
                            </div>
                        </div>

                        <div className="contact__socials">
                            <h4 className="contact__socials-title">Follow Me</h4>
                            <div className="contact__social-links">
                                <a href={personalInfo.socials.github} target="_blank" rel="noreferrer" className="contact__social-link" title="GitHub">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                </a>
                                <a href={personalInfo.socials.linkedin} target="_blank" rel="noreferrer" className="contact__social-link" title="LinkedIn">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="contact__footer">
                <p>
                    Designed & Built by{" "}
                    <span className="gradient-text">{personalInfo.name}</span> © {new Date().getFullYear()}
                </p>
            </footer>
        </section>
    );
}
