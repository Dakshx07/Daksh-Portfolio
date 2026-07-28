import Image from "next/image";
import { PROJECTS_DATA } from "@/data/projectsData";

export default function CircleGallerySection() {
  return (
    <section className="circle-gallery" id="circle-gallery">
      <div className="circle-gallery-pin" id="circle-gallery-pin">
        {PROJECTS_DATA.map((proj) => (
          <Image
            key={proj.id}
            className="cg-img"
            src={proj.coverImage}
            alt={proj.alt}
            width={1200}
            height={900}
            style={{ width: "auto", height: "auto" }}
            unoptimized
          />
        ))}

        <p className="cg-phrase" id="cg-phrase" data-i18n="index.cg.phrase">
          Each project is a chance to <span className="other-accent">learn</span>, <span className="other-accent">experiment</span>, and push boundaries.
        </p>
      </div>
    </section>
  );
}
