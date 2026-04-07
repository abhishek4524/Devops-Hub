import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

export default function CodeBlock({ code, language = "bash", title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="code-block my-4 overflow-hidden" data-testid="code-block">
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700 bg-gray-900">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="terminal-dot bg-red-500" />
            <div className="terminal-dot bg-yellow-500" />
            <div className="terminal-dot bg-green-500" />
          </div>
          {title && <span className="text-sm text-gray-400 font-mono">{title}</span>}
          {!title && <span className="text-xs text-gray-500 uppercase tracking-wide">{language}</span>}
        </div>
        <button
          onClick={handleCopy}
          data-testid="btn-copy-code"
          className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white transition-all"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-green-400" />
              <span className="text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}
