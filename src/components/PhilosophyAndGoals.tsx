import { profile } from "@/data/profile";

export function PhilosophyAndGoals() {
  return (
    <section className="border-b border-border py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Large Editorial Personal Philosophy */}
        <div className="border-y border-border py-12 sm:py-16">
          <p className="font-mono-label text-xs text-accent mb-5">
            07 / Personal Philosophy
          </p>
          <blockquote className="font-display text-2xl font-bold leading-tight tracking-tight text-text sm:text-4xl lg:text-[2.75rem] max-w-5xl">
            &ldquo;{profile.philosophy.statement}&rdquo;
          </blockquote>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-text-secondary sm:text-lg">
            {profile.philosophy.supporting}
          </p>
        </div>

        {/* Career Vision */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5 space-y-3">
            <p className="font-mono-label text-xs text-accent">08 / Career Vision</p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
              {profile.careerGoals.headline}
            </h2>
          </div>
          <div className="lg:col-span-7 space-y-4">
            {profile.careerGoals.paragraphs.map((p, idx) => (
              <p
                key={idx}
                className={`leading-relaxed ${
                  idx === 0
                    ? "text-base font-medium text-text"
                    : "text-sm sm:text-base text-text-secondary"
                }`}
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
