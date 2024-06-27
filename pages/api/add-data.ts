import type { NextApiRequest, NextApiResponse } from "next";
import { embeddings } from "@/lib/openai";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { supabase } from "@/lib/supabase";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { src } = req.body;
    const loader = new PDFLoader(src);

    console.log(src, loader);

    const doc = await loader.load();

    await SupabaseVectorStore.fromDocuments(doc, embeddings, {
      client: supabase,
      tableName: "pdf",
      queryName: "match_documents_pdf",
    });

    res.send("Data Added Successfully");
    // toast.success("Data Added Successfully");
  } catch (error) {
    console.error("Error encountered:", error);
    res.send("An error occurred while processing your request.");
  }
}
