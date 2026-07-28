import Image from "next/image";

export default function ProjectDetailDrawer() {
  return (
    <>
      {/* Project Card Preview */}
      <div className="proj-preview" id="proj-preview">
        <div className="proj-card" id="proj-card">
          <div className="proj-meta">
            <span className="proj-date" id="proj-date">01 2025</span>
            <span className="proj-label">Preview</span>
          </div>
          <Image
            id="proj-cover"
            src="/assets/images/projects/Covers/CyberDiag.avif"
            alt="Project Preview"
            width={1333}
            height={1000}
            style={{ width: "auto", height: "auto" }}
            unoptimized
          />
        </div>
      </div>

      {/* Floating Cursor & Overlay Effects */}
      <div className="proj-cursor" id="proj-cursor">See project</div>
      <div className="page-fade" id="page-fade"></div>
      <div className="flying-title" id="flying-title"></div>
      <div className="work-transition-overlay" id="work-transition-overlay"></div>
      <div className="work-flying-text" id="work-flying-text">Work</div>

      {/* Project Detail Modal Drawer */}
      <section className="project-detail" id="project-detail">
        <div className="detail-back chr-hover" id="detail-back" data-chr="🡼BACK"></div>
        <div className="detail-info">
          <div className="detail-title-wrap" id="detail-title-wrap">
            <h1 className="detail-title" id="detail-title"></h1>
            <span className="detail-year" id="detail-year"></span>
          </div>
          <p className="detail-desc" id="detail-desc"></p>
          <div className="detail-tags" id="detail-tags"></div>
        </div>

        <div className="detail-gallery-wrap" id="detail-gallery-wrap">
          <div className="detail-thumbs" id="detail-thumbs">
            <div className="detail-thumbs-inner" id="detail-thumbs-inner"></div>
          </div>
          <div className="detail-selected" id="detail-selected"></div>
        </div>
      </section>

      {/* Scroll Indicator & Progress Timeline */}
      <div className="scroll-pct" id="scroll-pct">(0)</div>
      <div className="scroll-timeline" id="scroll-timeline">
        <span className="st-label" id="st-label"></span>
        <div className="st-bar" id="st-bar"></div>
      </div>
    </>
  );
}
