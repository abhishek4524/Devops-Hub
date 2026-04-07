import { useEffect, useRef, useState } from "react";

interface MermaidDiagramProps {
  chart: string;
  title?: string;
}

declare global {
  interface Window {
    mermaid?: {
      initialize: (config: Record<string, unknown>) => void;
      render: (id: string, definition: string) => Promise<{ svg: string }>;
    };
  }
}

let mermaidLoaded = false;
let mermaidLoadPromise: Promise<void> | null = null;

function loadMermaid(): Promise<void> {
  if (mermaidLoaded) return Promise.resolve();
  if (mermaidLoadPromise) return mermaidLoadPromise;

  mermaidLoadPromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js";
    script.onload = () => {
      mermaidLoaded = true;
      resolve();
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });

  return mermaidLoadPromise;
}

let diagramCounter = 0;

export default function MermaidDiagram({ chart, title }: MermaidDiagramProps) {
  const [svg, setSvg] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const idRef = useRef(`mermaid-${++diagramCounter}-${Date.now()}`);

  useEffect(() => {
    let cancelled = false;

    const render = async () => {
      try {
        setLoading(true);
        setError(false);
        await loadMermaid();

        if (!window.mermaid || cancelled) return;

        const isDark = document.documentElement.classList.contains("dark");
        window.mermaid.initialize({
          startOnLoad: false,
          theme: isDark ? "dark" : "neutral",
          securityLevel: "loose",
          fontFamily: "Inter, sans-serif",
          fontSize: 14,
        });

        const { svg: rendered } = await window.mermaid.render(idRef.current, chart);
        if (!cancelled) {
          setSvg(rendered);
          setLoading(false);
        }
      } catch (err) {
        console.error("Mermaid render error:", err);
        if (!cancelled) {
          setError(true);
          setLoading(false);
        }
      }
    };

    render();
    return () => { cancelled = true; };
  }, [chart]);

  return (
    <div className="mermaid-container" data-testid="mermaid-diagram">
      {title && (
        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">{title}</h4>
      )}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-muted-foreground">Rendering diagram...</span>
          </div>
        </div>
      )}
      {error && (
        <div className="flex items-center justify-center py-8 text-muted-foreground text-sm">
          Diagram unavailable
        </div>
      )}
      {!loading && !error && (
        <div
          className="flex justify-center overflow-x-auto"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      )}
    </div>
  );
}
