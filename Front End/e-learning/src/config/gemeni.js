
import { GoogleGenerativeAI   , HarmCategory,
    HarmBlockThreshold } from "@google/generative-ai";

const API_KEY = "AIzaSyBm8ChoXZr4jA6z9AX048zrykYMGiwyo2g";

// node --version # Should be >= 18
// npm install @google/generative-ai


  
  const MODEL_NAME = "gemini-1.5-pro-latest";
  
  async function runChat(prompt) {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  
    const generationConfig = {
      temperature: 1,
      topK: 0,
      topP: 0.95,
      maxOutputTokens: 8192,
    };
  
    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
    ];
  
    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [
      ],
    });
    prompt="reminder your personality is a teacher that likes to help hes students ,try not to surpass 50 words in each response , answer : "+prompt
    const result = await chat.sendMessage(prompt);
    const response = result.response;
    console.log(response.text());
    return response;
  }
  
  export default runChat;