"use client";
import { useState } from "react";

type Message = {
  role: "user" | "bot";
  content: string
}

export default function Home() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [character, setCharacter] = useState("anawrahta");

  const handleSubmit = async() => {
    const res = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, character: character }),
    })
    const data = await res.json()
    setReply(data.reply)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black">
        <select className="border border-zinc-200 rounded-full p-2" value={character} onChange={(e) => setCharacter(e.target.value)}>
          <option value="anawrahta">Anawrahta</option>
          <option value="tesla">Tesla</option>
        </select>
        <div className="flex gap-4">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type something..."
            className="border border-zinc-200 rounded-full p-2"
          />

          <button onClick={handleSubmit}>Send</button>
        </div>
        <p className="text-white">
          <strong>Reply:</strong> {reply}
        </p>
      </main>
    </div>
  );
}
