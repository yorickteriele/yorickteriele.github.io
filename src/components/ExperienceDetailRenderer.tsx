interface InternshipDetailProps {
  content: {
    paragraphs: string[];
    image?: string;
    imageAlt?: string;
    highlightsLabel?: string;
    highlights?: string[];
  };
}

function InternshipDetail({ content }: InternshipDetailProps) {
  return (
    <div className="space-y-4">
      <p className="text-foreground/80 leading-relaxed">{content.paragraphs[0]}</p>
      {content.image && (
        <div className="mt-2">
          <img
            src={content.image}
            alt={content.imageAlt}
            loading="lazy"
            className="rounded shadow-md w-full"
          />
        </div>
      )}
      {content.paragraphs.slice(1).map((paragraph, idx) => (
        <p key={idx} className="text-foreground/80 leading-relaxed">
          {paragraph}
        </p>
      ))}
      {content.highlights && content.highlights.length > 0 && (
        <div>
          {content.highlightsLabel && (
            <p className="text-foreground font-medium mb-2">
              {content.highlightsLabel}
            </p>
          )}
          <ul className="list-disc list-inside space-y-1 text-foreground/80 leading-relaxed">
            {content.highlights.map((highlight, idx) => (
              <li key={idx}>{highlight}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

interface WindesheimBachelorProps {
  content: {
    description: string;
    semestersLabel: string;
    year: string;
    currentLabel: string;
    upcomingLabel: string;
    semester: string;
    internship: string;
    graduation: string;
  };
}

function WindesheimBachelorDetail({ content }: WindesheimBachelorProps) {
  return (
    <section className="max-w-5xl mx-auto p-6 bg-background border border-border rounded-xl shadow-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 border-b border-border pb-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary text-primary-foreground px-3 py-2 rounded-md font-semibold text-sm">
            Windesheim
          </div>
          <h3 className="text-2xl font-light text-foreground">
            Bachelor of ICT - Software Engineering
          </h3>
        </div>
      </div>

      {/* Bachelor Description */}
      <p className="mb-8 text-foreground leading-relaxed">
        {content.description}
      </p>

      <p className="mb-8 text-foreground leading-relaxed">
        {content.semestersLabel}
      </p>

      {/* Semester Labels */}
      <div className="hidden sm:grid grid-cols-3 gap-4 mb-4">
        <div></div>
        <div className="text-center text-foreground/80 font-medium text-base">
          {content.semester} 1
        </div>
        <div className="text-center text-foreground/80 font-medium text-base">
          {content.semester} 2
        </div>
      </div>

      {/* Study Years / Semester Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-card-foreground">
        {/* Year 1 */}
        <div className="flex items-center justify-center font-semibold text-foreground bg-card border border-border rounded-md p-4">
          {content.year} 1
        </div>
        <div className="h-28 sm:h-32 rounded-xl bg-sky-500 text-card-foreground font-medium flex flex-col items-center justify-center shadow">
          Smart Things / Web Application
        </div>
        <div className="h-28 sm:h-32 rounded-xl bg-sky-500 text-card-foreground font-medium flex flex-col items-center justify-center shadow">
          Exploring IT: ESA & SE
        </div>

        {/* Year 2 */}
        <div className="flex items-center justify-center font-semibold text-foreground bg-card border border-border rounded-md p-4">
          {content.year} 2
        </div>
        <div className="h-28 sm:h-32 rounded-xl bg-blue-900 text-card-foreground font-medium flex flex-col items-center justify-center shadow">
          Object-Oriented Software Design & Development
        </div>
        <div className="h-28 sm:h-32 rounded-xl bg-blue-900 text-card-foreground font-medium flex flex-col items-center justify-center shadow">
          Web Development
        </div>

        {/* Year 3 */}
        <div className="flex items-center justify-center font-semibold text-foreground bg-card border border-border rounded-md p-4">
          {content.year} 3
        </div>
        <div className="h-28 sm:h-32 rounded-xl bg-pink-500 text-card-foreground font-medium flex flex-col items-center justify-center shadow">
          Quality in Software Development
        </div>
        <div className="h-28 sm:h-32 rounded-xl bg-yellow-400 text-foreground-light font-medium flex flex-col items-center justify-center shadow">
          {content.internship}
        </div>

        {/* Year 4 */}
        <div className="flex items-center justify-center font-semibold text-foreground bg-card border border-border rounded-md p-4">
          {content.year} 4
        </div>
        <div className="relative h-28 sm:h-32 rounded-xl bg-amber-300 text-foreground-light font-medium flex flex-col items-center justify-center shadow">
          {content.graduation}
          <span className="absolute bottom-2 right-2 text-xs bg-white/30 dark:bg-white/20 text-black font-semibold px-2 py-0.5 rounded-full">
            {content.currentLabel}
          </span>
        </div>
        <div className="relative h-28 sm:h-32 rounded-xl bg-amber-300 text-foreground-light font-medium flex flex-col items-center justify-center shadow">
          Pre-Master
          <span className="absolute bottom-2 right-2 text-xs bg-white/40 dark:bg-white/20 text-foreground-light font-semibold px-2 py-0.5 rounded-full">
            {content.upcomingLabel}
          </span>
        </div>
      </div>

    </section>
  );
}

interface ExperienceDetailRendererProps {
  detailType: string;
  content: Record<string, unknown>;
}

export default function ExperienceDetailRenderer({ detailType, content }: ExperienceDetailRendererProps) {
  switch (detailType) {
    case 'djurve-internship':
    case 'chipsoft-internship':
    case 'afas-internship':
      return <InternshipDetail content={content as InternshipDetailProps['content']} />;
    case 'windesheim-bachelor':
      return <WindesheimBachelorDetail content={content as WindesheimBachelorProps['content']} />;
    default:
      // Fallback for simple text content
      return (
        <div className="text-foreground/80 leading-relaxed">
          {typeof content === 'string' ? content : JSON.stringify(content)}
        </div>
      );
  }
}
