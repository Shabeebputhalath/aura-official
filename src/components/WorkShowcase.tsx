import { ArrowUpRight, Play } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';
import { projects, type Project } from '@/data/content';

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { ref, visible } = useReveal<HTMLAnchorElement>();

  const spanClass =
    project.span === 'wide'
      ? 'md:col-span-2 aspect-[16/9]'
      : project.span === 'tall'
        ? 'md:row-span-2 aspect-[3/4] md:aspect-auto'
        : 'aspect-[4/3]';

  return (
    <a
      ref={ref}
      href="#contact"
      className={`reveal group relative overflow-hidden card-border bg-ink-850 ${spanClass} ${visible ? 'reveal-visible' : ''
        }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Image */}
      <img
        src={project.image}
        alt={project.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        loading="lazy"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent transition-opacity duration-500 group-hover:from-ink-950/90" />

      {/* Play button */}
      <div className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-ink-950/40 backdrop-blur-md opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-110">
        <Play className="h-4 w-4 fill-white text-white" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
        <span className="text-xs font-medium uppercase tracking-[0.15em] text-accent-400">
          {project.category}
        </span>
        <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-white lg:text-3xl">
          {project.title}
        </h3>
        <p className="mt-1.5 max-w-md text-sm text-ink-200 opacity-0 transition-all duration-500 group-hover:opacity-100">
          {project.description}
        </p>
        <div className="mt-4 flex items-center gap-2 text-sm font-medium text-ink-100 opacity-0 transition-all duration-500 group-hover:opacity-100">
          <span>View Project</span>
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>

      {/* Hover border glow */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute inset-0 ring-1 ring-inset ring-accent-500/20" />
      </div>
    </a>
  );
}

export default function WorkShowcase({ onNavigateWork }: { onNavigateWork?: () => void }) {
  const { ref, visible } = useReveal();

  return (
    <section id="work" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <div ref={ref} className="mb-16 max-w-3xl">
          <p
            className={`reveal section-label transition-all duration-700 ${visible ? 'reveal-visible' : ''}`}
          >
            Selected Work
          </p>
          <h2
            className={`reveal mt-6 font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl transition-all duration-700 ${visible ? 'reveal-visible' : ''
              }`}
            style={{ transitionDelay: '100ms' }}
          >
            Stories created with
            <br />
            <span className="text-gradient-accent">artificial intelligence.</span>
          </h2>
          <p
            className={`reveal mt-6 text-lg text-ink-200 transition-all duration-700 ${visible ? 'reveal-visible' : ''
              }`}
            style={{ transitionDelay: '200ms' }}
          >
            Cinematic direction, and human imagination — brought to life through
            cutting-edge AI production.
          </p>
        </div>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* View all */}
        <div className="mt-14 flex justify-center">
          <button onClick={onNavigateWork} className="btn-secondary group">
            <span>View All Projects</span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </section>
  );
}

