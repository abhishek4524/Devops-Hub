interface SectionHeaderProps {
  icon: string;
  title: string;
  subtitle: string;
  id: string;
}

export default function SectionHeader({ icon, title, subtitle, id }: SectionHeaderProps) {
  return (
    <div className="mb-8" id={id}>
      <div className="flex items-center gap-3 mb-3">
        <span className="text-3xl">{icon}</span>
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">{title}</h2>
      </div>
      <p className="text-muted-foreground text-lg leading-relaxed">{subtitle}</p>
      <div className="mt-4 h-0.5 bg-gradient-to-r from-primary via-primary/50 to-transparent" />
    </div>
  );
}
