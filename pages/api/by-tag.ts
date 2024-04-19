import type { NextApiRequest, NextApiResponse } from "next";
import { SupabaseHybridSearch } from "langchain/retrievers/supabase";
import { llm, embeddings } from "@/lib/openai";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from "langchain/prompts";
import { JsonOutputFunctionsParser } from "langchain/output_parsers";
import { z } from "zod";
import {
  RunnablePassthrough,
  RunnableSequence,
} from "langchain/schema/runnable";
import { formatDocumentsAsString } from "langchain/util/document";
//@ts-ignore
import { zodToJsonSchema } from "zod-to-json-schema";
import { supabase } from "@/lib/supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { query, platform } = req.body;
    console.log(query, platform);

    let retriever: any;

    if (platform == "devto") {
      retriever = new SupabaseHybridSearch(embeddings, {
        client: supabase,
        similarityK: 6,
        keywordK: 6,
        tableName: "documents",
        similarityQueryName: "match_documents",
        keywordQueryName: "kw_match_documents",
      });
    }

    if (platform == "hashnode") {
      retriever = new SupabaseHybridSearch(embeddings, {
        client: supabase,
        similarityK: 6,
        keywordK: 6,
        tableName: "hashnode_data",
        similarityQueryName: "match_documents_hashnode",
        keywordQueryName: "kw_match_documents_hashnode",
      });
    }

    const articleSchema = z.object({
      data: z.array(
        z.object({
          title: z.string().describe("title of the article"),
          expected_reactions: z
            .number()
            .describe("expected reactions of the article"),
          expected_comments: z
            .number()
            .describe("expected comments of the article"),
          reading_time: z
            .number()
            .describe("expected reading time of the article"),
        })
      ),
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

    const llmWithTools = llm.bind({
      functions: [
        {
          name: "output_formatter",
          description: "Should always be used to properly format output",
          parameters: zodToJsonSchema(articleSchema),
        },
      ],
      function_call: { name: "output_formatter" },
    });

    const outputParser = new JsonOutputFunctionsParser();

    const chain = RunnableSequence.from([
      {
        context: retriever.pipe(formatDocumentsAsString),
        question: new RunnablePassthrough(),
      },
      prompt,
      llmWithTools,
      outputParser,
    ]);

    const response = await chain.invoke(
      `Take Inpiration and Give me 10 topic title based on tags: ${query} for future articles. Also generated expected_reactions, expected_comments every time`
    );

    console.log(retriever);

    //@ts-ignore
    // console.log(res?.data)
    //@ts-ignore
    res.send(response?.data);
  } catch (error) {
    console.error("Error encountered:", error);
    res.send("An error occurred while processing your request.");
  }
}
