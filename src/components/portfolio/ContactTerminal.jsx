import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import api from "../../lib/api";

const initialHistory = [
  { type: "system", value: "Terminal online. Type `help` to view commands." }
];

export const ContactTerminal = ({ id, contact }) => {
  const [history, setHistory] = useState(initialHistory);
  const [command, setCommand] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitState, setSubmitState] = useState({ status: "idle", message: "" });

  const links = useMemo(
    () => ({
      email: `mailto:${contact.email}`,
      github: contact.github,
      linkedin: contact.linkedin,
      resume: contact.resume
    }),
    [contact]
  );

  const appendHistory = (line) => setHistory((current) => [...current, line]);

  const handleCommand = (rawValue) => {
    const normalized = rawValue.trim().toLowerCase();
    appendHistory({ type: "command", value: `> ${rawValue}` });

    if (!normalized) {
      appendHistory({ type: "system", value: "Empty command. Type `help` to continue." });
      return;
    }

    if (normalized === "clear") {
      setHistory(initialHistory);
      return;
    }

    if (normalized === "message") {
      appendHistory({ type: "system", value: contact.commands.message });
      setShowForm(true);
      return;
    }

    const response = contact.commands[normalized];
    if (response) {
      appendHistory({ type: "system", value: response });
      setShowForm(false);
      return;
    }

    appendHistory({ type: "system", value: `Unknown command: ${normalized}` });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setSubmitState({ status: "loading", message: "Sending message..." });

    try {
      const payload = {
        ...formState,
        source: "portfolio-terminal"
      };

      const { data } = await api.post("/contact", payload);
      setSubmitState({ status: "success", message: data.message });
      setFormState({ name: "", email: "", message: "" });
      appendHistory({ type: "system", value: "Message delivered to backend storage." });
    } catch (error) {
      const message = error.response?.data?.message || "Unable to send message right now.";
      setSubmitState({ status: "error", message });
    }
  };

  return (
    <section id={id} className="relative px-6 py-24 sm:px-10 lg:px-20 xl:px-32">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#05070D]/85 shadow-[0_24px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
          <div className="flex items-center gap-3 border-b border-white/10 px-6 py-4">
            <span className="h-3 w-3 rounded-full bg-[#FF6057]" />
            <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
            <span className="h-3 w-3 rounded-full bg-[#28C840]" />
            <p className="ml-4 font-sans text-[10px] uppercase tracking-[0.45em] text-white/42">Contact Terminal</p>
          </div>

          <div className="grid gap-8 p-6 lg:grid-cols-[1.15fr_0.85fr] lg:p-8">
            <div className="rounded-[2rem] border border-white/8 bg-black/35 p-5">
              <div className="space-y-3 font-mono text-sm text-[#B6FFEF]">
                {history.map((line, index) => (
                  <motion.p
                    key={`${line.value}-${index}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={line.type === "command" ? "text-white" : "text-[#9DE7D8]"}
                  >
                    {line.value}
                  </motion.p>
                ))}
              </div>

              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  handleCommand(command);
                  setCommand("");
                }}
                className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5"
              >
                <span className="font-mono text-[#73F5D5]">&gt;</span>
                <input
                  value={command}
                  onChange={(event) => setCommand(event.target.value)}
                  placeholder={contact.terminalPrompt}
                  className="w-full bg-transparent font-mono text-sm text-white outline-none placeholder:text-white/28"
                />
              </form>

              <div className="mt-6 flex flex-wrap gap-2">
                {["help", "contact", "github", "linkedin", "resume", "message"].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => handleCommand(item)}
                    className="rounded-full border border-white/10 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.24em] text-white/58 transition hover:border-white/25 hover:text-white"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              <div className="rounded-[2rem] border border-white/8 bg-white/[0.04] p-6">
                <p className="font-sans text-[10px] uppercase tracking-[0.45em] text-white/40">Direct Channels</p>
                <div className="mt-6 space-y-4 text-sm text-white/75">
                  <a href={links.email} className="block transition hover:text-white">
                    {contact.email}
                  </a>
                  <a href={links.github} target="_blank" rel="noreferrer" className="block transition hover:text-white">
                    {contact.github}
                  </a>
                  <a href={links.linkedin} target="_blank" rel="noreferrer" className="block transition hover:text-white">
                    {contact.linkedin}
                  </a>
                  <a href={links.resume} target="_blank" rel="noreferrer" className="block transition hover:text-white">
                    Resume archive
                  </a>
                </div>
              </div>

              {showForm ? (
                <form onSubmit={onSubmit} className="rounded-[2rem] border border-white/8 bg-black/30 p-6">
                  <p className="font-sans text-[10px] uppercase tracking-[0.45em] text-white/40">Send Message</p>
                  <div className="mt-5 space-y-4">
                    <input
                      required
                      value={formState.name}
                      onChange={(event) => setFormState((state) => ({ ...state, name: event.target.value }))}
                      placeholder="Name"
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/28"
                    />
                    <input
                      required
                      type="email"
                      value={formState.email}
                      onChange={(event) => setFormState((state) => ({ ...state, email: event.target.value }))}
                      placeholder="Email"
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/28"
                    />
                    <textarea
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(event) => setFormState((state) => ({ ...state, message: event.target.value }))}
                      placeholder="Tell me about the project, internship, or collaboration."
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/28"
                    />
                    <button
                      type="submit"
                      disabled={submitState.status === "loading"}
                      className="rounded-full bg-white px-5 py-3 text-xs uppercase tracking-[0.3em] text-black transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {submitState.status === "loading" ? "Sending" : "Transmit"}
                    </button>
                  </div>
                  {submitState.message ? (
                    <p
                      className={`mt-4 text-sm ${
                        submitState.status === "error" ? "text-[#FF9C93]" : "text-[#9DE7D8]"
                      }`}
                    >
                      {submitState.message}
                    </p>
                  ) : null}
                </form>
              ) : (
                <div className="rounded-[2rem] border border-dashed border-white/10 bg-white/[0.03] p-6 text-sm leading-7 text-white/52">
                  Type <span className="font-mono text-white">message</span> in the terminal to unlock the backend-connected form.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
