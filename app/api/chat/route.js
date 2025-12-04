import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req) {
  try {
    const { history = [], message } = await req.json();

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    // Convert React-style history to Gemini format (safe default)
    const geminiHistory = (history || []).map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.text }],
    }));

    // Chat creation as mentioned in official documentation
    const chat = await ai.chats.create({
      model: "gemini-2.5-flash",
      history: geminiHistory,
    });
   
    const result = await chat.sendMessage({ message });

    // Extract reply (simple, with small fallbacks)
    let reply = "";
    if (typeof result?.text === "string") {
      reply = result.text;
    } else if (result?.response && typeof result.response.text === "function") {
      reply = await result.response.text();
    } else if (result?.response?.parts && Array.isArray(result.response.parts)) {
      reply = result.response.parts.map((p) => p.text || "").join("");
    } else {
      // last-resort: stringify for debugging
      reply = JSON.stringify(result);
    }

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json({ error: "Something went wrong", details: err?.message }, { status: 500 });
  }
}
