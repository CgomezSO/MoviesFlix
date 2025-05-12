import { GoogleGenAI } from "@google/genai";


export async function main(question: string) {
  const ai = new GoogleGenAI({
    apiKey: process.env.EXPO_PUBLIC_GOOGLE_GEMINI_API_KEY!,
  });

  const model = "gemini-1.5-flash";

  const result = await ai.models.generateContent({
    model,
    contents: [
      {
        role: "user",
        parts: [{ text: question }],
      },
    ],
  });

  return result.text;
}

// main(question);

// const ai = new GoogleGenAI({
//     apiKey: process.env.EXPO_PUBLIC_GOOGLE_GEMINI_API_KEY!,
// });

// const config = {
//     responseMimeType: "text/plain",
// };

// // const model = "gemini-1.5-pro"; // o gemini-2.5 si tienes acceso
// const model = "gemini-2.5-pro-preview-05-06";

// const chatHistory: any[] = [];

// async function ask(question: string) {
//     chatHistory.push({
//         role: "user",
//         parts: [{ text: question }],
//     });

//     const response = await ai.models.generateContentStream({
//         model,
//         config,
//         contents: chatHistory,
//     });

//     let fullResponse = "";
//     for await (const chunk of response) {
//         const text = chunk.text || "";
//         process.stdout.write(text);
//         fullResponse += text;
//     }

//     chatHistory.push({
//         role: "model",
//         parts: [{ text: fullResponse }],
//     });

//     console.log("\n"); // salto de línea
// }

// async function runChat() {
//     await ask("Hola, ¿quién eres?");
//     await ask("¿Cuál es la capital de Japón?");
//     await ask("¿Y cuál es su población?");
// }

// runChat();
