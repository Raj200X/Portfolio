import { useEffect, useMemo, useRef, useState } from "react";

function normalizeCommand(input) {
  return input.trim().toLowerCase();
}

export const ContactTerminal = ({ id, contact }) => {
  const commands = useMemo(
    () => ({
      help: {
        lines: ["Available commands:"],
        commandList: [
          "help",
          "contact",
          "resume",
          "coding profiles",
          "github",
          "linkedin",
          "leetcode",
          "gfg",
          "email",
          "clear"
        ]
      },
      contact: {
        entries: [
          { label: "Email", value: contact.email, href: `mailto:${contact.email}` },
          { label: "LinkedIn", value: contact.linkedin, href: contact.linkedin },
          { label: "GitHub", value: contact.github, href: contact.github }
        ].filter((item) => item.value)
      },
      email: {
        entries: [{ label: "Email", value: contact.email, href: `mailto:${contact.email}` }].filter((item) => item.value)
      },
      resume: {
        link: contact.resume ? { label: "Open Resume", href: contact.resume } : null
      },
      github: {
        entries: [{ label: "GitHub", value: contact.github, href: contact.github }].filter((item) => item.value),
        link: contact.github ? { label: "Open GitHub", href: contact.github } : null
      },
      linkedin: {
        entries: [{ label: "LinkedIn", value: contact.linkedin, href: contact.linkedin }].filter((item) => item.value),
        link: contact.linkedin ? { label: "Open LinkedIn", href: contact.linkedin } : null
      },
      leetcode: {
        entries: [{ label: "LeetCode", value: contact.leetcode, href: contact.leetcode }].filter((item) => item.value),
        link: contact.leetcode ? { label: "Open LeetCode", href: contact.leetcode } : null
      },
      gfg: {
        entries: [{ label: "GeeksforGeeks", value: contact.gfg, href: contact.gfg }].filter((item) => item.value),
        link: contact.gfg ? { label: "Open GeeksforGeeks", href: contact.gfg } : null
      },
      "coding profiles": {
        entries: [
          { label: "GitHub", value: contact.github, href: contact.github },
          { label: "LeetCode", value: contact.leetcode, href: contact.leetcode },
          { label: "GeeksforGeeks", value: contact.gfg, href: contact.gfg },
          { label: "Code360", value: contact.code360, href: contact.code360 },
          { label: "Codolio", value: contact.codolio, href: contact.codolio },
          { label: "HackerRank", value: contact.hackerrank, href: contact.hackerrank },
          { label: "CodeChef", value: contact.codechef, href: contact.codechef }
        ].filter((item) => item.value)
      }
    }),
    [contact]
  );

  const [history, setHistory] = useState([
    {
      command: "contact",
      output: commands.contact
    }
  ]);
  const [input, setInput] = useState("");
  const outputRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const container = outputRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [history]);

  const handleWheel = (event) => {
    const container = outputRef.current;
    if (!container) return;
    event.preventDefault();
    container.scrollTop += event.deltaY;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const command = normalizeCommand(input);

    if (!command) return;

    if (command === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    const output = commands[command] ?? {
      lines: [`Command not found: ${command}`, "Try: help"]
    };

    setHistory((current) => [...current, { command, output }]);
    setInput("");
  };

  const handleChipClick = (command) => {
    setInput(command);
    inputRef.current?.focus();
  };

  return (
    <section id={id} className="relative px-6 py-20 sm:px-10 lg:px-20 xl:px-32">
      <div className="mx-auto max-w-5xl">
        <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#141414] shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
          <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
            <span className="h-3 w-3 rounded-full bg-[#6d0f0f]" />
            <span className="h-3 w-3 rounded-full bg-[#8b5b17]" />
            <span className="h-3 w-3 rounded-full bg-[#205f36]" />
            <p className="ml-3 text-[10px] uppercase tracking-[0.35em] text-white/38">
              raj@portfolio:~ contact-terminal
            </p>
          </div>

          <div className="p-5 sm:p-6" onWheelCapture={handleWheel}>
            <div
              ref={outputRef}
              onWheel={handleWheel}
              className="max-h-[28rem] overflow-y-auto rounded-[1.4rem] border border-white/10 bg-black/25 p-5 font-mono text-sm"
            >
              <div className="mb-6">
                <p className="text-white">$ help</p>
                {commands.help.lines.map((line) => (
                  <p key={line} className="mt-2 text-white/65">
                    {line}
                  </p>
                ))}
                <div className="mt-4 flex flex-wrap gap-2">
                  {commands.help.commandList.map((command) => (
                    <button
                      key={command}
                      type="button"
                      onClick={() => handleChipClick(command)}
                      className="rounded-full border border-white/10 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-white/60 transition hover:border-white/25 hover:text-white"
                    >
                      {command}
                    </button>
                  ))}
                </div>
              </div>

              {history.map((entry, index) => (
                <div key={`${entry.command}-${index}`} className="mb-6 last:mb-0">
                  <p className="text-white">$ {entry.command}</p>
                  {(entry.output.lines ?? []).map((line) => (
                    <p key={line} className="mt-2 text-white/65">
                      {line}
                    </p>
                  ))}
                  {entry.output.entries?.map((entryItem) => (
                    <p key={`${entryItem.label}-${entryItem.value}`} className="mt-2 text-white/68">
                      {entryItem.label}:{" "}
                      <a href={entryItem.href} target="_blank" rel="noreferrer" className="text-white underline-offset-4 hover:underline">
                        {entryItem.value}
                      </a>
                    </p>
                  ))}
                  {entry.output.commandList ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {entry.output.commandList.map((command) => (
                        <button
                          key={command}
                          type="button"
                          onClick={() => handleChipClick(command)}
                          className="rounded-full border border-white/10 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-white/60 transition hover:border-white/25 hover:text-white"
                        >
                          {command}
                        </button>
                      ))}
                    </div>
                  ) : null}
                  {entry.output.link ? (
                    <a
                      href={entry.output.link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-block rounded-full bg-white px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-black"
                    >
                      {entry.output.link.label}
                    </a>
                  ) : null}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="mt-5 flex items-center gap-3 rounded-[1.2rem] border border-white/10 bg-black/20 px-4 py-4 font-mono">
              <span className="shrink-0 text-white/75">raj@portfolio:~$</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/25"
                placeholder="Type help"
                aria-label="Terminal command input"
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
