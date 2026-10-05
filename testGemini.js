import ai from "./config/gemini.js";

const response = await ai.models.generateContent({
    model: "gemini-3.8-flash",
    contents: "Say hello to the STARK hackathon team in one sentence."
});

console.log(response.text);