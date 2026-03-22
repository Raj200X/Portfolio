import { useEffect, useMemo, useRef, useState } from "react";

function normalizeCommand(input) {
  return input.trim().toLowerCase();
}

export function TerminalContact({ contact, resumeHref }) {
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
          "phone",
          "email",
          "clear",
        ],
      },
      contact: {
        entries: [
          { label: "Email", value: contact.email, href: `mailto:${contact.email}` },
          { label: "Phone", value: contact.phone, href: `tel:${contact.phone}` },
          { label: "LinkedIn", value: contact.linkedin, href: contact.linkedin },
          { label: "GitHub", value: contact.github, href: contact.github },
        ],
      },
      email: {
        entries: [{ label: "Email", value: contact.email, href: `mailto:${contact.email}` }],
      },
      phone: {
        entries: [{ label: "Phone", value: contact.phone, href: `tel:${contact.phone}` }],
      },
      resume: {
        link: { label: "Open Resume", href: resumeHref },
      },
      github: {
        entries: [{ label: "GitHub", value: contact.github, href: contact.github }],
        link: { label: "Open GitHub", href: contact.github },
      },
      linkedin: {
        entries: [{ label: "LinkedIn", value: contact.linkedin, href: contact.linkedin }],
        link: { label: "Open LinkedIn", href: contact.linkedin },
      },
      leetcode: {
        entries: [{ label: "LeetCode", value: contact.leetcode, href: contact.leetcode }],
        link: { label: "Open LeetCode", href: contact.leetcode },
      },
      gfg: {
        entries: [{ label: "GeeksforGeeks", value: contact.gfg, href: contact.gfg }],
        link: { label: "Open GeeksforGeeks", href: contact.gfg },
      },
      "coding profiles": {
        entries: [
          { label: "GitHub", value: contact.github, href: contact.github },
          { label: "LeetCode", value: contact.leetcode, href: contact.leetcode },
          { label: "GeeksforGeeks", value: contact.gfg, href: contact.gfg },
          { label: "Code360", value: contact.code360, href: contact.code360 },
          { label: "Codolio", value: contact.codolio, href: contact.codolio },
          { label: "HackerRank", value: contact.hackerrank, href: contact.hackerrank },
          { label: "CodeChef", value: contact.codechef, href: contact.codechef },
        ],
      },
    }),
    [contact, resumeHref],
  );

  const [history, setHistory] = useState([
    {
      command: "contact",
      output: commands.contact,
    },
  ]);
  const [input, setInput] = useState("");
  const outputRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const container = outputRef.current;

    if (!container) {
      return;
    }

    container.scrollTop = container.scrollHeight;
  }, [history]);

  const handleWheel = (event) => {
    const container = outputRef.current;

    if (!container) {
      return;
    }

    event.preventDefault();
    container.scrollTop += event.deltaY;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const command = normalizeCommand(input);

    if (!command) {
      return;
    }

    if (command === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    const output = commands[command] ?? {
      lines: [`Command not found: ${command}`, "Try: help"],
    };

    setHistory((current) => [...current, { command, output }]);
    setInput("");
  };

  const handleChipClick = (command) => {
    setInput(command);
    inputRef.current?.focus();
  };

  return (
    <div className="terminal-shell mt-12" onWheelCapture={handleWheel}>
      <div className="terminal-topbar">
        <span className="terminal-dot bg-[#7A0C0C]" />
        <span className="terminal-dot bg-[#d97706]" />
        <span className="terminal-dot bg-[#15803d]" />
        <p className="terminal-title">ajeet@portfolio:~ contact-terminal</p>
      </div>

      <div className="terminal-body">
        <div ref={outputRef} className="terminal-output" onWheel={handleWheel}>
          <div className="terminal-block terminal-built-in">
            <p className="terminal-command">$ help</p>
            {commands.help.lines.map((line) => (
              <p key={line} className="terminal-line">
                {line}
              </p>
            ))}
            <div className="terminal-command-list">
              {commands.help.commandList.map((command) => (
                <button
                  key={command}
                  type="button"
                  className="terminal-command-chip"
                  onClick={() => handleChipClick(command)}
                >
                  {command}
                </button>
              ))}
            </div>
          </div>

          {history.map((entry, index) => (
            <div key={`${entry.command}-${index}`} className="terminal-block">
              <p className="terminal-command">$ {entry.command}</p>
              {(entry.output.lines ?? []).map((line) => (
                <p key={line} className="terminal-line">
                  {line}
                </p>
              ))}
              {entry.output.entries
                ? entry.output.entries.map((entryItem) => (
                    <p key={`${entryItem.label}-${entryItem.value}`} className="terminal-line">
                      {entryItem.label}:{" "}
                      <a
                        href={entryItem.href}
                        target="_blank"
                        rel="noreferrer"
                        className="terminal-inline-link"
                      >
                        {entryItem.value}
                      </a>
                    </p>
                  ))
                : null}
              {entry.output.commandList ? (
                <div className="terminal-command-list">
                  {entry.output.commandList.map((command) => (
                    <button
                      key={command}
                      type="button"
                      className="terminal-command-chip"
                      onClick={() => handleChipClick(command)}
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
                  className="terminal-link"
                >
                  {entry.output.link.label}
                </a>
              ) : null}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="terminal-prompt">
          <span className="terminal-prefix">ajeet@portfolio:~$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            className="terminal-input"
            placeholder="Type help"
            aria-label="Terminal command input"
          />
        </form>
      </div>
    </div>
  );
}
