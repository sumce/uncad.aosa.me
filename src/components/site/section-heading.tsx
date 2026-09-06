import { Reveal } from "@/components/reveal";

export function SectionHeading({
  eyebrow,
  title,
  desc,
  divider = true,
}: {
  eyebrow: string;
  title: string;
  desc?: string;
  divider?: boolean;
}) {
  return (
    <Reveal className={divider ? "border-t border-line pt-10" : ""}>
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
        {eyebrow}
      </p>
      <h2 className="mt-3 max-w-2xl text-balance text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {desc ? (
        <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted">{desc}</p>
      ) : null}
    </Reveal>
  );
}
