"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CommandBlockProps {
    command: string;
    instruction: string;
    copyText: string;
    copiedText: string;
}

export default function CommandBlock({ command, instruction, copyText, copiedText }: CommandBlockProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(command);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative w-full md:w-auto flex-1 group/cmd">
            <div className="absolute inset-0 bg-blue-500/5 rounded-xl blur-md opacity-0 group-hover/cmd:opacity-100 transition-opacity" />
            <div className="relative bg-black/60 border border-white/10 rounded-xl overflow-hidden font-mono text-xs">
                <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5 gap-4">
                    <span className="text-zinc-500 flex items-center gap-2 truncate">
                        {instruction}
                    </span>
                    <button
                        onClick={handleCopy}
                        className="flex-shrink-0 flex items-center gap-1.5 text-blue-400 hover:text-blue-300 transition-colors bg-blue-400/10 px-2 py-1 rounded-md active:scale-95"
                    >
                        {copied ? <Check size={12} /> : <Copy size={12} />}
                        <span className="font-bold uppercase tracking-widest text-[10px]">
                            {copied ? copiedText : copyText}
                        </span>
                    </button>
                </div>
                <div className="p-4 text-zinc-300 leading-relaxed cursor-text select-all break-words">
                    {command}
                </div>
            </div>
        </div>
    );
}
