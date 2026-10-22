// import { Quote } from 'lucide-react';
// import { useReveal } from '@/hooks/useReveal';
// import { testimonials } from '@/data/content';

// export default function Testimonials() {
//   const { ref, visible } = useReveal();

//   return (
//     <section className="relative py-24 lg:py-32">
//       <div className="mx-auto max-w-7xl px-6 lg:px-10">
//         <div ref={ref} style={{ marginBottom:'4rem', padding:'0 clamp(0.5rem,2vw,1.5rem)' }}>
//           <p className={`reveal section-label transition-all duration-700 ${visible ? 'reveal-visible' : ''}`}>
//             Testimonials
//           </p>
//           <h2
//             className={`reveal mt-6 font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl transition-all duration-700 ${visible ? 'reveal-visible' : ''
//               }`}
//             style={{ transitionDelay: '100ms' }}
//           >
//             What Our <span className="text-gradient-accent">Clients Say</span>
//           </h2>
//         </div>

//         {/* Cards */}
//         <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
//           {testimonials.map((t, i) => (
//             <TestimonialCard key={t.name} testimonial={t} index={i} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// function TestimonialCard({
//   testimonial,
//   index,
// }: {
//   testimonial: (typeof testimonials)[number];
//   index: number;
// }) {
//   const { ref, visible } = useReveal();

//   return (
//     <div
//       ref={ref}
//       className={`reveal flex flex-col rounded-2xl border border-white/[0.06] bg-ink-850 p-8 transition-all duration-700 hover:border-white/[0.12] hover:bg-ink-800 ${visible ? 'reveal-visible' : ''
//         }`}
//       style={{ transitionDelay: `${index * 120}ms` }}
//     >
//       <Quote className="h-8 w-8 text-accent-500/40" />

//       <p className="mt-6 flex-1 text-base leading-relaxed text-ink-100">
//         "{testimonial.quote}"
//       </p>

//       <div className="mt-8 flex items-center gap-4 border-t border-white/[0.06] pt-6">
//         <img
//           src={testimonial.avatar}
//           alt={testimonial.name}
//           className="h-12 w-12 rounded-full object-cover border border-white/10"
//           loading="lazy"
//         />
//         <div>
//           <div className="font-display text-sm font-semibold text-white">{testimonial.name}</div>
//           <div className="text-xs text-ink-300">
//             {testimonial.position}, {testimonial.company}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


export default function Testimonials() { return null; }
