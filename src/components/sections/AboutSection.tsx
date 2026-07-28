import Link from "next/link";
import Image from "next/image";
import { PROJECTS_DATA } from "@/data/projectsData";

export default function AboutSection() {
  return (
    <section className="section-after" id="section-after">
      {/* About Section Container */}
      <div className="about" id="about">
        <div className="about-text" id="about-text" data-i18n="index.about.text">
          As a <span className="other-accent">creative developer</span>, I craft tailor-made web experiences, blending technical precision and <span className="other-accent">design emotion</span>.
        </div>

        <div className="about-sub" id="about-sub" data-i18n="index.about.sub">
          My name is Daksh Hiran. A passionate creator and software engineer, building memorable digital experiences, always seeking the symbiosis between art and information.
        </div>

        

        

        <div className="about-photo-wrap" id="about-photo-wrap">
          <Image
            className="about-photo"
            src="/assets/images/profile/me.avif"
            alt="Daksh Hiran"
            width={500}
            height={600}
            style={{ width: "auto", height: "auto" }}
            unoptimized
          />
        </div>
      </div>

      {/* Projects List Container */}
      <div className="projects" id="projects">
        <svg className="fluid-line-svg" id="fluid-line-svg" viewBox="0 0 1400 1400" preserveAspectRatio="xMidYMid slice">
          <path
            className="fluid-line"
            id="fluid-line"
            d="
              M -80,0
              C 300,-20  600,150  540,400
              C 490,650   0,655    300,1050
              C 600,1385 650,1250 850,1200
              C 1050,1150 1350,1250 1540,1300
            "
          />
        </svg>
        <div className="projects-inner">
          <div className="projects-list" id="projects-list">
            {PROJECTS_DATA.map((proj) => (
              <div
                key={proj.id}
                className="proj-item"
                data-id={proj.id}
                data-img={proj.coverImage}
                data-date={proj.date}
              >
                {proj.title}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
