export default function Preloader() {
  return (
    <>
      {/* Intro Background */}
      <div className="intro-bg" id="intro-bg"></div>

      {/* Name Layer / Preloader Typography */}
      <div className="name-layer" id="name-layer">
        <div className="preloader-content" id="preloader-content">
          <div id="preloader-logo">D</div>
          <span id="preloader-first-name">aksh</span>
          <span id="preloader-last-name"> Hiran</span>
          <span id="preloader-dot">.</span>
        </div>
      </div>

      {/* Transition Wipe Panels */}
      <div className="transition-panel" id="transition-panel">
        <div className="t-panel-dark" id="t-panel-dark"></div>
        <div className="t-panel-accent" id="t-panel-accent"></div>
      </div>
    </>
  );
}
