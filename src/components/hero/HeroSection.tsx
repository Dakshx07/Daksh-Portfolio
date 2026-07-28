export default function HeroSection() {
  return (
    <div className="scroll-wrap" id="scroll-wrap">
      <section className="hero" id="hero">
        <h1 className="sr-only">
          Daksh Hiran — Creative Developer & Software Engineer specializing in web interfaces, animation, and interactive design.
        </h1>

        {/* Dynamic Shader / Hero Canvas Container */}
        <div className="hero-canvas" id="hero-canvas"></div>

        {/* Hero Content Overlay */}
        <div className="hero-content">
          <div className="hero-tagline" id="hero-tagline">
            Creative developer, <span className="other-accent">bringing ideas to life</span>,<br />
            through movement, detail, and finesse.
          </div>

          <div className="hero-line" id="hero-line"></div>

          {/* Hero Bottom Navigation Bar */}
          <div className="hero-bar" id="hero-bar">
            <div className="hero-bar-left"></div>

            <nav className="hero-bar-center" aria-label="Social Links">
              <a
                className="hero-social-link"
                href="https://x.com/DakshHiran7"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                TWITTER
              </a>
              <span className="sep" aria-hidden="true">/</span>
              <a
                className="hero-social-link"
                href="https://www.linkedin.com/in/daksh-hiran-9534b930b/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                LINKEDIN
              </a>
              <span className="sep" aria-hidden="true">/</span>
              <a
                className="hero-social-link"
                href="https://github.com/Dakshx07"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                GITHUB
              </a>
            </nav>

            <div className="hero-bar-right"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
