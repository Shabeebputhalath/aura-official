import { useState, useMemo, useEffect } from 'react';
import { ArrowUpRight, Play, X, ArrowLeft, ArrowRight } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';
import { workProjects, workFilters, type WorkProject } from '@/data/work';

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState<WorkProject | null>(null);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return workProjects;
    return workProjects.filter((p) => p.categoryFilter === activeFilter);
  }, [activeFilter]);

  const featuredProject = workProjects.find((p) => p.featured) ?? workProjects[0];

  return (
    <div className="min-h-screen bg-ink-950">
      <WorkHero />
      <FeaturedProject project={featuredProject} onSelect={setSelectedProject} />
      <ProjectGallery
        projects={filteredProjects}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        onSelect={setSelectedProject}
      />
      <WorkCTA />
      {selectedProject && (
        <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} onSelect={setSelectedProject} />
      )}
    </div>
  );
}

/* ── HERO ─────────────────────────────────────────────────────────────── */

function WorkHero() {
  const { ref, visible } = useReveal();

  return (
    <section ref={ref} className="relative flex min-h-[80vh] items-center overflow-hidden pt-24">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/18545013/pexels-photo-18545013.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt=""
          className="h-full w-full object-cover"
          style={{ transform: visible ? 'scale(1)' : 'scale(1.05)', transition: 'transform 2s ease-out' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/80 via-ink-950/60 to-ink-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/70 to-transparent" />
        <div className="absolute inset-0 bg-grid opacity-30" />
      </div>

      {/* Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[15%] top-[40%] h-96 w-96 rounded-full bg-accent-600/15 blur-[120px] animate-pulse-slow" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20 lg:px-10">
        <div className="max-w-4xl">
          <div
            className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 backdrop-blur-md animate-fade-down"
            style={{ animationDelay: '0.1s', opacity: 0, animationFillMode: 'forwards' }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent-400 shadow-[0_0_8px_rgba(124,92,255,0.8)]" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-ink-200">
              Selected Work / 2026
            </span>
          </div>

          <h1
            className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl animate-fade-up"
            style={{ animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}
          >
            Work That Speaks
            <br />
            In <span className="text-gradient-accent">Frames.</span>
          </h1>

          <p
            className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-200 sm:text-xl animate-fade-up"
            style={{ animationDelay: '0.4s', opacity: 0, animationFillMode: 'forwards' }}
          >
            Explore our collection of AI-powered films, commercials, product stories,
            and experimental visual experiences.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── FEATURED PROJECT ─────────────────────────────────────────────────── */

function FeaturedProject({ project, onSelect }: { project: WorkProject; onSelect: (p: WorkProject) => void }) {
  const { ref, visible } = useReveal();

  return (
    <section ref={ref} className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <p className={`reveal section-label transition-all duration-700 ${visible ? 'reveal-visible' : ''}`}>
          Featured Project
        </p>

        <div className={`reveal mt-8 group relative overflow-hidden border border-white/[0.06] transition-all duration-700 ${visible ? 'reveal-visible' : ''}`}>
          {/* Image */}
          <div className="relative aspect-[21/9] w-full overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-ink-950/60 to-transparent" />

            {/* Play button */}
            <button
              onClick={() => onSelect(project)}
              className="absolute right-6 top-6 flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-ink-950/40 backdrop-blur-md transition-all duration-500 hover:scale-110 hover:border-accent-500/40 hover:bg-accent-500/10"
              aria-label="Play featured project"
            >
              <Play className="h-5 w-5 fill-white text-white" />
            </button>
          </div>

          {/* Content overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.15em] text-accent-400">
                  <span>{project.category}</span>
                  <span className="h-1 w-1 rounded-full bg-ink-500" />
                  <span className="text-ink-300">{project.year}</span>
                </div>
                <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-white lg:text-6xl">
                  {project.title}
                </h2>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-200 lg:text-lg">
                  {project.description}
                </p>
              </div>
              <button
                onClick={() => onSelect(project)}
                className="btn-primary group shrink-0"
              >
                <Play className="h-4 w-4 fill-current" />
                <span>Watch Film</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── PROJECT GALLERY ──────────────────────────────────────────────────── */

function ProjectGallery({
  projects,
  activeFilter,
  onFilterChange,
  onSelect,
}: {
  projects: WorkProject[];
  activeFilter: string;
  onFilterChange: (id: string) => void;
  onSelect: (p: WorkProject) => void;
}) {
  const { ref, visible } = useReveal();

  return (
    <section className="relative border-t border-white/[0.04] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <div ref={ref} className="mb-10 max-w-3xl">
          <p className={`reveal section-label transition-all duration-700 ${visible ? 'reveal-visible' : ''}`}>
            All Projects
          </p>
          <h2
            className={`reveal mt-6 font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl transition-all duration-700 ${visible ? 'reveal-visible' : ''
              }`}
            style={{ transitionDelay: '100ms' }}
          >
            The Full <span className="text-gradient-accent">Archive.</span>
          </h2>
        </div>

        {/* Filters */}
        <div className="mb-10 flex flex-wrap gap-2">
          {workFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => onFilterChange(filter.id)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 ${activeFilter === filter.id
                  ? 'border-accent-500/30 bg-accent-500/10 text-white'
                  : 'border-white/[0.06] text-ink-300 hover:border-white/20 hover:text-white'
                }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {projects.map((project, i) => (
            <GalleryCard key={project.id} project={project} index={i} onSelect={onSelect} />
          ))}
        </div>

        {projects.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-lg text-ink-400">No projects in this category yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}

function GalleryCard({ project, index, onSelect }: { project: WorkProject; index: number; onSelect: (p: WorkProject) => void }) {
  const { ref, visible } = useReveal<HTMLButtonElement>();

  const spanClass =
    project.span === 'wide'
      ? 'sm:col-span-2 aspect-[16/9]'
      : project.span === 'tall'
        ? 'lg:row-span-2 aspect-[3/4] lg:aspect-[3/4]'
        : 'aspect-[4/3]';

  return (
    <button
      ref={ref}
      onClick={() => onSelect(project)}
      className={`reveal group relative overflow-hidden border border-white/[0.06] bg-ink-850 text-left transition-all duration-700 hover:border-white/[0.15] ${spanClass} ${visible ? 'reveal-visible' : ''
        }`}
      style={{ transitionDelay: `${(index % 3) * 80}ms` }}
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
      <div className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-ink-950/40 backdrop-blur-md opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-110">
        <Play className="h-4 w-4 fill-white text-white" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-accent-400">
          <span>{project.category}</span>
          <span className="h-1 w-1 rounded-full bg-ink-500" />
          <span className="text-ink-300">{project.year}</span>
        </div>
        <h3 className="mt-2 font-display text-xl font-bold tracking-tight text-white lg:text-2xl">
          {project.title}
        </h3>
        <div className="mt-3 flex items-center gap-2 text-sm font-medium text-ink-100 opacity-0 transition-all duration-500 group-hover:opacity-100">
          <span>View Project</span>
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>

      {/* Hover border glow */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute inset-0 ring-1 ring-inset ring-accent-500/20" />
      </div>
    </button>
  );
}

/* ── PROJECT DETAIL MODAL ─────────────────────────────────────────────── */

function ProjectDetailModal({ project, onClose, onSelect }: { project: WorkProject; onClose: () => void; onSelect: (p: WorkProject) => void }) {
  const relatedProjects = workProjects.filter((p) => p.id !== project.id).slice(0, 3);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-ink-950">
      {/* Close bar */}
      <div className="sticky top-0 z-20 flex items-center justify-between border-b border-white/[0.06] bg-ink-950/80 px-6 py-4 backdrop-blur-xl lg:px-10">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-ink-400">
          Project Detail
        </span>
        <button
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-ink-300 transition-colors hover:bg-white/5 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-8 lg:px-10 lg:py-12">
        {/* Full-width video preview */}
        <div className="group relative aspect-video w-full overflow-hidden border border-white/[0.06]">
          <img src={project.image} alt={project.title} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-ink-950/40 backdrop-blur-md transition-all duration-500 hover:scale-110 hover:border-accent-500/40 hover:bg-accent-500/10">
              <Play className="h-8 w-8 fill-white text-white" />
            </div>
          </div>
        </div>

        {/* Title + meta */}
        <div className="mt-10">
          <div className="flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-[0.15em] text-accent-400">
            <span>{project.category}</span>
            <span className="h-1 w-1 rounded-full bg-ink-500" />
            <span className="text-ink-300">{project.year}</span>
            <span className="h-1 w-1 rounded-full bg-ink-500" />
            <span className="text-ink-300">{project.client}</span>
          </div>
          <h1 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            {project.title}
          </h1>
        </div>

        {/* Description */}
        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-ink-400">Project Description</h3>
            <p className="mt-4 text-lg leading-relaxed text-ink-100">{project.description}</p>

            <h3 className="mt-10 text-xs font-medium uppercase tracking-[0.15em] text-ink-400">Creative Direction</h3>
            <p className="mt-4 text-base leading-relaxed text-ink-200">{project.creativeDirection}</p>

            <h3 className="mt-10 text-xs font-medium uppercase tracking-[0.15em] text-ink-400">Production Details</h3>
            <p className="mt-4 text-base leading-relaxed text-ink-200">{project.productionDetails}</p>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="rounded-xl border border-white/[0.06] bg-ink-850/60 p-6">
              <h4 className="text-xs font-medium uppercase tracking-[0.15em] text-ink-400">Client</h4>
              <p className="mt-2 font-display text-lg font-semibold text-white">{project.client}</p>
              <div className="mt-5 border-t border-white/[0.06] pt-5">
                <h4 className="text-xs font-medium uppercase tracking-[0.15em] text-ink-400">Category</h4>
                <p className="mt-2 text-sm text-white">{project.category}</p>
              </div>
              <div className="mt-5 border-t border-white/[0.06] pt-5">
                <h4 className="text-xs font-medium uppercase tracking-[0.15em] text-ink-400">Year</h4>
                <p className="mt-2 text-sm text-white">{project.year}</p>
              </div>
            </div>

            <a href="#" className="btn-primary w-full justify-center">
              <Play className="h-4 w-4 fill-current" />
              <span>Watch Full Film</span>
            </a>
          </div>
        </div>

        {/* Behind the scenes */}
        <div className="mt-16">
          <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-ink-400">Behind the Scenes</h3>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {project.behindScenes.map((img, i) => (
              <div key={i} className="group relative aspect-[4/3] overflow-hidden border border-white/[0.06]">
                <img
                  src={img}
                  alt={`Behind the scenes ${i + 1}`}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/40 to-transparent" />
              </div>
            ))}
          </div>
        </div>

        {/* Related projects */}
        <div className="mt-16 border-t border-white/[0.06] pt-12">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-ink-400">Related Projects</h3>
            <button onClick={onClose} className="flex items-center gap-2 text-sm font-medium text-ink-300 transition-colors hover:text-white">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to All Work</span>
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {relatedProjects.map((rp) => (
              <button
                key={rp.id}
                onClick={() => {
                  onSelect(rp);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group relative aspect-[4/3] overflow-hidden border border-white/[0.06] text-left transition-all duration-300 hover:border-white/[0.15]"
              >
                <img
                  src={rp.image}
                  alt={rp.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="text-xs font-medium uppercase tracking-wider text-accent-400">{rp.category}</div>
                  <div className="mt-1 font-display text-sm font-bold text-white">{rp.title}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── FINAL CTA ────────────────────────────────────────────────────────── */

function WorkCTA() {
  const { ref, visible } = useReveal();

  return (
    <section ref={ref} className="relative flex min-h-[60vh] items-center overflow-hidden border-t border-white/[0.04]">
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/35161189/pexels-photo-35161189.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt=""
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/80 via-ink-950/60 to-ink-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/70 to-transparent" />
      </div>

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-600/15 blur-[120px] animate-pulse-slow" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-4xl px-6 py-24 text-center lg:px-10">
        <h2 className={`reveal font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-7xl transition-all duration-700 ${visible ? 'reveal-visible' : ''}`}>
          Have an idea worth
          <br />
          <span className="text-gradient-accent">filming?</span>
        </h2>
        <div className={`reveal mt-10 flex justify-center transition-all duration-700 ${visible ? 'reveal-visible' : ''}`} style={{ transitionDelay: '150ms' }}>
          <a href="#" className="btn-primary group text-base">
            <span>Start a Project</span>
            <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}

