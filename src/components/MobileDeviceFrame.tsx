import Image from "next/image";
import { Smartphone } from "lucide-react";

interface MobileDeviceFrameProps {
  title: string;
  screenshots: {
    src: string;
    alt: string;
    caption: string;
  }[];
  features: string[];
  techStack: string[];
}

export function MobileDeviceFrame({
  title,
  screenshots,
  features,
  techStack,
}: MobileDeviceFrameProps) {
  const hasRealScreenshot = screenshots.length > 0;

  return (
    <div className="mx-auto w-full max-w-[290px] rounded-[28px] border-2 border-border-strong bg-bg p-3 shadow-sm">
      {/* Device speaker notch */}
      <div className="mx-auto mb-3 h-1.5 w-14 rounded-full bg-border-strong" />

      <div className="overflow-hidden rounded-[18px] border border-border bg-bg-secondary">
        {hasRealScreenshot ? (
          <div className="relative aspect-[9/16] w-full">
            <Image
              src={screenshots[0].src}
              alt={screenshots[0].alt}
              fill
              sizes="290px"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="flex aspect-[9/16] flex-col justify-between p-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-border pb-2.5">
                <span className="font-mono text-[10px] uppercase tracking-wider text-accent">
                  Android Frame
                </span>
                <Smartphone className="h-3.5 w-3.5 text-text-secondary" />
              </div>
              <h4 className="font-display text-lg font-bold text-text">{title}</h4>
              <p className="text-xs leading-relaxed text-text-secondary">
                Ready for real Android application screenshots placed under{" "}
                <code className="text-text">/public/images/projects/pursuit/</code>.
              </p>
            </div>

            <div className="space-y-2 border-y border-border py-3">
              <p className="font-mono text-[10px] uppercase tracking-wider text-text-secondary">
                Core Modules
              </p>
              <ul className="space-y-1 text-xs text-text">
                {features.slice(0, 5).map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="h-1 w-1 bg-accent" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-1">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="border border-border bg-bg px-1.5 py-0.5 font-mono text-[10px] text-text-secondary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-border" />
    </div>
  );
}
