export default function FooterSection() {
  return (
    <>
      <div className="footer-transition" id="footer-transition"></div>
      <footer className="footer" id="footer">
        <div className="footer-content" id="footer-content">
          <div className="footer-top">
            <div className="footer-top-col">
              <a
                className="chr-hover footer-mail"
                data-chr-footer="contact@dakshhiran.dev"
                href="mailto:contact@dakshhiran.dev"
                aria-label="Send email"
              >
                contact@dakshhiran.dev
              </a>
              <span className="chr-hover footer-date" data-chr-footer="© 2026">© 2026</span>
            </div>
            <nav className="footer-top-col" aria-label="Social Links">
              <a className="chr-hover" data-chr-footer="Twitter" href="https://x.com/DakshHiran7" target="_blank" rel="noopener noreferrer" aria-label="Twitter">Twitter</a>
              <a className="chr-hover" data-chr-footer="LinkedIn" href="https://www.linkedin.com/in/daksh-hiran-9534b930b/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">LinkedIn</a>
              <a className="chr-hover" data-chr-footer="GitHub" href="https://github.com/Dakshx07" target="_blank" rel="noopener noreferrer" aria-label="GitHub">GitHub</a>
            </nav>
          </div>

          <div className="footer-ascii-wrap">
            <div className="footer-ascii left">
              <pre id="ascii-left"></pre>
            </div>
            <div className="footer-ascii right">
              <pre id="ascii-right"></pre>
            </div>
          </div>

          <div className="footer-name">
            <span className="footer-name-first">
              <span className="first-letter">D</span>aksh
            </span>
            <span className="footer-name-last-wrap">
              <span className="footer-name-last">Hiran</span>
              <span className="footer-name-dot">.</span>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
