"use client";

import {
  Bold,
  Code2,
  Heading4,
  Italic,
  Link2,
  List,
  ListOrdered,
  Quote,
  Underline,
} from "lucide-react";
import type { ElementType, ReactNode } from "react";

type MarkdownToolbarProps = {
  onFormat: (prefix: string, suffix?: string, placeholder?: string) => void;
  onLinePrefix: (prefix: string) => void;
};

export function MarkdownToolbar({
  onFormat,
  onLinePrefix,
}: MarkdownToolbarProps) {
  const tools = [
    {
      label: "Bold",
      icon: Bold,
      action: () => onFormat("**", "**", "bold text"),
    },
    {
      label: "Italic",
      icon: Italic,
      action: () => onFormat("*", "*", "italic text"),
    },
    {
      label: "Underline",
      icon: Underline,
      action: () => onFormat("<u>", "</u>", "underlined text"),
    },
    {
      label: "Link",
      icon: Link2,
      action: () => onFormat("[", "](https://example.com)", "link text"),
    },
    { label: "Heading 4", icon: Heading4, action: () => onLinePrefix("#### ") },
    { label: "Bulleted list", icon: List, action: () => onLinePrefix("- ") },
    {
      label: "Numbered list",
      icon: ListOrdered,
      action: () => onLinePrefix("1. "),
    },
    { label: "Quote", icon: Quote, action: () => onLinePrefix("> ") },
    { label: "Code", icon: Code2, action: () => onFormat("`", "`", "code") },
  ];

  return (
    <div className="flex flex-wrap items-center gap-1 rounded-t-lg border border-gray-700 bg-gray-900/80 p-2">
      {tools.map(({ label, icon: Icon, action }) => (
        <button
          key={label}
          type="button"
          title={label}
          aria-label={label}
          onClick={action}
          className="rounded-md p-2 text-gray-400 hover:bg-gray-800 hover:text-[#00C853]">
          <Icon size={15} />
        </button>
      ))}
    </div>
  );
}

export function MarkdownPreview({ markdown }: { markdown: string }) {
  return (
    <div className="min-h-[432px] rounded-lg border border-gray-800 bg-[#0d0d0d] p-4">
      <div className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-[#00C853]">
        Preview
      </div>
      {markdown.trim() ? (
        <MarkdownBody markdown={markdown} darkMode className="max-w-none" />
      ) : (
        <p className="text-sm italic text-gray-600">
          Your formatted article preview will appear here.
        </p>
      )}
    </div>
  );
}

export function MarkdownBody({
  markdown,
  darkMode = false,
  className = "",
}: {
  markdown: string;
  darkMode?: boolean;
  className?: string;
}) {
  return <div className={className}>{renderMarkdown(markdown, darkMode)}</div>;
}

const HEADING_SIZES: Record<number, string> = {
  1: "text-3xl",
  2: "text-2xl",
  3: "text-xl",
  4: "text-lg",
  5: "text-base",
  6: "text-base",
};

function renderMarkdown(markdown: string, darkMode: boolean): ReactNode[] {
  const headingColor = darkMode ? "text-white" : "text-gray-900";
  const paragraphColor = darkMode ? "text-gray-300" : "text-gray-700";
  const quoteColor = darkMode ? "text-gray-400" : "text-gray-600";
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const nodes: ReactNode[] = [];
  let index = 0;
  while (index < lines.length) {
    const line = lines[index];
    if (!line.trim()) {
      index += 1;
      continue;
    }
    const listMatch = line.match(/^\s*([-*]|\d+\.)\s+(.*)$/);
    if (listMatch) {
      const ordered = /^\d+\./.test(listMatch[1]);
      const items: string[] = [];
      while (index < lines.length) {
        const match = lines[index].match(/^\s*([-*]|\d+\.)\s+(.*)$/);
        if (!match || /^\d+\./.test(match[1]) !== ordered) break;
        items.push(match[2]);
        index += 1;
      }
      const ListTag = ordered ? "ol" : "ul";
      nodes.push(
        <ListTag
          key={`list-${index}`}
          className={`my-3 space-y-1 pl-6 text-base leading-7 ${paragraphColor}`}>
          {items.map((item, itemIndex) => (
            <li key={`${item}-${itemIndex}`}>{inlineMarkdown(item)}</li>
          ))}
        </ListTag>,
      );
      continue;
    }
    const heading = line.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      const level = heading[1].length;
      const HeadingTag = `h${level}` as ElementType;
      nodes.push(
        <HeadingTag
          key={`heading-${index}`}
          className={`mb-2 mt-4 font-display font-bold ${HEADING_SIZES[level]} ${headingColor}`}>
          {inlineMarkdown(heading[2])}
        </HeadingTag>,
      );
      index += 1;
      continue;
    }
    if (/^>\s?/.test(line)) {
      nodes.push(
        <blockquote
          key={`quote-${index}`}
          className={`my-3 border-l-2 border-[#00C853] pl-4 text-base italic ${quoteColor}`}>
          {inlineMarkdown(line.replace(/^>\s?/, ""))}
        </blockquote>,
      );
      index += 1;
      continue;
    }
    if (/^```/.test(line)) {
      const code: string[] = [];
      index += 1;
      while (index < lines.length && !/^```/.test(lines[index])) {
        code.push(lines[index]);
        index += 1;
      }
      index += 1;
      nodes.push(
        <pre
          key={`code-${index}`}
          className="my-3 overflow-x-auto rounded-lg bg-black p-3 text-xs text-green-300">
          <code>{code.join("\n")}</code>
        </pre>,
      );
      continue;
    }
    const paragraph: string[] = [line];
    index += 1;
    while (
      index < lines.length &&
      lines[index].trim() &&
      !/^(#{1,6})\s+/.test(lines[index]) &&
      !/^\s*([-*]|\d+\.)\s+/.test(lines[index]) &&
      !/^>\s?/.test(lines[index])
    ) {
      paragraph.push(lines[index]);
      index += 1;
    }
    nodes.push(
      <p
        key={`paragraph-${index}`}
        className={`my-3 text-base leading-7 ${paragraphColor}`}>
        {inlineMarkdown(paragraph.join("\n"))}
      </p>,
    );
  }
  return nodes;
}

function inlineMarkdown(text: string): ReactNode[] {
  const tokenPattern =
    /(\*\*[^*]+\*\*|__[^_]+__|\*[^*]+\*|_[^_]+_|`[^`]+`|\[[^\]]+\]\([^\s)]+\)|<u>[^<]+<\/u>)/g;
  return text.split(tokenPattern).map((token, index) => {
    if (/^\*\*.*\*\*$/.test(token) || /^__.*__$/.test(token))
      return <strong key={index}>{token.slice(2, -2)}</strong>;
    if (/^\*.*\*$/.test(token) || /^_.*_$/.test(token))
      return <em key={index}>{token.slice(1, -1)}</em>;
    if (/^`.*`$/.test(token))
      return (
        <code
          key={index}
          className="rounded bg-black px-1.5 py-0.5 text-xs text-green-300">
          {token.slice(1, -1)}
        </code>
      );
    if (/^<u>.*<\/u>$/.test(token))
      return <u key={index}>{token.slice(3, -4)}</u>;
    const link = token.match(/^\[([^\]]+)\]\(([^\s)]+)\)$/);
    if (link && /^https?:\/\//i.test(link[2]))
      return (
        <a
          key={index}
          href={link[2]}
          target="_blank"
          rel="noreferrer"
          className="text-[#00C853] underline">
          {link[1]}
        </a>
      );
    return <span key={index}>{token}</span>;
  });
}
