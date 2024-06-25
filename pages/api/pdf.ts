import type { NextApiRequest, NextApiResponse } from "next";
import { SupabaseHybridSearch } from "@langchain/community/retrievers/supabase";
import { llm, embeddings } from "@/lib/openai";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from "@langchain/core/prompts";
import { JsonOutputFunctionsParser } from "langchain/output_parsers";
import { z } from "zod";
import {
  RunnablePassthrough,
  RunnableSequence,
} from "@langchain/core/runnables";
import { formatDocumentsAsString } from "langchain/util/document";
//@ts-ignore
import { zodToJsonSchema } from "zod-to-json-schema";
import { supabase } from "@/lib/supabase";
import { StringOutputParser } from "@langchain/core/output_parsers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { query } = req.body;

    let retriever: any;
    retriever = new SupabaseHybridSearch(embeddings, {
      client: supabase,
      similarityK: 6,
      keywordK: 6,
      tableName: "pdf",
      similarityQueryName: "match_documents_pdf",
      keywordQueryName: "kw_match_documents_pdf",
    });

    // Create a system & human prompt for the chat model
    const SYSTEM_TEMPLATE = `Use the following pieces of context to answer the question at the end. Don't make up any answer
          ----------------
          {context}`;
    const messages = [
      SystemMessagePromptTemplate.fromTemplate(SYSTEM_TEMPLATE),
      HumanMessagePromptTemplate.fromTemplate("{question}"),
    ];
    const prompt = ChatPromptTemplate.fromMessages(messages);
    const chain = RunnableSequence.from([
      {
        context: retriever.pipe(formatDocumentsAsString),
        question: new RunnablePassthrough(),
      },
      prompt,
      llm,
      new StringOutputParser(),
    ]);

    const answer = await chain.invoke(query);
    res.status(200).send({ answer: answer });
    console.log(retriever);

    //@ts-ignore
    // console.log(res?.data)
    //@ts-ignore
    res.send(answer);
    console.log(answer);
  } catch (error) {
    console.error("Error encountered:", error);
    res.send("An error occurred while processing your request.");
  }
}
