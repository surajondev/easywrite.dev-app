import { ChatOpenAI } from "langchain/chat_models/openai";

import { OpenAIEmbeddings } from "langchain/embeddings/openai";

const openaiKey = process.env.OPENAI_API_KEY;

export const llm = new ChatOpenAI({
  openAIApiKey: openaiKey,
  modelName: "gpt-3.5-turbo",
  temperature: 0.9,
});

export const embeddings = new OpenAIEmbeddings({
  openAIApiKey: openaiKey, // In Node.js defaults to process.env.OPENAI_API_KEY
});
